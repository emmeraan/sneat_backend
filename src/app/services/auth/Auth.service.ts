import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/app/models/User.model';
import { checkHash } from 'src/app/utils/auth/bcrypt';
import { Role } from 'src/app/utils/enums/Role.enum';
import { DatabaseService } from '../database/Database.service';

@Injectable()
export class AuthService {
  constructor(private readonly DB: DatabaseService ,private jwtService: JwtService, ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.DB.Models['User'].findOne(
      {
        attributes:['password','email','id','platform_id'],
        where: { email: email }
       }
      );
    if (user) {
      if(checkHash(pass, user.password)){
        
        const { password, ...result } = user;
        return result;
      }else{
      }    
    }
    return null;
  }

  async login(user: any) { 
    const payload = { 
      email: user.email,
      id: user.id,
      role: user.role,
      platform_id:user.platform_id
      //time_zone: user.timezone,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
