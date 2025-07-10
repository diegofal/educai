# 🧮 MathAdapt - MVP Matemática Adaptativa

**Plataforma de matemática adaptativa para niños de 3-12 años con IA y benchmarks internacionales**

## 📋 Tabla de Contenidos

- [Visión del Producto](#-visión-del-producto)
- [Arquitectura](#-arquitectura)
- [Tecnologías](#-tecnologías)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Desarrollo](#-desarrollo)
- [API GraphQL](#-api-graphql)
- [Base de Datos](#-base-de-datos)
- [Despliegue](#-despliegue)
- [Licencia](#-licencia)

## 🎯 Visión del Producto

**MathAdapt** es una plataforma web-móvil que personaliza el aprendizaje matemático mediante IA adaptativa. Utilizando benchmarks internacionales (TIMSS/PISA), diagnostica el nivel inicial del estudiante y genera sets semanales de ejercicios que se ajustan dinámicamente.

### MVP - Fase 1 (0-6 meses)

- ✅ Diagnóstico lúdico inicial 
- ✅ Motor adaptativo de dificultad (percentiles internacionales)
- ✅ Set semanal de ejercicios JSON
- ✅ Panel familiar (vista de progreso)
- ✅ Actividades offline sugeridas

### Indicadores Clave
- **Dominio**: ≥ 1 nivel por trimestre
- **Engagement**: ≥ 70%
- **Tiempo medio**: ≥ 25 min/día
- **NPS**: ≥ 8

## 🏗 Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Frontend     │    │     Backend     │    │    Database     │
│   React + TS    │◄──►│  NestJS + GQL   │◄──►│  PostgreSQL     │
│   Material-UI   │    │  Apollo Server  │    │  + Redis        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   Docker        │◄─────────────┘
                        │   Compose       │
                        └─────────────────┘
```

## 🛠 Tecnologías

### Backend
- **NestJS** - Framework Node.js escalable
- **GraphQL** - API flexible con Apollo Server
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional
- **Redis** - Cache y sesiones
- **JWT** - Autenticación segura
- **bcrypt** - Hashing de contraseñas

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Material-UI v5** - Componentes de diseño
- **Apollo Client** - Cliente GraphQL
- **Zustand** - Estado global
- **React Router** - Navegación SPA
- **Vite** - Build tool rápido

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación local
- **AWS Fargate** - Despliegue en producción

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- Docker y Docker Compose
- Git

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd mathadapt-mvp
```

### 2. Configurar Variables de Entorno

```bash
# Backend
cp packages/backend/.env.example packages/backend/.env

# Frontend  
cp packages/frontend/.env.example packages/frontend/.env
```

### 3. Instalar Dependencias

```bash
# Instalar dependencias raíz
npm install

# Instalar dependencias backend
cd packages/backend && npm install

# Instalar dependencias frontend  
cd packages/frontend && npm install
```

### 4. Iniciar con Docker (Recomendado)

```bash
# Iniciar todos los servicios
npm run docker:up

# Aplicar migraciones de base de datos
npm run db:migrate

# Sembrar datos iniciales
npm run db:seed
```

### 5. Desarrollo Local (Sin Docker)

```bash
# Terminal 1: Servicios de base de datos
docker-compose up postgres redis

# Terminal 2: Backend
npm run dev:backend

# Terminal 3: Frontend
npm run dev:frontend
```

## 🔧 Desarrollo

### Comandos Útiles

```bash
# Desarrollo completo
npm run dev

# Solo backend
npm run dev:backend

# Solo frontend
npm run dev:frontend

# Build de producción
npm run build

# Ejecutar tests
npm run test

# Linting
npm run lint

# Base de datos
npm run db:migrate    # Aplicar migraciones
npm run db:seed      # Sembrar datos
npm run docker:up    # Iniciar servicios
npm run docker:down  # Detener servicios
```

### Estructura del Proyecto

```
mathadapt-mvp/
├── packages/
│   ├── backend/                 # API NestJS
│   │   ├── src/
│   │   │   ├── entities/       # Entidades TypeORM
│   │   │   ├── modules/        # Módulos de negocio
│   │   │   │   ├── auth/       # Autenticación
│   │   │   │   ├── students/   # Gestión estudiantes
│   │   │   │   ├── exercises/  # Ejercicios
│   │   │   │   ├── adaptive/   # Algoritmo IRT
│   │   │   │   └── analytics/  # Analíticas
│   │   │   ├── common/         # Utilidades comunes
│   │   │   └── database/       # Migraciones y seeds
│   │   └── Dockerfile
│   └── frontend/               # App React
│       ├── src/
│       │   ├── components/     # Componentes React
│       │   ├── pages/          # Páginas/Rutas
│       │   ├── store/          # Estado Zustand
│       │   ├── types/          # Tipos TypeScript
│       │   └── utils/          # Utilidades
│       └── Dockerfile
├── docker-compose.yml          # Orquestación local
└── README.md
```

## 📊 API GraphQL

### Endpoints Principales

```graphql
# Autenticación
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    user { id email firstName }
    token
  }
}

mutation Login($input: LoginInput!) {
  login(input: $input) {
    user { id email firstName }
    token
  }
}

# Estudiantes
query MyStudents {
  myStudents {
    id name currentTheta targetPercentile
    totalExercisesCompleted averageAccuracy
  }
}

# Ejercicios Adaptativos
query ExerciseSet($studentId: ID!) {
  currentExerciseSet(studentId: $studentId) {
    id exercises {
      id statement type difficulty
      hints solution
    }
  }
}
```

### Playground GraphQL

Una vez iniciado el backend, visita: `http://localhost:3001/graphql`

## 🗄 Base de Datos

### Esquema Principal

- **users** - Cuentas familiares
- **families** - Información de suscripción  
- **students** - Perfiles de estudiantes
- **exercises** - Banco de ítems matemáticos
- **exercise_sets** - Sets semanales personalizados
- **responses** - Respuestas de estudiantes
- **progress** - Tracking de progreso

### Algoritmo IRT Adaptativo

```typescript
// Selección de próximo ejercicio
function selectNextExercise(studentTheta, targetPercentile) {
  const targetDifficulty = percentileTodifficulty(targetPercentile);
  const optimalDifficulty = studentTheta + difficultyAdjustment;
  
  return findExerciseWithMaxInformation(optimalDifficulty);
}

// Actualización de habilidad
function updateTheta(currentTheta, isCorrect, difficulty) {
  const expected = probability(currentTheta, difficulty);
  const adjustment = learningRate * (isCorrect ? 1 - expected : -expected);
  return currentTheta + adjustment;
}
```

## 🚢 Despliegue

### Desarrollo

```bash
npm run docker:up
```

### Producción

```bash
# Build de imágenes
docker build -t mathadapt/backend ./packages/backend
docker build -t mathadapt/frontend ./packages/frontend

# Despliegue en AWS Fargate
# Ver documentación específica de infraestructura
```

### Variables de Entorno Producción

```bash
# Backend
DATABASE_URL=postgresql://user:pass@prod-db:5432/mathadapt
JWT_SECRET=super_secure_jwt_secret_production
OPENAI_API_KEY=sk-real-openai-key

# Frontend  
VITE_API_URL=https://api.mathadapt.com/graphql
```

## 📈 Monitoreo

### Métricas Clave

- **Engagement diario**: Tiempo en plataforma por estudiante
- **Progreso IRT**: Evolución del parámetro θ (theta) 
- **Percentiles internacionales**: Comparación TIMSS/PISA
- **Accuracy por dominio**: Aritmética, geometría, etc.
- **Retención**: Uso semanal sostenido

### Logs y Analíticas

```bash
# Logs de desarrollo
docker-compose logs -f backend
docker-compose logs -f frontend

# Métricas de producción
# Integración con CloudWatch/DataDog próximamente
```

## 🧪 Testing

```bash
# Backend
cd packages/backend
npm run test              # Unit tests
npm run test:e2e         # Integration tests

# Frontend
cd packages/frontend  
npm run test             # Component tests
npm run test:ui          # UI tests
```

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/amazing-feature`
3. Commit cambios: `git commit -m 'Add amazing feature'`
4. Push a la rama: `git push origin feature/amazing-feature`
5. Abrir Pull Request

### Convenciones

- **Commits**: Conventional Commits format
- **Branches**: `feature/`, `fix/`, `docs/`, `refactor/`
- **TypeScript**: Strict mode habilitado
- **Testing**: Cobertura mínima 80%

## 📞 Soporte

- **Email**: dev@mathadapt.com  
- **Issues**: [GitHub Issues](./issues)
- **Docs**: [Wiki del Proyecto](./wiki)

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

---

**Desarrollado con ❤️ por el equipo MathAdapt**

*Revolucionando el aprendizaje matemático infantil con IA adaptativa y benchmarks internacionales.*