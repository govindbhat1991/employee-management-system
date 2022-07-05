import {
    MutationCreateAcademicsArgs,
    MutationDeleteAcademicsArgs,
    QueryGetAcademicArgs,
    UpdateAcademicsArgs,
} from '@resume-managment-tool/api-interfaces';
import { AuthenticationError } from 'apollo-server-core';
import { Employee } from '../../db/schema/employee.schema';

/**
 * Academics GraphQL Queries
 **/
export const academicsQueries = {
    getAcademics: async (_, __, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        if (!employee.academics) {
            throw new Error(`Academics doesn't exist`);
        }

        return employee._doc.academics;
    },
    getAcademic: async (_, { academicId }: QueryGetAcademicArgs, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }

        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        const academicItem = employee.academics.id({ _id: academicId });

        if (!academicItem) {
            throw new Error('No academic item found');
        }

        return academicItem._doc;
    },
};

/**
 * Academics GraphQL Mutations
 */
export const academicsMutation = {
    createAcademics: async (_, { academicsInput }: MutationCreateAcademicsArgs, req) => {
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
                { $push: { academics: { ...academicsInput } } },
                { new: true }
            );
            return updatedEmployee.academics;
        } catch (error) {
            throw new Error(error);
        }
    },
    updateAcademics: async (
        _,
        {
            updateAcademicsArgs: { academicId, academicsInput },
        }: { updateAcademicsArgs: UpdateAcademicsArgs },
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

        const academicItem = employee.academics.id({ _id: academicId });

        if (!academicItem) {
            throw new Error('No academic item found');
        }

        academicItem.degree = academicsInput.degree;
        academicItem.branch = academicsInput.branch;
        academicItem.institution = academicsInput.institution;
        academicItem.dateRange = academicsInput.dateRange;
        academicItem.grade = academicsInput.grade;
        academicItem.description = academicsInput.description;

        try {
            const updatedEmployee = await employee.save();
            return updatedEmployee.academics.id({ _id: academicId });
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteAcademics: async (_, { academicId }: MutationDeleteAcademicsArgs, req) => {
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
                { $pull: { academics: { _id: academicId } } },
                { new: true }
            );
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },
};
