import { Injectable, Post,BadRequestException } from '@nestjs/common';
import { hash } from 'bcrypt';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { checkHash, hashPassword } from 'src/app/utils/auth/bcrypt';
import { DatabaseService } from '../database/Database.service';
import { isEmail } from 'class-validator';
import { Op } from 'sequelize';
const { isValidAddress } = require('ethereumjs-util');

@Injectable()
export class SignupService {
  constructor(private readonly DB: DatabaseService) {}

  async Register(signup, res) {
        let checkPlatform= await this.DB.Models['Platform'].findOne({
          where:[{
            name:signup.platform_name
          }]
        })
        console.log(checkPlatform);
        
        if(!checkPlatform){
          res.status(400).json({
            status: 'false',
            message: 'Not valid platform name',
          });
        }
        let existmail = await this.DB.Models['User'].findAll({
          where: [{ email: signup.email }],
        });
        if (existmail.length > 0) {
          res.status(409).json({
            status: 'false',
            message: 'A user already registerd with this email',
          });
        } else {
          let mail = isEmail(signup.email);
          if (mail == true) {
            let check = hashPassword(signup.password);
            let create = await this.DB.Models['User'].create({
              firstnme: signup.firstname,
              lastname: signup.lastname,
              email: signup.email,
              password: check,
              role: 1,
              platform_id:checkPlatform.id
            });
            if (create) {
              res.status(200).json({
                status: true,
                message: 'User registered successfully!',
              });
            } else {
              res.status(404).json({
                message: 'something went wrong',
              });
            }
          } else {
            res.status(400).json({
              status: false,
              message: 'invalid email address',
            });
          }
        }
      }
    }
