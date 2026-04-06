import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { FirebaseService } from './config/firebase.service';
import { AuthModule } from './modules/auth/auth.module';
import { TripsModule } from './modules/trips/trips.module';
import { LocalitesModule } from './modules/localites/localites.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    TripsModule,
    LocalitesModule,
    AiModule,
  ],
  providers: [PrismaService, FirebaseService],
  exports: [PrismaService, FirebaseService],
})
export class AppModule {}
