import { ToolbarType } from '../../../../components/button/button.interface';

export enum ToolbarAction {
    Edit = 'edit',
    Delete = 'delete',
}

export const getToolbar = (
    toolbarActionHandler: (action: ToolbarAction, context: string) => void
): ToolbarType => {
    return [
        {
            label: 'Edit',
            onClick: ({ context }) => toolbarActionHandler(ToolbarAction.Edit, context),
        },
        {
            label: 'Delete',
            onClick: ({ context }) => toolbarActionHandler(ToolbarAction.Delete, context),
        },
    ];
};
