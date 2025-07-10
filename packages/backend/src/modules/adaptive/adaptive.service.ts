import { Injectable } from '@nestjs/common';

@Injectable()
export class AdaptiveService {
  // IRT algorithm implementation will go here
  calculateNextTheta(currentTheta: number, isCorrect: boolean, difficulty: number): number {
    // Simple IRT update formula
    const learningRate = 0.1;
    const expected = this.probability(currentTheta, difficulty);
    const adjustment = learningRate * (isCorrect ? 1 - expected : -expected);
    return currentTheta + adjustment;
  }

  private probability(theta: number, difficulty: number): number {
    // IRT 1PL model
    return 1 / (1 + Math.exp(-(theta - difficulty)));
  }
}