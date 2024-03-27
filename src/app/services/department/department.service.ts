import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "src/app/dtos/departments/CreateDepartment.dto";
import { DatabaseService } from "../database/Database.service";
import { ViewAllDepartmentsDto } from "src/app/dtos/departments/ViewAllDepartments.dto";
import { PaginationHelper } from "src/app/utils/helpers/Pagination.helper";
import { DeleteDepartmentDto } from "src/app/dtos/departments/DeleteDepartment.dto";


@Injectable()
export class DepartmentService {
  constructor(private readonly DB:DatabaseService,
    ){}
    async createDepartment(data: CreateDepartmentDto, authUser) {
        if (authUser.role !== 2) {
          return {
            status: false,
            message: 'Not an Admin',
          };
        }
        let findDepartment = await this.DB.Models['Department'].findOne({
          where: { name: data.name,platform_id:authUser.platform_id },
        });
        if (findDepartment) {
          return {
            status: false,
            message: `Already department exist with same name`,
          };
        }
      
        let createNewDepartment = await this.DB.Models['Department'].create({
          platform_id: authUser.platform_id,
          name: data.name,
        });
      
        if (createNewDepartment) {
          return {
            status: true,
            message: 'Department successfully created',
          };
        } else {
          return {
            status: false,
            message: 'Something went wrong',
          };
        }
      }

      async delete(data, authUser) {
        if (authUser.role != 2) {
          return {
            status: false,
            message: 'Not an Admin',
          };
        }
        let findDepartment = await this.DB.Models['Department'].findOne({
          where: { id: data.id },
        });
        if (!findDepartment) {
          return {
            status: false,
            message: 'Not Valid Id',
          };
        }
    
        let deletDepartment = await this.DB.Models['Department'].destroy({
          where: {
            id: data.id,
          },
        });
        if (deletDepartment) {
          return {
            status: true,
            message: 'Success',
          };
        } else {
          return {
            status: false,
            message: 'Failed',
          };
        }
      }
      async viewAllDepartment(data: ViewAllDepartmentsDto, authUser) {
        if (authUser.role !== 2) {
          return {
            status: false,
            message: 'Not an Admin',
          };
        }
        const offset = (data.page - 1) * data.limit;
    
    
        const departments = await this.DB.Models['Department'].findAll({
          attributes: [
            'id',
            'name',
          ],
          raw: true,
          offset: offset,
          limit: PaginationHelper.getLimit(data.limit),
        });
    
        if (!departments || departments.length === 0) {
          return {
            status: false,
            message: 'No department records found',
          };
        }
    
        const count = await this.DB.Models['Department'].count({
          where: {
            platform_id: authUser.platform_id,
          },
        });
    
        const result = PaginationHelper.Paginate(
          count,
          data.page,
          data.limit,
          departments,
        );
    
        return result;
      }     
}