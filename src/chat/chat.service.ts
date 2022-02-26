import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './entities/chat.repository';
import { MessageService } from './message.service';

@Injectable()
export class ChatService {
    constructor(private readonly chatRepository: ChatRepository, private readonly messageService: MessageService) {}

    async findOneByField(field: keyof Chat, value: any) {
        const chat = await this.chatRepository.findOneByField(field, value);
        chat.messages = await this.messageService.findManyByField('chatId', chat.id);
        return chat;
    }
    async findManyByField(field: keyof Chat, value: any) {
        const chats = await this.chatRepository.findManyByField(field, value);

        return await chats.map(async (item) => {
            const messages = await this.messageService.findManyByField('chatId', item.id);

            return {
                ...item,
                messages,
            };
        });
    }

    async findManyChatByCurrentUser(userId: string) {
        const chats = await this.chatRepository.findManyChatByCurrentUser(userId);
        return Promise.all(
            chats.map(async (item) => {
                const messages = await this.messageService.findManyByField('chatId', item.id);

                return {
                    ...item,
                    messages,
                };
            })
        );
    }

    async save(input: Chat): Promise<Chat> {
        return await this.chatRepository.save(input);
    }
}
