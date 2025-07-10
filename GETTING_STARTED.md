# 🚀 Getting Started - MathAdapt MVP

## Inicio Rápido (5 minutos)

### 1. Instalar Dependencias del Workspace

```bash
npm install
```

### 2. Instalar Dependencias de Cada Package

```bash
# Backend
cd packages/backend
npm install

# Frontend
cd packages/frontend  
npm install

# Volver a la raíz
cd ../..
```

### 3. Configurar Variables de Entorno

```bash
# Copiar archivos de ejemplo
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env
```

### 4. Ejecutar con Docker (Más Fácil)

```bash
# Iniciar todos los servicios
npm run docker:up

# Esperar a que PostgreSQL esté listo, luego aplicar migraciones
sleep 10
npm run db:migrate

# Sembrar datos de ejemplo
npm run db:seed
```

### 5. Acceder a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend GraphQL**: http://localhost:3001/graphql
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Desarrollo Local (Sin Docker)

Si prefieres ejecutar sin Docker:

```bash
# Terminal 1: Base de datos
docker-compose up postgres redis

# Terminal 2: Backend
cd packages/backend
npm run start:dev

# Terminal 3: Frontend
cd packages/frontend
npm run dev
```

## Verificar Instalación

1. Visita http://localhost:3000
2. Deberías ver la página de inicio de MathAdapt
3. Intenta registrarte como nuevo usuario
4. Ve al GraphQL Playground en http://localhost:3001/graphql

## Comandos Útiles

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver solo logs del backend
docker-compose logs -f backend

# Reiniciar un servicio específico
docker-compose restart backend

# Detener todos los servicios
npm run docker:down

# Eliminar volúmenes y empezar limpio
docker-compose down -v
npm run docker:up
```

## Solución de Problemas Comunes

### Puerto ya en uso
```bash
# Verificar qué está usando el puerto
lsof -i :3000
lsof -i :3001

# Cambiar puertos en docker-compose.yml si es necesario
```

### Error de base de datos
```bash
# Reiniciar PostgreSQL
docker-compose restart postgres

# Verificar que las migraciones se aplicaron
docker-compose exec postgres psql -U mathadapt -d mathadapt -c "\dt"
```

### Dependencias desactualizadas
```bash
# Reinstalar dependencias
rm -rf node_modules packages/*/node_modules
npm install
```

## Estructura de Datos de Ejemplo

Una vez que ejecutes `npm run db:seed`, tendrás:

- **Ejercicios de muestra**: Problemas matemáticos para grados 3-5
- **Usuarios de prueba**: Familias con estudiantes
- **Configuración IRT**: Parámetros del algoritmo adaptativo

## Próximos Pasos

1. **Registrarse**: Crear una cuenta familiar
2. **Añadir estudiante**: Crear perfil de niño
3. **Diagnóstico**: Completar evaluación inicial
4. **Ejercicios**: Probar el sistema adaptativo
5. **Dashboard**: Ver progreso y analíticas

## Contribuir

1. Crea una rama: `git checkout -b feature/mi-feature`
2. Haz tus cambios
3. Ejecuta tests: `npm test`
4. Commit: `git commit -m "feat: mi nueva característica"`
5. Push: `git push origin feature/mi-feature`
6. Abre un Pull Request

---

**¿Problemas?** Abre un issue en GitHub o contacta al equipo de desarrollo.