import { Module } from "@nestjs/common";
import { DepartmentController } from "src/app/controllers/department/department.controller";
import { DepartmentService } from "src/app/services/department/department.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";


@Module({
    imports:[...ModuleHelper],
    providers:[DepartmentService,...ServiceHelper],
    controllers:[DepartmentController]
})
export class DepartmentModule{}