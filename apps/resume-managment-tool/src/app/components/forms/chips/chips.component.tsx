import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { getStyleClass } from '../../../constants/class-name';
import ButtonComponent from '../../button/button.component';
import { ButtonData } from '../../button/button.interface';
import { ChipsPropsInterface } from './chips.interface';
import classes from './chips.module.scss';

const ChipsComponent: FC<ChipsPropsInterface> = ({
    label = '',
    value = [],
    allowDuplicate = true,
    styleClass = '',
    disabled = false,
    max = Infinity,
    error,
    onChange,
    onAdd,
    onChipClick,
    onRemove,
}) => {
    const [chipsValue, setChipsValue] = useState<string[]>([]);
    const [chipsInputFocus, setChipsInputFocus] = useState(false);

    /** chips value form intialization */
    const chipsValueForm = useFormik({
        initialValues: {
            chipsValue: '',
        },
        enableReinitialize: true,
        onSubmit: (chips) => createTokenHandler(chips),
    });

    const createTokenHandler = (chips: { chipsValue: string }) => {
        if (
            !chipsValueForm ||
            !chips?.chipsValue.trim().length ||
            chipsValue.length >= max ||
            (!allowDuplicate && chipsValue.some((token) => chips?.chipsValue === token))
        ) {
            return;
        }
        const chipsChangedValue = [...chipsValue, chips?.chipsValue];
        setChipsValue(chipsChangedValue);
        chipsValueForm.setFieldValue('chipsValue', '');
        if (onAdd) {
            onAdd(chips?.chipsValue);
        }
        chipsOnChangeHanlder(chipsChangedValue);
    };

    const deleteHandler = ({ context }: ButtonData) => {
        const chipsChangedValue = chipsValue.filter((item, index) => context.index !== index);
        setChipsValue(chipsChangedValue);
        if (onRemove) {
            onRemove(context.item);
        }
        chipsOnChangeHanlder(chipsChangedValue);
    };

    const chipClickHanlder = (value: string) => {
        if (onChipClick) {
            onChipClick(value);
        }
    };

    const chipsOnChangeHanlder = (value: string[]) => {
        if (onChange) {
            onChange(value);
        }
    };

    const blurHandler = () => {
        if (!chipsValueForm) {
            return;
        }
        chipsValueForm.handleSubmit();
        setChipsInputFocus(false);
    };

    const enterHandler = (event: any) => {
        if (!chipsValueForm) {
            return;
        }
        if (event.key === 'Enter') {
            chipsValueForm.handleSubmit();
        }
    };

    const getClassName = () => {
        return {
            [classes['filled']]: !!chipsValue.length || !!chipsValueForm?.values?.chipsValue,
            [classes['focus']]: chipsInputFocus,
            [classes['error']]: !!error,
        };
    };

    useEffect(() => {
        if (value.length) {
            setChipsValue(value);
        }
    }, [value]);

    useEffect(() => {
        document.addEventListener('keydown', enterHandler, false);
        return () => {
            document.removeEventListener('keydown', enterHandler, false);
        };
    }, []);

    return (
        <div className={classes['chips']}>
            <div className={classes['chips__form-field']}>
                <ul
                    className={`${classes['chips__input-field']} ${styleClass} ${getStyleClass(
                        getClassName()
                    )}`}
                >
                    {chipsValue.length ? (
                        chipsValue.map((item, index) => {
                            return (
                                <li key={index} className={classes['chips__token']}>
                                    <span
                                        className={`${
                                            classes['chips__token-label']
                                        } ${getStyleClass({
                                            [classes['chips__token-label--click']]: !!onChipClick,
                                        })}`}
                                        onClick={() => chipClickHanlder(item)}
                                    >
                                        {item}
                                    </span>
                                    <ButtonComponent
                                        btnThemeClass=""
                                        styleClass={classes['chips__token-remove']}
                                        context={{ item, index }}
                                        label="x"
                                        disabled={disabled}
                                        onClick={deleteHandler}
                                    ></ButtonComponent>
                                </li>
                            );
                        })
                    ) : (
                        <></>
                    )}
                    <li className={classes['chips__token-input-wrap']}>
                        {chipsValueForm && (
                            <input
                                type="text"
                                className={classes['chips__token-input']}
                                name="chipsValue"
                                value={chipsValueForm?.values?.chipsValue}
                                disabled={disabled}
                                onChange={chipsValueForm.handleChange}
                                onFocus={() => setChipsInputFocus(true)}
                                onBlur={blurHandler}
                            ></input>
                        )}
                    </li>
                </ul>
                <label>{label}</label>
            </div>
        </div>
    );
};

export default ChipsComponent;
