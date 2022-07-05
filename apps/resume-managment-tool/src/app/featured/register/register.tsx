import { useRef } from 'react';
import classes from './register.module.scss';
import { useMutation } from '@apollo/react-hooks';
import { CreateEmployeeMutation } from '../../../graphql/graphql-query';

const Register = () => {
    const usernameRef = useRef() as any;
    const passwordRef = useRef() as any;

    const [createEmployee, { loading, error }] = useMutation(CreateEmployeeMutation);

    let content;
    switch (true) {
        case loading:
            content = 'Loading';
            break;
        case !!error:
            content = `Error: ${error}`;
            break;
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        createEmployee({
            variables: {
                username: usernameRef?.current?.value,
                password: passwordRef?.current?.value,
            },
        }).then((res: any) => {
            if (res.error) {
                return;
            }
            usernameRef.current.value = '';
            passwordRef.current.value = '';
        });
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div className={classes['control']}>
                    <input type="username" id="username" required ref={usernameRef}></input>
                    <label htmlFor="username"></label>
                </div>

                <div className={classes['control']}>
                    <input type="password" id="password" required ref={passwordRef}></input>
                    <label htmlFor="password"></label>
                </div>

                <p>{content}</p>

                <button className={classes['button']}>Create an Employee</button>
            </form>
        </>
    );
};

export default Register;
