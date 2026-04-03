# TravelSathi Backend - Phase 1 MVP

## Backend Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/           # Firebase JWT verification
│   │   ├── trips/          # Trip CRUD operations
│   │   ├── localites/      # Localite profile management
│   │   └── ai/             # Simple AI chat endpoint
│   ├── common/
│   │   ├── guards/         # Authentication guards
│   │   ├── interceptors/   # Response/Error interceptors
│   │   └── filters/        # Exception filters
│   ├── config/             # Configuration services
│   └── app.module.ts       # Root module
├── prisma/
│   └── schema.prisma       # Database schema
├── package.json
├── tsconfig.json
├── .env.example
└── README.md (this file)
```

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Prisma
```bash
# Generate Prisma client
npm run prisma:generate

# Create database migration (first time)
npm run prisma:migrate

# Optional: Open Prisma Studio to view data
npm run prisma:studio
```

### 3. Setup .env
Copy .env.example to .env and fill in:
- `DATABASE_URL` - Your Supabase PostgreSQL URL
- Firebase credentials
- AI service URL (can be localhost for now)

### 4. Start Development Server
```bash
npm run start:dev
```

Server runs on http://localhost:3001

## API Endpoints (MVP Phase 1)

### Auth
- `GET /auth/me` - Get current user profile (requires Firebase JWT)

### Trips
- `POST /trips` - Create trip
- `GET /trips` - Get all trips (with filtering)
- `GET /trips/:id` - Get trip by ID
- `PUT /trips/:id` - Update trip
- `DELETE /trips/:id` - Delete trip

### Localites
- `POST /localites` - Submit localite profile
- `GET /localites?city=xxx&country=xxx` - Get localites by location

### AI
- `POST /ai/chat` - Send message to external AI service

## Architecture Overview

```
Mobile App (React Native)
    ↓
    └─→ NestJS API (3001)
            ├─→ Supabase PostgreSQL
            │
            └─→ External AI Service
```

### Key Points:
1. **Firebase JWT** - Mobile app sends JWT in Authorization header
2. **Prisma ORM** - All database operations go through Prisma
3. **Modular Structure** - Each feature in its own module
4. **Error Handling** - Global exception filter
5. **Response Interceptor** - Standardized API responses

## Development Flow

### Adding a New Feature

1. **Create Module** (e.g., reviews module):
   ```bash
   mkdir src/modules/reviews
   touch src/modules/reviews/{reviews.module.ts,reviews.controller.ts,reviews.service.ts}
   touch src/modules/reviews/{create-review.dto.ts,review.entity.ts}
   ```

2. **Add Prisma Model**:
   ```prisma
   model Review {
     id String @id @default(cuid())
     // ... fields
   }
   ```

3. **Generate Prisma Client**:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Implement Service** - Business logic
5. **Implement Controller** - HTTP endpoints
6. **Add DTOs** - Input validation
7. **Register in App Module** - Import module

## Best Practices (MVP Phase 1)

### ✅ DO:
- Keep modules lean and focused
- Validate all inputs with class-validator
- Handle errors consistently
- Use Prisma for all DB queries
- Add Firebase JWT to protected routes
- Keep business logic in services, not controllers

### ❌ DON'T:
- Add microservices yet
- Use Redis/caching
- Add complex middleware
- Implement RAG or LangChain
- Add WebSockets
- Over-engineer for scale

## Testing

```bash
# Run unit tests
npm test

# Watch mode
npm test:watch

# Coverage
npm test:cov
```

## Deployment (Future)

For Phase 1, just run on a simple Node.js server:
```bash
npm run build
npm run start:prod
```

Later phases can add Docker, Kubernetes, CI/CD pipelines.

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| NODE_ENV | App environment | development/production |
| PORT | Server port | 3001 |
| DATABASE_URL | Supabase connection | postgresql://... |
| FIREBASE_PROJECT_ID | Firebase project | my-project-123 |
| FIREBASE_CLIENT_EMAIL | Firebase service account | admin@project.iam.gserviceaccount.com |
| FIREBASE_PRIVATE_KEY | Firebase private key | -----BEGIN PRIVATE KEY----- |
| JWT_SECRET | Signing key (optional) | your-secret-key |
| AI_SERVICE_URL | External AI endpoint | http://localhost:5000 |
| AI_SERVICE_KEY | AI service API key | sk-xxxxx |
| CORS_ORIGIN | Allowed web origins | http://localhost:3000 |

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL format
- Ensure Supabase project is active
- Verify PostgreSQL credentials

### Firebase Auth Failing
- Check FIREBASE_PROJECT_ID format
- Validate private key format (should be \n escaped)
- Ensure Firebase Admin SDK is initialized

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

## Next Steps for Phase 2
- Email verification
- User profiles with avatars
- Trip recommendations
- Advanced AI features
- Payment integration
- Real-time notifications

---

Built with ❤️ for TravelSathi MVP
