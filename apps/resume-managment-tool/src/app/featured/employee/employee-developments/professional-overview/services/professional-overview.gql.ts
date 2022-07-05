import { gql } from '@apollo/client';

export const GetProfessionalOverviewQuery = gql`
    query {
        getProfessionalOverview {
            _id
            professionalSummary
        }
    }
`;

export const UpdateProfessionalOverviewMutation = gql`
    mutation updateProfessionalOverview(
        $updateProfessionalOverviewArgs: UpdateProfessionalOverviewArgs!
    ) {
        updateProfessionalOverview(
            updateProfessionalOverviewArgs: $updateProfessionalOverviewArgs
        ) {
            _id
            professionalSummary
        }
    }
`;
