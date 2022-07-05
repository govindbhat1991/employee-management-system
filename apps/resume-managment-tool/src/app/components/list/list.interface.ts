import { ReactElement } from 'react';
import { ToolbarType } from '../button/button.interface';

export interface ListItemPropsInterface {
    children?: ReactElement;
    toolbar?: ToolbarType;
    context?: any;
    styleClass?: string;
}
