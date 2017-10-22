import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../../Core/Helper'
import { ButtonToolbar, Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { IUIError } from '../../../Core/Interface/IStrategy';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { ButtonEdit } from './ButtonEdit';
import { ButtonDelete } from './ButtonDelete';
import { ButtonClear } from './ButtonClear';
import { ButtonNew } from './ButtonNew';
import { ButtonShare } from './ButtonShare';
import { IConfigEntity } from '../../../Core/Interface/IAdaptableBlotter';

export interface EntityListActionButtonsProps extends React.ClassAttributes<EntityListActionButtons> {
    editClick?: () => void;
    shareClick?: () => void;
    showEdit?: boolean
    showDelete?: boolean
    showShare?: boolean
    overrideDisableEdit?: boolean
    overrideDisableDelete?: boolean
    overrideDisableShare?: boolean
    overrideTooltipEdit?: string
    overrideTooltipDelete?: string
    overrideTooltipShare?: string
    ConfigEntity?: IConfigEntity
    ConfirmDeleteAction: Redux.Action
    EntityName: string
}

export class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
    public static defaultProps: EntityListActionButtonsProps = {
        showEdit: true,
        showDelete: true,
        showShare: true,
        overrideDisableEdit: false,
        overrideDisableDelete: false,
        overrideDisableShare: false,
        ConfirmDeleteAction: null,
        EntityName: ""
    };
    render() {
        return <ButtonToolbar>
            {this.props.showEdit &&
                <ButtonEdit onClick={() => this.props.editClick()}
                    overrideDisableButton={this.props.overrideDisableEdit}
                    ConfigEntity={this.props.ConfigEntity}
                    overrideTooltip={this.props.overrideTooltipEdit}
                    DisplayMode="Glyph" />}
            {this.props.showDelete &&
                <ButtonDelete
                    overrideDisableButton={this.props.overrideDisableDelete}
                    ConfigEntity={this.props.ConfigEntity}
                    overrideTooltip={this.props.overrideTooltipDelete}
                    DisplayMode="Glyph"
                    ConfirmAction={this.props.ConfirmDeleteAction}
                    ConfirmationMsg={"Are you sure you want to delete this " + this.props.EntityName + "?"}
                    ConfirmationTitle={"Delete " + this.props.EntityName } />}
            {this.props.showShare &&
                <ButtonShare onClick={() => this.props.shareClick()}
                    overrideDisableButton={this.props.overrideDisableShare}
                    ConfigEntity={this.props.ConfigEntity}
                    overrideTooltip="Share With Team - disabled in this demo"
                    DisplayMode="Glyph" />}
        </ButtonToolbar>;
    }
}