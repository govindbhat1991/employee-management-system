import { useQuery } from '@apollo/client';
import { Employee, Query } from '@resume-managment-tool/api-interfaces';
import { GetEmployeeQuery } from './classic.gql';

export const useEmployeeDetailsQuery = (): Employee => {
    const { data } = useQuery<Query>(GetEmployeeQuery);

    return data?.getEmployee as Employee;
};
