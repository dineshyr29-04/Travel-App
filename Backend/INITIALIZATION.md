# TravelSathi Backend - Complete Initialization Guide

## ⚡ FASTEST PATH TO WORKING BACKEND (15 minutes)

### Step 1: Enter Backend Directory
```bash
cd Backend
```

### Step 2: Install All Dependencies
```bash
npm install
```
**Wait time:** 2-3 minutes depending on internet speed

### Step 3: Setup Environment Variables
```bash
# Copy template
cp .env.example .env

# Edit .env in VS Code and fill in:
# - DATABASE_URL from Supabase
# - Firebase credentials from Firebase Console
# - AI_SERVICE_URL (can leave as localhost for now)
```

**⚠️ IMPORTANT:** Get these from:
- **Supabase:** Project Settings → Database → Connection String
- **Firebase:** Project Settings → Service Accounts → Generate Private Key

### Step 4: Initialize Database
```bash
# Generate Prisma types
npm run prisma:generate

# Create tables in Supabase
npm run prisma:migrate
```

When prompted:
```
✔ Name of migration … initial
```

### Step 5: Start Development Server
```bash
npm run start:dev
```

**Success when you see:**
```
✅ TravelSathi Backend running on http://localhost:3001
```

### Step 6: Test Backend
```bash
# In another terminal
curl http://localhost:3001/trips
```

**Expected response:**
```json
{
  "success": true,
  "data": [],
  "timestamp": "2025-04-03T12:00:00.000Z"
}
```

---

## 🔑 ENVIRONMENT VARIABLES EXPLAINED

### Database
```env
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
# Get from Supabase → Settings → Database → URI
# Replace password and database name
```

### Firebase Admin SDK
```env
FIREBASE_PROJECT_ID=my-project-abc123
# Found in Firebase Console → Settings → General

FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc@my-project.iam.gserviceaccount.com
# From Service Accounts → Private Key JSON

FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
# ⚠️ IMPORTANT: Must be single line with \n for newlines
# Not actual line breaks!
```

### Application
```env
NODE_ENV=development
PORT=3001
```

### AI Service (For Phase 1)
```env
AI_SERVICE_URL=http://localhost:5000
# Can run AI service locally or remote
AI_SERVICE_KEY=your-api-key
```

### CORS
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:19000
# Allowed origins for mobile app and web dashboard
```

---

## 📦 WHAT GETS CREATED

After running `npm run prisma:migrate`, your database has:

### Users Table
```
id (unique identifier)
firebaseUid (from Firebase Auth)
email
name
phone (optional)
avatar (optional)
bio (optional)
city (optional)
country (optional)
createdAt, updatedAt
```

### Trips Table
```
id
title
description
imageUrl (optional)
startDate
endDate
budget (optional)
city
country
activities (array)
status (draft/published/archived)
authorId (references Users.id)
createdAt, updatedAt
```

### Localites Table
```
id
city
country
expertise (array: ["hiking", "food", etc])
bio
languages (array)
rating
reviews (count)
verificationStatus (pending/verified)
userId (references Users.id)
createdAt, updatedAt
```

---

## 🔌 HOW TO CONNECT MOBILE APP

### From React Native Mobile App:

```typescript
import auth from '@react-native-firebase/auth';
import axios from 'axios';

// 1. Get Firebase JWT
const user = auth().currentUser;
const token = await user.getIdToken();

