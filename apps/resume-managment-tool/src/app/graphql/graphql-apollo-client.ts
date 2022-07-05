import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useContext, useEffect } from 'react';
import { environment } from '../../environments/environment';
import AuthContext from '../store/auth-context';

export const useApolloClient = () => {
    const authContext = useContext(AuthContext);

    const client = new ApolloClient({
        cache: new InMemoryCache({
            addTypename: false,
        }),
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (networkError) {
                    console.log(`[Network error]: ${networkError}`);
                }

                if (graphQLErrors) {
                    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
                        if (extensions['code'] === 'UNAUTHENTICATED') {
                            authContext.logout();
                        }
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        );
                    });
                }
            }),
            setContext((_, { headers }) => {
                const token = sessionStorage.getItem('token');
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : '',
                    },
                };
            }),
            new HttpLink({ uri: `${environment.apiUrl}/graphql` }),
        ]),
    });

    useEffect(() => {
        if (!authContext.isLoggedIn) {
            client.resetStore();
        }
    }, []);

    return client;
};
