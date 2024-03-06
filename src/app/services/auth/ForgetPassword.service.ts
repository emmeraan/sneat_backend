import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash } from 'bcrypt';
import { QueryTypes } from 'sequelize/types';
import { User } from 'src/app/models/User.model';
import { hashPassword } from 'src/app/utils/auth/bcrypt';
import { UtilHelper } from 'src/app/utils/helpers/Util.helper';
import { DatabaseService } from '../database/Database.service';

@Injectable()
export class ForgetPasswordService {
  constructor(private readonly DB: DatabaseService, private readonly mailService: MailerService) { }

  async forgetpassword(body,res) {
    const searchEmail = await this.DB.Models['User'].findOne({
      where: [{ email: body.email}]
    })
    if (searchEmail) {
      var val = Math.floor(1000 + Math.random() * 9000);
      await this.DB.Models['User'].update({
        OTP: val,
      },
        {
          where: [{ email: body.email}]
        }
      )
      console.log('mail process')
       let mail = await this.mailService.sendMail({
          from: 'Team Sneat Tech',
          to: body.email,
          subject: 'Forget sneat password',
          template: 'forgetpassword',
          context: {
            first_name: searchEmail.full_name,
            val: val
          }
        })
        console.log('after')
        if(mail){
          console.log('ok')
          res.status(200).json({
            status:true,
            message:'success',
            mail:'send'
          })
        }else{
          res.status(404).json({
            status:true,
            message:'fail',
            mail:'not send'
          })
        }
    }
    else{
      res.status(401).json({
        status:false,
        message:'Email invalid',
      })
    }
  }
  async changePassword(changePass, res) {
       const check = await this.DB.Models['User'].findOne({
        attributes:['OTP'],
        where: [{ email: changePass.email }]
    })
    if(check){
      if(check.OTP == 0){
        res.status(400).json({
          message:'For change password hit forgetpassword api before'
        })
      }
       if(check.OTP == 1111){
    let pass = hashPassword(changePass.password)
    const ret = await this.DB.Models['User'].update({
      password: pass
    },
      {
        where: [{ email: changePass.email }]
      }
    )
    if (ret.length > 0) {
      res.status(200).json({
        status: 'true',
        messge: 'User password changed successfully!',
      })
    }
    else {
      res.status(404).json({
        status: 'false',
        messge: 'Something went wrong',
      })
    }
  } else{
    res.status(401).json({
      status:false,
      message:'You can not change the password maybe you did not verify your otp'
    })
  }
} else {
  res.status(404).json({
    status:false,
    message:'Invalid email'
  })
}
  }

  async otp_varification(body,res){
    const check = await this.DB.Models['User'].findOne({
      attributes:['OTP'],
      where: [{ email: body.email }]
  })
  if(check){
    if(check.forgetpasscode == 0){
      res.status(503).json({
        message:'For change password hit forgetpassword api before'
      })
    }
   if(body.otp == check.OTP){
    let updateUser = await this.DB.Models['User'].update({
      OTP: 1111
    },{
      where: [{ email: body.email }]
    })
    res.status(200).json({
      status:true,
      message:'OTP verified'
    })
  }else{
    res.status(400).json({
      status:false,
      message:'Wrong OTP'
    })
  }
}else {
  res.status(404).json({
    status:false,
    message:'Invalid email'
  })
}
  }
  
  // async codeVerified(email: string, platform_id: number) {
  //   const res = await this.DB.Models['User'].findOne({
  //     attributes: ['f_code'],
  //     where: [{ email: email, platform_id: platform_id }]
  //   })
  //   return res
  // }

}
