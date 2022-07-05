import classes from './classic.module.scss';
import classicResumeLogo from '../../../../../assets/images/dummylogo.jpg';
import classicResumeBG from '../../../../../assets/images/cv-top-bg.png';
import { useEmployeeDetailsQuery } from './services/classic.service';
import {
    Academics,
    Employee,
    ProfessionalOverview,
    Project,
} from '@resume-managment-tool/api-interfaces';
import { getMonthAndYear } from '../../../../constants/date/date-utils';

// @TODO, shitty logic
const sortByDate = (data: any[]) => {
    if (!data) {
        return [];
    }
    return data
        .slice()
        .sort(
            (a, b) => (new Date(b['dateRange']?.to) as any) - (new Date(a['dateRange']?.to) as any)
        );
};

const getLatestAcademics = (academics: Academics[]) => {
    if (!academics) {
        return;
    }
    const latestAcademics: Academics = sortByDate(academics).find(Boolean);
    return `${latestAcademics?.degree} in ${latestAcademics?.branch} from ${latestAcademics?.institution}`;
};

const getEmployeeFullName = ({
    firstName,
    middleName,
    lastName,
}: Pick<Employee, 'firstName' | 'middleName' | 'lastName'>) => {
    if (!firstName && !lastName && !middleName) {
        return;
    }
    return [firstName, middleName, lastName].filter(Boolean).join(' ');
};

const ClassicResumeComponent = () => {
    const employee = useEmployeeDetailsQuery();
    return (
        employee && (
            <div className={classes['resume__wrap']}>
                <div className={classes['resume__page']}>
                    <div className={classes['resume__page-content-wrap']}>
                        <HeaderHTML></HeaderHTML>
                        <div className={classes['resume__page-content']}>
                            {/* Employee Full name */}
                            <EmployeeFullnameComponent
                                firstName={employee.firstName}
                                lastName={employee.lastName}
                            ></EmployeeFullnameComponent>
                            {/* Summary of experience */}
                            <SummaryComponent
                                professionalSummary={
                                    employee.professionalOverview?.professionalSummary
                                }
                            ></SummaryComponent>
                            {/* Technical Skills */}
                            <TechnicalSkillsComponent
                                skills={employee.skills}
                            ></TechnicalSkillsComponent>
                            {/* Education */}
                            <EducationComponent academics={employee.academics}></EducationComponent>
                            {/* Key Projects */}
                            <KeyProjectsComponent
                                projects={employee.projects}
                            ></KeyProjectsComponent>
                        </div>
                        <FooterHTML></FooterHTML>
                    </div>
                </div>
            </div>
        )
    );
};

export default ClassicResumeComponent;

/** Common Header Component */
const HeaderHTML = () => (
    <div className={classes['resume__page-header']}>
        <div className={classes['resume__page-header-bg']}>
            <img src={classicResumeBG} alt="Logo" />
        </div>
        <div className={classes['resume__page-header-logo']}>
            <img src={classicResumeLogo} alt="Logo" />
        </div>
    </div>
);

/** Common footer Component */
const FooterHTML = () => <div className={classes['resume__page-footer']}>Confidential</div>;

/** Full name Component */
const EmployeeFullnameComponent = ({ firstName, lastName }: Employee) => {
    const employeeFullName = getEmployeeFullName({ firstName, lastName });
    return (
        <h1 className={classes['resume__heading']}>
            {employeeFullName ? employeeFullName : 'No Name'}
        </h1>
    );
};

/** Summary of experience */
const SummaryComponent = ({
    professionalSummary,
}: Pick<ProfessionalOverview, 'professionalSummary'>) => {
    return (
        <>
            <h3 className={classes['resume__sub-heading']}>Summary of experience</h3>
            <div className={classes['resume__page-content-inner']}>
                <ProfessionalOverviewComponent
                    professionalSummary={professionalSummary}
                ></ProfessionalOverviewComponent>
            </div>
        </>
    );
};

/** Professional Overview */
const ProfessionalOverviewComponent = ({
    professionalSummary,
}: Pick<ProfessionalOverview, 'professionalSummary'>) => {
    const summary = professionalSummary?.replace(/\n/g, '<br />');
    return (
        <p className="margin-bottom-md" dangerouslySetInnerHTML={{ __html: summary as string }}></p>
    );
};

/** Technical Skills */
const TechnicalSkillsComponent = ({ skills }: Pick<Employee, 'skills'>) => {
    return (
        <>
            <h3 className={classes['resume__sub-heading']}>Technical Skills</h3>
            <div className={classes['resume__page-content-inner']}>
                <h4 className={classes['resume__small-heading']}>Languages:</h4>
                <span className={classes['resume__color-grey']}>{skills?.join(', ')}</span>
            </div>
        </>
    );
};

/** Education */
const EducationComponent = ({ academics }: Pick<Employee, 'academics'>) => {
    return (
        <>
            <h3 className={classes['resume__sub-heading']}>Education</h3>
            <div className={classes['resume__page-content-inner']}>
                <p className="margin-bottom-md">{getLatestAcademics(academics as Academics[])}</p>
            </div>
        </>
    );
};

/** Key Projects */
const KeyProjectsComponent = ({ projects }: Pick<Employee, 'projects'>) => {
    return (
        <>
            <h3 className={classes['resume__sub-heading']}>Key Projects</h3>
            {projects?.map((project, i) => {
                return (
                    project && (
                        <div key={i}>
                            <ProjectsHeadingComponent
                                key={i}
                                name={project.name}
                                dateRange={project.dateRange}
                            ></ProjectsHeadingComponent>
                            <ProjectsDescriptionComponent
                                description={project.description}
                            ></ProjectsDescriptionComponent>
                            <ProjectsTechnologyComponent
                                skills={project.skills}
                            ></ProjectsTechnologyComponent>
                            <h4
                                className={`${classes['resume__small-heading']} ${classes['resume__page-content-inner']} margin-bottom-md`}
                            >
                                Role and Responsibilities:
                            </h4>
                            <ul
                                className={`${classes['resume__list']} ${classes['resume__page-content-inner']}`}
                            >
                                {project.rolesAndResponsibility?.map((randR, i) => (
                                    <li key={i}>{randR}</li>
                                ))}
                            </ul>
                            <Divider></Divider>
                        </div>
                    )
                );
            })}
        </>
    );
};

/** Project Heading */
const ProjectsHeadingComponent = ({ name, dateRange }: Pick<Project, 'name' | 'dateRange'>) => {
    return (
        <div
            className={`${classes['resume__projects-heading']} ${classes['resume__page-content-inner']} margin-bottom-xl`}
        >
            <h4 className={classes['resume__small-heading']}>{name}</h4>
            <span>
                {getMonthAndYear(dateRange?.from)} – {getMonthAndYear(dateRange?.to)}
            </span>
        </div>
    );
};

/** Project Description */
const ProjectsDescriptionComponent = ({ description }: Pick<Project, 'description'>) => {
    return (
        <div className={classes['resume__page-content-inner']}>
            <p className="margin-bottom-hg">{description}</p>
        </div>
    );
};

/** Project Technology Used */
const ProjectsTechnologyComponent = ({ skills }: Pick<Project, 'skills'>) => {
    return (
        <div className={`${classes['resume__page-content-inner']} margin-bottom-hg`}>
            <h4 className={classes['resume__small-heading']}>Technology Used:</h4>
            <span className={classes['resume__color-grey']}>{skills?.join(', ')}</span>
        </div>
    );
};

const Divider = () => {
    return <hr className={classes['resume__content-divider']}></hr>;
};
