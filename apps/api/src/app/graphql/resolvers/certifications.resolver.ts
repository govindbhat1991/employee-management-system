import {
    MutationCreateCertificationArgs,
    MutationDeleteCertificationArgs,
    QueryGetCertificationArgs,
    UpdateCertificationArgs,
} from '@resume-managment-tool/api-interfaces';
import { AuthenticationError } from 'apollo-server-core';
import { Employee } from '../../db/schema/employee.schema';

/**
 * Certifications GraphQL Queries
 **/
export const certificationsQueries = {
    getCertifications: async (_, __, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        if (!employee.certifications) {
            throw new Error(`Certifications doesn't exist`);
        }

        return employee._doc.certifications;
    },
    getCertification: async (_, { certificationId }: QueryGetCertificationArgs, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }

        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        const certificationItem = employee.certifications.id({ _id: certificationId });

        if (!certificationItem) {
            throw new Error('No certification item found');
        }

        return certificationItem._doc;
    },
};

/**
 * Certifications GraphQL Mutations
 */
export const certificationsMutation = {
    createCertification: async (
        _,
        { certificationInput }: MutationCreateCertificationArgs,
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
                { $push: { certifications: { ...certificationInput } } },
                { new: true }
            );
            return updatedEmployee.certifications;
        } catch (error) {
            throw new Error(error);
        }
    },
    updateCertification: async (
        _,
        {
            updateCertificationArgs: { certificationId, certificationInput },
        }: { updateCertificationArgs: UpdateCertificationArgs },
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

        const certificationItem = employee.certifications.id({ _id: certificationId });

        if (!certificationItem) {
            throw new Error('No certification item found');
        }

        certificationItem.course = certificationInput.course;
        certificationItem.authority = certificationInput.authority;
        certificationItem.issueDate = certificationInput.issueDate;

        try {
            const updatedEmployee = await employee.save();
            return updatedEmployee.certifications.id({ _id: certificationId });
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteCertification: async (_, { certificationId }: MutationDeleteCertificationArgs, req) => {
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
                { $pull: { certifications: { _id: certificationId } } },
                { new: true }
            );
            return true;
        } catch (error) {
            throw new Error(error);
        }
    },
};
