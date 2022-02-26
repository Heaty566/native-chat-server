import { Field, ObjectType } from '@nestjs/graphql';
import { MessageSchema } from './message.schema';

@ObjectType('chat')
export class ChatSchema {
    @Field(() => String)
    id: string;

    @Field(() => Date)
    createDate: Date;

    @Field(() => [MessageSchema], { defaultValue: [] })
    messages: MessageSchema[];
}
