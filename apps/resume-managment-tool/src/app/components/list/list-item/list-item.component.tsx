import { FC } from 'react';
import ButtonComponent from '../../button/button.component';
import { ListItemPropsInterface } from '../list.interface';
import classes from './list-item.module.scss';

const ListItemComponent: FC<ListItemPropsInterface> = ({
    children,
    toolbar,
    context,
    styleClass = '',
}) => {
    return (
        <div className={`${classes['list__item']} ${styleClass}`}>
            {children && <div className={classes['list__item-content']}>{children}</div>}
            {toolbar && (
                <div className={classes['list__item-toolbar']}>
                    {toolbar.map((props, key) => {
                        return (
                            <ButtonComponent
                                {...props}
                                key={key}
                                context={context}
                            ></ButtonComponent>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ListItemComponent;
