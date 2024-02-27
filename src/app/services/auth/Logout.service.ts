import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/Database.service';
var moment = require("moment");

@Injectable()
export class LogoutService {
  constructor(private readonly DB: DatabaseService ) {}
  async logout(id:number,platform_id:number,email:string, token: string) {
    const searchuser = await this.DB.Models['User'].findAll({
      where: [{ id: id, platform_id:platform_id }]
    })
    if (searchuser) {
      const d = moment().format('YYYY-MM-DD HH:mm:ss');
      await this.DB.Models['AppLog'].update({
        logout_time: d,
      },
        {
          where: [{ email: email, platform_id: platform_id }]
        })
      let newTokens = searchuser[0].fcm_token.split(',').filter((el) => el != token).join(',');
      await this.DB.Models['User'].update({
        is_online: 0, fcm_token: newTokens
      },
        {
          where: [{ id: id, platform_id: platform_id }]
        })
      return ({
        status: "true",
        user: "logout",
        message: "success",
      })
    }
    else {
      return ({
        status: "false",
        users: [],
        message: "error",
      })
    }
  }
}
