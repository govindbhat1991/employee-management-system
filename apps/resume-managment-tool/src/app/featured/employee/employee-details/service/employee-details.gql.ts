import { gql } from '@apollo/client';

export const AddressFragment = gql`
    fragment AddressFragment on AddressModel {
        adressLine1
        adressLine2
        adressLine3
        city
        zipcode
        country
    }
`;

export const GetEmployeeQuery = gql`
    query {
        getEmployee {
            _id
            firstName
            middleName
            lastName
            contact {
                email
                phoneNumber
                permanentAddress {
                    adressLine1
                    adressLine2
                    adressLine3
                    city
                    zipcode
                    country
                }
            }
        }
    }
`;

export const UpdateEmployeeMutation = gql`
    mutation updateEmployee($employeeInput: UpdateEmployeeInput!) {
        updateEmployee(employeeInput: $employeeInput) {
            _id
            firstName
            middleName
            lastName
            gender
            dob
            language
            contact {
                permanentAddress {
                    adressLine1
                    adressLine2
                    adressLine3
                    city
                    zipcode
                    country
                }
                email
                phoneNumber
            }
        }
    }
`;
