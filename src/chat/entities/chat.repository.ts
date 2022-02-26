import { EntityRepository, Repository } from 'typeorm';
import { Chat } from './chat.entity';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
    public async findOneUserByField(field: keyof Chat, value: any): Promise<Chat> {
        const result = await this.createQueryBuilder()
            .where(`"${field as string}" = :value`, { value })
            .getOne();
        return result;
    }
}
