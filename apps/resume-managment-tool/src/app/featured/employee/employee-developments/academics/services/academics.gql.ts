import { gql } from '@apollo/client';

export const GetAcademicsQuery = gql`
    query getAcademics {
        getAcademics {
            _id
            degree
            branch
            institution
            dateRange {
                from
                to
            }
            grade
            description
        }
    }
`;

export const GetAcademicQuery = gql`
    query getAcademic($academicId: ID!) {
        getAcademic(academicId: $academicId) {
            _id
            degree
            branch
            institution
            dateRange {
                from
                to
            }
            grade
            description
        }
    }
`;

export const CreateAcademicsMutation = gql`
    mutation createAcademics($academicsInput: AcademicsInput!) {
        createAcademics(academicsInput: $academicsInput) {
            _id
            degree
            branch
            institution
            dateRange {
                from
                to
            }
            grade
            description
        }
    }
`;

export const UpdateAcademicsMutation = gql`
    mutation updateAcademics($updateAcademicsArgs: UpdateAcademicsArgs!) {
        updateAcademics(updateAcademicsArgs: $updateAcademicsArgs) {
            _id
            degree
            branch
            institution
            dateRange {
                from
                to
            }
            grade
            description
        }
    }
`;

export const DeleteAcademicsMutation = gql`
    mutation deleteAcademics($academicId: ID!) {
        deleteAcademics(academicId: $academicId)
    }
`;
