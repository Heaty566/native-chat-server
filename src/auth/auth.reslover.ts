import { BadRequestException } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';

import { JoiValidatorPipe } from '../core/utils/validator/validator.pipe';
import { AuthService } from './auth.service';
import { SignInDTO, vSignInDTO } from './dto/signinUserDto';
import { SignUpDTO, vSignUpDTO } from './dto/signupUserDto';
import { User } from 'src/user/entities/user.entity';
import { apiResponse } from 'src/core/interface/apiResponse';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Mutation(() => String)
    async signInUser(@Args('input', new JoiValidatorPipe(vSignInDTO)) body: SignInDTO) {
        const user = await this.userService.findOneUserByField('username', body.username);
        if (!user) return apiResponse.sendError({ errorMessage: 'Username or password is invalid' });

        const isCorrect = this.authService.decryptString(body.password, user.password);
        if (!isCorrect) return apiResponse.sendError({ errorMessage: 'Username or password is invalid' });

        return user.id;
    }

    @Mutation(() => String)
    async signUpUser(@Args('input', new JoiValidatorPipe(vSignUpDTO)) body: SignUpDTO) {
        const existedUser = await this.userService.findOneUserByField('username', body.username);
        if (existedUser) return apiResponse.sendError({ username: 'Username is taken' });

        let user = new User();
        user.name = body.name;
        user.username = body.username;
        user.password = await this.authService.encryptString(body.password);
        user.createDate = new Date();
        user = await this.userService.save(user);

        return user.id;
    }
}
