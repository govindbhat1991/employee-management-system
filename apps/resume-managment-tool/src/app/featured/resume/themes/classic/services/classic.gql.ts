import { gql } from '@apollo/client';

export const GetEmployeeQuery = gql`
    query {
        getEmployee {
            firstName
            middleName
            lastName
            skills
            professionalOverview {
                professionalSummary
            }
            academics {
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
            workExperiences {
                company
                dateRange {
                    from
                    to
                }
                position
            }
            projects {
                name
                dateRange {
                    from
                    to
                }
                position
                skills
                description
                rolesAndResponsibility
            }
        }
    }
`;
