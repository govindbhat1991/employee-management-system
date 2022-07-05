import { Employee } from '@resume-managment-tool/api-interfaces';

export type EmployeeDetailsFormInput = Pick<
    Employee,
    'contact' | 'dob' | 'firstName' | 'gender' | 'language' | 'lastName' | 'middleName'
>;
