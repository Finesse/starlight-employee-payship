import React from 'react';
import {Form} from 'react-form';
import TextField from './TextField';
import DatePicker from './DatePicker';
import {validateAnnualSalary, validateFirstName, validateLastName, validateSuperRate, validatePaymentStartDate} from '../../models/validators';
import EmployeesList from '../../contexts/EmployeesList';
import moment from 'moment';
import '../../styles/employeeForm.css';

/**
 * A form for filling an employee data.
 *
 * Saves it's data to the employee data context when submitted.
 */
export default function EmployeeForm({onSubmit})
{
  return <EmployeesList.Consumer>
    {({employee, addEmployee}) => (
      <Form onSubmit={values => {
        const employee = formValuesToEmployee(values);
        addEmployee(employee);
        onSubmit(employee);
      }}>
        {({submitForm}) => (
          <form className="employeeForm" onSubmit={submitForm}>
            <div className="employeeForm_grid">
              <TextField label="First name" field="firstName" type="text" validate={validateFirstName}/>
              <TextField label="Last name" field="lastName" type="text" validate={validateLastName}/>
              <TextField label="Annual salary" field="annualSalary" type="tel" validate={validateAnnualSalary}/>
              <TextField label="Super rate (%)" field="superRate" type="tel" validate={validateSuperRate}/>
              <DatePicker label="Payment start date" field="paymentStartDate" validate={validatePaymentStartDate}/>
            </div>
            <div className="employeeForm_footer">
              <button>Calculate</button>
            </div>
          </form>
        )}
      </Form>
    )}
  </EmployeesList.Consumer>;
}

/**
 * Converts form values to an employee data object
 *
 * @param {{}} values
 * @return {{}}
 */
function formValuesToEmployee(values)
{
  return {
    ...values,
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    annualSalary: Number(values.annualSalary.trim()),
    superRate: Number(values.superRate.trim()),
    paymentStartDate: moment(values.paymentStartDate)
  };
}

/**
 * Converts an employee data to form values
 *
 * @param {{}} employee
 * @return {{}}
 */
function employeeToFormValues(employee)
{
  if (!employee) {
    return undefined;
  }

  return {
    ...employee,
    annualSalary: String(employee.annualSalary),
    superRate: String(employee.superRate),
    paymentStartDate: employee.paymentStartDate.format()
  };
}
