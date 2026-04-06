# TravelSathi Backend - Setup Guide (60-Day MVP)

## 🚀 QUICK START

### Prerequisites
- Node.js 18+ (preferably 20+)
- npm 9+ or yarn
- PostgreSQL (we'll use Supabase cloud)
- Firebase project account
- VS Code (optional)

---

## 📦 STEP 1: Install Dependencies

```bash
cd backend

# Install all dependencies
npm install

# Verify installation
npm --version
node --version
```

**Expected output:** Node v18+, npm v9+

---

## 🔐 STEP 2: Setup Environment Variables

Copy the example file and configure:

```bash
cp .env.example .env
```

**Edit `.env` with:**

```env
# Application
NODE_ENV=development
PORT=3001

# Database (from Supabase)
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/[database]?schema=public

# Firebase (from Firebase Console → Settings → Service Account)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# AI Service (for now, can be localhost)
AI_SERVICE_URL=http://localhost:5000
AI_SERVICE_KEY=your-api-key

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:19000
```

---

## 🗄️ STEP 3: Setup Database with Prisma

### 3a. Generate Prisma Client
```bash
npm run prisma:generate
```

### 3b. Create Database Migration
```bash
npm run prisma:migrate
```

Follow the prompt:
```
✔ Name of migration: › initial
```

This creates the following tables:
- `users`
- `trips`
- `localites`

### 3c. Optional: View Database in Prisma Studio
```bash
npm run prisma:studio
```

Opens `http://localhost:5555` to view/manage data visually.

---

## ✅ STEP 4: Start Development Server

```bash
npm run start:dev
```

**Expected output:**
```
✅ TravelSathi Backend running on http://localhost:3001
```

---

## 📡 STEP 5: Test Endpoints

### Health Check (No Auth)
```bash
curl http://localhost:3001/ai/health
```

### Create a Trip (Requires Firebase JWT)
First, get a Firebase token from your mobile app, then:

```bash
curl -X POST http://localhost:3001/trips \
  -H "Authorization: Bearer YOUR_FIREBASE_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Paris Adventure",
    "description": "5 day trip to Paris",
    "startDate": "2025-06-01",
    "endDate": "2025-06-05",
    "city": "Paris",
    "country": "France",
    "budget": 2000,
    "activities": ["museums", "food", "shopping"]
  }'
```

### Get All Trips (No Auth)
```bash
curl http://localhost:3001/trips
```

---

## 📚 API ENDPOINTS (COMPLETE LIST)

### Auth
- `GET /auth/me` - Get user profile ✅ (Protected)

### Trips
- `POST /trips` - Create trip ✅ (Protected)
- `GET /trips` - Get all trips ✅
- `GET /trips/:id` - Get trip by ID ✅
- `GET /trips/author/:authorId` - Get trips by author ✅
- `PUT /trips/:id` - Update trip ✅ (Protected)
- `DELETE /trips/:id` - Delete trip ✅ (Protected)

### Localites
- `POST /localites` - Submit localite profile ✅ (Protected)
- `GET /localites/search?city=xxx&country=xxx` - Search localites ✅
- `GET /localites/:id` - Get localite by ID ✅
- `GET /localites/user/:userId` - Get localite by user ID ✅
- `PUT /localites/me` - Update own profile ✅ (Protected)

### AI
- `POST /ai/chat` - Chat with AI ✅ (Protected)
- `GET /ai/health` - Check AI service health ✅

---

## 🧪 DEVELOPMENT COMMANDS

```bash
# Start development (watches for changes)
npm run start:dev

# Start production build
npm run build
npm run start:prod

# Linting
npm run lint

# Type checking
npm run type-check          # (or: npx tsc --noEmit)

# Formatting
npm run format

# Testing
npm test
npm run test:watch

# Database
npm run prisma:generate     # Generate Prisma client
npm run prisma:migrate      # Create migration
npm run prisma:studio       # Open GUI database viewer
```

---

## 🏗️ FOLDER STRUCTURE

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/                 # Authentication
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── trips/                # Trip management
│   │   │   ├── trips.controller.ts
│   │   │   ├── trips.service.ts
│   │   │   ├── trips.dto.ts
│   │   │   └── trips.module.ts
│   │   ├── localites/            # Localite profiles
│   │   │   ├── localites.controller.ts
│   │   │   ├── localites.service.ts
│   │   │   ├── localites.dto.ts
│   │   │   └── localites.module.ts
│   │   └── ai/                   # AI chat service
│   │       ├── ai.controller.ts
│   │       ├── ai.service.ts
│   │       ├── ai.dto.ts
│   │       └── ai.module.ts
│   ├── common/
│   │   ├── guards/
│   │   │   └── firebase-auth.guard.ts  # JWT validation
│   │   ├── interceptors/
│   │   │   └── response.interceptor.ts # Standardize responses
│   │   └── filters/
│   │       └── all-exceptions.filter.ts  # Global error handling
│   ├── config/
│   │   └── firebase.service.ts   # Firebase Admin init
│   ├── app.module.ts             # Root module
│   ├── main.ts                   # Entry point
│   └── prisma.service.ts         # Database service
├── prisma/
│   └── schema.prisma             # Database schema
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🔑 KEY CONCEPTS FOR MVP

### 1. **Modules**
Each feature is in its own module with:
- Controller (HTTP endpoints)
- Service (business logic)
- DTO (validation)
- Module file (imports/exports)

### 2. **Firebase JWT Authentication**
- Mobile app sends JWT in `Authorization: Bearer <token>` header
- `FirebaseAuthGuard` validates and extracts user ID
- Protected routes use `@UseGuards(FirebaseAuthGuard)`

### 3. **Database (Supabase + Prisma)**
Schema includes:
- **Users** - Firebase users + profile info
- **Trips** - Travel itineraries
- **Localites** - Local guides/experts

### 4. **Error Handling**
- Global `AllExceptionsFilter` catches all errors
- Standardized error response format
- Logging included

### 5. **Response Format**
All responses wrapped:
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-04-03T..."
}
```

---

## ⚠️ COMMON ISSUES & FIXES

### Issue: `DATABASE_URL` Error
```
Error: Can't reach database server
```
**Fix:** 
- Check DATABASE_URL format in .env
- Verify Supabase project is running
- Test connection: `psql <DATABASE_URL>`

### Issue: Firebase Auth Fails
```
Error: Token verification failed
```
**Fix:**
- Verify FIREBASE_PRIVATE_KEY format (single line with \n escapes)
- Check FIREBASE_PROJECT_ID matches your Firebase project
- Generate new key from Firebase Console

### Issue: Port 3001 Already in Use
```
Error: EADDRINUSE: address already in use
```
**Fix:**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
# Or use different port
PORT=3002 npm run start:dev
```

