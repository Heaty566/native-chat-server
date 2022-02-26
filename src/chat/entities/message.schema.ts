import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('message')
export class MessageSchema {
    @Field(() => String)
    id: string;

    @Field(() => String)
    content: string;

    @Field(() => Date)
    createDate: Date;

    @Field(() => String)
    userId: string;
}
