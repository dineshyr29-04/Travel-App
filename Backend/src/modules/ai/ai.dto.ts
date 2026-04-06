import { IsString, IsOptional } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  context?: string; // Optional context for AI (e.g., trip details, location)
}
