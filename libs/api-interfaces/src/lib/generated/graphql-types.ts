import gql from 'graphql-tag';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
};

export type Academics = {
    readonly __typename?: 'Academics';
    readonly _id?: Maybe<Scalars['String']>;
    readonly branch?: Maybe<Scalars['String']>;
    readonly dateRange?: Maybe<DateRange>;
    readonly degree?: Maybe<Scalars['String']>;
    readonly description?: Maybe<Scalars['String']>;
    readonly grade?: Maybe<Scalars['String']>;
    readonly institution?: Maybe<Scalars['String']>;
};

export type AcademicsInput = {
    readonly branch?: InputMaybe<Scalars['String']>;
    readonly dateRange?: InputMaybe<DateRangeInput>;
    readonly degree?: InputMaybe<Scalars['String']>;
    readonly description?: InputMaybe<Scalars['String']>;
    readonly grade?: InputMaybe<Scalars['String']>;
    readonly institution?: InputMaybe<Scalars['String']>;
};

export type AddressInput = {
    readonly adressLine1?: InputMaybe<Scalars['String']>;
    readonly adressLine2?: InputMaybe<Scalars['String']>;
    readonly adressLine3?: InputMaybe<Scalars['String']>;
    readonly city?: InputMaybe<Scalars['String']>;
    readonly country?: InputMaybe<Scalars['String']>;
    readonly zipcode?: InputMaybe<Scalars['Int']>;
};

export type AddressModel = {
    readonly __typename?: 'AddressModel';
    readonly adressLine1?: Maybe<Scalars['String']>;
    readonly adressLine2?: Maybe<Scalars['String']>;
    readonly adressLine3?: Maybe<Scalars['String']>;
    readonly city?: Maybe<Scalars['String']>;
    readonly country?: Maybe<Scalars['String']>;
    readonly zipcode?: Maybe<Scalars['Int']>;
};

export type AuthData = {
    readonly __typename?: 'AuthData';
    readonly token: Scalars['String'];
    readonly userId: Scalars['ID'];
};

export type Certification = {
    readonly __typename?: 'Certification';
    readonly _id?: Maybe<Scalars['String']>;
    readonly authority?: Maybe<Scalars['String']>;
    readonly course?: Maybe<Scalars['String']>;
    readonly issueDate?: Maybe<Scalars['Date']>;
};

export type CertificationInput = {
    readonly authority?: InputMaybe<Scalars['String']>;
    readonly course?: InputMaybe<Scalars['String']>;
    readonly issueDate?: InputMaybe<Scalars['Date']>;
};

export type Contact = {
    readonly __typename?: 'Contact';
    readonly email?: Maybe<Scalars['String']>;
    readonly permanentAddress?: Maybe<AddressModel>;
    readonly phoneNumber?: Maybe<Scalars['Float']>;
    readonly temporaryAddress?: Maybe<AddressModel>;
};

export type ContactInput = {
    readonly email?: InputMaybe<Scalars['String']>;
    readonly permanentAddress?: InputMaybe<AddressInput>;
    readonly phoneNumber?: InputMaybe<Scalars['Float']>;
    readonly temporaryAddress?: InputMaybe<AddressInput>;
};

export type CreateEmployee = {
    readonly __typename?: 'CreateEmployee';
    readonly userId: Scalars['ID'];
    readonly username: Scalars['String'];
};

export type DateRange = {
    readonly __typename?: 'DateRange';
    readonly from?: Maybe<Scalars['Date']>;
    readonly to?: Maybe<Scalars['Date']>;
};

export type DateRangeInput = {
    readonly from?: InputMaybe<Scalars['Date']>;
    readonly to?: InputMaybe<Scalars['Date']>;
};

