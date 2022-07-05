import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
    Mutation,
    MutationCreateProjectArgs,
    MutationDeleteProjectArgs,
    MutationUpdateProjectArgs,
    Project,
    Query,
    QueryGetProjectArgs,
} from '@resume-managment-tool/api-interfaces';
import {
    CreateProjectMutation,
    DeleteProjectMutation,
    GetProjectQuery,
    GetProjectsQuery,
    UpdateProjectMutation,
} from './projects.gql';

export const useProjectsQuery = () => {
    const { data, refetch } = useQuery<Query>(GetProjectsQuery);

    return { data: data?.getProjects as Project[], refetch };
};

export const useProjectQuery = () => {
    const [query, { data, error, refetch }] = useLazyQuery<Query, QueryGetProjectArgs>(
        GetProjectQuery,
        {
            fetchPolicy: 'cache-and-network',
        }
    );
    return { query, data, error, refetch };
};

export const useCreateProject = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationCreateProjectArgs>(
        CreateProjectMutation,
        {
            refetchQueries: [
                {
                    query: GetProjectsQuery,
                },
            ],
        }
    );
    return { mutation, data, error };
};

export const useUpdateProject = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationUpdateProjectArgs>(
        UpdateProjectMutation
    );
    return { mutation, data, error };
};

export const useDeleteProject = () => {
    const [mutation, { data, error }] = useMutation<Mutation, MutationDeleteProjectArgs>(
        DeleteProjectMutation,
        {
            refetchQueries: [
                {
                    query: GetProjectsQuery,
                },
            ],
        }
    );
    return { mutation, data, error };
};
