import { gql } from '@apollo/client';

export const GetCertificationsQuery = gql`
    query getCertifications {
        getCertifications {
            _id
            course
            authority
            issueDate
        }
    }
`;

export const GetCertificationQuery = gql`
    query getCertification($certificationId: ID!) {
        getCertification(certificationId: $certificationId) {
            _id
            course
            authority
            issueDate
        }
    }
`;

export const CreateCertificationMutation = gql`
    mutation createCertification($certificationInput: CertificationInput!) {
        createCertification(certificationInput: $certificationInput) {
            _id
            course
            authority
            issueDate
        }
    }
`;

export const UpdateCertificationMutation = gql`
    mutation updateCertification($updateCertificationArgs: UpdateCertificationArgs!) {
        updateCertification(updateCertificationArgs: $updateCertificationArgs) {
            _id
            course
            authority
            issueDate
        }
    }
`;

export const DeleteCertificationMutation = gql`
    mutation deleteCertification($certificationId: ID!) {
        deleteCertification(certificationId: $certificationId)
    }
`;
