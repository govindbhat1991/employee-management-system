/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/db/db.connector.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dbConnector = void 0;
const mongoose_1 = __webpack_require__("mongoose");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
/**
 * Mongoose Connection
 **/
class dbConnector {
    static init() {
        mongoose_1.default.connect(environment_1.environment.dbString);
        const db = mongoose_1.default.connection;
        db.on('error', () => {
            console.error('Error while connecting to DB');
        });
    }
}
exports.dbConnector = dbConnector;


/***/ }),

/***/ "./apps/api/src/app/db/schema/employee.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Employee = void 0;
const mongoose_1 = __webpack_require__("mongoose");
const Schema = mongoose_1.default.Schema;
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
exports.Employee = mongoose_1.default.model('Employee', employeeSchema);


/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers.graphql.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const employee_resolver_1 = __webpack_require__("./apps/api/src/app/graphql/resolvers/employee.resolver.ts");
const academics_resolver_1 = __webpack_require__("./apps/api/src/app/graphql/resolvers/academics.resolver.ts");
const certifications_resolver_1 = __webpack_require__("./apps/api/src/app/graphql/resolvers/certifications.resolver.ts");
const work_experiences_resolver_1 = __webpack_require__("./apps/api/src/app/graphql/resolvers/work-experiences.resolver.ts");
const projects_resolver_1 = __webpack_require__("./apps/api/src/app/graphql/resolvers/projects.resolver.ts");
const professional_overview_resolver_1 = __webpack_require__("./apps/api/src/app/graphql/resolvers/professional-overview.resolver.ts");
/**
 * GraphQL Resolvers
 **/
exports["default"] = {
    Query: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, employee_resolver_1.employeeQueries), academics_resolver_1.academicsQueries), certifications_resolver_1.certificationsQueries), work_experiences_resolver_1.workExperienceQueries), projects_resolver_1.projectsQueries), professional_overview_resolver_1.professionalOverviewQueries),
    Mutation: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, employee_resolver_1.employeeMutation), academics_resolver_1.academicsMutation), certifications_resolver_1.certificationsMutation), work_experiences_resolver_1.workExperienceMutation), projects_resolver_1.projectsMutation), professional_overview_resolver_1.professionalOverviewMutation),
};


/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/academics.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.academicsMutation = exports.academicsQueries = void 0;
const tslib_1 = __webpack_require__("tslib");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
const employee_schema_1 = __webpack_require__("./apps/api/src/app/db/schema/employee.schema.ts");
/**
 * Academics GraphQL Queries
 **/
exports.academicsQueries = {
    getAcademics: (_, __, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        if (!employee.academics) {
            throw new Error(`Academics doesn't exist`);
        }
        return employee._doc.academics;
    }),
    getAcademic: (_, { academicId }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        const academicItem = employee.academics.id({ _id: academicId });
        if (!academicItem) {
            throw new Error('No academic item found');
        }
        return academicItem._doc;
    }),
};
/**
 * Academics GraphQL Mutations
 */