export type Employee = {
    readonly __typename?: 'Employee';
    readonly _id?: Maybe<Scalars['ID']>;
    readonly academics?: Maybe<ReadonlyArray<Maybe<Academics>>>;
    readonly certification?: Maybe<ReadonlyArray<Maybe<Certification>>>;
    readonly contact?: Maybe<Contact>;
    readonly dob?: Maybe<Scalars['Date']>;
    readonly firstName?: Maybe<Scalars['String']>;
    readonly gender?: Maybe<Gender>;
    readonly language?: Maybe<Scalars['String']>;
    readonly lastName?: Maybe<Scalars['String']>;
    readonly middleName?: Maybe<Scalars['String']>;
    readonly professionalOverview?: Maybe<ProfessionalOverview>;
    readonly projects?: Maybe<ReadonlyArray<Maybe<Project>>>;
    readonly skills?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
    readonly workExperiences?: Maybe<ReadonlyArray<Maybe<WorkExperience>>>;
};

export enum Gender {
    Female = 'FEMALE',
    Male = 'MALE',
    Other = 'OTHER',
}

export type Mutation = {
    readonly __typename?: 'Mutation';
    readonly createAcademics?: Maybe<ReadonlyArray<Maybe<Academics>>>;
    readonly createCertification?: Maybe<ReadonlyArray<Maybe<Certification>>>;
    readonly createEmployee: CreateEmployee;
    readonly createProject?: Maybe<ReadonlyArray<Maybe<Project>>>;
    readonly createWorkExperience?: Maybe<ReadonlyArray<Maybe<WorkExperience>>>;
    readonly deleteAcademics: Scalars['Boolean'];
    readonly deleteCertification: Scalars['Boolean'];
    readonly deleteProject: Scalars['Boolean'];
    readonly deleteWorkExperience: Scalars['Boolean'];
    readonly updateAcademics: Academics;
    readonly updateCertification: Certification;
    readonly updateEmployee: Employee;
    readonly updateProfessionalOverview: ProfessionalOverview;
    readonly updateProject: Project;
    readonly updateWorkExperience: WorkExperience;
};

export type MutationCreateAcademicsArgs = {
    academicsInput: AcademicsInput;
};

export type MutationCreateCertificationArgs = {
    certificationInput: CertificationInput;
};

export type MutationCreateEmployeeArgs = {
    password: Scalars['String'];
    username: Scalars['ID'];
};

export type MutationCreateProjectArgs = {
    projectInput: ProjectInput;
};

export type MutationCreateWorkExperienceArgs = {
    workExperienceInput: WorkExperienceInput;
};

export type MutationDeleteAcademicsArgs = {
    academicId: Scalars['ID'];
};

export type MutationDeleteCertificationArgs = {
    certificationId: Scalars['ID'];
};

export type MutationDeleteProjectArgs = {
    projectId: Scalars['ID'];
};

export type MutationDeleteWorkExperienceArgs = {
    workExperienceId: Scalars['ID'];
};

export type MutationUpdateAcademicsArgs = {
    updateAcademicsArgs: UpdateAcademicsArgs;
};

export type MutationUpdateCertificationArgs = {
    updateCertificationArgs: UpdateCertificationArgs;
};

export type MutationUpdateEmployeeArgs = {
    employeeInput: UpdateEmployeeInput;
};

export type MutationUpdateProfessionalOverviewArgs = {
    updateProfessionalOverviewArgs: UpdateProfessionalOverviewArgs;
};

export type MutationUpdateProjectArgs = {
    updateProjectArgs: UpdateProjectArgs;
};

export type MutationUpdateWorkExperienceArgs = {
    updateWorkExperienceArgs: UpdateWorkExperienceArgs;
};

export type ProfessionalOverview = {
    readonly __typename?: 'ProfessionalOverview';
    readonly _id?: Maybe<Scalars['String']>;
    readonly professionalSummary?: Maybe<Scalars['String']>;
};

export type ProfessionalOverviewInput = {
    readonly professionalSummary?: InputMaybe<Scalars['String']>;
};

