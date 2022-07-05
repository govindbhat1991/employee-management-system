import {
    MutationCreateProjectArgs,
    MutationDeleteProjectArgs,
    Project,
    QueryGetProjectArgs,
    UpdateProjectArgs,
} from '@resume-managment-tool/api-interfaces';
import { AuthenticationError } from 'apollo-server-core';
import { Employee } from '../../db/schema/employee.schema';

const skillsHandler = (projects: Project[], skillsInput: string[], projectId = ''): string[] => {
    const employeeSkills = projects
        .filter((project) => project._id !== projectId)
        .map((project) => project.skills)
        .flat();
    return [...new Set([...employeeSkills, ...skillsInput])];
};

/**
 * Projects GraphQL Queries
 **/
export const projectsQueries = {
    getProjects: async (_, __, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        if (!employee.projects) {
            throw new Error(`Projects doesn't exist`);
        }

        return employee._doc.projects;
    },
    getProject: async (_, { projectId }: QueryGetProjectArgs, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }

        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        const projectItem = employee.projects.id({ _id: projectId });

        if (!projectItem) {
            throw new Error('No project item found');
        }

        return projectItem._doc;
    },
};

/**
 * Projects GraphQL Mutations
 */
export const projectsMutation = {
    createProject: async (_, { projectInput }: MutationCreateProjectArgs, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);

        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }

        try {
            employee.skills = skillsHandler(employee.projects, projectInput.skills as string[]);
            await employee.save();
            const updatedEmployee = await Employee.findOneAndUpdate(
                { _id: userId },
                { $push: { projects: { ...projectInput } } },
                { new: true }
            );
            return updatedEmployee.projects;
        } catch (error) {
            throw new Error(error);
        }
    },
    updateProject: async (
        _,
        {
            updateProjectArgs: { projectId, projectInput },
        }: { updateProjectArgs: UpdateProjectArgs },
        req
    ) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);

        if (!employee) {
            throw new Error('No employee found');
        }

        const projectItem = employee.projects.id({ _id: projectId });

        if (!projectItem) {
            throw new Error('No project item found');
        }

        projectItem.name = projectInput.name;
        projectItem.dateRange = projectInput.dateRange;
        projectItem.position = projectInput.position;
        projectItem.skills = projectInput.skills;
        projectItem.description = projectInput.description;
        projectItem.rolesAndResponsibility = projectInput.rolesAndResponsibility;
        employee.skills = skillsHandler(
            employee.projects,
            projectInput.skills as string[],
            projectId
        );

        try {
            const updatedEmployee = await employee.save();
            return updatedEmployee.projects.id({ _id: projectId });
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteProject: async (_, { projectId }: MutationDeleteProjectArgs, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);

        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }

        try {
            await Employee.findOneAndUpdate(
                { _id: userId },
                { $pull: { projects: { _id: projectId } } },
                { new: true }
            );
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },
};
