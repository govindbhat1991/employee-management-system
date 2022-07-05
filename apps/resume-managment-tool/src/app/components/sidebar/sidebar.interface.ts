import { ReactElement } from 'react';

export interface SidebarInterface {
    children?: ReactElement;
    headerLabel?: string;
    headerContent?: ReactElement;
    position?: 'left' | 'right';
    styleClass?: string; // null
    overlay?: boolean; // true
    showCloseIcon?: boolean; // true
    transitionTiming?: number; // 150 in (ms)
    width?: string;
    closeOnEscape?: boolean; // true
    visibleState: boolean; // false
    onShow?: () => void;
    onHide?: () => void;
}
