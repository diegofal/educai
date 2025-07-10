-- MathAdapt Database Initialization
-- This file sets up the PostgreSQL database with initial schema and sample data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create initial sample exercise data for testing
-- This will be replaced by proper seed files in production

-- Sample math exercises for the item bank
INSERT INTO exercises (id, item_id, domain, subdomain, difficulty, international_percentile, irt_params, type, statement, options, hints, solution, solution_steps, expected_time_seconds, language, benchmark_source, age_range_min, age_range_max, is_active, created_at, updated_at) VALUES
(uuid_generate_v4(), 'math_4g_001', 'arithmetic', 'addition', 0.42, 70, '{"discrimination": 1.2, "difficulty": 0.42, "guessing": 0.25}', 'word_problem', 'María tiene 247 stickers. Su hermana le da 186 más. ¿Cuántos stickers tiene ahora?', NULL, '["Identifica los números", "Suma las centenas primero"]', '433', '["247 + 186", "200 + 100 = 300", "40 + 80 = 120", "7 + 6 = 13", "300 + 120 + 13 = 433"]', 180, 'es', 'TIMSS_2019', 9, 10, true, NOW(), NOW()),

(uuid_generate_v4(), 'math_4g_002', 'geometry', 'shapes', 0.38, 65, '{"discrimination": 1.1, "difficulty": 0.38, "guessing": 0.25}', 'multiple_choice', '¿Cuántos lados tiene un hexágono?', '["4", "5", "6", "8"]', '["Recuerda el prefijo ''hexa''", "Hexa significa seis"]', '6', '["Un hexágono tiene 6 lados por definición"]', 45, 'es', 'TIMSS_2019', 8, 11, true, NOW(), NOW()),

(uuid_generate_v4(), 'math_3g_001', 'arithmetic', 'counting', 0.25, 45, '{"discrimination": 1.0, "difficulty": 0.25, "guessing": 0.25}', 'multiple_choice', 'Cuenta los círculos: ⭕⭕⭕⭕⭕', '["3", "4", "5", "6"]', '["Cuenta uno por uno", "Señala cada círculo mientras cuentas"]', '5', '["Contar: 1, 2, 3, 4, 5 círculos"]', 60, 'es', 'Early_Math', 6, 8, true, NOW(), NOW()),

(uuid_generate_v4(), 'math_5g_001', 'arithmetic', 'multiplication', 0.55, 80, '{"discrimination": 1.3, "difficulty": 0.55, "guessing": 0.25}', 'word_problem', 'En una caja hay 12 chocolates. Si tienes 7 cajas, ¿cuántos chocolates tienes en total?', NULL, '["Multiplica 12 × 7", "Puedes sumar 12 siete veces"]', '84', '["12 × 7 = 84", "O: 12 + 12 + 12 + 12 + 12 + 12 + 12 = 84"]', 120, 'es', 'TIMSS_2019', 10, 12, true, NOW(), NOW());

-- Insert sample countries performance data
COMMENT ON TABLE exercises IS 'Exercise item bank with IRT parameters and international benchmarks';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX IF NOT EXISTS idx_exercises_domain ON exercises(domain);
CREATE INDEX IF NOT EXISTS idx_exercises_age_range ON exercises(age_range_min, age_range_max);
CREATE INDEX IF NOT EXISTS idx_students_theta ON students(current_theta);
CREATE INDEX IF NOT EXISTS idx_responses_student_created ON responses(student_id, created_at);

-- Set up database permissions for the application user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO mathadapt;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO mathadapt;