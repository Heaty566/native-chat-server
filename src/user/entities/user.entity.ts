import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: new Date() })
    createDate: Date;
}
