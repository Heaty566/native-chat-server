import { EntityRepository, Repository } from 'typeorm';
import { Message } from './message.entity';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    public async findOneByField(field: keyof Message, value: any): Promise<Message> {
        const result = await this.createQueryBuilder()
            .where(`"${field as string}" = :value`, { value })
            .getOne();
        return result;
    }

    public async findManyByField(field: keyof Message, value: any): Promise<Array<Message>> {
        const result = await this.createQueryBuilder()
            .where(`"${field as string}" = :value`, { value })
            .getMany();
        return result;
    }
}
