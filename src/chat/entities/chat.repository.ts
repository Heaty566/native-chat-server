import { EntityRepository, Repository } from 'typeorm';
import { Chat } from './chat.entity';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
    public async findOneByField(field: keyof Chat, value: any): Promise<Chat> {
        const result = await this.createQueryBuilder().where(`"${field}" = :value`, { value }).getOne();
        return result;
    }

    public async findManyByField(field: keyof Chat, value: any): Promise<Array<Chat>> {
        const result = await this.createQueryBuilder().where(`"${field}" = :value`, { value }).getMany();
        return result;
    }
    public async findManyChatByCurrentUser(userId: string): Promise<Array<Chat>> {
        const result = await this.createQueryBuilder()
            .where(`"id" like  :id`, { id: `%${userId}%` })
            .getMany();
        return result;
    }
}
