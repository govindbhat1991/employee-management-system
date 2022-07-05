import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './header.module.scss';
import AuthContext from '../../store/auth-context';
import ButtonComponent from '../../components/button/button.component';

/**
 * Header component
 */
const Header = () => {
    /** to store details of login user */
    const authContext = useContext(AuthContext);

    const logoutHandler = () => authContext.logout();

    const urlPathName = window.location.pathname;

    return (
        <header className={classes['header']}>
            <nav className={classes['header__navbar']}>
                <ul>
                    {!authContext?.isLoggedIn && urlPathName !== '/login' && (
                        <li>
                            <Link
                                to="/login"
                                className={`${classes['link']} ${classes['link--blue']}`}
                            >
                                Login
                            </Link>
                        </li>
                    )}

                    {authContext?.isLoggedIn && (
                        <li>
                            <ButtonComponent
                                onClick={logoutHandler}
                                label="Logout"
                            ></ButtonComponent>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