export type Project = {
    readonly __typename?: 'Project';
    readonly _id?: Maybe<Scalars['String']>;
    readonly dateRange?: Maybe<DateRange>;
    readonly description?: Maybe<Scalars['String']>;
    readonly name?: Maybe<Scalars['String']>;
    readonly position?: Maybe<Scalars['String']>;
    readonly rolesAndResponsibility?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
    readonly skills?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
};

export type ProjectInput = {
    readonly dateRange?: InputMaybe<DateRangeInput>;
    readonly description?: InputMaybe<Scalars['String']>;
    readonly name?: InputMaybe<Scalars['String']>;
    readonly position?: InputMaybe<Scalars['String']>;
    readonly rolesAndResponsibility?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
    readonly skills?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
};

export type Query = {
    readonly __typename?: 'Query';
    readonly getAcademic: Academics;
    readonly getAcademics?: Maybe<ReadonlyArray<Maybe<Academics>>>;
    readonly getCertification: Certification;
    readonly getCertifications?: Maybe<ReadonlyArray<Maybe<Certification>>>;
    readonly getEmployee?: Maybe<Employee>;
    readonly getEmployeeSkills?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
    readonly getEmployees?: Maybe<ReadonlyArray<Maybe<Employee>>>;
    readonly getProfessionalOverview?: Maybe<ProfessionalOverview>;
    readonly getProject: Project;
    readonly getProjects?: Maybe<ReadonlyArray<Maybe<Project>>>;
    readonly getWorkExperience: WorkExperience;
    readonly getWorkExperiences?: Maybe<ReadonlyArray<Maybe<WorkExperience>>>;
    readonly login: AuthData;
};

export type QueryGetAcademicArgs = {
    academicId: Scalars['ID'];
};

export type QueryGetCertificationArgs = {
    certificationId: Scalars['ID'];
};

export type QueryGetEmployeeSkillsArgs = {
    skillInput?: InputMaybe<Scalars['String']>;
};

export type QueryGetProjectArgs = {
    projectId: Scalars['ID'];
};

export type QueryGetWorkExperienceArgs = {
    workExperienceId: Scalars['ID'];
};

export type QueryLoginArgs = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type UpdateAcademicsArgs = {
    readonly academicId: Scalars['ID'];
    readonly academicsInput: AcademicsInput;
};

export type UpdateCertificationArgs = {
    readonly certificationId: Scalars['ID'];
    readonly certificationInput: CertificationInput;
};

export type UpdateEmployeeInput = {
    readonly contact?: InputMaybe<ContactInput>;
    readonly dob?: InputMaybe<Scalars['Date']>;
    readonly firstName?: InputMaybe<Scalars['String']>;
    readonly gender?: InputMaybe<Gender>;
    readonly language?: InputMaybe<Scalars['String']>;
    readonly lastName?: InputMaybe<Scalars['String']>;
    readonly middleName?: InputMaybe<Scalars['String']>;
};

export type UpdateProfessionalOverviewArgs = {
    readonly professionalSummary: Scalars['String'];
};

export type UpdateProjectArgs = {
    readonly projectId: Scalars['ID'];
    readonly projectInput: ProjectInput;
};

export type UpdateWorkExperienceArgs = {
    readonly workExperienceId: Scalars['ID'];
    readonly workExperienceInput: WorkExperienceInput;
};

export type WorkExperience = {
    readonly __typename?: 'WorkExperience';
    readonly _id?: Maybe<Scalars['String']>;
    readonly company?: Maybe<Scalars['String']>;
    readonly dateRange?: Maybe<DateRange>;
    readonly position?: Maybe<Scalars['String']>;
};

export type WorkExperienceInput = {
    readonly company?: InputMaybe<Scalars['String']>;
    readonly dateRange?: InputMaybe<DateRangeInput>;
    readonly position?: InputMaybe<Scalars['String']>;
};
