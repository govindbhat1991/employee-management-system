import { Navigate, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import Register from './featured/register/register';
import Login from './featured/login/login';
import Header from './featured/header/header';
import classes from './app.module.scss';
import Dashboard from './featured/dashboard/dashboard';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import Sidebar from './featured/sidebar-nav/sidebar';
import { useApolloClient } from './graphql/graphql-apollo-client';
import ResumeComponent from './featured/resume/resume.component';

const AppRoute = () => {
    const authContext = useContext(AuthContext);

    return (
        <>
            {authContext?.isLoggedIn && <Sidebar></Sidebar>}
            <main className={classes['main']}>
                <Header />
                <div className={classes['main__content']}>
                    <Routes>
                        {!authContext.isLoggedIn && (
                            <Route path="*" element={<Navigate to="/login" />} />
                        )}
                        {authContext.isLoggedIn && (
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                        )}
                        {!authContext.isLoggedIn && (
                            <>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </>
                        )}
                        {authContext.isLoggedIn && (
                            <>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/resume" element={<ResumeComponent />} />
                            </>
                        )}
                    </Routes>
                </div>
            </main>
        </>
    );
};

export const App = () => {
    return (
        <ApolloProvider client={useApolloClient()}>
            <AppRoute />
        </ApolloProvider>
    );
};

export default App;
