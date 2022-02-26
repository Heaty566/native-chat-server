import { Field, InputType } from '@nestjs/graphql';
import * as Joi from 'joi';

@InputType({ description: 'add chat' })
export class AddNewMessageDTO {
    @Field()
    chatId: string;

    @Field()
    content: string;
}

export const vAddNewMessageDTO = Joi.object<AddNewMessageDTO>({
    chatId: Joi.string().required(),
    content: Joi.string().required(),
});
