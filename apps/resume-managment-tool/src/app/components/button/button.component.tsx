import { FC } from 'react';
import { ButtonPropsInterface } from './button.interface';
import classes from './button.module.scss';

const ButtonComponent: FC<ButtonPropsInterface> = ({
    label,
    type = 'button',
    disabled = false,
    buttonContent,
    btnThemeClass = 'btn',
    btnClass = ['btn--blue'],
    styleClass = '',
    context,
    onClick,
}) => {
    const btnClassName: string = btnClass.map((className) => classes[className]).join(' ');

    const onClickHandler = (event?: any) => {
        if (onClick) {
            onClick({ event, context });
        }
    };

    return (
        <button
            type={type}
            onClick={onClickHandler}
            className={`${classes['button']} ${
                classes[btnThemeClass] ? classes[btnThemeClass] : ''
            } ${styleClass} ${btnClassName}`}
            disabled={disabled}
        >
            {!buttonContent && label}
            {buttonContent && buttonContent}
        </button>
    );
};

export default ButtonComponent;
