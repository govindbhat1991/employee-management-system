import { FieldArray, useFormikContext } from 'formik';
import { Project } from '@resume-managment-tool/api-interfaces';
import classes from './projects-form.module.scss';
import { EmployeeDevelopmentSidebarProps } from '../../constants/employee-developments.interfaces';
import InputFieldComponent from '../../../../../components/forms/input/input-field.component';
import { toDatePickerValue } from '../../../../../constants/date/date-utils';
import ChipsComponent from '../../../../../components/forms/chips/chips.component';
import ButtonComponent from '../../../../../components/button/button.component';
import TextAreaComponent from '../../../../../components/forms/textarea/textarea.component';

const ProjectsFormChild = ({ itemId: projectId, onCreate }: EmployeeDevelopmentSidebarProps) => {
    const projectForm = useFormikContext<Project>();

    const onSkillHandler = (data: string[]) => {
        if (!projectForm?.values) {
            return;
        }
        projectForm.setFieldValue('skills', [...data]);
    };

    return (
        projectForm && (
            <>
                <div className={classes['projects-form']}>
                    <InputFieldComponent
                        id="name"
                        label="Name"
                        name="name"
                        value={projectForm.values.name}
                        onChange={projectForm.handleChange}
                    />
                    <InputFieldComponent
                        id="position"
                        label="Position"
                        name="position"
                        value={projectForm.values.position}
                        onChange={projectForm.handleChange}
                    />
                    <div className="row">
                        <div className="col-6">
                            <InputFieldComponent
                                id="from"
                                type="date"
                                label="Start Date"
                                name="dateRange.from"
                                value={toDatePickerValue(projectForm.values.dateRange?.from)}
                                onChange={projectForm.handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <InputFieldComponent
                                id="to"
                                type="date"
                                label="End Date"
                                name="dateRange.to"
                                value={toDatePickerValue(projectForm.values.dateRange?.to)}
                                onChange={projectForm.handleChange}
                            />
                        </div>
                    </div>
                    {/* change as text area */}
                    <TextAreaComponent
                        id="description"
                        label="Description"
                        name="description"
                        value={projectForm.values.description}
                        onChange={projectForm.handleChange}
                    />
                    <ChipsComponent
                        name="skills"
                        value={projectForm.values.skills as string[]}
                        label="Skills"
                        allowDuplicate={false}
                        max={15}
                        onChange={(data) => onSkillHandler(data)}
                    ></ChipsComponent>
                    <FieldArray
                        name="rolesAndResponsibility"
                        render={(arrayHelpers) => {
                            const randR = projectForm.values?.rolesAndResponsibility;
                            const randRInput = (element = '', index = 0) => (
                                <div className={classes['input-group']} key={index}>
                                    <InputFieldComponent
                                        id={`rolesAndResponsibility-${index}`}
                                        label={!index ? 'Roles And Responsibility' : ''}
                                        name={`rolesAndResponsibility.${index}`}
                                        styleClass={classes['input-group__input']}
                                        value={element}
                                        onChange={projectForm.handleChange}
                                    />
                                    {index ? (
                                        <ButtonComponent
                                            label="X"
                                            styleClass={classes['input-group__btn']}
                                            onClick={() => arrayHelpers.remove(index)}
                                        ></ButtonComponent>
                                    ) : (
                                        <ButtonComponent
                                            label="+"
                                            styleClass={`${classes['input-group__btn']} ${classes['input-group__btn--add']}`}
                                            onClick={() =>
                                                arrayHelpers.insert(randR?.length as number, '')
                                            }
                                        ></ButtonComponent>
                                    )}
                                </div>
                            );

                            return randR?.length
                                ? randR?.map((element, index) =>
                                      randRInput(element as string, index)
                                  )
                                : randRInput();
                        }}
                    />
                </div>
                {projectId ? (
                    <ButtonComponent
                        label="Save"
                        onClick={() => projectForm.handleSubmit()}
                    ></ButtonComponent>
                ) : (
                    <ButtonComponent
                        label="Create"
                        onClick={() => {
                            projectForm.handleSubmit();
                            onCreate();
                        }}
                    ></ButtonComponent>
                )}
            </>
        )
    );
};

export default ProjectsFormChild;
