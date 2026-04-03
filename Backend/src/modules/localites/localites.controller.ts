import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LocalitesService } from './localites.service';
import { CreateLocaliteDto, UpdateLocaliteDto } from './localites.dto';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';

@Controller('localites')
export class LocalitesController {
  constructor(private localitesService: LocalitesService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async submitProfile(@Request() req: any, @Body() createLocaliteDto: CreateLocaliteDto) {
    return this.localitesService.submitProfile(req.user.uid, createLocaliteDto);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  async getLocalitesByLocation(@Query('city') city: string, @Query('country') country: string) {
    if (!city || !country) {
      return { message: 'City and country query parameters are required' };
    }
    return this.localitesService.getLocalitesByLocation(city, country);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getLocaliteById(@Param('id') id: string) {
    return this.localitesService.getLocaliteById(id);
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  async getLocaliteByUserId(@Param('userId') userId: string) {
    return this.localitesService.getLocaliteByUserId(userId);
  }

  @Put('me')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Request() req: any, @Body() updateLocaliteDto: UpdateLocaliteDto) {
    return this.localitesService.updateProfile(req.user.uid, updateLocaliteDto);
  }
}
