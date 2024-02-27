import { Module } from "@nestjs/common";
import { UserController } from "src/app/controllers/user/User.controller";
import { UserService } from "src/app/services/user/User.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";

@Module({
    imports:[...ModuleHelper],
    providers:[UserService,...ServiceHelper],
    controllers:[UserController]
})
export class UserModule{}