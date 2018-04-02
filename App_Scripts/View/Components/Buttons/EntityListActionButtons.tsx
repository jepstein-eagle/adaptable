import * as React from "react";
import * as Redux from "redux";
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonEdit } from './ButtonEdit';
import { ButtonDelete } from './ButtonDelete';
import { ButtonShare } from './ButtonShare';
import { IAdaptableBlotterObject } from "../../../Core/Interface/Interfaces";

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
    ConfigEntity?: IAdaptableBlotterObject
    ConfirmDeleteAction: Redux.Action
    EntityName: string
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
        EntityName: ""
    };
    render() {
        return <ButtonToolbar bsSize={"small"} style={{margin:"0px", padding:"0px"}}>
            {this.props.showEdit &&
                <ButtonEdit onClick={() => this.props.editClick()}
                style={{marginLeft:"0px", marginTop:"2px", marginBottom:"2px",marginRight:"2px"}}
                overrideDisableButton={this.props.overrideDisableEdit}
                    ConfigEntity={this.props.ConfigEntity}
                    overrideTooltip={this.props.overrideTooltipEdit}
                    DisplayMode="Glyph"
                    size="small" />}
            {this.props.showDelete &&
                <ButtonDelete
                style={{marginLeft:"1px", marginTop:"2px", marginBottom:"2px",marginRight:"1px"}}
                overrideDisableButton={this.props.overrideDisableDelete}
                    ConfigEntity={this.props.ConfigEntity}
                    overrideTooltip={this.props.overrideTooltipDelete}
                    DisplayMode="Glyph"
                    ConfirmAction={this.props.ConfirmDeleteAction}
                    ConfirmationMsg={"Are you sure you want to delete this " + this.props.EntityName + "?"}
                    ConfirmationTitle={"Delete " + this.props.EntityName }
                    size="small" />}
             {this.props.showShare &&
                  <ButtonShare onClick={() => this.props.shareClick()}
                 style={{marginLeft:"2px", marginTop:"2px", marginBottom:"2px",marginRight:"0px"}}
                    overrideDisableButton={this.props.overrideDisableShare}
                    ConfigEntity={this.props.ConfigEntity}
                    overrideTooltip={this.props.overrideTooltipShare}
                    DisplayMode="Glyph" 
                    size="small"/>
             }
        </ButtonToolbar>;
    }
}