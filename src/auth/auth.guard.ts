import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
//---- Service
import { AuthService } from './auth.service';

//---- Common
import { apiResponse } from '../core/interface/apiResponse';
import { UserService } from 'src/user/user.service';
import { GraphqlWs } from 'src/core/interface/graphql';

@Injectable()
export class UserGuard implements CanActivate {
    private readonly AUTH_TOKEN_STRING = 'auth-token';

    constructor(private authService: AuthService, private userService: UserService) {}

    async canActivate(context: ExecutionContext) {
        const { req, res, ws } =
            GqlExecutionContext.create(context).getContext<{ req: Request; res: Response; ws: GraphqlWs }>();

        const authToken = (req?.headers['token'] as string) || ws?.headers?.token || '';
        if (!authToken) throw apiResponse.sendError({ errorMessage: 'Login failed' });

        const user = await this.userService.findOneUserByField('id', authToken);
        if (!user) {
            res.cookie(this.AUTH_TOKEN_STRING, '', { maxAge: -999 });
            throw apiResponse.sendError({});
        }
        if (ws) {
            ws.user = user;
        } else {
            req.user = user;
        }
        return true;
    }
}
