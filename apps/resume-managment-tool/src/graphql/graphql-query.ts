import { gql } from '@apollo/client';

export const GetEmployee = gql`
    query {
        getEmployees {
            _id
            firstName
        }
    }
`;

export const CreateEmployeeMutation = gql`
    mutation createEmployee($username: ID!, $password: String!) {
        createEmployee(username: $username, password: $password) {
            userId
            username
        }
    }
`;
