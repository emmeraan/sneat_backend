import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "src/app/dtos/departments/CreateDepartment.dto";
import { DatabaseService } from "../database/Database.service";
import { ViewAllDepartmentsDto } from "src/app/dtos/departments/ViewAllDepartments.dto";
import { PaginationHelper } from "src/app/utils/helpers/Pagination.helper";
import { DeleteDepartmentDto } from "src/app/dtos/departments/DeleteDepartment.dto";
import { CreatePositionDto } from "src/app/dtos/position/CreatePosition.dto";


@Injectable()
export class PositionService {
  constructor(private readonly DB:DatabaseService,
    ){}
    async createPosition(data: CreatePositionDto, authUser) {
      
        if (authUser.role !== 2) {
          return {
            status: false,
            message: 'Not an Admin',
          };
        }
        let findPosition = await this.DB.Models['Position'].findOne({
          where: { name: data.name,platform_id:authUser.platform_id },
        });
        if (findPosition) {
          return {
            status: false,
            message: `Already position exist with same name`,
          };
        }
      
        let createNewPosition = await this.DB.Models['Position'].create({
          platform_id: authUser.platform_id,
          name: data.name,
        });
      
        if (createNewPosition) {
          return {
            status: true,
            message: 'Position successfully created',
          };
        } else {
          return {
            status: false,
            message: 'Something went wrong',
          };
        }
      }

    //   async delete(data, authUser) {
    //     if (authUser.role != 2) {
    //       return {
    //         status: false,
    //         message: 'Not an Admin',
    //       };
    //     }
    //     let findDepartment = await this.DB.Models['Departments'].findOne({
    //       where: { id: data.id },
    //     });
    //     if (!findDepartment) {
    //       return {
    //         status: false,
    //         message: 'Not Valid Id',
    //       };
    //     }
    
    //     let deletDepartment = await this.DB.Models['Departments'].destroy({
    //       where: {
    //         id: data.id,
    //       },
    //     });
    //     if (deletDepartment) {
    //       return {
    //         status: true,
    //         message: 'Success',
    //       };
    //     } else {
    //       return {
    //         status: false,
    //         message: 'Failed',
    //       };
    //     }
    //   }
    //   async viewAllDepartment(data: ViewAllDepartmentsDto, authUser) {
    //     if (authUser.role !== 2) {
    //       return {
    //         status: false,
    //         message: 'Not an Admin',
    //       };
    //     }
    //     const offset = (data.page - 1) * data.limit;
    
    
    //     const departments = await this.DB.Models['Departments'].findAll({
    //       attributes: [
    //         'id',
    //         'name',
    //       ],
    //       raw: true,
    //       offset: offset,
    //       limit: PaginationHelper.getLimit(data.limit),
    //     });
    
    //     if (!departments || departments.length === 0) {
    //       return {
    //         status: false,
    //         message: 'No department records found',
    //       };
    //     }
    
    //     const count = await this.DB.Models['Departments'].count({
    //       where: {
    //         platform_id: authUser.platform_id,
    //       },
    //     });
    
    //     const result = PaginationHelper.Paginate(
    //       count,
    //       data.page,
    //       data.limit,
    //       departments,
    //     );
    
    //     return result;
    //   }     
}