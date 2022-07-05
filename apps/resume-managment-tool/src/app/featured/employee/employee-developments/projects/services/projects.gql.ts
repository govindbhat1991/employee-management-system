import { gql } from '@apollo/client';

export const GetProjectsQuery = gql`
    query getProjects {
        getProjects {
            _id
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
`;

export const GetProjectQuery = gql`
    query getProject($projectId: ID!) {
        getProject(projectId: $projectId) {
            _id
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
`;

export const CreateProjectMutation = gql`
    mutation createProject($projectInput: ProjectInput!) {
        createProject(projectInput: $projectInput) {
            _id
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
`;

export const UpdateProjectMutation = gql`
    mutation updateProject($updateProjectArgs: UpdateProjectArgs!) {
        updateProject(updateProjectArgs: $updateProjectArgs) {
            _id
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
`;

export const DeleteProjectMutation = gql`
    mutation deleteProject($projectId: ID!) {
        deleteProject(projectId: $projectId)
    }
`;
