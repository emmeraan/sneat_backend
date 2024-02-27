import * as admin from 'firebase-admin';
import sequelize from 'sequelize';
import { User } from 'src/app/models/User.model';
import { ConfigConstant } from '../constants/config.constant';
var moment = require("moment");

export const UtilHelper = {

  removeUndefiedKeys: (obj: object): object => {
    return Object.entries(obj).reduce((a, [k, v]) => (v === undefined ? a : (a[k] = v, a)), {})
  },
  firebase: async (token, body, title, data = {}) => {
    const a = token.split(',');
    const registrationTokens = a;
    let res = await admin.messaging().sendToDevice(
      registrationTokens, {
      data: data,
      notification: {
        body: body,
        title: title,
      },
    }, {
      contentAvailable: true,
      priority: "high",
    }
    );
  },
  toJson: (obj) => {
    try { return JSON.parse(obj.value) } catch (error) { return obj }
  },
  getStartDate: (date): string => {
    return moment(date, 'YYYY-MM-DD').startOf('day').format('YYYY-MM-DD HH:mm:ss')
  },
  getEndDate: (date): string => {
    return moment(date, 'YYYY-MM-DD').endOf('day').format('YYYY-MM-DD HH:mm:ss')
  },
  tryCatch: async (callBack, data) => {
    try {
      return await callBack(...data)
    } catch (e) {
      console.log(e);
      return {
        status: false,
        message: ConfigConstant.defaultErrorMessage
      }
    }
  }
  
};
