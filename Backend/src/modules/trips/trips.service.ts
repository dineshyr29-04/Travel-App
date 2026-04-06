import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTripDto, UpdateTripDto } from './trips.dto';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new trip
   */
  async createTrip(authorId: string, createTripDto: CreateTripDto) {
    const trip = await this.prisma.trip.create({
      data: {
        ...createTripDto,
        authorId,
      },
    });

    return trip;
  }

  /**
   * Get all trips with optional filtering
   */
  async getAllTrips(filters?: { city?: string; country?: string; status?: string }) {
    const trips = await this.prisma.trip.findMany({
      where: {
        ...(filters?.city && { city: filters.city }),
        ...(filters?.country && { country: filters.country }),
        ...(filters?.status && { status: filters.status }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return trips;
  }

  /**
   * Get trip by ID
   */
  async getTripById(tripId: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
          },
        },
      },
    });

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${tripId} not found`);
    }

    return trip;
  }

  /**
   * Get trips by author
   */
  async getTripsByAuthor(authorId: string) {
    const trips = await this.prisma.trip.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
    });

    return trips;
  }

  /**
   * Update trip (only by author)
   */
  async updateTrip(tripId: string, authorId: string, updateTripDto: UpdateTripDto) {
    const trip = await this.getTripById(tripId);

    if (trip.authorId !== authorId) {
      throw new ForbiddenException('You can only update your own trips');
    }

    const updatedTrip = await this.prisma.trip.update({
      where: { id: tripId },
      data: updateTripDto,
    });

    return updatedTrip;
  }

  /**
   * Delete trip (only by author)
   */
  async deleteTrip(tripId: string, authorId: string) {
    const trip = await this.getTripById(tripId);

    if (trip.authorId !== authorId) {
      throw new ForbiddenException('You can only delete your own trips');
    }

    await this.prisma.trip.delete({
      where: { id: tripId },
    });

    return { message: 'Trip deleted successfully' };
  }
}
