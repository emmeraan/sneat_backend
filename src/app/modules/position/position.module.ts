import { Module } from "@nestjs/common";
import { PositionController } from "src/app/controllers/position/position.controller";
import { PositionService } from "src/app/services/position/position.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";



@Module({
    imports:[...ModuleHelper],
    providers:[PositionService,...ServiceHelper],
    controllers:[PositionController]
})
export class PositionModule{}