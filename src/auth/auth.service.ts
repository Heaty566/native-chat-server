import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

//---- Entity
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    //-------------------------------Token Service --------------------------------------

    createAuthToken(user: User) {
        const encryptUser = this.encryptToken(user);
        return encryptUser;
    }

    //--------------------------------Encrypt Decrypt Service -------------------------------

    encryptToken(tokenData: Record<any, any>) {
        try {
            return this.jwtService.sign(JSON.stringify(tokenData));
        } catch (err) {
            return null;
        }
    }

    verifyToken<T>(tokenData: string) {
        try {
            return this.jwtService.verify<any>(tokenData) as T;
        } catch (err) {
            return null;
        }
    }

    async encryptString(data: string): Promise<string> {
        return await bcrypt.hash(data, 5);
    }

    async decryptString(data: string, encryptedPassword: string): Promise<boolean> {
        return bcrypt.compare(data, encryptedPassword);
    }
}
