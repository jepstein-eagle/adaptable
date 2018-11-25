import * as React from "react";
import * as Redux from "redux";
import { ButtonToolbar, Sizes } from 'react-bootstrap';
import { ButtonEdit } from './ButtonEdit';
import { ButtonDelete } from './ButtonDelete';
import { ButtonShare } from './ButtonShare';
import * as StyleConstants from '../../../Core/Constants/StyleConstants';
import { IAdaptableBlotterObject } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { AccessLevel } from "../../../Core/Enums";

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
    ConfirmDeleteAction: Redux.Action
    EntityName: string
    cssClassName: string
    AccessLevel: AccessLevel
    editSize: Sizes
    deleteSize: Sizes
   shareSize: Sizes
}

export class EntityListActionButtons extends React.Component<EntityListActionButtonsProps, {}> {
    public static defaultProps: EntityListActionButtonsProps = {
        showEdit: true,
        showDelete: true,
        showShare: false,
        overrideDisableEdit: false,
        overrideDisableDelete: false,
        overrideDisableShare: false,
        ConfirmDeleteAction: null,
        EntityName: "",
        cssClassName: "",
        AccessLevel: AccessLevel.Full,
        editSize: "small",
        deleteSize: 'small',
        shareSize: 'small',
    };
    render() {
        return <ButtonToolbar className={this.props.cssClassName + StyleConstants.BUTTON_TOOLBAR} bsSize={"small"} style={{ margin: "0px", padding: "0px" }}>
            {this.props.showEdit &&
                <ButtonEdit onClick={() => this.props.editClick()}
                    cssClassName={this.props.cssClassName}
                    style={{ marginLeft: "0px", marginTop: "2px", marginBottom: "2px", marginRight: "2px" }}
                    overrideDisableButton={this.props.overrideDisableEdit}
                    overrideTooltip={this.props.overrideTooltipEdit}
                    DisplayMode="Glyph"
                    size={this.props.editSize}
                    AccessLevel={this.props.AccessLevel} 
                    />}
            {this.props.showDelete &&
                <ButtonDelete
                    cssClassName={this.props.cssClassName}
                    style={{ marginLeft: "1px", marginTop: "2px", marginBottom: "2px", marginRight: "1px" }}
                    overrideDisableButton={this.props.overrideDisableDelete}
                    overrideTooltip={this.props.overrideTooltipDelete}
                    DisplayMode="Glyph"
                    ConfirmAction={this.props.ConfirmDeleteAction}
                    ConfirmationMsg={"Are you sure you want to delete this " + this.props.EntityName + "?"}
                    ConfirmationTitle={"Delete " + this.props.EntityName}
                    size={this.props.deleteSize}
                    AccessLevel={this.props.AccessLevel} 
                    />}
            {this.props.showShare &&
                <ButtonShare onClick={() => this.props.shareClick()}
                    cssClassName={this.props.cssClassName}
                    style={{ marginLeft: "2px", marginTop: "2px", marginBottom: "2px", marginRight: "0px" }}
                    overrideDisableButton={this.props.overrideDisableShare}
                    overrideTooltip={this.props.overrideTooltipShare}
                    DisplayMode="Glyph"
                    size={this.props.shareSize}
                    AccessLevel={this.props.AccessLevel} 
                    />
            }
        </ButtonToolbar>;
    }
}