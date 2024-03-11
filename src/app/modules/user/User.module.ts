import { Module } from "@nestjs/common";
import { CustomerController } from "src/app/controllers/customer/Customer.controller";
import { ProductController } from "src/app/controllers/product/Product.controller";
import { UserController } from "src/app/controllers/user/User.controller";
import { VendorController } from "src/app/controllers/vendor/Vendor.controller";
import { CustomerService } from "src/app/services/customer/Customer.service";
import { ProductService } from "src/app/services/product/AddProduct.service";
import { UserService } from "src/app/services/user/User.service";
import { VendorService } from "src/app/services/vendor/Vendor.service";
import { ModuleHelper } from "src/app/utils/helpers/Module.helper";
import { ServiceHelper } from "src/app/utils/helpers/Service.helper";

@Module({
    imports:[...ModuleHelper],
    providers:[UserService,CustomerService,VendorService,ProductService,...ServiceHelper],
    controllers:[UserController,CustomerController,VendorController,ProductController]
})
export class UserModule{}