import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get user profile by Firebase UID
   * Creates user if doesn't exist
   */
  async getUserProfile(firebaseUid: string) {
    let user = await this.prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      throw new NotFoundException(`User with Firebase UID ${firebaseUid} not found`);
    }

    return {
      id: user.id,
      firebaseUid: user.firebaseUid,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatar: user.avatar,
      bio: user.bio,
      city: user.city,
      country: user.country,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Create new user (called after Firebase sign-up)
   * This should be called from mobile app with user data
   */
  async createUser(firebaseUid: string, email: string, name: string, phone?: string) {
    const user = await this.prisma.user.create({
      data: {
        firebaseUid,
        email,
        name,
        phone,
      },
    });

    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(
    firebaseUid: string,
    data: {
      name?: string;
      phone?: string;
      avatar?: string;
      bio?: string;
      city?: string;
      country?: string;
    },
  ) {
    const user = await this.prisma.user.update({
      where: { firebaseUid },
      data,
    });

    return user;
  }
}
