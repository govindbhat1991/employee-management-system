import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import classes from './certification-form.module.scss';
import {
    useCertificationQuery,
    useCreateCertification,
    useUpdateCertification,
} from '../services/certification.service';
import { Certification, CertificationInput } from '@resume-managment-tool/api-interfaces';
import { getCertificationInputs } from '../services/certification.model';
import { EmployeeDevelopmentSidebarProps } from '../../constants/employee-developments.interfaces';
import InputFieldComponent from '../../../../../components/forms/input/input-field.component';
import ButtonComponent from '../../../../../components/button/button.component';
import { toDatePickerValue } from '../../../../../constants/date/date-utils';

const CertificationFormComponent = ({
    itemId: certificationId,
    onCreate,
}: EmployeeDevelopmentSidebarProps) => {
    const [certificationData, setCertificationData] = useState<Certification>();

    const { query: certificationQuery } = useCertificationQuery();

    const { mutation: createCertification } = useCreateCertification();

    const { mutation: updateCertification } = useUpdateCertification();

    const certificationForm = useFormik({
        initialValues: {
            course: certificationData?.course || '',
            authority: certificationData?.authority || '',
            issueDate: certificationData?.issueDate || '',
        },
        enableReinitialize: true,
        onSubmit: (certification) => {
            const data = getCertificationInputs(certification as CertificationInput);
            certificationId ? updateCertificationHandler(data) : createCertificationHandler(data);
        },
    });

    /** create certification */
    const createCertificationHandler = (certificationInput: CertificationInput | null) => {
        if (!certificationInput) {
            return;
        }
        createCertification({
            variables: {
                certificationInput,
            },
        }).then(({ data }) => {
            if (!data?.createCertification) {
                return;
            }
        });
    };

    /** update certification */
    const updateCertificationHandler = (certificationInput: CertificationInput | null) => {
        if (!certificationInput) {
            return;
        }
        updateCertification({
            variables: {
                updateCertificationArgs: {
                    certificationId: certificationId,
                    certificationInput,
                },
            },
        }).then(({ data }) => {
            if (!data?.updateCertification) {
                return;
            }
            setCertificationData(data.updateCertification);
        });
    };

    useEffect(() => {
        if (!certificationId) {
            return;
        }
        certificationQuery({
            variables: { certificationId },
        }).then(({ data }) => {
            if (!data?.getCertification) {
                return;
            }
            setCertificationData(data.getCertification);
        });
    }, []);

    return (
        certificationForm && (
            <>
                <div className={classes['certification-form']}>
                    <InputFieldComponent
                        id="course"
                        label="Course"
                        name="course"
                        value={certificationForm.values.course}
                        onChange={certificationForm.handleChange}
                    />
                    <InputFieldComponent
                        id="authority"
                        label="Authority"
                        name="authority"
                        value={certificationForm.values.authority}
                        onChange={certificationForm.handleChange}
                    />
                    <InputFieldComponent
                        id="issueDate"
                        type="date"
                        label="Issue Date"
                        name="issueDate"
                        value={toDatePickerValue(certificationForm.values.issueDate)}
                        onChange={certificationForm.handleChange}
                    />
                </div>
                {certificationId ? (
                    <ButtonComponent
                        label="Save"
                        onClick={() => certificationForm.handleSubmit()}
                    ></ButtonComponent>
                ) : (
                    <ButtonComponent
                        label="Create"
                        onClick={() => {
                            certificationForm.handleSubmit();
                            onCreate();
                        }}
                    ></ButtonComponent>
                )}
            </>
        )
    );
};

export default CertificationFormComponent;
