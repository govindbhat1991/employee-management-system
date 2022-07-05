import { useState } from 'react';
import ButtonComponent from '../../../../components/button/button.component';
import SidebarComponent from '../../../../components/sidebar/sidebar.component';
import ListItemComponent from '../../../../components/list/list-item/list-item.component';
import { getToolbar, ToolbarAction } from '../constants/employee-development.constant';
import { getMonthAndYear } from '../../../../constants/date/date-utils';
import { EmployeeDevelopmentDataInterface } from '../constants/employee-developments.interfaces';
import {
    useDeleteWorkExperience,
    useWorkExperiencesQuery,
} from './services/work-experience.service';
import WorkExperienceFormComponent from './work-experience-form/work-experience-form.component';

const WorkExperienceComponent = () => {
    const [sidebarState, setSidebarState] = useState<EmployeeDevelopmentDataInterface>({
        state: false,
        id: '',
    });

    const toolbar = getToolbar((action, context) => toolbarActionHandler(action, context));

    const toolbarActionHandler = (type: ToolbarAction, context: string) => {
        switch (type) {
            case ToolbarAction.Edit:
                setSidebarState({ state: true, id: context });
                break;

            case ToolbarAction.Delete:
                deleteWorkExperienceHandler(context);
                break;
        }
    };

    const { data: workExperienceData, refetch: refetchWorkExperience } = useWorkExperiencesQuery();

    const { mutation: deleteWorkExperience } = useDeleteWorkExperience();

    const deleteWorkExperienceHandler = (workExperienceId: string) => {
        deleteWorkExperience({ variables: { workExperienceId } }).then();
    };

    const sidebarHide = () => {
        setSidebarState({ state: false, id: '' });
        refetchWorkExperience().then();
    };

    return (
        <>
            <ButtonComponent
                label="Add new"
                styleClass="margin-bottom-lg"
                onClick={() => setSidebarState({ state: true, id: '' })}
            ></ButtonComponent>
            {!workExperienceData?.length ? (
                <p>No List found</p>
            ) : (
                <>
                    {workExperienceData.map((item) => (
                        <ListItemComponent toolbar={toolbar} key={item._id} context={item._id}>
                            <div className="row text-grey-dark">
                                <div className="col-4">
                                    <h3 className="text-black">{item.company}</h3>
                                    <div>{item.position ? item.position : '—'}</div>
                                </div>
                                <div className="col-4">
                                    <div>
                                        {item.dateRange
                                            ? `${getMonthAndYear(
                                                  item.dateRange?.from
                                              )} —${' '} ${getMonthAndYear(item.dateRange?.to)}`
                                            : '—'}
                                    </div>
                                </div>
                            </div>
                        </ListItemComponent>
                    ))}
                </>
            )}
            <SidebarComponent visibleState={sidebarState.state} width="550px" onHide={sidebarHide}>
                {sidebarState.state ? (
                    <WorkExperienceFormComponent
                        itemId={sidebarState.id}
                        onCreate={sidebarHide}
                    ></WorkExperienceFormComponent>
                ) : (
                    <></>
                )}
            </SidebarComponent>
        </>
    );
};

export default WorkExperienceComponent;
