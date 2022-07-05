export const PORT = 8080;

export const environment = {
    production: false,
    authConfig: {
        jwtSecretKey: 'cqCBwlG1atlLScf451Z0CBGgjYNkr1GUgaKZGoh6s6TquTCOM9YkPMTbhWZV2ry',
        expiresIn: '5h',
    },
    serverURL: `http://localhost:${PORT}/`,
    dbString: 'mongodb://localhost:27017/resumemanagementtool',
};
