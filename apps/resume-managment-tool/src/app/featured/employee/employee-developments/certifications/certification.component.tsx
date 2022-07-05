import { useState } from 'react';
import ButtonComponent from '../../../../components/button/button.component';
import SidebarComponent from '../../../../components/sidebar/sidebar.component';
import ListItemComponent from '../../../../components/list/list-item/list-item.component';
import CertificationFormComponent from './certification-form/certification-form.component';
import { getToolbar, ToolbarAction } from '../constants/employee-development.constant';
import { useCertificationsQuery, useDeleteCertification } from './services/certification.service';
import { getDayMonthAndYear } from '../../../../constants/date/date-utils';
import { EmployeeDevelopmentDataInterface } from '../constants/employee-developments.interfaces';

const CertificationComponent = () => {
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
                deleteCertificationHandler(context);
                break;
        }
    };

    const { data: certificationData, refetch: refetchCertification } = useCertificationsQuery();

    const { mutation: deleteCertification } = useDeleteCertification();

    const deleteCertificationHandler = (certificationId: string) => {
        deleteCertification({
            variables: { certificationId },
        }).then();
    };

    const sidebarHide = () => {
        setSidebarState({ state: false, id: '' });
        refetchCertification().then();
    };

    return (
        <>
            <ButtonComponent
                label="Add new"
                styleClass="margin-bottom-lg"
                onClick={() => setSidebarState({ state: true, id: '' })}
            ></ButtonComponent>
            {!certificationData?.length ? (
                <p>No List found</p>
            ) : (
                <>
                    {certificationData.map((item) => (
                        <ListItemComponent toolbar={toolbar} key={item._id} context={item._id}>
                            <div className="row text-grey-dark">
                                <div className="col-4">
                                    <h3 className="text-black">{item.course}</h3>
                                    <div>{item.authority ? item.authority : '—'}</div>
                                </div>
                                <div className="col-4">
                                    <div>{getDayMonthAndYear(item.issueDate)}</div>
                                </div>
                            </div>
                        </ListItemComponent>
                    ))}
                </>
            )}
            <SidebarComponent visibleState={sidebarState.state} width="550px" onHide={sidebarHide}>
                {sidebarState.state ? (
                    <CertificationFormComponent
                        itemId={sidebarState.id}
                        onCreate={sidebarHide}
                    ></CertificationFormComponent>
                ) : (
                    <></>
                )}
            </SidebarComponent>
        </>
    );
};

export default CertificationComponent;
