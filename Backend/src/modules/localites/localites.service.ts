import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateLocaliteDto, UpdateLocaliteDto } from './localites.dto';

@Injectable()
export class LocalitesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Submit localite profile (one per user)
   */
  async submitProfile(userId: string, createLocaliteDto: CreateLocaliteDto) {
    // Check if user already has a localite profile
    const existingProfile = await this.prisma.localite.findFirst({
      where: { userId },
    });

    if (existingProfile) {
      throw new ConflictException('User already has a localite profile');
    }

    const localite = await this.prisma.localite.create({
      data: {
        ...createLocaliteDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
          },
        },
      },
    });

    return localite;
  }

  /**
   * Get localites by city and country
   */
  async getLocalitesByLocation(city: string, country: string) {
    const localites = await this.prisma.localite.findMany({
      where: {
        city,
        country,
        verificationStatus: 'verified',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            phone: true,
          },
        },
      },
      orderBy: {
        rating: 'desc',
      },
    });

    return localites;
  }

  /**
   * Get localite by ID
   */
  async getLocaliteById(localiteId: string) {
    const localite = await this.prisma.localite.findUnique({
      where: { id: localiteId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
            phone: true,
            bio: true,
          },
        },
      },
    });

    if (!localite) {
      throw new NotFoundException(`Localite with ID ${localiteId} not found`);
    }

    return localite;
  }

  /**
   * Get localite profile by user ID
   */
  async getLocaliteByUserId(userId: string) {
    const localite = await this.prisma.localite.findFirst({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!localite) {
      throw new NotFoundException(`Localite profile for user ${userId} not found`);
    }

    return localite;
  }

  /**
   * Update localite profile (only by owner)
   */
  async updateProfile(userId: string, updateLocaliteDto: UpdateLocaliteDto) {
    const localite = await this.prisma.localite.findFirst({
      where: { userId },
    });

    if (!localite) {
      throw new NotFoundException(`Localite profile for user ${userId} not found`);
    }

    const updatedLocalite = await this.prisma.localite.update({
      where: { id: localite.id },
      data: updateLocaliteDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return updatedLocalite;
  }

  /**
   * Admin: Verify localite (set status to verified)
   */
  async verifyLocalite(localiteId: string) {
    const localite = await this.prisma.localite.update({
      where: { id: localiteId },
      data: { verificationStatus: 'verified' },
    });

    return localite;
  }

  /**
   * Get all localites (with optional filters - for admin)
   */
  async getAllLocalites(status?: string) {
    const localites = await this.prisma.localite.findMany({
      where: {
        ...(status && { verificationStatus: status }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return localites;
  }
}
