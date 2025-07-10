import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../entities/student.entity';
import { User } from '../../entities/user.entity';
import { Family } from '../../entities/family.entity';

interface CreateStudentInput {
  name: string;
  birthDate: Date;
  grade?: number;
  targetPercentile?: number;
}

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
  ) {}

  async createStudent(userId: string, input: CreateStudentInput): Promise<Student> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['family'],
    });

    if (!user || !user.family) {
      throw new NotFoundException('User or family not found');
    }

    // Calculate initial grade based on age if not provided
    const age = this.calculateAge(input.birthDate);
    const estimatedGrade = input.grade ?? Math.max(0, age - 3);

    const student = this.studentRepository.create({
      name: input.name,
      birthDate: input.birthDate,
      grade: estimatedGrade,
      targetPercentile: input.targetPercentile || 50,
      currentTheta: 0.0, // Initial IRT ability estimate
      parent: user,
      family: user.family,
    });

    return this.studentRepository.save(student);
  }

  async getStudentsByFamily(userId: string): Promise<Student[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['family'],
    });

    if (!user || !user.family) {
      throw new NotFoundException('User or family not found');
    }

    return this.studentRepository.find({
      where: { family: { id: user.family.id } },
      relations: ['exerciseSets', 'responses', 'progressRecords'],
      order: { createdAt: 'ASC' },
    });
  }

  async getStudentById(userId: string, studentId: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['parent', 'family', 'exerciseSets', 'responses', 'progressRecords'],
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Verify ownership
    if (student.parent.id !== userId) {
      throw new ForbiddenException('You can only access your own children');
    }

    return student;
  }

  async updateStudentTheta(studentId: string, newTheta: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    student.currentTheta = newTheta;
    student.lastActivityAt = new Date();

    return this.studentRepository.save(student);
  }

  async updateStudentProgress(studentId: string, exercisesCompleted: number, timeSpent: number, accuracy: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    student.totalExercisesCompleted += exercisesCompleted;
    student.totalTimeSpentMinutes += timeSpent;
    student.averageAccuracy = this.calculateRunningAverage(
      student.averageAccuracy,
      accuracy,
      student.totalExercisesCompleted
    );
    student.lastActivityAt = new Date();

    return this.studentRepository.save(student);
  }

  async getDiagnosticInitialTheta(responses: Array<{isCorrect: boolean, difficulty: number}>): Promise<number> {
    // Simple IRT estimation for initial diagnostic
    if (responses.length === 0) return 0.0;

    const correctCount = responses.filter(r => r.isCorrect).length;
    const accuracy = correctCount / responses.length;
    const avgDifficulty = responses.reduce((sum, r) => sum + r.difficulty, 0) / responses.length;

    // Basic theta estimation: if performing above average difficulty, positive theta
    let theta = 0.0;
    
    if (accuracy > 0.75) {
      theta = avgDifficulty + 0.2;
    } else if (accuracy > 0.5) {
      theta = avgDifficulty;
    } else if (accuracy > 0.25) {
      theta = avgDifficulty - 0.2;
    } else {
      theta = avgDifficulty - 0.4;
    }

    // Clamp theta to reasonable bounds
    return Math.max(-2.0, Math.min(2.0, theta));
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  private calculateRunningAverage(currentAvg: number, newValue: number, totalCount: number): number {
    if (totalCount <= 1) return newValue;
    return ((currentAvg * (totalCount - 1)) + newValue) / totalCount;
  }
}