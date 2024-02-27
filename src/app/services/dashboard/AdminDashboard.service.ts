import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { Op } from 'sequelize';
import { PaginationHelper } from 'src/app/utils/helpers/Pagination.helper';
import { hashPassword } from 'src/app/utils/auth/bcrypt';

@Injectable()
export class AdminDasboardService {
  constructor(private readonly DB: DatabaseService) {}
  async totalUserDisplay(
    role,
    activity,
    page,
    limit,
    search,
    authUser,
  ) {
    // let offset = (page - 1) * limit;
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let whereClause: any = {};
    if (search) {
      whereClause[Op.or] = [
        {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
        // {
        //     activity: {
        //       [Op.like]: `%${search}%`,
        //     },
        //   },
      ];
    }
    if (role) {
      if (
        role != 'Admin' &&
        role != 'Host' &&
        role != 'Co-Host' &&
        role != 'Speaker' &&
        role != 'Standard User'
      ) {
        //
        return {
          status: false,
          message: `Not Valid selection of User Role, Enter role as Admin, Host, Co-Host, Speaker or Standard User `,
        };
        //role 2 for Admin, role 3 for Host, role 4 for Co-Host, role 5 for Speaker and role 6 for Standard User
      } else {
        if (role == 'Admin') {
          whereClause.role = 2;
        } else if (role == 'Host') {
          whereClause.Role = 3;
        } else if (role == 'Co-Host') {
          whereClause.role = 4;
        } else if (role == 'Speaker') {
          whereClause.role = 5;
        } else if (role == 'Standard User') {
          whereClause.role = 6;
        } else {
          return {
            status: false,
            message: 'not valid selection of User Role',
          };
        }
      }
    }
    if (activity) {
      if (
        activity != 'Game Zone' &&
        activity != 'Software House' &&
        activity != 'Library' &&
        activity != 'Software Agency' &&
        activity != 'Cinema' &&
        activity != 'School'
      ) {
        //
        return {
          status: false,
          message: `Not Valid selection of Activty`,
        };
        //role 2 for Admin, role 3 for Host, role 4 for Co-Host, role 5 for Speaker and role 6 for Standard User
      } else {
        whereClause.activity = activity;
      }
    }
    console.log(whereClause);

    // console.log(PaginationHelper.getLimit(limit),"limitttttttttttttt");
    let totalUser = await this.DB.Models['User'].findAll({
      attributes: { exclude: ['password', 'forgetpasscode'] },
      where: [
        whereClause,
        // {[Op.not]:{role:2}}
      ],
      order: [['updatedAt', 'DESC']],
      limit: PaginationHelper.getLimit(limit),
      offset: PaginationHelper.getCustomPageOffset(page, limit),
    });

    let count = await this.DB.Models['User'].count({
      where: [
        whereClause,
        // {[Op.not]:{role:2}}
      ],
    });
    return PaginationHelper.Paginate(count, page, limit, totalUser);
  }
  async adminCreateNewUser(data, authUser) {
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    console.log(data.role);
    let findUser = await this.DB.Models['User'].findOne({
      attributes: ['username'],
      where: { email: data.email },
    });
    if (findUser) {
      return {
        status: false,
        message: `Already User exist with username ${findUser.username} with same Email address`,
      };
    }
    let userRole;
    if (
      data.role != 'Admin' &&
      data.role != 'Host' &&
      data.role != 'Co-Host' &&
      data.role != 'Speaker' &&
      data.role != 'Standard User'
    ) {
      //
      return {
        status: false,
        message: `Not Valid selection of User Role, Enter role as Admin, Host, Co-Host, Speaker or Standard User `,
      };
      //role 2 for Admin, role 3 for Host, role 4 for Co-Host, role 5 for Speaker and role 6 for Standard User
    } else {
      if (data.role == 'Standard User') {
        userRole = 1;
      } else if (data.role == 'Admin') {
        userRole = 2;
      } else if (data.role == 'Guest') {
        userRole = 3;
      } else if (data.role == 'Host') {
        userRole = 4;
      } else if (data.role == 'Co-Host') {
        userRole = 5;
      }else if (data.role == 'Speaker') {
        userRole = 6;
      } else {
        return {
          status: false,
          message: 'not valid selection of User Role',
        };
      }
    }

    let hashpass = hashPassword(data.password);
    let createNewUser = await this.DB.Models['User'].create({
      full_name: data.full_name,
      email: data.email,
      password: hashpass,
      role: userRole,
    });
    if (createNewUser) {
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
  async validateId(id, authId) {
    for (let i = 0; i < id.length; i++) {
      console.log('Validate user id' + id[i]);
      let UserValidate = await this.DB.Models['User'].findOne({
        where: { id: id[i] },
      });
      if (!UserValidate) {
        return {
          status: false,
        };
      } else if (UserValidate.id == authId) {
        return {
          status: false,
        };
      } else if (UserValidate.role == 2) {
        return {
          status: false,
        };
      }
    }
  }
  async adminDeleteUser(data, authUser) {
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let check = await this.validateId(data.id, authUser.id);
    if (check?.status == false) {
      return {
        status: false,
        message: 'One or more Id not exist in Database',
      };
    }
    let findUser = await this.DB.Models['User'].findAll({
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
  async adminUpdateUser(data, authUser) {
    let updatedata: any = {};
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let findUser = await this.DB.Models['User'].findOne({
      attributes: ['role'],
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
    if (data.role) {
      if (
        data.role != 'Admin' &&
        data.role != 'Host' &&
        data.role != 'Co-Host' &&
        data.role != 'Speaker' &&
        data.role != 'Standard User'
      ) {
        //
        return {
          status: false,
          message: `Not Valid selection of User Role, Enter role as Admin, Host, Co-Host, Speaker or Standard User `,
        };
        //role 2 for Admin, role 3 for Host, role 4 for Co-Host, role 5 for Speaker and role 6 for Standard User
      } else {
        if (data.role == 'Standard User') {
          updatedata.role = 1;
        } else if (data.role == 'Admin') {
          updatedata.role = 2;
        } else if (data.role == 'Guest') {
          updatedata.role = 3;
        } else if (data.role == 'Host') {
          updatedata.role = 4;
        } else if (data.role == 'Co-Host') {
          updatedata.role = 5;
        } else if (data.role == 'Speaker') {
          updatedata.role = 6;
        } else {
          return {
            status: false,
            message: 'not valid selection of User Role',
          };
        }
      }
    }
    if (data.fullname) {
      updatedata.username = data.fullname;
    }
    if (data.email) {
      updatedata.email = data.email;
    }
    if (data.password) {
      updatedata.password = hashPassword(data.password);
    }
    if (data.image) {
      updatedata.image = data.image;
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
  async viewUser(id, authUser) {
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
