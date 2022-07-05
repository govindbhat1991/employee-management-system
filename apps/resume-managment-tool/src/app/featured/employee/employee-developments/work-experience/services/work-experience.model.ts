import { WorkExperience, WorkExperienceInput } from '@resume-managment-tool/api-interfaces';
import { getDateRange } from '../../../../../constants/date/date-utils';

export const getWorkExperienceInputs = (
    workExperience: WorkExperience
): WorkExperienceInput | null => {
    if (!workExperience) {
        return null;
    }
    console.log(workExperience);
    return {
        company: workExperience?.company || null,
        position: workExperience?.position || null,
        dateRange: getDateRange(workExperience?.dateRange) || null,
    };
};
