import {
    MutationCreateWorkExperienceArgs,
    MutationDeleteWorkExperienceArgs,
    QueryGetWorkExperienceArgs,
    UpdateWorkExperienceArgs,
} from '@resume-managment-tool/api-interfaces';
import { AuthenticationError } from 'apollo-server-core';
import { Employee } from '../../db/schema/employee.schema';

/**
 * Work Experience GraphQL Queries
 **/
export const workExperienceQueries = {
    getWorkExperiences: async (_, __, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        if (!employee.workExperiences) {
            throw new Error(`Work Experiences doesn't exist`);
        }

        return employee._doc.workExperiences;
    },
    getWorkExperience: async (_, { workExperienceId }: QueryGetWorkExperienceArgs, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }

        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        const workExperienceItem = employee.workExperiences.id({ _id: workExperienceId });

        if (!workExperienceItem) {
            throw new Error('No work experience item found');
        }

        return workExperienceItem._doc;
    },
};

/**
 * Work Experience GraphQL Mutations
 */
export const workExperienceMutation = {
    createWorkExperience: async (
        _,
        { workExperienceInput }: MutationCreateWorkExperienceArgs,
        req
    ) => {
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
            const updatedEmployee = await Employee.findOneAndUpdate(
                { _id: userId },
                { $push: { workExperiences: { ...workExperienceInput } } },
                { new: true }
            );
            return updatedEmployee.workExperiences;
        } catch (error) {
            throw new Error(error);
        }
    },
    updateWorkExperience: async (
        _,
        {
            updateWorkExperienceArgs: { workExperienceId, workExperienceInput },
        }: { updateWorkExperienceArgs: UpdateWorkExperienceArgs },
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

        const workExperienceItem = employee.workExperiences.id({ _id: workExperienceId });

        if (!workExperienceItem) {
            throw new Error('No work Experience item found');
        }

        workExperienceItem.company = workExperienceInput.company;
        workExperienceItem.dateRange = workExperienceInput.dateRange;
        workExperienceItem.position = workExperienceInput.position;

        try {
            const updatedEmployee = await employee.save();
            return updatedEmployee.workExperiences.id({ _id: workExperienceId });
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteWorkExperience: async (
        _,
        { workExperienceId }: MutationDeleteWorkExperienceArgs,
        req
    ) => {
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
                { $pull: { workExperiences: { _id: workExperienceId } } },
                { new: true }
            );
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },
};
