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
    async createPosition(data, authUser) {
      
        if (authUser.role !== 2) {
          return {
            status: false,
            message: 'Not an Admin',
          };
        }
        let findPosition = await this.DB.Models['Position'].findOne({
          where: { name: data.name,platform_id:authUser.platform_id },
        });
        console.log("checking");
        let checkDepartmentId = await this.DB.Models['Department'].findOne({
          where: { id:data.department_id },
        });
        if(!checkDepartmentId){
          return{
            status:false,
            message:"Not valid department ID"
          }
        }
        if (findPosition) {
          return {
            status: false,
            message: `Already position exist with same name`,
          };
        }
      
        let createNewPosition = await this.DB.Models['Position'].create({
          platform_id: authUser.platform_id,
          department_id:data.department_id,
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
    async all(data,authUser){
      if (authUser.role !== 2) {
        return {
          status: false,
          message: 'Not an Admin',
        };
      }
      let checkDepartmentId=await this.DB.Models['Department'].findOne({
        where:{
          id:data.department_id
        }
      })
      if(!checkDepartmentId){
        return{
          status:false,
          message:"Department Id not Exisit"
        }
      }

      let findPositions=await this.DB.Models['Position'].findAll({
        where:{
          department_id:data.department_id,
          platform_id:authUser.platform_id,

        }
      })
      return{
        status:true,
        data:findPositions
      }
    }
    async update(data,authUser){
      if (authUser.role !== 2) {
        return {
          status: false,
          message: 'Not an Admin',
        };
      }
      let checkPositionId=await this.DB.Models['Position'].findOne({
        where:{
          id:data.id,
          platform_id:authUser.platform_id,
        }
      })
      if(!checkPositionId){
        return{
          status:false,
          message:"Not a valid Id of position"
        }
      }

      let updatePositions=await this.DB.Models['Position'].update({
        name:data.name
      },{
        where:{
          id:data.id,
          department_id:data.department_id,
          platform_id:authUser.platform_id,

        }
      })
      return{
        status:true,
        message:"Updated successfully"
      }
    }
    async delete(data,authUser){
      if (authUser.role !== 2) {
        return {
          status: false,
          message: 'Not an Admin',
        };
      }
      let checkPositionId=await this.DB.Models['Position'].findOne({
        where:{
          id:data.id,
          platform_id:authUser.platform_id,
        }
      })
      if(!checkPositionId){
        return{
          status:false,
          message:"Not a valid Id of position"
        }
      }
      let deletePosition=await this.DB.Models['Position'].destroy({
        where:{
          id:data.id,
          platform_id:authUser.platform_id
        }
      })
      return{
        status:true,
        message:"Deleted successfully"
      }
    }
    }