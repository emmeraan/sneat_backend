import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/app/models/User.model';
import { checkHash } from 'src/app/utils/auth/bcrypt';
import { Role } from 'src/app/utils/enums/Role.enum';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private readonly user: typeof User,private jwtService: JwtService, ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.user.findOne(
      {
        attributes:['password','email','id'],
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
      //time_zone: user.timezone,
    };
    console.log(payload,'payloaddd');
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


}
