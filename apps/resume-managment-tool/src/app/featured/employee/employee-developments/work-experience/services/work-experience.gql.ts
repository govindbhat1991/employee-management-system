import { gql } from '@apollo/client';

export const GetWorkExperiencesQuery = gql`
    query getWorkExperiences {
        getWorkExperiences {
            _id
            company
            dateRange {
                from
                to
            }
            position
        }
    }
`;

export const GetWorkExperienceQuery = gql`
    query getWorkExperience($workExperienceId: ID!) {
        getWorkExperience(workExperienceId: $workExperienceId) {
            _id
            company
            dateRange {
                from
                to
            }
            position
        }
    }
`;

export const CreateWorkExperienceMutation = gql`
    mutation createWorkExperience($workExperienceInput: WorkExperienceInput!) {
        createWorkExperience(workExperienceInput: $workExperienceInput) {
            _id
            company
            dateRange {
                from
                to
            }
            position
        }
    }
`;

export const UpdateWorkExperienceMutation = gql`
    mutation updateWorkExperience($updateWorkExperienceArgs: UpdateWorkExperienceArgs!) {
        updateWorkExperience(updateWorkExperienceArgs: $updateWorkExperienceArgs) {
            _id
            company
            dateRange {
                from
                to
            }
            position
        }
    }
`;

export const DeleteWorkExperienceMutation = gql`
    mutation deleteWorkExperience($workExperienceId: ID!) {
        deleteWorkExperience(workExperienceId: $workExperienceId)
    }
`;
