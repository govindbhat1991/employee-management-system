import * as express from 'express';
import * as http from 'http';
import { ApolloServer } from 'apollo-server';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import typeDefs from './app/graphql/schema.graphql';
import resolvers from './app/graphql/resolvers.graphql';
import { dbConnector } from './app/db/db.connector';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import { environment, PORT } from './environments/environment';

const getUser = (authHeader) => {
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, environment.authConfig.jwtSecretKey);
        return decoded;
    } catch (error) {
        console.warn(error);
    }
};

const CLIENT_BUILD_PATH = path.join(__dirname, '../resume-managment-tool');

const app = express();
const httpServer = http.createServer(app);

app.use(express.static(CLIENT_BUILD_PATH));

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground,
        ApolloServerPluginDrainHttpServer({ httpServer }),
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

apolloServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});

dbConnector.init();
