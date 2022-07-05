import { useFormik } from 'formik';
import { Academics, AcademicsInput } from '@resume-managment-tool/api-interfaces';
import classes from './academics-form.module.scss';
import {
    useAcademicQuery,
    useCreateAcademics,
    useUpdateAcademics,
} from '../services/academics.service';
import { getAcademicsInputs } from '../services/academics.model';
import InputFieldComponent from '../../../../../components/forms/input/input-field.component';
import { useEffect, useState } from 'react';
import ButtonComponent from '../../../../../components/button/button.component';
import { EmployeeDevelopmentSidebarProps } from '../../constants/employee-developments.interfaces';
import { toDatePickerValue } from '../../../../../constants/date/date-utils';

const AcademicsFormComponent = ({
    itemId: academicId,
    onCreate,
}: EmployeeDevelopmentSidebarProps) => {
    const [academicsData, setAcademicsData] = useState<Academics>();

    const { query: academicQuery } = useAcademicQuery();

    const { mutation: createAcademics } = useCreateAcademics();

    const { mutation: updateAcademics } = useUpdateAcademics();

    const academicsForm = useFormik({
        initialValues: {
            degree: academicsData?.degree || '',
            branch: academicsData?.branch || '',
            institution: academicsData?.institution || '',
            dateRange: academicsData?.dateRange,
            grade: academicsData?.grade || '',
            description: academicsData?.description || '',
        },
        enableReinitialize: true,
        onSubmit: (academics) => {
            const data = getAcademicsInputs(academics) as AcademicsInput;
            academicId ? updateAcademicsHandler(data) : createAcademicsHandler(data);
        },
    });

    /** create academics */
    const createAcademicsHandler = (academicsInput: AcademicsInput) => {
        createAcademics({
            variables: {
                academicsInput,
            },
        }).then(({ data }) => {
            if (!data?.createAcademics) {
                return;
            }
        });
    };

    /** update academics */
    const updateAcademicsHandler = (academicsInput: AcademicsInput) => {
        updateAcademics({
            variables: {
                updateAcademicsArgs: {
                    academicId,
                    academicsInput,
                },
            },
        }).then(({ data }) => {
            if (!data?.updateAcademics) {
                return;
            }
            setAcademicsData(data.updateAcademics);
        });
    };

    useEffect(() => {
        if (!academicId) {
            return;
        }
        academicQuery({ variables: { academicId } }).then(({ data }) => {
            if (!data?.getAcademic) {
                return;
            }
            setAcademicsData(data.getAcademic);
        });
    }, []);

    return (
        academicsForm && (
            <>
                <div className={classes['academics-form']}>
                    <InputFieldComponent
                        id="degree"
                        label="Degree"
                        name="degree"
                        value={academicsForm.values.degree}
                        onChange={academicsForm.handleChange}
                    />
                    <InputFieldComponent
                        id="branch"
                        label="Branch"
                        name="branch"
                        value={academicsForm.values.branch}
                        onChange={academicsForm.handleChange}
                    />
                    <InputFieldComponent
                        id="institution"
                        label="Institution"
                        name="institution"
                        value={academicsForm.values.institution}
                        onChange={academicsForm.handleChange}
                    />
                    <div className="row">
                        <div className="col-6">
                            <InputFieldComponent
                                id="from"
                                type="date"
                                label="Start Date"
                                name="dateRange.from"
                                value={toDatePickerValue(academicsForm.values.dateRange?.from)}
                                onChange={academicsForm.handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <InputFieldComponent
                                id="to"
                                type="date"
                                label="End Date"
                                name="dateRange.to"
                                value={toDatePickerValue(academicsForm.values.dateRange?.to)}
                                onChange={academicsForm.handleChange}
                            />
                        </div>
                    </div>
                    <InputFieldComponent
                        id="grade"
                        label="Grade"
                        name="grade"
                        value={academicsForm.values.grade}
                        onChange={academicsForm.handleChange}
                    />
                </div>
                {academicId ? (
                    <ButtonComponent
                        label="Save"
                        onClick={() => academicsForm.handleSubmit()}
                    ></ButtonComponent>
                ) : (
                    <ButtonComponent
                        label="Create"
                        onClick={() => {
                            academicsForm.handleSubmit();
                            onCreate();
                        }}
                    ></ButtonComponent>
                )}
            </>
        )
    );
};

export default AcademicsFormComponent;