exports.academicsMutation = {
    createAcademics: (_, { academicsInput }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }
        try {
            const updatedEmployee = yield employee_schema_1.Employee.findOneAndUpdate({ _id: userId }, { $push: { academics: Object.assign({}, academicsInput) } }, { new: true });
            return updatedEmployee.academics;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    updateAcademics: (_, { updateAcademicsArgs: { academicId, academicsInput }, }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const userId = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
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
            const updatedEmployee = yield employee.save();
            return updatedEmployee.academics.id({ _id: academicId });
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    deleteAcademics: (_, { academicId }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _e;
        const userId = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }
        try {
            yield employee_schema_1.Employee.findOneAndUpdate({ _id: userId }, { $pull: { academics: { _id: academicId } } }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
};


/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/certifications.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.certificationsMutation = exports.certificationsQueries = void 0;
const tslib_1 = __webpack_require__("tslib");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
const employee_schema_1 = __webpack_require__("./apps/api/src/app/db/schema/employee.schema.ts");
/**
 * Certifications GraphQL Queries
 **/
exports.certificationsQueries = {
    getCertifications: (_, __, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        if (!employee.certifications) {
            throw new Error(`Certifications doesn't exist`);
        }
        return employee._doc.certifications;
    }),
    getCertification: (_, { certificationId }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        const certificationItem = employee.certifications.id({ _id: certificationId });
        if (!certificationItem) {
            throw new Error('No certification item found');
        }
        return certificationItem._doc;
    }),
};
/**
 * Certifications GraphQL Mutations
 */
exports.certificationsMutation = {
    createCertification: (_, { certificationInput }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }
        try {
            const updatedEmployee = yield employee_schema_1.Employee.findOneAndUpdate({ _id: userId }, { $push: { certifications: Object.assign({}, certificationInput) } }, { new: true });
            return updatedEmployee.certifications;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    updateCertification: (_, { updateCertificationArgs: { certificationId, certificationInput }, }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const userId = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
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
            const updatedEmployee = yield employee.save();
            return updatedEmployee.certifications.id({ _id: certificationId });
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    deleteCertification: (_, { certificationId }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _e;
        const userId = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }
        try {
            yield employee_schema_1.Employee.findOneAndUpdate({ _id: userId }, { $pull: { certifications: { _id: certificationId } } }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
};


/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/employee.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.employeeMutation = exports.employeeQueries = void 0;
const tslib_1 = __webpack_require__("tslib");
const employee_schema_1 = __webpack_require__("./apps/api/src/app/db/schema/employee.schema.ts");
const PasswordValidator = __webpack_require__("password-validator");
const Bcrypt = __webpack_require__("bcrypt");
const jwt = __webpack_require__("jsonwebtoken");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
const createPasswordValidator = (password) => {
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
    return schema.validate(password, { list: true });
};
const createUserJwtToken = (userId, username, { jwtSecretKey, expiresIn }) => {
    return jwt.sign({ userId, username }, jwtSecretKey, { expiresIn });
};
/**
 * Employee GraphQL Queries
 **/
exports.employeeQueries = {
    getEmployees: (_, __, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        try {
            const employee = yield employee_schema_1.Employee.find();
            return employee;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    getEmployee: (_, __, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        return Object.assign(Object.assign({}, employee._doc), { _id: employee._id.toString() });
    }),
    getEmployeeSkills: (_, { skillInput = '' }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        // @TODO change with, filter and fetch directly from db.
        return employee.skills.filter((element) => element.toLowerCase().includes(skillInput.toLowerCase()));
    }),
    login: (_, { username, password }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const employee = yield employee_schema_1.Employee.findOne({ username });
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        if (!(yield Bcrypt.compare(password, employee.password))) {
            throw new Error('Password incorrect');
        }
        return {
            token: createUserJwtToken(employee._id.toString(), employee.username, {
                jwtSecretKey: environment_1.environment.authConfig.jwtSecretKey,
                expiresIn: environment_1.environment.authConfig.expiresIn,
            }),
            userId: employee._id.toString(),
        };
    }),
};
/**
 * Employee GraphQL Mutations
 */
exports.employeeMutation = {
    createEmployee: (_, { username, password }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (yield employee_schema_1.Employee.findOne({ username })) {
            throw new Error('User already exist');
        }
        const isPasswordValid = createPasswordValidator(password);
        if (isPasswordValid.length) {
            throw isPasswordValid.map((message) => new Error(message));
        }
        const hashedPassword = yield Bcrypt.hash(password, 12);
        const newEmployee = new employee_schema_1.Employee({
            username,
            password: hashedPassword,
        });
        try {
            yield newEmployee.save();
            return { username: newEmployee.username, userId: newEmployee._id.toString() };
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    updateEmployee: (_, { employeeInput }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const userId = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
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
            const updatedEmployee = yield employee.save();
            return Object.assign(Object.assign({}, updatedEmployee._doc), { userId: updatedEmployee._id.toString() });
        }
        catch (error) {
            throw new Error(error);
        }
    }),
};


/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/professional-overview.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.professionalOverviewMutation = exports.professionalOverviewQueries = void 0;
const tslib_1 = __webpack_require__("tslib");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
const employee_schema_1 = __webpack_require__("./apps/api/src/app/db/schema/employee.schema.ts");
/**
 * Professional Overview GraphQL Queries
 **/
exports.professionalOverviewQueries = {
    getProfessionalOverview: (_, __, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        if (!employee.professionalOverview) {
            throw new Error(`Professional Overview doesn't exist`);
        }
        return employee._doc.professionalOverview;
    }),
};
/**
 * Professional Overview GraphQL Mutations
 */
exports.professionalOverviewMutation = {
    updateProfessionalOverview: (_, { updateProfessionalOverviewArgs: professionalOverviewInput, }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error('No employee found');
        }
        employee.professionalOverview = professionalOverviewInput;
        try {
            const updatedEmployee = yield employee.save();
            return updatedEmployee._doc.professionalOverview;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
};


/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/projects.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.projectsMutation = exports.projectsQueries = void 0;
const tslib_1 = __webpack_require__("tslib");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
const employee_schema_1 = __webpack_require__("./apps/api/src/app/db/schema/employee.schema.ts");
const skillsHandler = (projects, skillsInput, projectId = '') => {
    const employeeSkills = projects
        .filter((project) => project._id !== projectId)
        .map((project) => project.skills)
        .flat();
    return [...new Set([...employeeSkills, ...skillsInput])];
};
/**
 * Projects GraphQL Queries
 **/
exports.projectsQueries = {
    getProjects: (_, __, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        if (!employee.projects) {
            throw new Error(`Projects doesn't exist`);
        }
        return employee._doc.projects;
    }),
    getProject: (_, { projectId }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        const projectItem = employee.projects.id({ _id: projectId });
        if (!projectItem) {
            throw new Error('No project item found');
        }
        return projectItem._doc;
    }),
};
/**
 * Projects GraphQL Mutations
 */
exports.projectsMutation = {
    createProject: (_, { projectInput }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }
        try {
            employee.skills = skillsHandler(employee.projects, projectInput.skills);
            yield employee.save();
            const updatedEmployee = yield employee_schema_1.Employee.findOneAndUpdate({ _id: userId }, { $push: { projects: Object.assign({}, projectInput) } }, { new: true });
            return updatedEmployee.projects;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    updateProject: (_, { updateProjectArgs: { projectId, projectInput }, }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const userId = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error('No employee found');
        }
        const projectItem = employee.projects.id({ _id: projectId });
        if (!projectItem) {
            throw new Error('No project item found');
        }
        projectItem.name = projectInput.name;
        projectItem.dateRange = projectInput.dateRange;
        projectItem.position = projectInput.position;
        projectItem.skills = projectInput.skills;
        projectItem.description = projectInput.description;
        projectItem.rolesAndResponsibility = projectInput.rolesAndResponsibility;
        employee.skills = skillsHandler(employee.projects, projectInput.skills, projectId);
        try {
            const updatedEmployee = yield employee.save();
            return updatedEmployee.projects.id({ _id: projectId });
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    deleteProject: (_, { projectId }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _e;
        const userId = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }
        try {
            yield employee_schema_1.Employee.findOneAndUpdate({ _id: userId }, { $pull: { projects: { _id: projectId } } }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
};


/***/ }),

/***/ "./apps/api/src/app/graphql/resolvers/work-experiences.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.workExperienceMutation = exports.workExperienceQueries = void 0;
const tslib_1 = __webpack_require__("tslib");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
const employee_schema_1 = __webpack_require__("./apps/api/src/app/db/schema/employee.schema.ts");
/**
 * Work Experience GraphQL Queries
 **/
exports.workExperienceQueries = {
    getWorkExperiences: (_, __, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        if (!employee.workExperiences) {
            throw new Error(`Work Experiences doesn't exist`);
        }
        return employee._doc.workExperiences;
    }),
    getWorkExperience: (_, { workExperienceId }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            throw new Error(`User doesn't exist`);
        }
        const workExperienceItem = employee.workExperiences.id({ _id: workExperienceId });
        if (!workExperienceItem) {
            throw new Error('No work experience item found');
        }
        return workExperienceItem._doc;
    }),
};
/**
 * Work Experience GraphQL Mutations
 */
exports.workExperienceMutation = {
    createWorkExperience: (_, { workExperienceInput }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }
        try {
            const updatedEmployee = yield employee_schema_1.Employee.findOneAndUpdate({ _id: userId }, { $push: { workExperiences: Object.assign({}, workExperienceInput) } }, { new: true });
            return updatedEmployee.workExperiences;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    updateWorkExperience: (_, { updateWorkExperienceArgs: { workExperienceId, workExperienceInput }, }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const userId = (_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
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
            const updatedEmployee = yield employee.save();
            return updatedEmployee.workExperiences.id({ _id: workExperienceId });
        }
        catch (error) {
            throw new Error(error);
        }
    }),
    deleteWorkExperience: (_, { workExperienceId }, req) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _e;
        const userId = (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.userId;
        if (!userId) {
            throw new apollo_server_core_1.AuthenticationError('You must be logged in');
        }
        const employee = yield employee_schema_1.Employee.findById(userId);
        if (!employee) {
            const error = new Error('No employee found');
            throw error;
        }
        try {
            yield employee_schema_1.Employee.findOneAndUpdate({ _id: userId }, { $pull: { workExperiences: { _id: workExperienceId } } }, { new: true });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }),
};


/***/ }),

