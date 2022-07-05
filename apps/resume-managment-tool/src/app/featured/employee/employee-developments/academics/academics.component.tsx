import { useState } from 'react';
import { isDate } from '../../../../constants/date/date';
import { useAcademicsQuery, useDeleteAcademics } from './services/academics.service';
import ListItemComponent from '../../../../components/list/list-item/list-item.component';
import { ToolbarType } from '../../../../components/button/button.interface';
import SidebarComponent from '../../../../components/sidebar/sidebar.component';
import ButtonComponent from '../../../../components/button/button.component';
import AcademicsFormComponent from './academics-form/academics-form.component';

const getMonthAndYear = (value: string | Date) => {
    if (!isDate(value)) {
        return;
    }
    const dateObj = new Date(value);
    return `${dateObj.getMonth() + 1}/${dateObj.getUTCFullYear()}`;
};

interface academicsSidebarInterface {
    state: boolean;
    id: string;
}

const AcademicsComponent = () => {
    const [academicsSidebarState, setacademicsSidebarState] = useState<academicsSidebarInterface>({
        state: false,
        id: '',
    });

    const toolbar: ToolbarType = [
        {
            label: 'Edit',
            onClick: ({ context }) => toolbarActionHandler('edit', context),
        },
        {
            label: 'Delete',
            onClick: ({ context }) => toolbarActionHandler('delete', context),
        },
    ];

    const toolbarActionHandler = (type: 'edit' | 'delete', context: string) => {
        switch (type) {
            case 'edit':
                setacademicsSidebarState({ state: true, id: context });
                break;

            case 'delete':
                deleteAcademicsHandler(context);
                break;
        }
    };

    const onSidebarHide = () => {
        setacademicsSidebarState({ state: false, id: '' });
        refetchAcademics().then();
    };

    const { data: academicsData, refetch: refetchAcademics } = useAcademicsQuery();

    const createAcademicsHandler = () => {
        setacademicsSidebarState({ state: true, id: '' });
    };

    const { mutation: deleteAcademic } = useDeleteAcademics();

    const deleteAcademicsHandler = (academicId: string) => {
        deleteAcademic({ variables: { academicId } }).then();
    };

    return (
        <>
            <ButtonComponent
                label="Add new"
                styleClass="margin-bottom-lg"
                onClick={createAcademicsHandler}
            ></ButtonComponent>
            {!academicsData?.length ? (
                <p>No List found</p>
            ) : (
                <>
                    {academicsData.map((item) => (
                        <ListItemComponent toolbar={toolbar} key={item._id} context={item._id}>
                            <div className="row text-grey-dark">
                                <div className="col-4">
                                    <h3 className="text-black">{item.degree}</h3>
                                    <div>{item.branch ? item.branch : '—'}</div>
                                </div>
                                <div className="col-4">
                                    <div>{item.institution}</div>
                                    <div>
                                        {item.dateRange
                                            ? `${getMonthAndYear(
                                                  item.dateRange?.from
                                              )} —${' '} ${getMonthAndYear(item.dateRange?.to)}`
                                            : '—'}
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div>{item.grade ? item.grade : '—'}</div>
                                </div>
                            </div>
                        </ListItemComponent>
                    ))}
                </>
            )}
            <SidebarComponent
                visibleState={academicsSidebarState.state}
                width="550px"
                onHide={onSidebarHide}
            >
                {academicsSidebarState.state ? (
                    <AcademicsFormComponent
                        itemId={academicsSidebarState.id}
                        onCreate={onSidebarHide}
                    ></AcademicsFormComponent>
                ) : (
                    <></>
                )}
            </SidebarComponent>
        </>
    );
};

export default AcademicsComponent;
