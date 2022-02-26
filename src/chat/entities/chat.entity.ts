import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
    @PrimaryColumn()
    id: string;

    @Column()
    createDate: Date;

    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];
}
