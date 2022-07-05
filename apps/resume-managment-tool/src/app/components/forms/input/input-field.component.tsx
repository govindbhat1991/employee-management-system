import { FC } from 'react';
import { InputFieldPropsInterface } from './input-field.interface';
import classes from './input-field.module.scss';

const InputFieldComponent: FC<InputFieldPropsInterface> = ({
    id,
    name,
    value,
    type = 'text',
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
        <div className={`${classes['form-field']} ${styleClass}`}>
            <input
                id={id}
                className={`${classes['input-field']} ${
                    value || value === 0 ? classes['filled'] : ''
                } ${error ? classes['error'] : ''} ${inputStyleClass}`}
                type={type}
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

export default InputFieldComponent;
