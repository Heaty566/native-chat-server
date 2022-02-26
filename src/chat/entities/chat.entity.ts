import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    content: string;

    @Column()
    createDate: Date;

    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];

    @Column()
    userId: string;

    constructor() {
        this.createDate = new Date();
    }
}
