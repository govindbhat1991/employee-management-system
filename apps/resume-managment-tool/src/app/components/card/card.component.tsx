import { FC, useState } from 'react';
import ButtonComponent from '../button/button.component';
import { CardActions, CardPropsInterface } from './card.interface';
import classes from './card.module.scss';

const CardComponent: FC<CardPropsInterface> = ({
    children,
    header,
    headerContent,
    styleClass = '',
    onSave,
    onEdit,
    onClose,
    editState,
}) => {
    const editable = !!onSave;
    const [cardEditState, setCardEditState] = useState<boolean>(false);

    const cardActionHandler = (event: any, action: CardActions): void => {
        switch (action) {
            case CardActions.edit:
                setCardEditState(true);
                if (editState) {
                    editState(true);
                }
                if (onEdit) {
                    onEdit(event);
                }
                break;

            case CardActions.close:
                setCardEditState(false);
                if (editState) {
                    editState(false);
                }
                if (onClose) {
                    onClose(event);
                }
                break;

            case CardActions.save:
                if (onSave) {
                    onSave(event);
                }
                break;
        }
    };

    return (
        <div className={`${classes['card']} ${styleClass}`}>
            {(headerContent || header || editable) && (
                <div className={classes['card__header']}>
                    {!headerContent && (
                        <>
                            {header && (
                                <div className={classes['card__heading']}>
                                    <h2 className="sub-heading font-bold">{header}</h2>
                                </div>
                            )}
                        </>
                    )}
                    {headerContent && headerContent}
                    {editable && (
                        <div className={classes['card__actions']}>
                            {!cardEditState && (
                                <ButtonComponent
                                    styleClass={classes['card__action-btn']}
                                    label="Edit"
                                    onClick={(event) => cardActionHandler(event, CardActions.edit)}
                                ></ButtonComponent>
                            )}
                            {cardEditState && (
                                <>
                                    <ButtonComponent
                                        styleClass={classes['card__action-btn']}
                                        label="Save"
                                        onClick={(event) =>
                                            cardActionHandler(event, CardActions.save)
                                        }
                                    ></ButtonComponent>
                                    <ButtonComponent
                                        styleClass={classes['card__action-btn']}
                                        label="Close"
                                        onClick={(event) =>
                                            cardActionHandler(event, CardActions.close)
                                        }
                                    ></ButtonComponent>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
            {children && <div className={classes['card__content']}>{children}</div>}
        </div>
    );
};

export default CardComponent;
