import { Module } from "@nestjs/common";
import { AttendenceController } from "src/app/controllers/attendence/Attendence.controller";
import { AttendenceService } from "src/app/services/attendence/Attendence.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";

@Module({
    imports:[...ModuleHelper],
    providers:[AttendenceService,...ServiceHelper],
    controllers:[AttendenceController]
})
export class AttendenceModule{}