import { useMutation, useQuery } from '@apollo/client';
import {
    Mutation,
    MutationUpdateProfessionalOverviewArgs,
    ProfessionalOverview,
    Query,
} from '@resume-managment-tool/api-interfaces';
import {
    GetProfessionalOverviewQuery,
    UpdateProfessionalOverviewMutation,
} from './professional-overview.gql';

export const useProfessionalOverviewQuery = (): ProfessionalOverview => {
    const { data } = useQuery<Query>(GetProfessionalOverviewQuery);

    return data?.getProfessionalOverview as ProfessionalOverview;
};

export const useUpdateProfessionalOverview = () => {
    const [mutation, { data, error }] = useMutation<
        Mutation,
        MutationUpdateProfessionalOverviewArgs
    >(UpdateProfessionalOverviewMutation);
    return { mutation, data, error };
};
