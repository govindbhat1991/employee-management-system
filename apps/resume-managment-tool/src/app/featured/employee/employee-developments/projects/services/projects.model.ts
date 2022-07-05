import { Project, ProjectInput } from '@resume-managment-tool/api-interfaces';
import { getDateRange } from '../../../../../constants/date/date-utils';

export const getProjectInputs = (project: Project): ProjectInput | null => {
    if (!project) {
        return null;
    }
    return {
        name: project.name || null,
        position: project.position || null,
        dateRange: getDateRange(project.dateRange) || null,
        skills: project.skills || null,
        description: project.description || null,
        rolesAndResponsibility: project.rolesAndResponsibility?.filter(Boolean) || null,
    };
};
