import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './entities/message.repository';
import { ChatRepository } from './entities/chat.repository';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MessageService } from './message.service';

@Module({
    imports: [TypeOrmModule.forFeature([MessageRepository, ChatRepository]), AuthModule, UserModule],
    providers: [ChatResolver, ChatService, MessageService],
})
export class ChatModule {}
