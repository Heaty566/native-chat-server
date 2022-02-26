import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { config } from '../core/config';
import { AuthResolver } from './auth.reslover';

@Module({
    imports: [forwardRef(() => UserModule)],
    controllers: [AuthController],

    providers: [
        AuthService,
        AuthResolver,
        {
            provide: JwtService,
            useFactory: () => new JwtService({ secret: config.JWT_SECRET_KEY }),
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
