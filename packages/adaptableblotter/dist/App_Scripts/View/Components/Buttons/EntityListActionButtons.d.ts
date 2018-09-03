import * as React from "react";
import * as Redux from "redux";
import { IAdaptableBlotterObject } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
export interface EntityListActionButtonsProps extends React.ClassAttributes<EntityListActionButtons> {
    editClick?: () => void;
    shareClick?: () => void;
    showEdit?: boolean;
    showDelete?: boolean;
    showShare?: boolean;
    overrideDisableEdit?: boolean;
    overrideDisableDelete?: boolean;
    overrideDisableShare?: boolean;
    overrideTooltipEdit?: string;
    overrideTooltipDelete?: string;
    overrideTooltipShare?: string;
    ConfigEntity?: IAdaptableBlotterObject;
    ConfirmDeleteAction: Redux.Action;
    EntityName: string;
    cssClassName: string;
}
export declare class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
    static defaultProps: EntityListActionButtonsProps;
    render(): JSX.Element;
}
