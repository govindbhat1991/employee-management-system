import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    Academics,
    Mutation,
    MutationCreateAcademicsArgs,
    MutationDeleteAcademicsArgs,
    MutationUpdateAcademicsArgs,
    Query,
    QueryGetAcademicArgs,
} from '@resume-managment-tool/api-interfaces';
import {
    CreateAcademicsMutation,
    DeleteAcademicsMutation,
    GetAcademicQuery,
    GetAcademicsQuery,
    UpdateAcademicsMutation,
} from './academics.gql';

export const useAcademicsQuery = () => {
    const { data, refetch } = useQuery<Query>(GetAcademicsQuery);

    return { data: data?.getAcademics as Academics[], refetch };
};

export const useAcademicQuery = () => {
    const [query, { data, error, refetch }] = useLazyQuery<Query, QueryGetAcademicArgs>(
        GetAcademicQuery,
        {
            fetchPolicy: 'cache-and-network',
        }
    );
    return { query, data, error, refetch };
};

export const useCreateAcademics = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationCreateAcademicsArgs>(
        CreateAcademicsMutation,
        {
            refetchQueries: [
                {
                    query: GetAcademicsQuery,
                },
            ],
        }
    );
    return { mutation, data, error };
};

export const useUpdateAcademics = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationUpdateAcademicsArgs>(
        UpdateAcademicsMutation
    );
    return { mutation, data, error };
};

export const useDeleteAcademics = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationDeleteAcademicsArgs>(
        DeleteAcademicsMutation,
        {
            refetchQueries: [
                {
                    query: GetAcademicsQuery,
                },
            ],
        }
    );
    return { mutation, data, error };
};
