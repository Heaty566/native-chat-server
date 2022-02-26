import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('user')
export class UserSchema {
    @Field(() => String)
    id: string;

    @Field(() => String, { defaultValue: '' })
    name: string;

    @Field()
    username: string;

    @Field(() => Date)
    createDate: Date;
}
