import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import classes from './employee-details.module.scss';
import { UpdateEmployeeInput } from '@resume-managment-tool/api-interfaces';
import CardComponent from '../../../components/card/card.component';
import InputFieldComponent from '../../../components/forms/input/input-field.component';
import { getEmployeeValues } from './service/employee-details.model';
import {
    useEmployeeDetailsQuery,
    useUpdateEmployeeDetails,
} from './service/employee-details.service';

const EmployeeDetailsComponent = () => {
    const employee = useEmployeeDetailsQuery();
    const [employeeData, setEmployeeValue] = useState<any>();
    const { mutation: updateEmployee } = useUpdateEmployeeDetails();

    const employeeContact = employeeData?.contact;
    const permanentAddress = employeeContact?.permanentAddress;
    const permanentAddressData = {
        adressLine1: permanentAddress?.adressLine1 || '',
        adressLine2: permanentAddress?.adressLine2 || '',
        adressLine3: permanentAddress?.adressLine3 || '',
        city: permanentAddress?.city || '',
        zipcode: permanentAddress?.zipcode || '',
        country: permanentAddress?.country || '',
    };
    const employeeContactData = {
        email: employeeContact?.email || '',
        phoneNumber: employeeContact?.phoneNumber || '',
        permanentAddress: permanentAddressData,
    };

    /** employee details form intialization */
    const employeeDetailsForm = useFormik({
        initialValues: {
            firstName: employeeData?.firstName || '',
            middleName: employeeData?.middleName || '',
            lastName: employeeData?.lastName || '',
            contact: employeeContactData,
        },
        enableReinitialize: true,
        onSubmit: (employee) => {
            onSubmit(employee);
        },
    });

    /** update employee details */
    const onSubmit = (value: any) => {
        const employeeInput = getEmployeeValues(value) as UpdateEmployeeInput;

        updateEmployee({
            variables: {
                employeeInput,
            },
        }).then(({ data }) => {
            if (!data?.updateEmployee) {
                return;
            }
            setEmployeeValue(data.updateEmployee);
        });
    };

    /** employee form edit state handling */
    const [empDetailsEditState, setEmpDetailsEditState] = useState<boolean>(false);
    const editStateHandler = (state: boolean) => {
        setEmpDetailsEditState(state);
    };

    /** employee form data resetting to last saved value */
    const resetHanlder = () => {
        employeeDetailsForm.resetForm({ values: employeeData });
    };

    useEffect(() => {
        if (employee) {
            setEmployeeValue(employee);
        }
    }, [employee]);

    const employeeFormValue = employeeDetailsForm?.values;
    const contactAddress = employeeFormValue?.contact;
    const permaAddress = contactAddress?.permanentAddress;

    return (
        employeeDetailsForm && (
            <CardComponent
                styleClass={classes['employee-details__card']}
                header="Employee Details"
                onSave={employeeDetailsForm.handleSubmit}
                onClose={resetHanlder}
                editState={editStateHandler}
            >
                <form>
                    <div className="row">
                        <div className="col-2">
                            <div className={classes['img-dummy']}></div>
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="firstname"
                                        label="First Name"
                                        name="firstName"
                                        value={employeeFormValue?.firstName}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="middlename"
                                        label="Middle Name"
                                        name="middleName"
                                        value={employeeFormValue?.middleName}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="lastname"
                                        label="Last Name"
                                        name="lastName"
                                        value={employeeFormValue?.lastName}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <InputFieldComponent
                                        id="email"
                                        label="Email"
                                        name="contact.email"
                                        value={contactAddress?.email}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                                <div className="col-6">
                                    <InputFieldComponent
                                        id="phonenumber"
                                        type="number"
                                        label="Phone Number"
                                        name="contact.phoneNumber"
                                        value={contactAddress?.phoneNumber}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="adressline1"
                                        label="Address Line 1"
                                        name="contact.permanentAddress.adressLine1"
                                        value={permaAddress?.adressLine1}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="adressline2"
                                        label="Address Line 2"
                                        name="contact.permanentAddress.adressLine2"
                                        value={permaAddress?.adressLine2}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="adressline3"
                                        label="Address Line 3"
                                        name="contact.permanentAddress.adressLine3"
                                        value={permaAddress?.adressLine3}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="city"
                                        label="City"
                                        name="contact.permanentAddress.city"
                                        value={permaAddress?.city}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="zipcode"
                                        type="number"
                                        label="Zipcode"
                                        name="contact.permanentAddress.zipcode"
                                        value={permaAddress?.zipcode}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                                <div className="col-4">
                                    <InputFieldComponent
                                        id="country"
                                        label="Country"
                                        name="contact.permanentAddress.country"
                                        value={permaAddress?.country}
                                        disabled={!empDetailsEditState}
                                        onChange={employeeDetailsForm.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </CardComponent>
        )
    );
};

export default EmployeeDetailsComponent;
