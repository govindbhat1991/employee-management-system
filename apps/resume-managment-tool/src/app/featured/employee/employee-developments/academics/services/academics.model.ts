import { Academics, AcademicsInput } from '@resume-managment-tool/api-interfaces';
import { getDateRange } from '../../../../../constants/date/date-utils';

export const getAcademicsInputs = (academics: Academics): AcademicsInput | null => {
    if (!academics) {
        return null;
    }
    return {
        degree: academics?.degree || null,
        branch: academics?.branch || null,
        institution: academics?.institution || null,
        dateRange: getDateRange(academics?.dateRange) || null,
        grade: academics?.grade || null,
        description: academics?.description || null,
    };
};
