import { UseGuards } from '@nestjs/common';
import { Context, Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { UserGuard } from '../auth/auth.guard';
import { UserSchema } from './entities/user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @UseGuards(UserGuard)
    @Query(() => UserSchema)
    async getCurrentUser(@Context('req') req: Request): Promise<UserSchema> {
        const user = await this.userService.findOneUserByField('id', req.user.id);

        return {
            name: user.name,
            createDate: user.createDate,
            username: user.username,
            id: user.id,
        };
    }

    // @UseGuards(UserGuard)
    // @Query(() => [UserSchema])
    // async getUsers(@Args('first') first: number): Promise<UserSchema[]> {
    //     const users = await this.userService.getUsers(0, first);

    //     return users.map((user) => {
    //         return {
    //             name: user.name,
    //             createDate: user.createDate,
    //             email: user.email,
    //             id: user.id,
    //         };
    //     });
    // }
}
