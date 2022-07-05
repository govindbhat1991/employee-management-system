export interface InputFieldPropsInterface {
    id: string;
    name: string;
    value: any;
    type?: string;
    label?: string;
    styleClass?: string;
    inputStyleClass?: string;
    disabled?: boolean;
    error?: Record<string, string>;
    onChange?: (event?: any) => void;
    onFocus?: (event?: any) => void;
    onBlur?: (event?: any) => void;
}
