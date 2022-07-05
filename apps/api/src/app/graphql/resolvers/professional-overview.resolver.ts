import { MutationUpdateProfessionalOverviewArgs } from '@resume-managment-tool/api-interfaces';
import { AuthenticationError } from 'apollo-server-core';
import { Employee } from '../../db/schema/employee.schema';

/**
 * Professional Overview GraphQL Queries
 **/
export const professionalOverviewQueries = {
    getProfessionalOverview: async (_, __, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        if (!employee.professionalOverview) {
            throw new Error(`Professional Overview doesn't exist`);
        }

        return employee._doc.professionalOverview;
    },
};

/**
 * Professional Overview GraphQL Mutations
 */
export const professionalOverviewMutation = {
    updateProfessionalOverview: async (
        _,
        {
            updateProfessionalOverviewArgs: professionalOverviewInput,
        }: MutationUpdateProfessionalOverviewArgs,
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

        employee.professionalOverview = professionalOverviewInput;

        try {
            const updatedEmployee = await employee.save();
            return updatedEmployee._doc.professionalOverview;
        } catch (error) {
            throw new Error(error);
        }
    },
};
