import { ReactElement, ReactNode } from 'react';

export enum CardActions {
    edit = 'Edit',
    save = 'Save',
    close = 'Close',
}

export interface CardPropsInterface {
    children?: ReactElement;
    header?: string;
    headerContent?: ReactNode;
    styleClass?: string;
    onSave?: (event?: any) => void;
    onEdit?: (event?: any) => void;
    onClose?: (event?: any) => void;
    editState?: (event?: any) => void;
}
