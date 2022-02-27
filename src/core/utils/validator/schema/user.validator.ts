import * as Joi from 'joi';
import { monoJoi } from 'mono-utils-core';

import { User } from '../../../../user/entities/user.entity';

export function userJoiSchema(field: keyof User) {
    switch (field) {
        case 'name':
            return Joi.string().min(5).max(40).trim().lowercase().required().messages(monoJoi.joiMessagePattern);

        case 'username':
            return Joi.string().min(5).max(32).trim().required().messages(monoJoi.joiMessagePattern);

        case 'password':
            return Joi.string().min(5).max(255).required().messages(monoJoi.joiMessagePattern);
    }
}
