import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    Certification,
    Mutation,
    MutationCreateCertificationArgs,
    MutationDeleteCertificationArgs,
    MutationUpdateCertificationArgs,
    Query,
    QueryGetCertificationArgs,
} from '@resume-managment-tool/api-interfaces';
import {
    CreateCertificationMutation,
    DeleteCertificationMutation,
    GetCertificationQuery,
    GetCertificationsQuery,
    UpdateCertificationMutation,
} from './certification.gql';

export const useCertificationsQuery = () => {
    const { data, refetch } = useQuery<Query>(GetCertificationsQuery);

    return { data: data?.getCertifications as Certification[], refetch };
};

export const useCertificationQuery = () => {
    const [query, { data, error, refetch }] = useLazyQuery<Query, QueryGetCertificationArgs>(
        GetCertificationQuery,
        {
            fetchPolicy: 'cache-and-network',
        }
    );
    return { query, data, error, refetch };
};

export const useCreateCertification = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationCreateCertificationArgs>(
        CreateCertificationMutation,
        {
            refetchQueries: [
                {
                    query: GetCertificationsQuery,
                },
            ],
        }
    );
    return { mutation, data, error };
};

export const useUpdateCertification = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationUpdateCertificationArgs>(
        UpdateCertificationMutation
    );
    return { mutation, data, error };
};

export const useDeleteCertification = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationDeleteCertificationArgs>(
        DeleteCertificationMutation,
        {
            refetchQueries: [
                {
                    query: GetCertificationsQuery,
                },
            ],
        }
    );
    return { mutation, data, error };
};
