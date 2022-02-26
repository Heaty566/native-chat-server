import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './entities/message.repository';
import { ChatRepository } from './entities/chat.repository';

@Module({
    imports: [TypeOrmModule.forFeature([MessageRepository, ChatRepository])],
    providers: [ChatResolver, ChatService],
})
export class ChatModule {}
