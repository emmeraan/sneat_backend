import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { Op, Sequelize } from 'sequelize';
@Injectable()
export class SalaryService {
  constructor(private readonly DB: DatabaseService) {}

  async addSalary(data) {
    console.log(data);
    let createSalary = await this.DB.Models['Salary'].create({
      employee_id: data.employee_id,
      platform_id: data.platform_id,
      basic: data.basic,
      medical_allowence: data.medical_allowence,
      bonus: data.bonus,
      salary_type: data.salary_type,
      start_date: data.start_date,
      end_date: data.end_date,
    });
  }

  async employeeFinancialTransaction(data, authUser) {
    console.log(data, authUser);

    let currentDate = new Date();
    let checkEmployee = await this.DB.Models['User'].findOne({
      where: {
        id: data.employee_id,
        platform_id: authUser.platform_id,
      },
    });
    if (!checkEmployee) {
      return {
        status: false,
        message: 'Invalid Employee ID',
      };
    }
    let createFinancialTransaction = await this.DB.Models[
      'FinancialTransaction'
    ].create({
      platform_id: authUser.platform_id,
      employee_id: data.employee_id,
      amount: data.amount,
      transaction_type: data.transaction_type,
      transaction_date: currentDate,
      return_policy: data.return_policy,
    });

    return createFinancialTransaction;
  }

