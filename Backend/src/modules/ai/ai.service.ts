import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ChatMessageDto } from './ai.dto';

@Injectable()
export class AiService {
  private aiClient: AxiosInstance;

  constructor(private configService: ConfigService) {
    const aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL');
    const aiServiceKey = this.configService.get<string>('AI_SERVICE_KEY');

    if (!aiServiceUrl) {
      throw new Error('AI_SERVICE_URL is not configured');
    }

    this.aiClient = axios.create({
      baseURL: aiServiceUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': aiServiceKey || '',
      },
      timeout: 30000,
    });
  }

  /**
   * Send chat message to external AI service
   * Phase 1: Simple chatbot, no RAG/LangChain
   */
  async chat(chatMessage: ChatMessageDto) {
    try {
      if (!chatMessage.message || chatMessage.message.trim().length === 0) {
        throw new BadRequestException('Message cannot be empty');
      }

      // Call external AI service
      const response = await this.aiClient.post('/chat', {
        message: chatMessage.message,
        context: chatMessage.context || '',
      });

      return {
        userMessage: chatMessage.message,
        aiResponse: response.data.response || response.data,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Handle AI service errors
      if (axios.isAxiosError(error)) {
        throw new BadRequestException(
          `AI Service Error: ${error.message}. Make sure AI service is running on ${this.configService.get('AI_SERVICE_URL')}`,
        );
      }

      throw new BadRequestException(`Failed to get AI response: ${error.message}`);
    }
  }

  /**
   * Health check for AI service
   */
  async healthCheck() {
    try {
      const response = await this.aiClient.get('/health');
      return {
        status: 'AI Service is healthy',
        data: response.data,
      };
    } catch (error) {
      return {
        status: 'AI Service is unavailable',
        error: error.message,
      };
    }
  }
}
