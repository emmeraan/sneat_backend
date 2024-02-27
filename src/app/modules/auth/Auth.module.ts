import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtStrategy } from 'src/app/utils/auth/strategies/AuthJwt.strategy';
import { AuthStrategy } from 'src/app/utils/auth/strategies/Auth.strategy';
import { LoginController } from 'src/app/controllers/auth/Login.controller';
import { LogoutController } from 'src/app/controllers/auth/Logout.controller';
import { ForgetPasswordController } from 'src/app/controllers/auth/ForgetPassword.controller';
import { LoginService } from 'src/app/services/auth/Login.service';
import { ForgetPasswordService } from 'src/app/services/auth/ForgetPassword.service';
import { AuthService } from 'src/app/services/auth/Auth.service';
import { ServiceHelper } from 'src/app/utils/helpers/Service.helper';
import { ModuleHelper } from 'src/app/utils/helpers/Module.helper';
import { LogoutService } from 'src/app/services/auth/Logout.service';
import { SignupService } from 'src/app/services/auth/Signup.service';
import { SignupController } from 'src/app/controllers/auth/Signup.controller';


@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' },
        }),
        ...ModuleHelper
    ],
    providers: [AuthStrategy,AuthJwtStrategy, LoginService, ForgetPasswordService, AuthService,LogoutService,SignupService,...ServiceHelper],
    controllers: [ LoginController, ForgetPasswordController, LogoutController,SignupController ],
})
export class AuthModule {}
