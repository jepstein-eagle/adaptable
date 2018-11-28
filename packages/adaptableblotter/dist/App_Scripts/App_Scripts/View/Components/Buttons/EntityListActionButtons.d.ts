import * as React from "react";
import * as Redux from "redux";
import { Sizes } from 'react-bootstrap';
import { AccessLevel } from "../../../Core/Enums";
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
    ConfirmDeleteAction: Redux.Action;
    EntityName: string;
    cssClassName: string;
    AccessLevel: AccessLevel;
    editSize: Sizes;
    deleteSize: Sizes;
    shareSize: Sizes;
}
export declare class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
    static defaultProps: EntityListActionButtonsProps;
    render(): JSX.Element;
}
