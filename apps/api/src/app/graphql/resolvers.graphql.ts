import { employeeMutation, employeeQueries } from './resolvers/employee.resolver';
import { academicsMutation, academicsQueries } from './resolvers/academics.resolver';
import { certificationsMutation, certificationsQueries } from './resolvers/certifications.resolver';
import {
    workExperienceMutation,
    workExperienceQueries,
} from './resolvers/work-experiences.resolver';
import { projectsMutation, projectsQueries } from './resolvers/projects.resolver';
import {
    professionalOverviewMutation,
    professionalOverviewQueries,
} from './resolvers/professional-overview.resolver';

/**
 * GraphQL Resolvers
 **/
export default {
    Query: {
        ...employeeQueries,
        ...academicsQueries,
        ...certificationsQueries,
        ...workExperienceQueries,
        ...projectsQueries,
        ...professionalOverviewQueries,
    },
    Mutation: {
        ...employeeMutation,
        ...academicsMutation,
        ...certificationsMutation,
        ...workExperienceMutation,
        ...projectsMutation,
        ...professionalOverviewMutation,
    },
};
