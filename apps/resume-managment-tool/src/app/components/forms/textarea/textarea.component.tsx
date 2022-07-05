import { FC } from 'react';
import { TextAreaPropsInterface } from './textarea.interface';
import classes from './textarea.module.scss';

const TextAreaComponent: FC<TextAreaPropsInterface> = ({
    id,
    name,
    value,
    label = '',
    styleClass = '',
    inputStyleClass = '',
    disabled = false,
    error,
    onChange,
    onFocus,
    onBlur,
}) => {
    return (
        <div
            className={`${classes['form-field']} ${classes['grow-wrap']} ${styleClass}`}
            data-replicated-value={value}
        >
            <textarea
                id={id}
                className={`${classes['textarea']} ${
                    value || value === 0 ? classes['filled'] : ''
                } ${error ? classes['error'] : ''} ${inputStyleClass}`}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default TextAreaComponent;
