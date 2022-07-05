import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dateRangeSchema = new Schema({
    from: {
        type: Date,
    },
    to: {
        type: Date,
    },
});

const certificationSchema = new Schema({
    course: {
        type: String,
    },
    authority: {
        type: String,
    },
    issueDate: {
        type: Date,
    },
});

const workExperienceSchema = new Schema({
    company: {
        type: String,
    },
    dateRange: {
        type: dateRangeSchema,
    },
    position: {
        type: String,
    },
});

const projectSchema = new Schema({
    name: {
        type: String,
    },
    dateRange: {
        type: dateRangeSchema,
    },
    position: {
        type: String,
    },
    skills: {
        type: [String],
    },
    description: {
        type: String,
    },
    rolesAndResponsibility: {
        type: [String],
    },
});

const academicsSchema = new Schema({
    degree: {
        type: String,
    },
    branch: {
        type: String,
    },
    institution: {
        type: String,
    },
    dateRange: {
        type: dateRangeSchema,
    },
    grade: {
        type: String,
    },
    description: {
        type: String,
    },
});

const professionalOverviewSchema = new Schema({
    professionalSummary: {
        type: String,
    },
});

const addressSchema = new Schema({
    adressLine1: {
        type: String,
    },
    adressLine2: {
        type: String,
    },
    adressLine3: {
        type: String,
    },
    city: {
        type: String,
    },
    zipcode: {
        type: Number,
    },
    country: {
        type: String,
    },
});

const contactSchema = new Schema({
    permanentAddress: {
        type: addressSchema,
    },
    temporaryAddress: {
        type: addressSchema,
    },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: String,
    },
});

const employeeSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    skills: {
        type: [String],
    },
    contact: {
        type: contactSchema,
    },
    professionalOverview: {
        type: professionalOverviewSchema,
    },
    academics: {
        type: [academicsSchema],
    },
    workExperiences: {
        type: [workExperienceSchema],
    },
    projects: {
        type: [projectSchema],
    },
    certifications: {
        type: [certificationSchema],
    },
});

export const Employee = mongoose.model('Employee', employeeSchema);
