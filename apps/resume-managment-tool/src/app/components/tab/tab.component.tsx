import { FC, ReactNode } from 'react';
import classes from './button.module.scss';

interface TabPropsInterface {
    label?: string;
    type?: 'button' | 'submit' | 'reset';
    innerHTML?: ReactNode;
    btnClass?: string[];
    styleClass?: string;
    onClick?: (event?: any) => void;
}

const TabComponent: FC<TabPropsInterface> = ({
    label,
    type = 'button',
    innerHTML,
    btnClass = ['btn--blue'],
    styleClass = '',
    onClick,
}) => {
    const btnClassName: string = btnClass.map((className) => classes[className]).join(' ');

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${classes['btn']} ${styleClass} ${btnClassName}`}
        >
            {!innerHTML && label}
            {innerHTML && innerHTML}
        </button>
    );
};

export default TabComponent;