// 2. Create API client
const api = axios.create({
  baseURL: 'http://YOUR_BACKEND_URL:3001',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// 3. Call API
const response = await api.post('/trips', {
  title: 'Paris Trip',
  city: 'Paris',
  country: 'France',
  startDate: '2025-06-01',
  endDate: '2025-06-07'
});
```

---

## 🧪 MANUAL TESTING WITH CURL

### No Authentication Needed
```bash
# Get all trips
curl http://localhost:3001/trips

# Get specific trip
curl http://localhost:3001/trips/trip-123

# Search localites
curl "http://localhost:3001/localites/search?city=Paris&country=France"

# Check AI health
curl http://localhost:3001/ai/health
```

### Authentication Required (with Token)
Replace `YOUR_JWT` with actual Firebase JWT:
```bash
# Get user profile
curl http://localhost:3001/auth/me \
  -H "Authorization: Bearer YOUR_JWT"

# Create trip
curl -X POST http://localhost:3001/trips \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beach Vacation",
    "description": "Relaxing beach trip",
    "startDate": "2025-06-01",
    "endDate": "2025-06-07",
    "city": "Bali",
    "country": "Indonesia",
    "budget": 3000,
    "activities": ["beach", "diving"]
  }'
```

---

## 🛠️ COMMON POST-SETUP TASKS

### View Database Visually
```bash
npm run prisma:studio
# Opens http://localhost:5555
```

### Add a New Module
1. Create folder: `mkdir src/modules/reviews`
2. Create files:
   - `reviews.controller.ts`
   - `reviews.service.ts`
   - `reviews.dto.ts`
   - `reviews.module.ts`
3. Add model to `prisma/schema.prisma`
4. Run migration: `npm run prisma:migrate`
5. Import in `app.module.ts`

### Make Code Changes
```bash
# Server auto-reloads with start:dev
npm run start:dev

# After making changes, just save - server updates automatically
```

### Check Code Quality
```bash
# Lint check
npm run lint

# Fix lint issues
npm run lint

# Format code
npm run format
```

---

## ⚠️ GOTCHAS & SOLUTIONS

### Gotcha 1: Firebase Private Key Format
**Problem:** Firebase auth always fails
**Solution:** 
- FIREBASE_PRIVATE_KEY should be SINGLE LINE
- Use `\n` for newlines, NOT actual line breaks
- Correct: `"-----BEGIN...\nMIIEv...\n-----END..."`
- Wrong: `"-----BEGIN...` (then actual line break)

### Gotcha 2: CORS Errors from Mobile
**Problem:** Mobile app can't reach API
**Solution:**
- Add mobile app URL to CORS_ORIGIN in .env
- Format: `http://localhost:19000` (for Expo)
- Can be comma-separated list

### Gotcha 3: Database Connection Refused
**Problem:** Can't connect to PostgreSQL
**Solution:**
- Check DATABASE_URL format
- Verify Supabase project status
- Test with: `psql "your-database-url"`
- Check firewall/network access

### Gotcha 4: Prisma Client not Found
**Problem:** Prisma Client errors immediately
**Solution:**
```bash
npm run prisma:generate
rm -rf node_modules/.prisma
npm install
```

### Gotcha 5: Port Already in Use
**Problem:** `EADDRINUSE: address already in use`
**Solution:**
```bash
# Kill existing process
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run start:dev
```

---

## 📊 PERFORMANCE TIPS FOR MVP

### ✅ DO:
1. Start with basic queries
2. Add database indexes on `authorId`, `city`, `country`
3. Use Prisma's `select` to limit fields returned

### ❌ DON'T (Phase 1):
1. Don't add Redis/caching yet
2. Don't optimize queries prematurely
3. Don't add GraphQL
4. Don't implement pagination initially

---

## 🚀 CODE STRUCTURE EXAMPLE

When you create a feature, follow this pattern:

```typescript
// trips.dto.ts - Input validation
export class CreateTripDto {
  @IsString()
  title: string;
  
  @IsDateString()
  startDate: string;
}

// trips.service.ts - Business logic
@Injectable()
export class TripsService {
  async createTrip(userId: string, dto: CreateTripDto) {
    return this.prisma.trip.create({
      data: { ...dto, authorId: userId }
    });
  }
}

// trips.controller.ts - HTTP handlers
@Controller('trips')
export class TripsController {
  @Post()
  @UseGuards(FirebaseAuthGuard)
  async create(@Request() req, @Body() dto: CreateTripDto) {
    return this.tripsService.createTrip(req.user.uid, dto);
  }
}

// trips.module.ts - Module registration
@Module({
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
```

---

## 📝 NEXT STEPS AFTER SETUP

1. ✅ Backend running
2. ✅ Database created
3. ⏭️ Connect mobile app
4. ⏭️ Test all CRUD endpoints
5. ⏭️ Add real Firebase credentials
6. ⏭️ Deploy to staging server

---

## 🆘 STILL STUCK?

Check these in order:
1. Compare `.env` with `.env.example`
2. Check `npm run prisma:generate` output
3. Run `npm run prisma:migrate` again
4. Check terminal logs for error messages
5. See `SETUP.md` for detailed walkthrough
6. See `ARCHITECTURE.md` for how things work

---

Built with ❤️ for TravelSathi MVP
Estimated time to production: 60 days
