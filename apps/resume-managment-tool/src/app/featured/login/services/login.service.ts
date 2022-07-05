import { useLazyQuery } from '@apollo/client';
import { LoginQuery } from './login.gql';

export const useLoginQuery = () => {
    const [query, { data, error }] = useLazyQuery(LoginQuery);
    return { query, data, error };
};
