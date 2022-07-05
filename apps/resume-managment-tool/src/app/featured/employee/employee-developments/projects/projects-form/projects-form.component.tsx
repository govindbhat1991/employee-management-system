import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Project, ProjectInput } from '@resume-managment-tool/api-interfaces';
import { EmployeeDevelopmentSidebarProps } from '../../constants/employee-developments.interfaces';
import { useCreateProject, useProjectQuery, useUpdateProject } from '../services/projects.service';
import { getProjectInputs } from '../services/projects.model';
import ProjectsFormChild from './projects-form-fields.component';

const ProjectsFormComponent = ({
    itemId: projectId,
    onCreate,
}: EmployeeDevelopmentSidebarProps) => {
    const [projectData, setProjectData] = useState<Project>();
    const { query: projectQuery } = useProjectQuery();
    const { mutation: createProject } = useCreateProject();
    const { mutation: updateProject } = useUpdateProject();

    /** create project */
    const createProjectHandler = (projectInput: ProjectInput | null) => {
        if (!projectInput) {
            return;
        }
        createProject({
            variables: {
                projectInput,
            },
        }).then(({ data }) => {
            if (!data?.createProject) {
                return;
            }
        });
    };

    /** update project */
    const updateProjectHandler = (projectInput: ProjectInput | null) => {
        if (!projectInput) {
            return;
        }
        updateProject({
            variables: {
                updateProjectArgs: {
                    projectId: projectId,
                    projectInput,
                },
            },
        }).then(({ data }) => {
            if (!data?.updateProject) {
                return;
            }
            setProjectData(data.updateProject);
        });
    };

    useEffect(() => {
        if (!projectId) {
            return;
        }
        projectQuery({ variables: { projectId } }).then(({ data }) => {
            if (!data?.getProject) {
                return;
            }
            setProjectData(data.getProject);
        });
    }, [projectId]);

    return (
        <Formik
            initialValues={{
                name: projectData?.name || '',
                position: projectData?.position || '',
                dateRange: projectData?.dateRange,
                skills: projectData?.skills || ([] as string[]),
                description: projectData?.description || '',
                rolesAndResponsibility: projectData?.rolesAndResponsibility || [],
            }}
            enableReinitialize={true}
            onSubmit={(project) => {
                const data = getProjectInputs(project);
                projectId ? updateProjectHandler(data) : createProjectHandler(data);
            }}
        >
            <ProjectsFormChild itemId={projectId} onCreate={onCreate}></ProjectsFormChild>
        </Formik>
    );
};

export default ProjectsFormComponent;
