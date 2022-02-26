import { Injectable } from '@nestjs/common';

import { Message } from './entities/message.entity';
import { MessageRepository } from './entities/message.repository';

@Injectable()
export class MessageService {
    constructor(private messageRepository: MessageRepository) {}
    async findManyByField(field: keyof Message, value: any) {
        return await this.messageRepository.findManyByField(field, value);
    }
    async save(input: Message): Promise<Message> {
        return await this.messageRepository.save(input);
    }
}
