# TravelSathi Backend - Exact Commands to Run

Copy and paste these commands in order to get your backend running.

---

## 🚀 STEP 1: Navigate & Install (5 mins)

```bash
cd Backend
```

Copy the template and configure environment:
```bash
cp .env.example .env
```

Install dependencies:
```bash
npm install
```

**Expected:** Installs 50+ packages, takes 2-3 minutes.

---

## 🔐 STEP 2: Edit .env File

Open `.env` in VS Code and fill in these values:

```env
# Get from Supabase → Settings → Database → Connection String
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.supabase.co:5432/postgres?schema=public

# Get from Firebase Console → Settings → Service Accounts → Generate New Private Key
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[YOUR_LONG_KEY_HERE]\n-----END PRIVATE KEY-----\n"
```

**⚠️ IMPORTANT:** For FIREBASE_PRIVATE_KEY:
- Copy the entire JSON file from Firebase
- Extract the `private_key` field
- Make sure it's on ONE LINE
- Replace actual newlines with `\n`

---

## 📦 STEP 3: Generate Prisma Client

```bash
npm run prisma:generate
```

**Expected output:**
```
✅ Generated Prisma Client successfully
```

---

## 🗄️ STEP 4: Create Database

```bash
npm run prisma:migrate
```

When prompted for migration name:
```
✔ Name of migration … initial
```

**Expected output:**
```
✅ Created database migration

Your database now has 3 tables:
- users
- trips
- localites
```

---

## ✅ STEP 5: Start Development Server

```bash
npm run start:dev
```

**Expected output:**
```
✅ TravelSathi Backend running on http://localhost:3001
```

Leave terminal running. Backend is now live!

---

## 🧪 STEP 6: Test Endpoints (In Another Terminal)

### Test 1: Get All Trips (No Auth Needed)
```bash
curl http://localhost:3001/trips
```

**Expected Response:**
```json
{
  "success": true,
  "data": [],
  "timestamp": "2025-04-03T14:32:10.123Z"
}
```

### Test 2: Check AI Health
```bash
curl http://localhost:3001/ai/health
```

---

## 📊 OPTIONAL: View Database

In a new terminal:
```bash
npm run prisma:studio
```

Opens http://localhost:5555 in browser where you can view/edit all data.

---

## 🎉 SUCCESS CHECKLIST

- ✅ Backend running on http://localhost:3001
- ✅ `npm run start:dev` shows no errors
- ✅ `curl http://localhost:3001/trips` returns `success: true`
- ✅ Database tables created (check with `npm run prisma:studio`)
- ✅ `.env` has all required values

---

## 📚 NEXT: CONNECTING MOBILE APP

### From React Native App:

```typescript
import auth from '@react-native-firebase/auth';
import axios from 'axios';

// 1. Get user and token
const user = auth().currentUser;
const token = await user.getIdToken();

// 2. Create API instance
const api = axios.create({
  baseURL: 'http://YOUR_COMPUTER_IP:3001',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

// 3. Create trip
const response = await api.post('/trips', {
  title: 'Paris Trip',
  description: '5 days in Paris',
  startDate: '2025-06-01',
  endDate: '2025-06-05',
  city: 'Paris',
  country: 'France',
  budget: 2000,
  activities: ['museums', 'food', 'shopping']
});

console.log(response.data);
```

Replace `http://YOUR_COMPUTER_IP:3001` with your actual computer IP.

---

## 🚨 QUICK TROUBLESHOOTING

### Error: `Can't reach database server`
```bash
# Check DATABASE_URL
# Make sure Supabase project is active
# Test with: psql "your-database-url"
```

### Error: `Firebase error`
```bash
# Verify FIREBASE_PRIVATE_KEY format
# Should be: "-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
# Check project ID matches Firebase Console
```

### Error: `Port 3001 already in use`
```bash
# Use different port
PORT=3002 npm run start:dev
```

### Error: `Prisma client not found`
```bash
npm run prisma:generate
npm install
```

---

## 📋 DAILY DEVELOPMENT COMMANDS

```bash
# Start development (auto-reload)
npm run start:dev

# Kill the server
# (Press Ctrl+C in terminal)

# Format code
npm run format

# Check for errors
npm run lint

# Run tests
npm test

# View database
npm run prisma:studio

# After schema changes
npm run prisma:generate
npm run prisma:migrate
```

---

## 📝 ALL API ENDPOINTS

### Trips
```
POST   /trips                    Create (Auth required)
GET    /trips                    Get all
GET    /trips/:id                Get one
PUT    /trips/:id                Update (Auth required, owner only)
DELETE /trips/:id                Delete (Auth required, owner only)
```

### Localites
```
POST   /localites                Submit profile (Auth required)
GET    /localites/search         Search by city/country
GET    /localites/:id            Get by ID
PUT    /localites/me             Update own (Auth required)
```

### Auth
```
GET    /auth/me                  Get profile (Auth required)
```

### AI
```
POST   /ai/chat                  Chat (Auth required)
GET    /ai/health                Health check
```

---

## 🎯 DONE!

Your backend is now:
- ✅ Running on http://localhost:3001
- ✅ Connected to Supabase
- ✅ Ready for mobile app
- ✅ Ready for API testing

Next steps:
1. Connect mobile app
2. Test all endpoints
3. Add custom features
4. Deploy to production

---

For detailed guides, see:
- [INITIALIZATION.md](./INITIALIZATION.md) - Full setup walkthrough
- [SETUP.md](./SETUP.md) - Detailed explanations
- [ARCHITECTURE.md](./ARCHITECTURE.md) - How things work
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Daily commands
