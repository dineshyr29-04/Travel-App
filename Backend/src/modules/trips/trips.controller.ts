import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto, UpdateTripDto } from './trips.dto';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createTrip(@Request() req: any, @Body() createTripDto: CreateTripDto) {
    return this.tripsService.createTrip(req.user.uid, createTripDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTrips(
    @Query('city') city?: string,
    @Query('country') country?: string,
    @Query('status') status?: string,
  ) {
    return this.tripsService.getAllTrips({ city, country, status });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTripById(@Param('id') id: string) {
    return this.tripsService.getTripById(id);
  }

  @Get('author/:authorId')
  @HttpCode(HttpStatus.OK)
  async getTripsByAuthor(@Param('authorId') authorId: string) {
    return this.tripsService.getTripsByAuthor(authorId);
  }

  @Put(':id')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateTrip(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    return this.tripsService.updateTrip(id, req.user.uid, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteTrip(@Param('id') id: string, @Request() req: any) {
    return this.tripsService.deleteTrip(id, req.user.uid);
  }
}
