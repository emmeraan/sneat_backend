import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "src/app/dtos/departments/CreateDepartment.dto";
import { DatabaseService } from "../database/Database.service";


@Injectable()
export class DepartmentService {
  constructor(private readonly DB:DatabaseService,
    ){}
    async createDepartment(data: CreateDepartmentDto, authUser) {
        console.log('Create Department Data:', data);
      
        if (authUser.role !== 2) {
          return {
            status: false,
            message: 'Not an Admin',
          };
        }
      
        let findDepartment = await this.DB.Models['Departments'].findOne({
          where: { id: data.admin_id, platform_id: authUser.platform_id },
        });
      
        if (findDepartment) {
          return {
            status: false,
            message: `Department with the same name already exists`,
          };
        }
      
        let createNewDepartment = await this.DB.Models['Departments'].create({
          admin_id: data.admin_id,
          platform_id: authUser.platform_id,
          name: data.name,
          location: data.location,
          department_head: data.department_head,
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
      
}