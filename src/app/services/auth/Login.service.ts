import { Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { checkHash } from 'src/app/utils/auth/bcrypt';
import { UtilHelper } from 'src/app/utils/helpers/Util.helper';
import { DBHelper } from '../../utils/helpers/DB.helper';
import { DatabaseService } from '../database/Database.service';
import { AuthService } from './Auth.service';
var moment = require('moment');
//
@Injectable()
export class LoginService {
  constructor(
    private readonly DB: DatabaseService,
    private readonly authService: AuthService,
  ) {}
  async login(getLogin, res) {
    const user = await this.DB.Models['User'].findOne({
      attributes: ['id', 'firstname','lastname', 'email', 'phone', 'role','platform_id'],
      where:{ email: getLogin.email }
    });
    // console.log("user detail to find role",user);

    if (user) {
      const user2 = await this.DB.Models['User'].findOne({
        attributes: ['password'],
        where: { email: getLogin.email },
      });
      // const role = await this.DB.Models['User'].findOne({
      //   attributes: ['role'],
      //   where: {
      //     [Op.or]: [
      //       { username: getLogin.email_or_username },
      //       { email: getLogin.email_or_username },
      //     ],
      //   },
      // });
      if (checkHash(getLogin.password, user2.password)) {
        let b = [];
        const a = (await this.authService.login(user)).access_token;
        b.push(user);
        let token = [{ token: a, user: b[0] }];
        res.status(200).json({
          status: 'true',
          message: 'Successfully logged in',
          data: token[0],
        });
      } else {
        res.status(401).json({
          status: false,
          message: 'You entered wrong password',
        });
      }
    } else {
      res.status(404).json({
        status: false,
        message: 'No any user registerd with this email',
      });
    }
  }
  async validateUserFromGoogle(profile: any): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const user = {
      googleId: id,
      name: displayName,
      email: emails[0].value,
      photo: photos[0].value,
    };
    // You can add your own logic to store or retrieve the user from your database
    return user;
  }
}
