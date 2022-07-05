import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/button/button.component';
import CardComponent from '../../components/card/card.component';
import AuthContext from '../../store/auth-context';
import { useFormik } from 'formik';
import InputFieldComponent from '../../components/forms/input/input-field.component';
import { useLoginQuery } from './services/login.service';
import { QueryLoginArgs } from '@resume-managment-tool/api-interfaces';

type LoginFormInput = QueryLoginArgs;

const Login = () => {
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const { query: loginQuery, error } = useLoginQuery();

    const loginForm = useFormik<LoginFormInput>({
        initialValues: {
            username: '',
            password: '',
        },
        enableReinitialize: true,
        onSubmit: (employee: LoginFormInput) => submitHandler(employee),
    });

    const submitHandler = (employee: LoginFormInput) => {
        loginQuery({
            variables: employee,
        }).then((result) => {
            if (result.error) {
                return;
            }
            authContext.login(result.data.login.token);
            navigate(`/dashboard`, { replace: false });
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <CardComponent header="Login">
                        <form autoComplete="off" onSubmit={loginForm.handleSubmit}>
                            <InputFieldComponent
                                id="username"
                                label="Username"
                                name="username"
                                value={loginForm.values.username}
                                onChange={loginForm.handleChange}
                            />
                            <InputFieldComponent
                                id="password"
                                type="password"
                                label="Password"
                                name="password"
                                value={loginForm.values.password}
                                onChange={loginForm.handleChange}
                            />
                            <div>
                                <p>{error ? `${error}` : ''}</p>
                                <br />
                            </div>
                            <ButtonComponent type="submit" label="Login"></ButtonComponent>
                        </form>
                    </CardComponent>
                </div>
            </div>
        </div>
    );
};

export default Login;
