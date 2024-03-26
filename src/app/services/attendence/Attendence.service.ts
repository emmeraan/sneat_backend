import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { Op } from 'sequelize';
import { PaginationHelper } from 'src/app/utils/helpers/Pagination.helper';
import { User } from 'src/app/models/User.model';
import { Attendence } from 'src/app/models/Attendence.model';
const moment = require('moment');
import { ViewAllAttendanceDto } from 'src/app/dtos/attendence/ViewAllAteendence.dto';
@Injectable()
export class AttendenceService {
  constructor(private readonly DB: DatabaseService) {}

  async addAttendence(data, authUser) {
    console.log(authUser);
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let checkUser = await this.DB.Models['User'].findOne({
      where: {
        id: data.employee_id,
        platform_id: authUser.platform_id,
      },
    });
    if (!checkUser) {
      return {
        status: false,
        message: 'Not valid employee id',
      };
    }
    console.log(new Date(), ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
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
    if (
      data.status == 'Absent' ||
      data.status == 'Leave' ||
      data.status == 'Half_Day'
    ) {
      let existingAttendance = await this.DB.Models['Attendence'].findOne({
        where: {
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
          status: ['Absent', 'Leave', 'Half_Day', 'Present'], // Array of possible status values
        },
      });
      if (existingAttendance) {
        return {
          status: false,
          message: 'Already Attendence Added',
        };
      }
      let addAttendence = await this.DB.Models['Attendence'].create({
        employee_id: data.employee_id,
        checkin: new Date(),
        status: data.status,
        platform_id: authUser.platform_id,
      });
      return {
        status: true,
        message: `Attendence added successfully for user ${checkUser.firstname}${checkUser.lastname}`,
      };
    } else if (data.status == 'Present') {
      if (data.type == 'checkin') {
        let existingAttendance = await this.DB.Models['Attendence'].findOne({
          where: {
            employee_id: data.employee_id,
            platform_id: authUser.platform_id,
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
          platform_id: authUser.platform_id,
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
            platform_id: authUser.platform_id,
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
        if (existingCheckin) {
          // Calculate the time difference between current time and check-in time
          const checkinTime = moment(existingCheckin.checkin);
          const currentTime = moment();
          const timeDifference = moment
            .duration(currentTime.diff(checkinTime))
            .asMinutes();

          if (timeDifference < 30) {
            // Return message indicating check-out can't be added before 30 minutes
            return {
              staus: false,
              message: "Can't add checkout before 30 minutes.",
            };
          }
        }

        // Find if there's already a check-in record for the employee on the current day
        let existingAttendance = await this.DB.Models['Attendence'].findOne({
          where: {
            employee_id: data.employee_id,
            platform_id: authUser.platform_id,
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
              platform_id: authUser.platform_id,
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
    } else {
      return {
        status: false,
        message:
          'Please select Correct Status(Present, Absent, Leave, Half_Day)',
      };
    }
  }

  async view(data, authUser) {
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let whereClause: any = {};
    if (data.date) {
      const lowerBound = new Date(data.date);
      lowerBound.setHours(0, 0, 0, 0);
      const upperBound = new Date(data.date);
      upperBound.setHours(23, 59, 59, 999);
      whereClause.checkin = {
        [Op.between]: [lowerBound, upperBound],
      };
    }
    let checkEmployeeId = await this.DB.Models['User'].findOne({
      attributes: ['id'],
      where: { id: data.employee_id, platform_id: authUser.platform_id },
    });
    if (!checkEmployeeId) {
      return {
        status: false,
        message: 'Employee Id not exist',
      };
    }
    if (data.status) {
      whereClause.status = data.status;
    }
    const offset = (data.page - 1) * data.limit;
    let totalUser = await this.DB.Models['Attendence'].findAll({
      where: [
        whereClause,
        { employee_id: data.employee_id, platform_id: authUser.platform_id },
      ],
      // include: {
      //   model:User,
      //   where: {
      //     id:data.employee_id
      //   },
      //   attributes: [],
      //   require:false
      //  },
      order: [['checkin', 'DESC']],
      offset: offset,
      limit: PaginationHelper.getLimit(data.limit),
    });
    console.log(totalUser);

    let count = await this.DB.Models['Attendence'].count({
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
      },
    });

    if (totalUser) {
      return PaginationHelper.Paginate(count, data.page, data.limit, totalUser);
    } else {
      return {
        status: false,
        message: 'not Exist',
      };
    }
  }

  async update(data, authUser) {
    let updateData: any = {};
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    if (
      (data.status == 'Present' || data.status == 'Absent') &&
      data.leave_type != null
    ) {
      return {
        status: false,
        message: `to use leave_type you must select status as 'Leave`,
      };
    }
    if (data.status) {
      updateData.status = data.status;
    }
    if (data.leave_type) {
      updateData.leave_type = data.leave_type;
    }
    if (data.check == 'checkin') {
      updateData.checkin = new Date();
    }
    if (data.check == 'checkout') {
      updateData.checkout = new Date();
    }
    console.log(updateData);

    let checkAttendenceID = await this.DB.Models['Attendence'].findOne({
      where: {
        id: data.id,
        platform_id: authUser.platform_id,
      },
    });
    if (!checkAttendenceID) {
      return {
        status: false,
        message: 'Invalid Employee Id',
      };
    }
    let updateAttendence = await this.DB.Models['Attendence'].update(
      updateData,
      {
        where: {
          id: data.id,
          platform_id: authUser.platform_id,
        },
      },
    );
    if (updateAttendence) {
      return {
        status: true,
        message: 'Attendence updated successfully',
      };
    } else {
      return {
        status: false,
        message: 'Not successful',
      };
    }
  }
  async viewAllAttendance(data: ViewAllAttendanceDto, authUser) {
    if (authUser.role !== 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    const offset = (data.page - 1) * data.limit;
    var fromDate = data.fromDate; // Assuming fromDate and toDate are provided in data
    var toDate = data.toDate;

    let whereClause: any = {};
    if (data.fromDate && data.toDate) {
      whereClause.checkin = {
        [Op.between]: [fromDate, toDate],
      };
    }
    if (data.status) {
      whereClause.status = data.status;
    }

    if (data.employee_id) {
      whereClause.employee_id = data.employee_id;
    }

    const attendances = await this.DB.Models['Attendence'].findAll({
      attributes: [
        'platform_id',
        'employee_id',
        'status',
        'leave_type',
        'checkin',
        'checkout',
      ],
      include: [
        {
          model: User,
          attributes: [
            'firstname',
            'lastname',
            'email',
            'address',
            'phone',
            'cnic',
            'role',
            'position',
          ],
        },
      ],
      where: whereClause,
      order: [['checkin', 'DESC']],
      raw: true,
      offset: offset,
      limit: PaginationHelper.getLimit(data.limit),
    });

    if (!attendances || attendances.length === 0) {
      return {
        status: false,
        message: 'No attendance records found',
      };
    }

    const count = await this.DB.Models['Attendence'].count({
      where: {
        platform_id: authUser.platform_id,
        ...whereClause,
      },
    });

    const result = PaginationHelper.Paginate(
      count,
      data.page,
      data.limit,
      attendances,
    );

    return result;
  }
}
