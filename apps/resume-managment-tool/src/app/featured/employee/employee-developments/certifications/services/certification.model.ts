import { Certification, CertificationInput } from '@resume-managment-tool/api-interfaces';

export const getCertificationInputs = (certification: Certification): CertificationInput | null => {
    if (!certification) {
        return null;
    }
    return {
        authority: certification.authority || null,
        course: certification.course || null,
        issueDate: certification.issueDate || null,
    };
};
