import { gql } from '@apollo/client';

export const LoginQuery = gql`
    query login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;
