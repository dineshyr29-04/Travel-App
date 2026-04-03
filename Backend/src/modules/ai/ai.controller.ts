import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatMessageDto } from './ai.dto';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('chat')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.OK)
  async chat(@Body() chatMessage: ChatMessageDto) {
    return this.aiService.chat(chatMessage);
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  async healthCheck() {
    return this.aiService.healthCheck();
  }
}
