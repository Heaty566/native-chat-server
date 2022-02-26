import { Field, InputType } from '@nestjs/graphql';
import * as Joi from 'joi';

@InputType({ description: 'Create chat' })
export class CreateChatDTO {
    @Field()
    userId: string;
}

export const vCreateChatDTO = Joi.object<CreateChatDTO>({
    userId: Joi.string().required(),
});
