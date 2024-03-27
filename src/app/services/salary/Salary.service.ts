import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { Op, Sequelize } from 'sequelize';
@Injectable()
export class SalaryService {
  constructor(private readonly DB: DatabaseService) {}

  async addSalary(data) {
    //api to add salary of employee when adding an employee
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

  async addEmployeeFinancialTransaction(data, authUser) {
    //api to add Financial Transaction/loan by any employee
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
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
    let checkRemainingAmount = await this.DB.Models[
      'FinancialTransaction'
    ].findOne({
      attributes: ['remaining_amount'],
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        return_policy: data.return_policy,
      },
      order: [['createdAt', 'DESC']], // Order by createdAt column in descending order
      limit: 1, // Limit the result to only one row
    });
    let updateRemainingAmount;
    // let remaining_amount=checkRemainingAmount.remaining_amount;
    if (
      checkRemainingAmount != null &&
      checkRemainingAmount.remaining_amount > 0
    ) {
      updateRemainingAmount =
        checkRemainingAmount.remaining_amount + data.amount;
    } else {
      updateRemainingAmount = data.amount;
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
      remaining_amount: updateRemainingAmount,
      loan_manager: data.loan_manager,
      deduct_percent: data.deduct_percent,
    });

    return createFinancialTransaction;
  }

  async generatePayroll(data, authUser) {
    // Api to generate Payroll of any specific month
    // try {
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
    let calculateFinancialTransactions = await this.DB.Models[
      'FinancialTransaction'
    ].findOne({
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        return_policy: 'Salary_deduction',
      },
      order: [['id', 'DESC']],
      limit: 1,
    });
    let updateFinancialTransaction;
    let calculatedAmount;
    let latestTransaction;
    console.log(calculateFinancialTransactions);
    
    let deduct_percent = data?.deduct_percent
      ? data?.deduct_percent
      : (calculateFinancialTransactions?.deduct_percent? calculateFinancialTransactions.deduct_percent : 0);
    console.log(deduct_percent,"percent of deduction user applied or in database");
    
    if (deduct_percent > 0) {
      console.log("checking deduct");
      
      let checkLoanAmount = calculateFinancialTransactions
        ? calculateFinancialTransactions.remaining_amount
        : 0; //500
        if(data?.deduct_percent){
          amountToSubtractFinancialTransaction =
        (deduct_percent / 100) * (calculateFinancialTransactions?.remaining_amount?calculateFinancialTransactions.remaining_amount:0); 
        console.log("Selected the deduct percent");
        // 100
        }else{
          amountToSubtractFinancialTransaction =
        (deduct_percent / 100) * (calculateFinancialTransactions?.amount?calculateFinancialTransactions.amount:0); // 100
        console.log("Selected the table defined percent");
        
        }
      // amountToSubtractFinancialTransaction =
      //   (deduct_percent / 100) * (calculateFinancialTransactions?.amount?calculateFinancialTransactions.amount:0); // 100
      // let checkUserType=checkEmployee.type
      console.log(amountToSubtractFinancialTransaction,"amount to subtract from financial transaction");
      if(amountToSubtractFinancialTransaction>checkLoanAmount){
        return{
          status:false,
          message:"Amount to deduct is more than amount remaining"
        }
      }
      calculatedAmount = (checkLoanAmount - amountToSubtractFinancialTransaction)?(checkLoanAmount - amountToSubtractFinancialTransaction):0; //500 Loan - 40 return => 460
      console.log(calculatedAmount,"Calculated amount greater or less");
      //to find latest created Row in database
      latestTransaction = await this.DB.Models['FinancialTransaction'].findOne({
        where: {
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
          return_policy: 'Salary_deduction',
        },
        order: [['id', 'DESC']], // Order by id in descending order to get the latest row
      });
      if (latestTransaction) {
        updateFinancialTransaction = await this.DB.Models[
          'FinancialTransaction'
        ].update(
          { remaining_amount: calculatedAmount },
          {
            where: {
              id: latestTransaction.id,
              employee_id: data.employee_id,
              platform_id: authUser.platform_id,
              return_policy: 'Salary_deduction',
            },
          },
        );
      }
    }
    if (calculatedAmount > 0) {
      await this.DB.Models['Deduction'].create({
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        transaction_id: latestTransaction.id,
        deduction_type: 'Salary_deduction',
        transaction_amount: latestTransaction.remaining_amount,
        deduction_amount: amountToSubtractFinancialTransaction,
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
        // [Op.and]: [
        //   // Check if the given month falls within the specified duration
        //   Sequelize.literal(
        //     `YEAR(start_date) <= ${yearToFind} AND YEAR(end_date) >= ${yearToFind} AND MONTH(start_date) <= ${monthToFind} AND MONTH(end_date) >= ${monthToFind}`,
        //   ),
        // ],
      },
    });
    if (!checkSalary) {
      return {
        status: true,
        message:
          'Please Enter Correct Month and Date for Employee as there is no Salary record',
      };
    }
    let perDaySalary = 0;

    const month = monthToFind; // March
    const year = yearToFind;
    const numberOfDays = await this.getDayCountOfMonth(year, month);

    let totalMonthSalary = checkSalary
      ? checkSalary.basic + checkSalary.bonus + checkSalary.medical_allowence
      : 0;
    let daily_salary;
    //Check User base on daily, Weekly and Montly

    let attendenceAbsentAmount;
    if (checkSalary.salary_type == 'Daily') {
      perDaySalary = 1 * (totalMonthSalary / numberOfDays); // 100%
    } else if (checkSalary.salary_type == 'Weekly') {
      perDaySalary = 1 * (totalMonthSalary / numberOfDays); // 85%
    } else if (checkSalary.salary_type == 'Monthly') {
      perDaySalary = 1 * (totalMonthSalary / numberOfDays); // 70%
    } else {
      perDaySalary = 1 * (totalMonthSalary / numberOfDays);
    }
    attendenceAbsentAmount = calculateAttendance.count * perDaySalary;

    if (attendenceAbsentAmount > 0) {
      await this.DB.Models['Deduction'].create({
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        transaction_id: null,
        deduction_type: 'Attendance_absent',
        transaction_amount: attendenceAbsentAmount,
        deduction_amount: attendenceAbsentAmount,
        amountToSubtractFinancialTransaction,
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
        return_policy: 'Salary_deduction',
      },
      order: [['id', 'DESC']],
    });
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
    if (Payroll > 0) {
      let addPayroll = await this.DB.Models['Payroll'].create({
        platform_id: authUser.platform_id,
        employee_id: data.employee_id,
        amount: Payroll ? Payroll : 0,
        deduction_type: 'Paid',
        transaction_Date: new Date(),
      });
    }

    //check Cash_payements Loan:
    let calculateCashPaymentFinancialTransactions = await this.DB.Models[
      'FinancialTransaction'
    ].findOne({
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        return_policy: 'Cash_payment',
      },
      order: [['id', 'DESC']],
      limit: 1,
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
      advance_salary_payment_previous: calculateFinancialTransactions
        ? calculateFinancialTransactions.remaining_amount
        : 0,
      advance_salary_payment_deduct: amountToSubtractFinancialTransaction
        ? amountToSubtractFinancialTransaction
        : 0,
      advance_salary_payment_remaining: calFinancTransactions
        ? calFinancTransactions.remaining_amount
        : 0,
      advance_cash_payment_remaining: calculateCashPaymentFinancialTransactions
        ? calculateCashPaymentFinancialTransactions.remaining_amount
        : 0,
      attendence_absent_amount: attendenceAbsentAmount,
      deduction_percent: Number(deduct_percent),
      payroll: Payroll,
      no_of_days_count: numberOfDays,
      Attendence_Data: showAllAttendance,
    };
    // } catch (error) {
    //   return {
    //     status: false,
    //     message: 'An error occurred while calculating salary',
    //   };
    // }
  }

  async getDayCountOfMonth(year, month) {
    // function to calculate number of days in a month exclude the sunday
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

  async addCashPayement(data, authUser) {
    // api to update cash payment deductions of employee
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let whereClause: any = {};
    if (data.return_type == 'Cash_payment') {
      whereClause.return_policy = data.return_type;
    } else if (data.return_type == 'Salary_deduction') {
      whereClause.return_policy = data.return_type;
    } else {
      return {
        status: false,
        message: 'Not valid selection',
      };
      // whereClause[Op.or] = [
      //   { return_policy: 'Cash_payment' },
      //   { return_policy: 'Salary_deduction' },
      // ];
    }
    let checkFinancialTransactions = await this.DB.Models[
      'FinancialTransaction'
    ].findOne({
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        ...whereClause,
      },
      order: [['id', 'DESC']],
      limit: 1,
    });
    if (!checkFinancialTransactions) {
      return {
        status: false,
        message: 'not exist any record for this specfic return policy',
      };
    } else if (checkFinancialTransactions.remaining_amount <= data.amount) {
      return {
        message: `Amount paying are more than loan amount,  to_pay:${checkFinancialTransactions.remaining_amount} , paying : ${data.amount}
        `,
      };
    }
    let newAmount = checkFinancialTransactions.remaining_amount - data.amount;

    let updateFinancialTransaction = await this.DB.Models[
      'FinancialTransaction'
    ].update(
      {
        remaining_amount: newAmount,
      },
      {
        where: {
          id: checkFinancialTransactions.id,
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
        },
      },
    );

    if (updateFinancialTransaction) {
      let addDeduction = await this.DB.Models['Deduction'].create({
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        transaction_id: checkFinancialTransactions.id,
        deduction_type: data.return_type,
        transaction_amount: checkFinancialTransactions.remaining_amount,
        deduction_amount: data.amount,
        date: new Date(),
      });
      if (addDeduction) {
        return {
          status: true,
          message: 'Updated Successfully',
        };
      }
    } else {
      return {
        message: 'Not updating',
      };
    }
  }

  async getEmployeeFinancialTransactions(data, authUser) {
    // to get All records of employee financial transaction
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let whereClause: any = {};
    if (data.return_policy) {
      //Check the return Policy filter
      if (data.return_policy == 'Cash_payment') {
        whereClause.return_policy = data.return_policy;
      } else if (data.return_policy == 'Salary_deduction') {
        whereClause.return_policy = data.return_policy;
      }
    }
    if (data.start && data.end) {
      //Check the specific date Data filter
      whereClause[Op.and] = {
        createdAt: {
          [Op.gte]: data.start, // Greater than or equal to the start date
          [Op.lte]: data.end, // Less than or equal to the end date
        },
      };
    }
    let checkFinancialTransactions = await this.DB.Models[
      'FinancialTransaction'
    ].findAll({
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        ...whereClause,
      },
      order: [['createdAt', 'DESC']],
    });
    if (!checkFinancialTransactions) {
      return {
        status: false,
        message: 'not exist any record for this specfic return policy',
      };
    }
    return checkFinancialTransactions;
  }

  async viewdeduction(data, authUser) {
    // to get All deduction history of specific employee
    if (authUser.role != 2) {
      return {
        status: false,
        message: 'Not an Admin',
      };
    }
    let whereClause: any = {};
    if (data.deduction_type) {
      //Check the return Policy filter
      if (data.deduction_type == 'Cash_payment') {
        whereClause.deduction_type = data.deduction_type;
      } else if (data.deduction_type == 'Salary_deduction') {
        whereClause.deduction_type = data.deduction_type;
      } else if (data.deduction_type == 'Attendance_absent') {
        whereClause.deduction_type = data.deduction_type;
      }
    }
    if (data.start && data.end) {
      //Check the specific date Data filter
      whereClause[Op.and] = {
        createdAt: {
          [Op.gte]: data.start, // Greater than or equal to the start date
          [Op.lte]: data.end, // Less than or equal to the end date
        },
      };
    }
    let checkdeduction = await this.DB.Models['Deduction'].findAll({
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        ...whereClause,
      },
      order: [['createdAt', 'DESC']],
    });
    if (!checkdeduction) {
      return {
        status: false,
        data: [],
      };
    }
    return checkdeduction;
  }

  async calculatePayroll(data, authUser) {
    // Api to Calculate the Payroll before generate final Payroll and update on database
    // try {
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

    let calculateFinancialTransactions = await this.DB.Models[
      'FinancialTransaction'
    ].findOne({
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        return_policy: 'Salary_deduction',
      },
      order: [['id', 'DESC']],
      limit: 1,
    });
    let updateFinancialTransaction;
    let calculatedAmount;
    let latestTransaction;
    let deduct_percent = data?.deduct_percent
      ? data?.deduct_percent
      : (calculateFinancialTransactions?.deduct_percent? calculateFinancialTransactions.deduct_percent : 0);
    console.log(deduct_percent,"percent of deduction user applied or in database");
    

    if (deduct_percent > 0) {
      let checkLoanAmount = calculateFinancialTransactions
        ? calculateFinancialTransactions.remaining_amount
        : 0; //500

        amountToSubtractFinancialTransaction =
        (deduct_percent / 100) * (calculateFinancialTransactions?.amount?calculateFinancialTransactions.amount:0); // 100
      // let checkUserType=checkEmployee.type
      console.log(amountToSubtractFinancialTransaction,"amount to subtract from financial transaction");
      
      calculatedAmount = (checkLoanAmount - amountToSubtractFinancialTransaction)?(checkLoanAmount - amountToSubtractFinancialTransaction):0; //500 Loan - 40 return => 460
      console.log(calculatedAmount,"Calculated amount"); //500 - 100 => 400
      //to find latest created Row in database
      latestTransaction = await this.DB.Models['FinancialTransaction'].findOne({
        where: {
          employee_id: data.employee_id,
          platform_id: authUser.platform_id,
          return_policy: 'Salary_deduction',
        },
        order: [['id', 'DESC']], // Order by id in descending order to get the latest row
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
            `YEAR(start_date) <= ${yearToFind} AND YEAR(end_date) >= ${yearToFind} AND MONTH(start_date) <= ${monthToFind} AND MONTH(end_date) >= ${monthToFind}`,
          ),
        ],
      },
    });
    if (!checkSalary) {
      return {
        status: true,
        message:
          'Please Enter Correct Month and Date for Employee as there is no Salary record',
      };
    }
    let perDaySalary = 0;

    const month = monthToFind; // March
    const year = yearToFind;
    const numberOfDays = await this.getDayCountOfMonth(year, month);

    let totalMonthSalary = checkSalary
      ? checkSalary.basic + checkSalary.bonus + checkSalary.medical_allowence
      : 0;
    let daily_salary;
    //Check User base on daily, Weekly and Montly
    let attendenceAbsentAmount;
    if (checkSalary.salary_type == 'Daily') {
      perDaySalary = 1 * (totalMonthSalary / numberOfDays); // 100%
    } else if (checkSalary.salary_type == 'Weekly') {
      perDaySalary = 1 * (totalMonthSalary / numberOfDays); // 85%
    } else if (checkSalary.salary_type == 'Monthly') {
      perDaySalary = 1 * (totalMonthSalary / numberOfDays); // 70%
    } else {
      perDaySalary = 1 * (totalMonthSalary / numberOfDays);
    }
    attendenceAbsentAmount = calculateAttendance.count * perDaySalary;
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
        return_policy: 'Salary_deduction',
      },
      order: [['id', 'DESC']],
    });
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

    //check Cash_payements Loan:
    let calculateCashPaymentFinancialTransactions = await this.DB.Models[
      'FinancialTransaction'
    ].findOne({
      where: {
        employee_id: data.employee_id,
        platform_id: authUser.platform_id,
        return_policy: 'Cash_payment',
      },
      order: [['id', 'DESC']],
      limit: 1,
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
      advance_salary_payment_previous: calculateFinancialTransactions
        ? calculateFinancialTransactions.remaining_amount
        : 0,
      advance_salary_payment_will_deduct: amountToSubtractFinancialTransaction
        ? amountToSubtractFinancialTransaction
        : 0,
      advance_salary_payment_will_remaining: calFinancTransactions
        ? calFinancTransactions.remaining_amount -
          amountToSubtractFinancialTransaction
        : 0,
      advance_cash_payment_remaining: calculateCashPaymentFinancialTransactions
        ? calculateCashPaymentFinancialTransactions.remaining_amount
        : 0,
      attendence_absent_amount: attendenceAbsentAmount,
      deduction_percent: Number(deduct_percent),
      payroll: Payroll,
      no_of_days_count: numberOfDays,
      Attendence_Data: showAllAttendance,
    };
    // } catch (error) {
    //   return {
    //     status: false,
    //     message: 'An error occurred while calculating salary',
    //   };
    // }
  }
}
