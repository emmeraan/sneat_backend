import * as admin from 'firebase-admin';
import sequelize from 'sequelize';
import { User } from 'src/app/models/User.model';
import { ConfigConstant } from '../constants/config.constant';
var moment = require("moment");

export const DBHelper = {

  sequelizeTransaction: async (sequelize, callBack, data) => {
    const t = await sequelize.transaction();
    try {
      return await callBack(t, ...data)
    } catch (e) {
      await t.rollback();
      console.log(e);
      return {
        status: false,
        message: ConfigConstant.defaultErrorMessage
      }
    }
  },
  timeZone: (timezone: any, col = 'created', as = 'created'): any => {
    console.log(timezone, col, as)
    return [sequelize.fn
      (
        "DATE_FORMAT",
        sequelize.fn('CONVERT_TZ', sequelize.col(col), '+00:00', timezone),
        ConfigConstant.defaultFormatToGetDateTimeFromDatabase
      ), (as == 'created' ? col : as)]
  },
  timezoneKnex: (timezone: any, col = 'created', as = 'created'): string => {
    return  `DATE_FORMAT(CONVERT_TZ(${col},"+00:00","${timezone}"),"${ConfigConstant.defaultFormatToGetDateTimeFromDatabase}") as ${as}`
  },
  rawTimezone: (col:any,timezone:any,as:any):any=>{
      return `DATE_FORMAT(CONVERT_TZ(`+ col +`,"+00:00","${timezone}"),"${ConfigConstant.defaultFormatToGetDateTimeFromDatabase}") as `+ as +``
  },
  getWhereForGraphInterval:(interval): string => {
    let int = 'created BETWEEN NOW() - INTERVAL 1 YEAR AND NOW()'
    switch(interval){
      case '7_days':
        int = 'created >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY AND created < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY'
        break;
      case '30_days':
        int = 'created BETWEEN NOW() - INTERVAL 30 DAY AND NOW()'
        break;
      case '3_months':
        int = 'created BETWEEN NOW() - INTERVAL 3 MONTH AND NOW()'
        break;
      case '6_months':
        int = 'created BETWEEN NOW() - INTERVAL 6 MONTH AND NOW()'
        break;
      case 'last_year':
        int = 'created BETWEEN NOW() - INTERVAL 1 YEAR AND NOW()'
        break;
    }
    return int;
  },
  getColumnForGraph: (interval): string =>{
    let int = 'DATE_FORMAT(created, "%b") as name'
    switch(interval){
      case '7_days':
        int = 'DAYNAME(created) as name'
        break;
      case '30_days':
        int = 'CONCAT("Week ",WEEK(created)) as name'
        break;
      case '3_months':
        int = 'DATE_FORMAT(created, "%b") as name'
        break;
      case '6_months':
        int = 'DATE_FORMAT(created, "%b") as name'
        break;
      case 'last_year':
        int = 'DATE_FORMAT(created, "%b") as name'
        break;
    }
    return int;
  }

};
