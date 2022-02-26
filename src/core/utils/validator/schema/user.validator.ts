import * as Joi from 'joi';
import { joiPassword } from 'joi-password';
import { User } from '../../../../user/entities/user.entity';

export function userJoiSchema(field: keyof User) {
    switch (field) {
        case 'name':
            return Joi.string().min(5).max(40).trim().lowercase().required();

        case 'username':
            return Joi.string().min(5).max(32).trim().required();

        case 'password':
            return Joi.string().min(5).max(255).required();
    }
}
