import { gql } from 'apollo-server';

export default gql`
    scalar Date

    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    type DateRange {
        from: Date
        to: Date
    }

    type AddressModel {
        adressLine1: String
        adressLine2: String
        adressLine3: String
        city: String
        zipcode: Int
        country: String
    }

    type Contact {
        permanentAddress: AddressModel
        temporaryAddress: AddressModel
        phoneNumber: Float
        email: String
    }

    type Academics {
        _id: String
        degree: String
        branch: String
        institution: String
        dateRange: DateRange
        grade: String
        description: String
    }

    type Certification {
        _id: String
        course: String
        authority: String
        issueDate: Date
    }

    type Project {
        _id: String
        name: String
        dateRange: DateRange
        position: String
        skills: [String]
        description: String
        rolesAndResponsibility: [String]
    }

    type WorkExperience {
        _id: String
        company: String
        dateRange: DateRange
        position: String
    }

    type ProfessionalOverview {
        _id: String
        professionalSummary: String
    }

    type Employee {
        _id: ID
        firstName: String
        middleName: String
        lastName: String
        gender: Gender
        dob: Date
        language: String
        skills: [String]
        contact: Contact
        professionalOverview: ProfessionalOverview
        academics: [Academics]
        workExperiences: [WorkExperience]
        projects: [Project]
        certification: [Certification]
    }

    input DateRangeInput {
        from: Date
        to: Date
    }

    input AddressInput {
        adressLine1: String
        adressLine2: String
        adressLine3: String
        city: String
        zipcode: Int
        country: String
    }

    input ContactInput {
        permanentAddress: AddressInput
        temporaryAddress: AddressInput
        phoneNumber: Float
        email: String
    }

    input AcademicsInput {
        degree: String
        branch: String
        institution: String
        dateRange: DateRangeInput
        grade: String
        description: String
    }

    input CertificationInput {
        course: String
        authority: String
        issueDate: Date
    }

    input ProjectInput {
        name: String
        dateRange: DateRangeInput
        position: String
        skills: [String]
        description: String
        rolesAndResponsibility: [String]
    }

    input WorkExperienceInput {
        company: String
        dateRange: DateRangeInput
        position: String
    }

    input ProfessionalOverviewInput {
        professionalSummary: String
    }

    type AuthData {
        userId: ID!
        token: String!
    }

    type CreateEmployee {
        userId: ID!
        username: String!
    }

    input UpdateEmployeeInput {
        firstName: String
        middleName: String
        lastName: String
        gender: Gender
        dob: Date
        language: String
        contact: ContactInput
    }

    input UpdateProfessionalOverviewArgs {
        professionalSummary: String!
    }

    input UpdateAcademicsArgs {
        academicId: ID!
        academicsInput: AcademicsInput!
    }

    input UpdateCertificationArgs {
        certificationId: ID!
        certificationInput: CertificationInput!
    }

    input UpdateWorkExperienceArgs {
        workExperienceId: ID!
        workExperienceInput: WorkExperienceInput!
    }

    input UpdateProjectArgs {
        projectId: ID!
        projectInput: ProjectInput!
    }

    type Query {
        getEmployees: [Employee]
        getEmployee: Employee
        getEmployeeSkills(skillInput: String): [String]
        login(username: String!, password: String!): AuthData!

        getProfessionalOverview: ProfessionalOverview

        getAcademics: [Academics]
        getAcademic(academicId: ID!): Academics!

        getCertifications: [Certification]
        getCertification(certificationId: ID!): Certification!

        getWorkExperiences: [WorkExperience]
        getWorkExperience(workExperienceId: ID!): WorkExperience!

        getProjects: [Project]
        getProject(projectId: ID!): Project!
    }

    type Mutation {
        createEmployee(username: ID!, password: String!): CreateEmployee!
        updateEmployee(employeeInput: UpdateEmployeeInput!): Employee!

        updateProfessionalOverview(
            updateProfessionalOverviewArgs: UpdateProfessionalOverviewArgs!
        ): ProfessionalOverview!

        createAcademics(academicsInput: AcademicsInput!): [Academics]
        updateAcademics(updateAcademicsArgs: UpdateAcademicsArgs!): Academics!
        deleteAcademics(academicId: ID!): Boolean!

        createCertification(certificationInput: CertificationInput!): [Certification]
        updateCertification(updateCertificationArgs: UpdateCertificationArgs!): Certification!
        deleteCertification(certificationId: ID!): Boolean!

        createWorkExperience(workExperienceInput: WorkExperienceInput!): [WorkExperience]
        updateWorkExperience(updateWorkExperienceArgs: UpdateWorkExperienceArgs!): WorkExperience!
        deleteWorkExperience(workExperienceId: ID!): Boolean!

        createProject(projectInput: ProjectInput!): [Project]
        updateProject(updateProjectArgs: UpdateProjectArgs!): Project!
        deleteProject(projectId: ID!): Boolean!
    }
`;
