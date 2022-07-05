import { FC, useEffect, useState } from 'react';
import classes from './sidebar.module.scss';
import { SidebarInterface } from './sidebar.interface';
import ButtonComponent from '../button/button.component';

const SidebarComponent: FC<SidebarInterface> = ({
    children,
    headerLabel,
    headerContent,
    position = 'right',
    styleClass = '',
    overlay = true,
    showCloseIcon = true,
    closeOnEscape = true,
    transitionTiming = 200,
    width = 460,
    visibleState,
    onShow,
    onHide,
}) => {
    const [sidebarState, setSidebarState] = useState<boolean>(visibleState);

    const sidebarHandler = (state: boolean) => {
        setSidebarState(state);
        switch (state) {
            case true:
                onShow && onShow();
                break;

            case false:
                onHide && onHide();
                break;
        }
    };

    const escHandler = (event: any) => {
        if (event.key === 'Escape') {
            sidebarHandler(false);
        }
    };

    useEffect(() => {
        sidebarHandler(visibleState);
    }, [visibleState]);

    useEffect(() => {
        if (closeOnEscape) {
            document.addEventListener('keydown', escHandler, false);
        }
        return () => {
            if (closeOnEscape) {
                document.removeEventListener('keydown', escHandler, false);
            }
        };
    }, []);

    return (
        <>
            {overlay && sidebarState && (
                <div
                    className={classes['sidebar__overlay']}
                    onClick={() => sidebarHandler(false)}
                ></div>
            )}
            <div
                className={`${classes['sidebar']} ${
                    sidebarState ? classes['sidebar--show'] : ''
                } ${styleClass} ${position ? classes['sidebar--position-' + position] : ''}`}
                style={{ transition: `transform ${transitionTiming}ms ease-out`, width }}
                onClick={(event) => event.stopPropagation()}
            >
                {(headerLabel || showCloseIcon || headerContent) && (
                    <div className={classes['sidebar__header']}>
                        {headerLabel ? headerLabel : headerContent}
                        <ButtonComponent
                            styleClass={classes['sidebar__header-button']}
                            label="X"
                            onClick={() => sidebarHandler(false)}
                        ></ButtonComponent>
                    </div>
                )}
                <div className={classes['sidebar__content']}>{children}</div>
            </div>
        </>
    );
};

export default SidebarComponent;
