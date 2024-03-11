import { Module } from "@nestjs/common";
import { AdminDashboardController } from "src/app/controllers/admin/AdminDashboard.controller";
import { AdminDashboardService } from "src/app/services/admin/AdminDashboard.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";

@Module({
    imports:[...ModuleHelper],
    providers:[AdminDashboardService,...ServiceHelper],
    controllers:[AdminDashboardController]
})
export class AdminModule{}