  async calculateSalary(data, authUser) {
    try {
      if (authUser.role != 2) {
        return {
          status: false,
          message: 'Not an Admin',
        };
      }
      var Datesplit = data.date.split('-');
      let amountToSubtractFinancialTransaction;
      let checkEmployee = await this.DB.Models['User'].findOne({
        where: {
          id: data.employee_id,
          platform_id: authUser.platform_id,
        },
      });
      if (!checkEmployee) {
        return {
          status: false,
          message: 'Invalid Employee ID',
        };
      }
      console.log(Datesplit[0], (Datesplit[1]));

      const monthToFind = parseInt(Datesplit[0]);
      const yearToFind = parseInt(Datesplit[1]);
      const calculateAttendance = await this.DB.Models[
        'Attendence'
      ].findAndCountAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { status: 'Absent' },
                { [Op.and]: [{ status: 'Leave' }, { leave_type: 'UnPaid' }] },
              ],
            },
            Sequelize.where(
              Sequelize.fn('MONTH', Sequelize.col('createdAt')),
              monthToFind,
            ),
          ],
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
        },
      });
      console.log('Attendence Calculation', calculateAttendance);

      let calculateFinancialTransactions = await this.DB.Models[
        'FinancialTransaction'
      ].findOne({
        where: {
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
        },
      });

      let updateFinancialTransaction;
      let newAmount;
      if (data.amountPercent > 0) {
        let transitAmount = calculateFinancialTransactions.amount;
        amountToSubtractFinancialTransaction =
          (data.amountPercent / 100) * transitAmount;
        // let checkUserType=checkEmployee.type
        newAmount = transitAmount - amountToSubtractFinancialTransaction;
        updateFinancialTransaction = await this.DB.Models[
          'FinancialTransaction'
        ].update(
          { amount: newAmount },
          {
            where: {
              employee_id: data.employee_id,
              platform_id: authUser.platform_id,
              transaction_date: {
                [Op.and]: [
                  Sequelize.where(
                    Sequelize.fn('MONTH', Sequelize.col('transaction_date')),
                    monthToFind,
                  ),
                ],
              },
            },
          },
        );
      }
      if (newAmount > 0) {
        await this.DB.Models['Deduction'].create({
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
          deduction_type: 'Advance Payment Deduction',
          amount: newAmount,
          date: new Date(),
        });
      }

      let checkSalary = await this.DB.Models['Salary'].findOne({
        attributes: [
          'start_date',
          'end_date',
          'basic',
          'bonus',
          'medical_allowence',
          'salary_type',
        ],
        where: {
          platform_id: authUser.platform_id,
          employee_id: data.employee_id,
          [Op.and]: [
            // Check if the given month falls within the specified duration
            Sequelize.literal(
              `MONTH(start_date) <= ${monthToFind} AND MONTH(end_date) >= ${monthToFind}`,
            ),
          ],
        },
      });
      let deductionPercentage = 0;

      const month = monthToFind; // March
      const year = yearToFind;
      const numberOfDays = await this.getDayCountOfMonth(year, month);
      console.log(
        `//////////////////Number of days in March 2024 (excluding Sundays): ${numberOfDays}`,
      );

      let totalMonthSalary = checkSalary
        ? checkSalary.basic + checkSalary.bonus + checkSalary.medical_allowence
        : 0;
      let daily_salary;
      //Check User base on daily, Weekly and Montly
      let attendenceAbsentAmount;
      if (checkSalary.salary_type == 'Daily') {
        deductionPercentage = 1 * (totalMonthSalary / numberOfDays); // 100%
        console.log('Deduct 100 percent');
      } else if (checkSalary.salary_type == 'Weekly') {
        deductionPercentage = 0.85 * (totalMonthSalary / numberOfDays); // 85%
        console.log('deduct 85 percent');
      } else if (checkSalary.salary_type == 'Monthly') {
        deductionPercentage = 0.7 * (totalMonthSalary / numberOfDays); // 70%
        console.log('deduct 70 percent');
      } else {
        deductionPercentage = 1 * (totalMonthSalary / numberOfDays);
        console.log('deduct 100 percentss');
      }
      attendenceAbsentAmount = calculateAttendance.count * deductionPercentage;
      console.log(attendenceAbsentAmount);

      if (attendenceAbsentAmount > 0) {
        await this.DB.Models['Deduction'].create({
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
          deduction_type: 'Attendance Absent',
          amount: attendenceAbsentAmount,
          date: new Date(),
        });
      }

      let Payroll =
        totalMonthSalary -
        attendenceAbsentAmount -
        amountToSubtractFinancialTransaction;

      //check remaining financial Transaction Amount
      let calFinancTransactions = await this.DB.Models[
        'FinancialTransaction'
      ].findOne({
        where: {
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
        },
      });
      console.log('checkkk');
      const currentYear = new Date().getFullYear();
      const showAllAttendance = await this.DB.Models['Attendence'].findAll({
        where: {
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('MONTH', Sequelize.col('checkin')),
              '=',
              monthToFind,
            ),
            Sequelize.where(
              Sequelize.fn('YEAR', Sequelize.col('checkin')),
              '=',
              currentYear,
            ), // Assuming yearToFind is available
          ],
        },
      });

      let addPayroll = await this.DB.Models['Payroll'].create({
        platform_id: authUser.platform_id,
        employee_id: data.employee_id,
        amount: Payroll,
        deduction_type: 'Paid',
        transaction_Date: new Date(),
      });

      return {
        status: true,
        username: checkEmployee.firstname + checkEmployee.lastname,
        address: checkEmployee.address,
        working_type: checkEmployee.work_frequency,
        departement: checkEmployee.departement,
        position: checkEmployee.position,
        basic: checkSalary.basic,
        bonus: checkSalary.bonus,
        medical_allowence: checkSalary.medical_allowence,
        advance_payment_previous_month: calculateFinancialTransactions.amount,
        advance_payment_paid: amountToSubtractFinancialTransaction,
        advance_payment_remaining: calFinancTransactions.amount,
        attendence_absent_amount: attendenceAbsentAmount,
        payroll: Payroll,
        Attendence_Data: showAllAttendance,
      };
    } catch (error) {
      return {
        status: false,
        message: 'An error occurred while calculating salary',
      };
    }
  }

  async getDayCountOfMonth(year, month) {
    // Use 1 for January, 2 for February, etc.
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    // Count the number of Sundays (day 0) in the month
    let sundayCount = 0;
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const currentDate = new Date(year, month - 1, day);
      if (currentDate.getDay() === 0) {
        sundayCount++;
      }
    }

    // Subtract Sundays from the total days
    const daysExcludingSundays = lastDayOfMonth - sundayCount;
    return daysExcludingSundays;
  }
}
