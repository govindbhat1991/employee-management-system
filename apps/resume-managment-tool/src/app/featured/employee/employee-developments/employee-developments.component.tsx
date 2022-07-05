import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import classes from './employee-developments.module.scss';
import CardComponent from '../../../components/card/card.component';
import AcademicsComponent from './academics/academics.component';
import CertificationComponent from './certifications/certification.component';
import ProjectsComponent from './projects/projects.component';
import WorkExperienceComponent from './work-experience/work-experience.component';
import ProfessionalOverviewComponent from './professional-overview/professional-overview.component';

const EmployeeDevelopmentComponent = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <CardComponent styleClass="full-height">
            <Tabs
                className={classes['react-tabs']}
                selectedIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
            >
                <TabList className={classes['react-tabs__tab-list']}>
                    <Tab className={classes['react-tabs__tab']}>Professional Overview</Tab>
                    <Tab className={classes['react-tabs__tab']}>Work Experience</Tab>
                    <Tab className={classes['react-tabs__tab']}>Projects</Tab>
                    <Tab className={classes['react-tabs__tab']}>Academics</Tab>
                    <Tab className={classes['react-tabs__tab']}>Certification</Tab>
                </TabList>
                <TabPanel className={classes['react-tabs__tab-panel']}>
                    <ProfessionalOverviewComponent></ProfessionalOverviewComponent>
                </TabPanel>
                <TabPanel className={classes['react-tabs__tab-panel']}>
                    <WorkExperienceComponent></WorkExperienceComponent>
                </TabPanel>
                <TabPanel className={classes['react-tabs__tab-panel']}>
                    <ProjectsComponent></ProjectsComponent>
                </TabPanel>
                <TabPanel className={classes['react-tabs__tab-panel']}>
                    <AcademicsComponent></AcademicsComponent>
                </TabPanel>
                <TabPanel className={classes['react-tabs__tab-panel']}>
                    <CertificationComponent></CertificationComponent>
                </TabPanel>
            </Tabs>
        </CardComponent>
    );
};

export default EmployeeDevelopmentComponent;
