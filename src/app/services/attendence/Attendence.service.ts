import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { Op } from 'sequelize';
@Injectable()
export class AttendenceService {
  constructor(private readonly DB: DatabaseService) {}

  async addAttendence(data) {
    const currentDate = new Date();
    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const nextDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    ); // Next day
    if (data.type == 'checkin') {
      let existingAttendance = await this.DB.Models['Attendence'].findOne({
        where: {
          employee_id: data.employee_id,
          checkin: {
            [Op.gte]: today,
            [Op.lt]: nextDay,
          },
        },
      });
      if (existingAttendance) {
        return {
          status: false,
          message: 'Already checkin',
        };
      }
      let addAttendence = await this.DB.Models['Attendence'].create({
        employee_id: data.employee_id,
        checkin: new Date(),
        status: data.status,
      });

      if (addAttendence) {
        return {
          status: true,
          message: 'Attendence added successfully',
        };
      } else {
        return {
          status: false,
          message: 'Something went wrong',
        };
      }
    } else if (data.type === 'checkout') {
      const currentDate = new Date();

      let existingCheckin = await this.DB.Models['Attendence'].findOne({
        where: {
          employee_id: data.employee_id,
          checkin: {
            [Op.gte]: today,
            [Op.lt]: nextDay,
          },
        },
      });

      // If there is no check-in record for the employee on the current day
      if (!existingCheckin) {
        return {
          status: false,
          message: 'Please perform check-in before checkout',
        };
      }

      // Find if there's already a check-in record for the employee on the current day
      let existingAttendance = await this.DB.Models['Attendence'].findOne({
        where: {
          employee_id: data.employee_id,
          checkout: {
            [Op.gte]: today,
            [Op.lt]: nextDay,
          },
        },
      });
      if (existingAttendance) {
        // If there's no check-in record for the employee on the current day, return an error
        return {
          status: false,
          message: 'Aleady checkout',
        };
      }

      // Update the check-out time for the check-in record found
      let addAttendanceCheckout = await this.DB.Models['Attendence'].update(
        {
          checkout: currentDate,
        },
        {
          where: {
            employee_id: data.employee_id,
            checkin: {
              [Op.gte]: today,
              [Op.lt]: nextDay,
            },
          },
        },
      );

      return {
        status: true,
        message: 'Attendance checkout added successfully',
      };
    } else {
      return {
        status: false,
        message: 'Please Selection Correct option checkin or checkout',
      };
    }
  }

  async view(data) {
    let whereClause: any = {};
    // if (data.date) {
    //   whereClause.checkin = data.type;
    // }
    if (data.status) {
      whereClause.status = data.status;
    }
    let checkAttendence = await this.DB.Models['Attendence'].findAll({
      where: [whereClause, { employee_id: data.id }],
      order: [['checkin', 'DESC']],
    });
    if (checkAttendence) {
      return {
        status: true,
        data: checkAttendence,
      };
    } else {
      return {
        status: false,
        message: 'not Exist',
      };
    }
  }
}
