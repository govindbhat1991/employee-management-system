import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import classes from './work-experience-form.module.scss';
import { EmployeeDevelopmentSidebarProps } from '../../constants/employee-developments.interfaces';
import InputFieldComponent from '../../../../../components/forms/input/input-field.component';
import ButtonComponent from '../../../../../components/button/button.component';
import { WorkExperience, WorkExperienceInput } from '@resume-managment-tool/api-interfaces';
import {
    useCreateWorkExperience,
    useUpdateWorkExperience,
    useWorkExperienceQuery,
} from '../services/work-experience.service';
import { getWorkExperienceInputs } from '../services/work-experience.model';
import { toDatePickerValue } from '../../../../../constants/date/date-utils';

const WorkExperienceFormComponent = ({
    itemId: workExperienceId,
    onCreate,
}: EmployeeDevelopmentSidebarProps) => {
    const [workExperienceData, setWorkExperienceData] = useState<WorkExperience>();
    const { query: workExperienceQuery } = useWorkExperienceQuery();
    const { mutation: createWorkExperience } = useCreateWorkExperience();
    const { mutation: updateWorkExperience } = useUpdateWorkExperience();

    const workExperienceForm = useFormik({
        initialValues: {
            company: workExperienceData?.company || '',
            position: workExperienceData?.position || '',
            dateRange: workExperienceData?.dateRange,
        },
        enableReinitialize: true,
        onSubmit: (workExperience) => {
            const data = getWorkExperienceInputs(workExperience as WorkExperienceInput);
            workExperienceId
                ? updateWorkExperienceHandler(data)
                : createWorkExperienceHandler(data);
        },
    });

    /** create workExperience */
    const createWorkExperienceHandler = (workExperienceInput: WorkExperienceInput | null) => {
        if (!workExperienceInput) {
            return;
        }
        createWorkExperience({
            variables: {
                workExperienceInput,
            },
        }).then(({ data }) => {
            if (!data?.createWorkExperience) {
                return;
            }
        });
    };

    /** update workExperience */
    const updateWorkExperienceHandler = (workExperienceInput: WorkExperienceInput | null) => {
        if (!workExperienceInput) {
            return;
        }
        updateWorkExperience({
            variables: {
                updateWorkExperienceArgs: {
                    workExperienceId,
                    workExperienceInput,
                },
            },
        }).then(({ data }) => {
            if (!data?.updateWorkExperience) {
                return;
            }
            setWorkExperienceData(data.updateWorkExperience);
        });
    };

    useEffect(() => {
        if (!workExperienceId) {
            return;
        }
        workExperienceQuery({
            variables: { workExperienceId },
        }).then(({ data }) => {
            if (!data?.getWorkExperience) {
                return;
            }
            setWorkExperienceData(data.getWorkExperience);
        });
    }, []);

    return (
        workExperienceForm && (
            <>
                <div className={classes['work-experience-form']}>
                    <InputFieldComponent
                        id="company"
                        label="Company"
                        name="company"
                        value={workExperienceForm.values.company}
                        onChange={workExperienceForm.handleChange}
                    />
                    <InputFieldComponent
                        id="position"
                        label="Position"
                        name="position"
                        value={workExperienceForm.values.position}
                        onChange={workExperienceForm.handleChange}
                    />
                    <div className="row">
                        <div className="col-6">
                            <InputFieldComponent
                                id="from"
                                type="date"
                                label="Start Date"
                                name="dateRange.from"
                                value={toDatePickerValue(workExperienceForm.values.dateRange?.from)}
                                onChange={workExperienceForm.handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <InputFieldComponent
                                id="to"
                                type="date"
                                label="End Date"
                                name="dateRange.to"
                                value={toDatePickerValue(workExperienceForm.values.dateRange?.to)}
                                onChange={workExperienceForm.handleChange}
                            />
                        </div>
                    </div>
                </div>
                {workExperienceId ? (
                    <ButtonComponent
                        label="Save"
                        onClick={() => workExperienceForm.handleSubmit()}
                    ></ButtonComponent>
                ) : (
                    <ButtonComponent
                        label="Create"
                        onClick={() => {
                            workExperienceForm.handleSubmit();
                            onCreate();
                        }}
                    ></ButtonComponent>
                )}
            </>
        )
    );
};

export default WorkExperienceFormComponent;
