import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { Op } from 'sequelize';
import { PaginationHelper } from 'src/app/utils/helpers/Pagination.helper';
import { User } from 'src/app/models/User.model';
@Injectable()
export class AttendenceService {
  constructor(private readonly DB: DatabaseService) {}

  async addAttendence(data) {

    let checkUser= await this.DB.Models['User'].findOne({
      where:{
        id:data.employee_id
      }
    })
    if(!checkUser){
      return{
        status:false,
        message:"Not valid employee id"
      }
    }
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
    if(data.status=='Absent' || data.status=='Leave' || data.status=='Half_Day'){
      let existingAttendance = await this.DB.Models['Attendence'].findOne({
        where: {
          employee_id: data.employee_id,
          status: [ 'Absent', 'Leave', 'Half_Day','Present' ] // Array of possible status values
        }
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
      });
      return{
        status:true,
        message:`Attendence added successfully for user ${checkUser.firstname}${checkUser.lastname}`
      }
    }
    else if(data.status=='Present'){
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
  else{
    return{
      status:false,
      message:"Please select Correct Status(Present, Absent, Leave, Half_Day)"
    }
  }
  }

  async view(data) {
    let whereClause: any = {};
    if (data.date) {
      const lowerBound = new Date(data.date);
      lowerBound.setHours(0, 0, 0, 0);
      const upperBound = new Date(data.date);
      upperBound.setHours(23, 59, 59, 999);
      whereClause.checkin = {
      [Op.between]: [lowerBound, upperBound]
      };
    };
    let checkEmployeeId= await this.DB.Models['User'].findOne({
      attributes:['id'],
      where:{id:data.employee_id}
    })
    if(!checkEmployeeId){
      return{
        status:false,
        message:"Employee Id not exist"
      }
    }
    if (data.status) {
      whereClause.status = data.status;
    }
    const offset = (data.page - 1) * data.limit;
    let totalUser = await this.DB.Models['Attendence'].findAll({
      where: [whereClause,{ employee_id: data.employee_id }],
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
        where: 
        {employee_id: data.employee_id },
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
}
