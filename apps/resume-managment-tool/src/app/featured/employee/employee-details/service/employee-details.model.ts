import { AddressModel, Contact } from '@resume-managment-tool/api-interfaces';
import { EmployeeDetailsFormInput } from '../interfaces/employee-details.interface';

const getPermanentAddress = (address: AddressModel): AddressModel | null => {
    if (!address) {
        return null;
    }
    return {
        adressLine1: address?.adressLine1 || null,
        adressLine2: address?.adressLine2 || null,
        adressLine3: address?.adressLine3 || null,
        city: address?.city || null,
        zipcode: address?.zipcode || null,
        country: address?.country || null,
    };
};

const getContact = (contact: Contact): Contact | null => {
    if (!contact) {
        return null;
    }
    return {
        email: contact.email || null,
        phoneNumber: contact.phoneNumber || null,
        permanentAddress: contact.permanentAddress
            ? getPermanentAddress(contact.permanentAddress)
            : null,
    };
};

export const getEmployeeValues = (
    employee: EmployeeDetailsFormInput
): EmployeeDetailsFormInput | null => {
    if (!employee) {
        return null;
    }
    return {
        firstName: employee.firstName || null,
        middleName: employee.middleName || null,
        lastName: employee.lastName || null,
        contact: employee.contact ? getContact(employee.contact) : null,
    };
};
