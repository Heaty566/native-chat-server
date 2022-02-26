import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

//---- Service

import { AuthService } from './auth.service';

import { constant } from '../core/constant';
import { config } from 'src/core/config';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    //---------------------------------- 3rd authentication -----------------------------------------------------------
}
