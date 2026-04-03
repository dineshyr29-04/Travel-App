# Architecture & Best Practices - TravelSathi Backend MVP

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    MOBILE APP (React Native)                │
│              (sends Firebase JWT in headers)                │
└────────────┬────────────────────────────────────────────────┘
             │
             │ HTTP Request
             │ Authorization: Bearer <Firebase JWT>
             │
┌────────────▼────────────────────────────────────────────────┐
│                  NESTJS API (3001)                          │
├─────────────────────────────────────────────────────────────┤
│  ▪ Controllers (HTTP endpoints)                            │
│  ▪ Guards (FirebaseAuthGuard validates JWT)               │
│  ▪ Services (Business logic)                              │
│  ▪ DTOs (Input validation with class-validator)           │
│  ▪ Interceptors (Standardize response format)             │
│  ▪ Filters (Global error handling)                        │
└────────────┬────────────────────────────────────────────────┘
             │
    ┌────────┴────────┬──────────────────┐
    │                 │                  │
    ▼                 ▼                  ▼
┌─────────┐    ┌─────────────┐    ┌────────────┐
│Supabase │    │Firebase Auth│    │ External   │
│PostgreSQL     │              │    │ AI Service │
│(Prisma)      │              │    │            │
└─────────┘    └─────────────┘    └────────────┘
```

---

## 🧩 Module Structure

Each module is self-contained with **4 core files**:

### 1. **Controller** (.controller.ts)
- HTTP endpoint definitions
- Route handlers
- Input validation (DTOs)
- Authorization guards

```typescript
@Controller('trips')
export class TripsController {
  @Post()
  @UseGuards(FirebaseAuthGuard)
  async createTrip(@Request() req, @Body() dto: CreateTripDto) {
    return this.tripsService.createTrip(req.user.uid, dto);
  }
}
```

### 2. **Service** (.service.ts)
- Business logic
- Database operations (via Prisma)
- Error handling
- NO HTTP-specific code here

```typescript
@Injectable()
export class TripsService {
  async createTrip(userId: string, dto: CreateTripDto) {
    return this.prisma.trip.create({
      data: { ...dto, authorId: userId }
    });
  }
}
```

### 3. **DTO** (.dto.ts)
- Input/Output validation
- Uses `class-validator` decorators
- Type safety

```typescript
export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  startDate: string;
}
```

### 4. **Module** (.module.ts)
- Declares controllers & providers
- Imports dependencies

```typescript
@Module({
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
```

---

## 🔐 Authentication Flow

### Step 1: Mobile App Gets Firebase JWT
```typescript
// Mobile app (React Native)
const user = await firebase.auth().signInWithEmailAndPassword(email, password);
const token = await user.user.getIdToken();
// token is now valid JWT
```

### Step 2: Mobile Sends JWT in Header
```typescript
// Mobile API call
const response = await fetch('http://localhost:3001/trips', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Step 3: Backend Validates JWT
```typescript
// FirebaseAuthGuard extracts and validates token
@UseGuards(FirebaseAuthGuard)
async createTrip(@Request() req) {
  // req.user = decoded Firebase JWT
  // req.user.uid = Firebase User ID
}
```

---

## 💾 Database Pattern (with Prisma)

### DO: Use Prisma for All Queries
```typescript
// ✅ GOOD - Using Prisma
const trips = await this.prisma.trip.findMany({
  where: { authorId },
});
```

### DON'T: Direct SQL or Raw Queries
```typescript
// ❌ BAD - Raw SQL (avoid in MVP)
const trips = await this.prisma.$queryRaw`SELECT * FROM trips`;
```

### Key Points:
- Prisma generates type-safe queries
- Automatic migrations
- ORM handles SQL injection prevention
- Query optimization

---

## 🛡️ Error Handling

### Global Exception Filter
All errors are caught by `AllExceptionsFilter`:

```typescript
// Any thrown error is caught globally
throw new BadRequestException('Invalid input');
throw new UnauthorizedException('Token invalid');
throw new ForbiddenException('No permission');
throw new NotFoundException('Not found');
```

Response format:
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Invalid input",
  "error": "BadRequestException",
  "timestamp": "2025-04-03T...",
  "path": "/trips"
}
```

---

## ✅ Input Validation Pattern

```typescript
// Define DTO with validators
export class CreateTripDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsNumber()
  @Min(0)
  budget: number;

  @IsArray()
  @ArrayMinSize(1)
  activities: string[];
}

// Validation happens automatically in controller
@Post()
async create(@Body() dto: CreateTripDto) {
  // If DTO fails validation, ValidationPipe throws error
  // Controller only receives valid data
}
```

---

## 🎯 Request/Response Flow

### Successful Request
```
Request:
  GET /trips/123
  Headers: Authorization: Bearer <token>

↓ FirebaseAuthGuard ↓
  ✅ Token valid
  ✅ req.user = { uid: 'user123', email: '...' }

↓ Controller ↓
  ✅ Route found
  ✅ Call service

↓ Service ↓
  ✅ Query database
  ✅ Return data

↓ ResponseInterceptor ↓
  Wraps response in standard format

Response (200 OK):
{
  "success": true,
  "data": { id, title, ... },
  "timestamp": "2025-04-03T..."
}
```

### Failed Request
```
Request:
  POST /trips
  Headers: (missing Authorization header)

↓ FirebaseAuthGuard ↓
  ❌ No token found
  ❌ Throw UnauthorizedException

↓ AllExceptionsFilter ↓
  Catches exception
  Formats error response

Response (401 Unauthorized):
{
  "success": false,
  "statusCode": 401,
  "message": "Missing authorization token",
  "error": "UnauthorizedException",
  "timestamp": "2025-04-03T..."
}
```

---

## 📋 Adding a New Feature (Step-by-Step)

### Example: Add "Reviews" Feature

#### Step 1: Create Prisma Model
```prisma
// prisma/schema.prisma
model Review {
  id        String   @id @default(cuid())
  rating    Int      @db.SmallInt
  comment   String
  tripId    String
  userId    String
  createdAt DateTime @default(now())
  
  trip      Trip     @relation(fields: [tripId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  
  @@map("reviews")
}
```

#### Step 2: Create Migration
```bash
npm run prisma:migrate
# Follow prompts, name it "add_reviews"
```

#### Step 3: Create Module Files
```bash
mkdir src/modules/reviews
touch src/modules/reviews/{reviews.controller.ts,reviews.service.ts,reviews.dto.ts,reviews.module.ts}
```

#### Step 4: Create DTO
```typescript
// reviews.dto.ts
export class CreateReviewDto {
  @IsNumber()
  @Min(1) @Max(5)
  rating: number;

  @IsString()
  comment: string;

  @IsString()
  tripId: string;
}
```

#### Step 5: Create Service
```typescript
// reviews.service.ts
@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: string, dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: { ...dto, userId }
    });
  }
}
```

#### Step 6: Create Controller
```typescript
// reviews.controller.ts
@Controller('reviews')
export class ReviewsController {
  @Post()
  @UseGuards(FirebaseAuthGuard)
  async create(@Request() req, @Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(req.user.uid, dto);
  }
}
```

#### Step 7: Create Module
```typescript
// reviews.module.ts
@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
```

#### Step 8: Register Module
```typescript
// app.module.ts
@Module({
  imports: [
    // ... existing
    ReviewsModule  // <- Add this
  ]
})
export class AppModule {}
```

Done! New feature is ready.

---

## 🧪 Testing Endpoints (with curl/Postman)

### No Auth Required
```bash
# Get all trips
curl http://localhost:3001/trips

