export const PORT = 8080;

export const environment = {
    production: true,
    authConfig: {
        jwtSecretKey: 'cqCBwlG1atlLScf451Z0CBGgjYNkr1GUgaKZGoh6s6TquTCOM9YkPMTbhWZV2ry',
        expiresIn: '1h',
    },
    serverURL: `http://localhost:${PORT}/`,
    dbString:
        'mongodb+srv://gnbhat:1234567890@resumemanagementtool.ib16t.mongodb.net/?retryWrites=true&w=majority',
};
