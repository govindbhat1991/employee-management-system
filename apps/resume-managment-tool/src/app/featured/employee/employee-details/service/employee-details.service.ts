import { useMutation, useQuery } from '@apollo/client';
import {
    Employee,
    Mutation,
    MutationUpdateEmployeeArgs,
    Query,
} from '@resume-managment-tool/api-interfaces';
import { GetEmployeeQuery, UpdateEmployeeMutation } from './employee-details.gql';

export const useEmployeeDetailsQuery = (): Employee => {
    const { data } = useQuery<Query>(GetEmployeeQuery);

    return data?.getEmployee as Employee;
};

export const useUpdateEmployeeDetails = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationUpdateEmployeeArgs>(
        UpdateEmployeeMutation
    );
    return { mutation, data, error };
};
