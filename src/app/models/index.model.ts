import { FinancialTransaction } from "./FinancialTransactions.model";
import { Attendence } from "./Attendence.model";
import { Customer } from "./Customer.model";
import { Deduction } from "./Deduction.model";
import { Payroll } from "./Payroll.model";
import { Product } from "./Product.model";
import { Salary } from "./Salary.model";
import { User } from "./User.model";
import { Vendor } from "./Vendor.model";
import { Platform } from "./Platform.model";
import { Departments } from "./Departments.model";
import { Position } from "./position.model";


export const Models = [
    User, Vendor, Customer, Product, Attendence, Salary, Deduction, Payroll, FinancialTransaction,Platform , Departments , Position
];

export const ModelNames = [
    'User', 'Vendor', 'Customer', 'Product', 'Attendence','Salary','Deduction', 'Payroll', 'FinancialTransaction','Platform','Departments','Position'
]