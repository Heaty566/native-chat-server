import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//---- Entity
import { Chat } from './chat.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @Column({ default: new Date() })
    createDate: Date;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat;

    @Column()
    userId: string;

    chatId: string;

    constructor(userId: string, content: string) {
        this.createDate = new Date();
        this.userId = userId;
        this.content = content;
    }
}
