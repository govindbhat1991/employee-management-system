import { UpdateEmployeeInput } from '@resume-managment-tool/api-interfaces';
import { Employee } from '../../db/schema/employee.schema';
import * as PasswordValidator from 'password-validator';
import * as Bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../../environments/environment';
import { AuthenticationError } from 'apollo-server-core';

const createPasswordValidator = (password: string): string[] => {
    const schema = new PasswordValidator();
    schema
        .is()
        .min(8)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits(1)
        .is()
        .not()
        .oneOf(['Password123']);

    return schema.validate(password, { list: true }) as string[];
};

const createUserJwtToken = (
    userId: string,
    username: string,
    { jwtSecretKey, expiresIn }: { jwtSecretKey: string; expiresIn: string }
) => {
    return jwt.sign({ userId, username }, jwtSecretKey, { expiresIn });
};

/**
 * Employee GraphQL Queries
 **/
export const employeeQueries = {
    getEmployees: async (_, __, req) => {
        if (!req?.user?.userId) {
            throw new AuthenticationError('You must be logged in');
        }

        try {
            const employee = await Employee.find();
            return employee;
        } catch (error) {
            throw new Error(error);
        }
    },
    getEmployee: async (_, __, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }

        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        return { ...employee._doc, _id: employee._id.toString() };
    },
    getEmployeeSkills: async (_, { skillInput = '' }, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }

        const employee = await Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        // @TODO change with, filter and fetch directly from db.
        return employee.skills.filter((element) =>
            element.toLowerCase().includes(skillInput.toLowerCase())
        );
    },
    login: async (_, { username, password }: { username: string; password: string }) => {
        const employee = await Employee.findOne({ username });

        if (!employee) {
            throw new Error(`User doesn't exist`);
        }

        if (!(await Bcrypt.compare(password, employee.password))) {
            throw new Error('Password incorrect');
        }

        return {
            token: createUserJwtToken(employee._id.toString(), employee.username, {
                jwtSecretKey: environment.authConfig.jwtSecretKey,
                expiresIn: environment.authConfig.expiresIn,
            }),
            userId: employee._id.toString(),
        };
    },
};

/**
 * Employee GraphQL Mutations
 */
export const employeeMutation = {
    createEmployee: async (_, { username, password }: { username: string; password: string }) => {
        if (await Employee.findOne({ username })) {
            throw new Error('User already exist');
        }

        const isPasswordValid = createPasswordValidator(password);

        if (isPasswordValid.length) {
            throw isPasswordValid.map((message) => new Error(message));
        }

        const hashedPassword = await Bcrypt.hash(password, 12);

        const newEmployee = new Employee({
            username,
            password: hashedPassword,
        });

        try {
            await newEmployee.save();
            return { username: newEmployee.username, userId: newEmployee._id.toString() };
        } catch (error) {
            throw new Error(error);
        }
    },
    updateEmployee: async (_, { employeeInput }: { employeeInput: UpdateEmployeeInput }, req) => {
        const userId = req?.user?.userId;
        if (!userId) {
            throw new AuthenticationError('You must be logged in');
        }
        const employee = await Employee.findById(userId);

        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }

        employee.firstName = employeeInput.firstName;
        employee.middleName = employeeInput.middleName;
        employee.lastName = employeeInput.lastName;
        employee.gender = employeeInput.gender;
        employee.dob = employeeInput.dob;
        employee.language = employeeInput.language;
        employee.contact = employeeInput.contact;

        try {
            const updatedEmployee = await employee.save();
            return { ...updatedEmployee._doc, userId: updatedEmployee._id.toString() };
        } catch (error) {
            throw new Error(error);
        }
    },
};