/***/ "./apps/api/src/app/graphql/schema.graphql.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const apollo_server_1 = __webpack_require__("apollo-server");
exports["default"] = (0, apollo_server_1.gql) `
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


/***/ }),

/***/ "./apps/api/src/environments/environment.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = exports.PORT = void 0;
exports.PORT = 8080;
exports.environment = {
    production: false,
    authConfig: {
        jwtSecretKey: 'cqCBwlG1atlLScf451Z0CBGgjYNkr1GUgaKZGoh6s6TquTCOM9YkPMTbhWZV2ry',
        expiresIn: '5h',
    },
    serverURL: `http://localhost:${exports.PORT}/`,
    dbString: 'mongodb://localhost:27017/resumemanagementtool',
};


/***/ }),

/***/ "apollo-server":
/***/ ((module) => {

module.exports = require("apollo-server");

/***/ }),

/***/ "apollo-server-core":
/***/ ((module) => {

module.exports = require("apollo-server-core");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "password-validator":
/***/ ((module) => {

module.exports = require("password-validator");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "http":
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const express = __webpack_require__("express");
const http = __webpack_require__("http");
const apollo_server_1 = __webpack_require__("apollo-server");
const apollo_server_core_1 = __webpack_require__("apollo-server-core");
const schema_graphql_1 = __webpack_require__("./apps/api/src/app/graphql/schema.graphql.ts");
const resolvers_graphql_1 = __webpack_require__("./apps/api/src/app/graphql/resolvers.graphql.ts");
const db_connector_1 = __webpack_require__("./apps/api/src/app/db/db.connector.ts");
const path = __webpack_require__("path");
const jwt = __webpack_require__("jsonwebtoken");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const getUser = (authHeader) => {
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, environment_1.environment.authConfig.jwtSecretKey);
        return decoded;
    }
    catch (error) {
        console.warn(error);
    }
};
const CLIENT_BUILD_PATH = path.join(__dirname, '../resume-managment-tool');
const app = express();
const httpServer = http.createServer(app);
app.use(express.static(CLIENT_BUILD_PATH));
const apolloServer = new apollo_server_1.ApolloServer({
    typeDefs: schema_graphql_1.default,
    resolvers: resolvers_graphql_1.default,
    plugins: [
        apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground,
        (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
    ],
    csrfPrevention: true,
    cors: { origin: true, credentials: true },
    context: ({ req }) => {
        const token = req.get('Authorization') || '';
        const user = getUser(token);
        return { user };
    },
});
app.get('/*', (request, response) => {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});
apolloServer.listen({ port: environment_1.PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${environment_1.PORT}${apolloServer.graphqlPath}`);
});
db_connector_1.dbConnector.init();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map