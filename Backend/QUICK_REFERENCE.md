# TravelSathi Backend - Quick Reference & Commands

## 📋 ONE-TIME SETUP (First Time)

```bash
# 1. Navigate to backend
cd Backend

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env

# 4. EDIT .env with your credentials:
#    - DATABASE_URL (from Supabase)
#    - FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
#    - AI_SERVICE_URL, AI_SERVICE_KEY

# 5. Generate Prisma client
npm run prisma:generate

# 6. Create database
npm run prisma:migrate

# 7. Start development server
npm run start:dev
```

**Expected output:**
```
✅ TravelSathi Backend running on http://localhost:3001
```

---

## 🚀 DAILY COMMANDS

```bash
# Start development (auto-reload)
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Format code
npm run format

# Check for lint errors
npm run lint

# Run tests
npm test

# Watch mode for tests
npm run test:watch

# View database
npm run prisma:studio
```

---

## 🔧 DATABASE COMMANDS

```bash
# Generate Prisma client (after schema changes)
npm run prisma:generate

# Create database migration
npm run prisma:migrate

# Reset database (⚠️ DELETES ALL DATA)
npx prisma migrate reset

# View database GUI
npm run prisma:studio
```

---

## 📡 API ENDPOINTS QUICK LOOKUP

### Trips
```
POST   /trips                     Create trip (Auth required)
GET    /trips                     Get all trips
GET    /trips/:id                 Get trip by ID
PUT    /trips/:id                 Update trip (Auth required, owner only)
DELETE /trips/:id                 Delete trip (Auth required, owner only)
```

### Localites
```
POST   /localites                 Submit profile (Auth required)
GET    /localites/search          Search by city/country
GET    /localites/:id             Get localite by ID
GET    /localites/user/:userId    Get user's localite profile
PUT    /localites/me              Update own profile (Auth required)
```

### Auth
```
GET    /auth/me                   Get user profile (Auth required)
```

### AI
```
POST   /ai/chat                   Send message to AI (Auth required)
GET    /ai/health                 Check AI service status
```

---

## 🧪 TESTING ENDPOINTS (curl examples)

### GET All Trips (No Auth)
```bash
curl http://localhost:3001/trips
```

### POST Create Trip (Auth Required)
```bash
curl -X POST http://localhost:3001/trips \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bali Adventure",
    "description": "5 day trip",
    "startDate": "2025-06-01",
    "endDate": "2025-06-05",
    "city": "Bali",
    "country": "Indonesia",
    "budget": 2000,
    "activities": ["hiking", "beach"]
  }'
```

### PUT Update Trip
```bash
curl -X PUT http://localhost:3001/trips/TRIP_ID \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### DELETE Trip
```bash
curl -X DELETE http://localhost:3001/trips/TRIP_ID \
  -H "Authorization: Bearer YOUR_JWT"
```

### POST Localite Profile
```bash
curl -X POST http://localhost:3001/localites \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Kathmandu",
    "country": "Nepal",
    "bio": "Local hiking expert",
    "expertise": ["trekking", "mountaineering"],
    "languages": ["Nepali", "English"]
  }'
```

### GET AI Health Check
```bash
curl http://localhost:3001/ai/health
```

---

## 🐛 TROUBLESHOOTING

### Problem: Port 3001 In Use
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run start:dev
```

### Problem: Database Connection Failed
```bash
# Check DATABASE_URL format
# Make sure Supabase project is active
# Test with psql: psql "your-database-url"
```

### Problem: Firebase Auth Error
```bash
# Check FIREBASE_PRIVATE_KEY format
# Should have \n as line breaks, not actual newlines
# Example: "-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
```

### Problem: Prisma Client Not Found
```bash
npm run prisma:generate
npm install
```

---

## 📁 FOLDER STRUCTURE

```
Backend/
├── src/
│   ├── modules/
│   │   ├── auth/              # Authentication
│   │   ├── trips/             # Trips feature
│   │   ├── localites/         # Localites feature
│   │   └── ai/                # AI chat
│   ├── common/
│   │   ├── guards/            # Auth guards
│   │   ├── interceptors/      # Response formatting
│   │   └── filters/           # Error handling
│   ├── config/                # Configuration
│   ├── app.module.ts          # Root module
│   ├── main.ts                # Entry point
│   └── prisma.service.ts      # Database
├── prisma/
│   └── schema.prisma          # Database schema
├── package.json
├── .env                       # (Create from .env.example)
├── .env.example               # Template
├── SETUP.md                   # Detailed setup guide
├── ARCHITECTURE.md            # Architecture docs
└── README.md                  # Overview
```

---

## ✅ CHECKLIST FOR DEVELOPMENT

- [ ] `.env` file created and configured
- [ ] `npm install` completed
- [ ] `npm run prisma:generate` ran successfully
- [ ] `npm run prisma:migrate` completed
- [ ] `npm run start:dev` starts without errors
- [ ] Can call `GET /trips` in browser/curl
- [ ] Firebase JWT validation works
- [ ] Can create trip with auth token

---

## 🚀 DEPLOYMENT CHECKLIST (Later)

- [ ] Build: `npm run build`
- [ ] Set production `.env`
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Start: `npm run start:prod`
- [ ] Test all endpoints
- [ ] Monitor logs
- [ ] Setup backup strategy

---

## 📞 QUICK LINKS

- **NestJS Docs:** https://docs.nestjs.com
- **Prisma Docs:** https://www.prisma.io/docs
- **Supabase:** https://supabase.com/docs
- **Firebase Admin:** https://firebase.google.com/docs/admin
- **TypeScript:** https://www.typescriptlang.org/docs

---

For detailed guide, see **SETUP.md**
For architecture details, see **ARCHITECTURE.md**