# Get specific trip
curl http://localhost:3001/trips/trip-id-123
```

### Auth Required (with Bearer Token)
```bash
# Create trip
curl -X POST http://localhost:3001/trips \
  -H "Authorization: Bearer YOUR_FIREBASE_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beach Trip",
    "description": "Relaxing beach vacation",
    "startDate": "2025-06-01",
    "endDate": "2025-06-07",
    "city": "Bali",
    "country": "Indonesia",
    "budget": 1500
  }'

# Update trip
curl -X PUT http://localhost:3001/trips/trip-id-123 \
  -H "Authorization: Bearer YOUR_FIREBASE_JWT" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete trip
curl -X DELETE http://localhost:3001/trips/trip-id-123 \
  -H "Authorization: Bearer YOUR_FIREBASE_JWT"
```

---

## 🚀 Performance Tips (Phase 1)

### DO:
- Use database indexes on frequently queried fields
- Limit query results (`take`, `skip` for pagination)
- Only return needed fields (use `select`)

### DON'T (Yet):
- Add cache (Redis) - Phase 2
- Implement GraphQL - Phase 2
- Add message queues - Phase 2
- Optimize DB queries prematurely

---

## 📝 Code Style

### Formatting
All code is auto-formatted with Prettier:
```bash
npm run format
```

### Linting
Check code quality:
```bash
npm run lint
```

### Naming Conventions
- **Files:** kebab-case (my-file.ts)
- **Classes:** PascalCase (MyClass)
- **Functions/variables:** camelCase (myVariable)
- **Constants:** UPPER_SNAKE_CASE (MAX_LIMIT)
- **Modules:** feature-based (trips, auth, etc.)

---

## ⚡ Common Patterns

### Pattern 1: Authorization (Only Own Resources)
```typescript
async updateTrip(tripId: string, userId: string, dto: UpdateTripDto) {
  const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
  
  if (trip.authorId !== userId) {
    throw new ForbiddenException('Cannot modify other users trips');
  }
  
  return this.prisma.trip.update({ where: { id: tripId }, data: dto });
}
```

### Pattern 2: Filtering by Location
```typescript
async getLocalitesByLocation(city: string, country: string) {
  return this.prisma.localite.findMany({
    where: { city, country, verificationStatus: 'verified' },
    orderBy: { rating: 'desc' },
  });
}
```

### Pattern 3: Pagination
```typescript
async getAllTrips(skip: number = 0, take: number = 10) {
  return this.prisma.trip.findMany({
    skip,
    take,
    orderBy: { createdAt: 'desc' },
  });
}
```

---

## 🎓 Learning Resources

- **NestJS Fundamentals:** https://docs.nestjs.com/first-steps
- **Prisma ORM:** https://www.prisma.io/docs/getting-started
- **Firebase Admin SDK:** https://firebase.google.com/docs/admin/start
- **TypeScript for Backend:** https://www.typescriptlang.org/docs

---

Built with ❤️ for TravelSathi MVP
