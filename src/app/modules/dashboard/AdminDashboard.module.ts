import { Module } from "@nestjs/common";
import { AdminDashboardController } from "src/app/controllers/dashboard/AdminDashboard.controller";
import { UserController } from "src/app/controllers/user/User.controller";
import { AdminDasboardService } from "src/app/services/dashboard/AdminDashboard.service";
import { UserService } from "src/app/services/user/User.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";

@Module({
    imports:[...ModuleHelper],
    providers:[AdminDasboardService,...ServiceHelper],
    controllers:[AdminDashboardController]
})
export class AdminDashboardModule{}