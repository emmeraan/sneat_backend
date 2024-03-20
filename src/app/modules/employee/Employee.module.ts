import { Module } from "@nestjs/common";
import { EmployeeController } from "src/app/controllers/employee/Employee.controller";
import { EmployeeService } from "src/app/services/employee/Employee.service";
import { SalaryService } from "src/app/services/salary/Salary.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";

@Module({
    imports:[...ModuleHelper],
    providers:[EmployeeService,SalaryService,...ServiceHelper],
    controllers:[EmployeeController]
})
export class EmployeeModule{}