export interface ChipsPropsInterface {
    id?: string;
    name?: string;
    value?: string[];
    label?: string;
    styleClass?: string;
    disabled?: boolean;
    max?: number;
    allowDuplicate?: boolean;
    error?: Record<string, string>;
    onChange?: (data: string[]) => void;
    onAdd?: (data: string) => void;
    onRemove?: (data: string) => void;
    onChipClick?: (data: string) => void;
}
