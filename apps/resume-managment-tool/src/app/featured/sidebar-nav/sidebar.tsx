import { Link, NavLink } from 'react-router-dom';
import classes from './sidebar.module.scss';
import { ReactComponent as Dashboard } from '../../../assets/images/dashboard.svg';
import { ReactComponent as Resume } from '../../../assets/images/resume.svg';

const Sidebar = () => {
    const isActive = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? `${classes['sidebar-nav__link']} ${classes['active']}`
            : classes['sidebar-nav__link'];

    return (
        <nav className={classes['sidebar-nav']}>
            {/* @TODO Need to change to orginal logo */}
            <Link to="/" style={{ fontSize: '32px', fontWeight: 'bold' }}>
                EMS
            </Link>
            <ul className={classes['sidebar-nav__list']}>
                <li className={classes['sidebar-nav__list-item']}>
                    <NavLink to="/dashboard" className={isActive}>
                        <span
                            className={`${classes['sidebar-nav__link-icon']} 
                                ${classes['sidebar-nav__link-icon--dashboard']}`}
                            role="img"
                            aria-label="emoji"
                        >
                            <Dashboard title="Dashboard" />
                        </span>
                        Dashboard
                    </NavLink>
                </li>
                <li className={classes['sidebar-nav__list-item']}>
                    <NavLink to="/resume" className={isActive}>
                        <span
                            className={`${classes['sidebar-nav__link-icon']} 
                            ${classes['sidebar-nav__link-icon--resume']}`}
                            role="img"
                            aria-label="emoji"
                        >
                            <Resume title="Resume" />
                        </span>
                        Resume
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
