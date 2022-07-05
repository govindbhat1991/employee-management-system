import { ReactNode } from 'react';

export interface ButtonData {
    event?: any;
    /** data that the button component received as props */
    context?: any;
}

export interface ButtonPropsInterface {
    label?: string;
    type?: 'button' | 'submit' | 'reset';
    buttonContent?: ReactNode;
    btnThemeClass?: string;
    btnClass?: string[];
    styleClass?: string;
    context?: any;
    disabled?: boolean;
    onClick?: (data: ButtonData) => void;
}

export type ToolbarType = ButtonPropsInterface[];
