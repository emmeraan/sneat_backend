import { Injectable } from "@nestjs/common";
const moment = require('moment')
import { JwtService } from "@nestjs/jwt";
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { DatabaseService } from "./database/Database.service";


@Injectable()
export class MetamaskService {

  constructor(private readonly DB: DatabaseService, private readonly jwtService: JwtService) { }


  async nonce(metamask,res) {
    let user = await this.DB.Models['User'].findOne({
      where: {
        email: metamask.address, type: 'wallet'
      }
    })
    if (user) {
      res.status(200).json({
        status: true,
        message: user.nonce
      })
    }
    res.status(400).json({
      status: false,
      message: 'something went wrong.'
    })

  }


  async verify(verifyMeta,res) {
    var minutesToTimezoneDifference = (minutes) => {
      var x = minutes;
      var flag = Math.abs(x) > 0 ? '+' : '-';
      var MINUTES = Math.abs(x); //some integer
      var m = MINUTES % 60;
      var h = (MINUTES - m) / 60;
      var HHMM =
        flag +
        (h < 10 ? '0' : '') +
        h.toString() +
        ':' +
        (m < 10 ? '0' : '') +
        m.toString();
      return HHMM;
    }
    let user = await this.DB.Models['User'].findOne({
      attributes: ['id', 'username', 'email', 'phone', ['dateofbirth', 'date_of_birth'], 'role', 'is_validate', 'type', 'nonce','timezone'],
      where: { email: verifyMeta.address }
    })
    if (user) {
      if (user.is_validate == 0) {
        res.status(401).json({
          message: 'You are not validated yet.. check later'
        })
      } else {
        const msg = `Nonce: ${user.nonce}`;
        let add = recoverPersonalSignature({
          data: msg,
          signature: verifyMeta.signature,
        });
        console.log(add.toLocaleLowerCase())
        console.log(add)
        console.log( recoverPersonalSignature({
          data: msg,
          signature: verifyMeta.signature,
        }))
        if (add.toLowerCase() === verifyMeta.address.toLowerCase()) {
         await this.DB.Models['User'].update({
            nonce: Math.floor(Math.random() * 1000000), timezone: minutesToTimezoneDifference(verifyMeta.timezone)
          }, {
            where: {
              email: add, type: 'wallet'
            }
          })
          await this.DB.Models['ActivityList'].create({
            title: 'You last logged in', user_id: user.id
          })
          let b = [];
          const role = await this.DB.Models['User'].findOne({
            attributes: ['role'],
            where: [{ email: verifyMeta.address }]
          })
          let timezone = await this.DB.Models['User'].findOne({
            attributes:['timezone'],
            where:[{email:verifyMeta.address}]
          })
          const a = this.jwtService.sign({
            email: user.email,
            id: user.id,
            role: user.role,
            type: 'wallet',
            timezone:timezone.timezone
          })
          if (role.role = 2) {
            role == 'admin'
          }
          if (role.role = 3) {
            role == 'guest'
          }
          b.push(user)
          // b[0].bio = details;
          b[0].provider = 'local'
          b[0].walletAdress = 'N/A'
          b[0].walletType = 'N/A'
          b[0].macAddress = 'N/A'
          // let userr = await this.DB.Models['User'].findOne({
          //   attributes:['id','first_name','last_name','image','role','type'],
          //   where: {email: verifyMeta.address}
          // })
          if (role.role = 1) {
            b[0].role = 'user'
          }
          if (role.role = 2) {
            b[0].role = 'admin'
          }
          if (role.role = 3) {
            b[0].role = 'guest'
          }
          let token = [{ token: a, user: b[0] }]
          res.status(200).json({
            status: 'true',
            message: "Successfully logged in",
            data: token[0],
          })
        } else {
          res.status(401).json({
            status: false,
            message: 'unauthorized.'
          })
        }
      }
    } else {
      res.status(400).json({
        status: false,
        message: 'User does not exist'
      })
    }
  }
}