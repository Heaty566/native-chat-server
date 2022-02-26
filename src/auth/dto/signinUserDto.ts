import { Field, InputType } from '@nestjs/graphql';
import * as Joi from 'joi';
import User from '../../user/entities/user.entity';
import { userJoiSchema } from '../../core/utils/validator/schema/user.validator';
import { ValidatorService } from '../../core/utils/validator/validator.service';

const { getJoiSchemas } = ValidatorService.joiSchemaGenerator<User>(userJoiSchema);

@InputType({ description: 'Sign In User' })
export class SignInDTO {
    @Field()
    username: string;

    @Field()
    password: string;
}

export const vSignInDTO = Joi.object<SignInDTO>({
    ...getJoiSchemas(['username', 'password']),
});
