import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { Op } from 'sequelize';
import { PaginationHelper } from 'src/app/utils/helpers/Pagination.helper';
import { hashPassword } from 'src/app/utils/auth/bcrypt';
import { SalaryService } from '../salary/Salary.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly DB:DatabaseService,
    private readonly salaryService:SalaryService
    ){}
  async all(
    page,
    limit,
    search,
    authUser,
  ) {
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    // page=1;
    // limit=2;
    const offset = (page - 1) * limit;
    let whereClause: any = {};
    if (search) {
      whereClause[Op.or] = [
        {
          firstname: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          lastname: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
      ];
    }
    console.log(whereClause);
    let totalUser = await this.DB.Models['User'].findAll({
      attributes: { exclude: ['password', 'OTP'] },
      where: [
        whereClause,
        // {[Op.not]:{role:2}}
      ],
      order: [['updatedAt', 'DESC']],
      offset: offset,
      limit: limit,
    });
    console.log(totalUser);
    
    let count = await this.DB.Models['User'].count({
      where: [
        whereClause,
        // {[Op.not]:{role:2}}
      ],
      offset: offset,
      limit: limit,
    });
    console.log(count);
    
    return PaginationHelper.Paginate(count, page, limit, totalUser);
  }
  async create(data, authUser) {
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    console.log(authUser);
    
    let findUser = await this.DB.Models['User'].findOne({
      where: { email: data.email,platform_id:authUser.platform_id },
    });
    if (findUser) {
      return {
        status: false,
        message: `Already User exist with same Email address`,
      };
    }
    let createNewUser = await this.DB.Models['User'].create({
      platform_id:authUser.platform_id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      role: 1,
      DateOfBirth: data.DateOfBirth,
      phone: data.phone,
      address: data.address,
      position: data.position,
      departement_id: data.departement_id,
      image: data.image,
      gender: data.gender,
      join_date: data.join_date,
      martial_status: data.martial_status,
      employment_Status: data.employment_Status,
      cnic:data.cnic,
      designation: data.designation
    });
    let salaryData:any={};
    salaryData.employee_id=createNewUser.id;
    salaryData.platform_id=authUser.platform_id;
    salaryData.basic=data.basic;
    // salaryData.bonus=data.bonus;
    salaryData.salary_type=data.salary_type;
    // salaryData.start_date=new Date(data.start_date);
    // salaryData.end_date=new Date(data.end_date);
    let CreateSalary= this.salaryService.addSalary(salaryData);
    
    if (createNewUser && CreateSalary) {
      return {
        status: true,
        message: 'User Successfully Created',
      };
    } else {
      return {
        status: false,
        message: 'Something Went Wrong',
      };
    }
  }
  async delete(data, authUser) {
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let findUser = await this.DB.Models['User'].findOne({
      where: { id: data.id },
    });
    if (!findUser) {
      return {
        status: false,
        message: 'Not Valid Id',
      };
    }

    let deletUser = await this.DB.Models['User'].destroy({
      where: {
        id: data.id,
      },
    });
    if (deletUser) {
      return {
        status: true,
        message: 'Success',
      };
    } else {
      return {
        status: false,
        message: 'Failed',
      };
    }
  }
  async update(data, authUser) {
    let updatedata: any = {};
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let findUser = await this.DB.Models['User'].findOne({
      where: {
        id: data.id,
      },
    });
    if (!findUser) {
      return {
        status: false,
        message: 'User not exist',
      };
    }

    if(data.password){
      updatedata.password=hashPassword(data.password)
    }
    if (data.firstname) {
      updatedata.firstname = data.firstname;
    }
    if (data.lastname) {
      updatedata.lastname = data.lastname;
    }
    if (data.email) {
      updatedata.email = data.email;
    }
    if (data.image) {
      updatedata.image = data.image;
    }
    if (data.DateOfBirth) {
      updatedata.DateOfBirth = data.DateOfBirth;
    }
    if (data.phone) {
      updatedata.phone = data.phone;
    }
    if (data.address) {
      updatedata.address = data.address;
    }
    if (data.position) {
      updatedata.position = data.position;
    }
    if (data.departement_id) {
      updatedata.departement_id = data.departement_id;
    }
    if (data.image) {
      updatedata.image = data.image;
    }
    if (data.gender) {
      updatedata.gender = data.gender;
    }
    if (data.join_date) {
      updatedata.join_date = data.join_date;
    }
    if (data.martial_status) {
      updatedata.martial_status = data.martial_status;
    }
    if (data.employment_Status) {
      updatedata.employment_Status = data.employment_Status;
    }
    if (data.designation) {
      updatedata.designation = data.designation;
    }

    let update_user = await this.DB.Models['User'].update(updatedata, {
      where: [{ id: data.id }],
    });
    if (update_user) {
      return {
        status: true,
        message: 'User Updated Successfully',
      };
    } else {
      return {
        status: false,
        message: 'Something Went Wrong',
      };
    }
  }
  async view(id, authUser) {
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }

    let searchUser = await this.DB.Models['User'].findOne({
      attributes: {
        exclude: ['password', 'forgetpasscode'],
      },
      where: { id: id },
    });
    if (searchUser) {
      const roles = searchUser.role == 2 ? 'admin' : 'user';
      return {
        status: true,
        data: { ...searchUser, roles },
      };
    } else {
      return {
        status: false,
        message: 'User not Exist',
      };
    }
  }
}
