import { Module } from "@nestjs/common";
import { AttendenceController } from "src/app/controllers/attendence/Attendence.controller";
import { SalaryController } from "src/app/controllers/salary/Salary.controller";
import { AttendenceService } from "src/app/services/attendence/Attendence.service";
import { SalaryService } from "src/app/services/salary/Salary.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";

@Module({
    imports:[...ModuleHelper],
    providers:[SalaryService,...ServiceHelper],
    controllers:[SalaryController]
})
export class SalaryModule{}