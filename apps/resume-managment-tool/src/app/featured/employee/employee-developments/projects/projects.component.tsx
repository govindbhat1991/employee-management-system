import { useState } from 'react';
import ButtonComponent from '../../../../components/button/button.component';
import SidebarComponent from '../../../../components/sidebar/sidebar.component';
import ListItemComponent from '../../../../components/list/list-item/list-item.component';
import { getToolbar, ToolbarAction } from '../constants/employee-development.constant';
import { getMonthAndYear } from '../../../../constants/date/date-utils';
import { EmployeeDevelopmentDataInterface } from '../constants/employee-developments.interfaces';
import ProjectsFormComponent from './projects-form/projects-form.component';
import { useDeleteProject, useProjectsQuery } from './services/projects.service';
import classes from './projects.module.scss';

const ProjectsComponent = () => {
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
                deleteProjectHandler(context);
                break;
        }
    };

    const { data: projectData, refetch: refetchProject } = useProjectsQuery();

    const { mutation: deleteProject } = useDeleteProject();

    const deleteProjectHandler = (projectId: string) => {
        deleteProject({
            variables: { projectId },
        }).then();
    };

    const sidebarHide = () => {
        setSidebarState({ state: false, id: '' });
        refetchProject().then();
    };

    return (
        <>
            <ButtonComponent
                label="Add new"
                styleClass="margin-bottom-lg"
                onClick={() => setSidebarState({ state: true, id: '' })}
            ></ButtonComponent>
            {!projectData?.length ? (
                <p>No List found</p>
            ) : (
                <>
                    {projectData.map((item) => (
                        <ListItemComponent key={item._id} toolbar={toolbar} context={item._id}>
                            <div
                                className={classes['projects__list-item']}
                                onClick={() =>
                                    setSidebarState({ state: true, id: item._id as string })
                                }
                            >
                                <div className="row text-grey-dark">
                                    <div className="col-5">
                                        <h3 className="text-black">{item.name}</h3>
                                        <div>{item.position ? item.position : '—'}</div>
                                    </div>
                                    <div className="col-2">
                                        <div>
                                            {item.dateRange?.from
                                                ? getMonthAndYear(item.dateRange?.from)
                                                : '—'}
                                        </div>
                                        <div>
                                            {item.dateRange?.to
                                                ? getMonthAndYear(item.dateRange?.to)
                                                : '—'}
                                        </div>
                                    </div>
                                    <div className="col-4">{item.skills?.join(', ')}</div>
                                </div>
                            </div>
                        </ListItemComponent>
                    ))}
                </>
            )}
            <SidebarComponent visibleState={sidebarState.state} width="550px" onHide={sidebarHide}>
                {sidebarState.state ? (
                    <ProjectsFormComponent
                        itemId={sidebarState.id}
                        onCreate={sidebarHide}
                    ></ProjectsFormComponent>
                ) : (
                    <></>
                )}
            </SidebarComponent>
        </>
    );
};

export default ProjectsComponent;