### Issue: Prisma Client Not Generated
```
Error: Can't find Prisma client
```
**Fix:**
```bash
npm run prisma:generate
```

---

## 📝 BEST PRACTICES (FOLLOW THESE!)

### ✅ DO:
1. Keep modules focused (one feature per module)
2. Validate all inputs with DTO classes
3. Handle errors gracefully
4. Use Prisma for ALL database operations
5. Add `@UseGuards(FirebaseAuthGuard)` to protected routes
6. Keep business logic in services, not controllers
7. Document complex functions

### ❌ DON'T:
1. Direct database queries without Prisma
2. Hardcode credentials in code
3. Skip input validation
4. Return raw database errors to client
5. Add microservices/Redis/Kubernetes for Phase 1
6. Over-engineer (KISS principle)

---

## 🚀 NEXT STEPS

1. ✅ Install dependencies
2. ✅ Setup .env
3. ✅ Create database
4. ✅ Start server
5. ⏭️ **Connect mobile app** to this API
6. ⏭️ Test endpoints with Postman/Insomnia
7. ⏭️ Add features iteratively

---

## 📞 SUPPORT

- **NestJS Docs:** https://docs.nestjs.com
- **Prisma Docs:** https://www.prisma.io/docs
- **Firebase Admin:** https://firebase.google.com/docs/admin
- **Supabase:** https://supabase.com/docs

---

## 📋 PRODUCTION DEPLOYMENT (Phase 2)

Later, follow these for deployment:
1. Build: `npm run build`
2. Set production `.env`
3. Run migrations: `npx prisma migrate deploy`
4. Start: `npm run start:prod`
5. Use process manager (PM2, systemd, Docker)

---

Built with ❤️ for TravelSathi MVP (60-day phase)
