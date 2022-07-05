import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    Mutation,
    MutationCreateWorkExperienceArgs,
    MutationDeleteWorkExperienceArgs,
    MutationUpdateWorkExperienceArgs,
    Query,
    QueryGetWorkExperienceArgs,
    WorkExperience,
} from '@resume-managment-tool/api-interfaces';
import {
    CreateWorkExperienceMutation,
    DeleteWorkExperienceMutation,
    GetWorkExperienceQuery,
    GetWorkExperiencesQuery,
    UpdateWorkExperienceMutation,
} from './work-experience.gql';

export const useWorkExperiencesQuery = () => {
    const { data, refetch } = useQuery<Query>(GetWorkExperiencesQuery);
    return { data: data?.getWorkExperiences as WorkExperience[], refetch };
};

export const useWorkExperienceQuery = () => {
    const [query, { data, error, refetch }] = useLazyQuery<Query, QueryGetWorkExperienceArgs>(
        GetWorkExperienceQuery,
        {
            fetchPolicy: 'cache-and-network',
        }
    );
    return { query, data, error, refetch };
};

export const useCreateWorkExperience = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationCreateWorkExperienceArgs>(
        CreateWorkExperienceMutation,
        {
            refetchQueries: [
                {
                    query: GetWorkExperiencesQuery,
                },
            ],
        }
    );
    return { mutation, data, error };
};

export const useUpdateWorkExperience = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationUpdateWorkExperienceArgs>(
        UpdateWorkExperienceMutation
    );
    return { mutation, data, error };
};

export const useDeleteWorkExperience = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationDeleteWorkExperienceArgs>(
        DeleteWorkExperienceMutation,
        {
            refetchQueries: [
                {
                    query: GetWorkExperiencesQuery,
                },
            ],
        }
    );
    return { mutation, data, error };
};
