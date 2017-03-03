/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { IUIError } from '../Core/Interface/IStrategy';
import { IConfigEntity } from '../Core/Interface/IAdaptableBlotter';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'

export interface ButtonProps extends React.ClassAttributes<ButtonBase> {
    onClick?: () => void
    //override disabled normal status. i.e. when IsPredefined == true. 
    overrideDisableButton?: boolean
    //Override normal tooltip i.e. Edit
    overrideTooltip?: string
    //The entity we pass in to check normal disabled status
    ConfigEntity?: IConfigEntity
    style?: React.CSSProperties;
}

interface ButtonBaseProps extends ButtonProps {
    ToolTip: string,
    bsStyle: string;
    glyph: string
}

export class ButtonBase extends React.Component<ButtonBaseProps, {}> {
    public static defaultProps: ButtonBaseProps = {
        overrideDisableButton: false,
        ConfigEntity: null,
        ToolTip: "",
        bsStyle: "",
        glyph: ""
    };
    render() {
        let isDisabled: boolean
        if (this.props.ConfigEntity) {
            isDisabled = this.props.ConfigEntity.IsPredefined == true
        }
        if (this.props.overrideDisableButton) {
            isDisabled = true
        }
        let tooltip = this.props.ToolTip
        if (this.props.overrideTooltip) {
            tooltip = this.props.overrideTooltip
        }
        return <OverlayTrigger overlay={<Tooltip id="tooltipButton">{tooltip}</Tooltip>}>
            <Button bsSize='small' style={this.props.style}
                bsStyle={this.props.bsStyle}
                disabled={isDisabled}
                onClick={() => this.props.onClick()}><Glyphicon glyph={this.props.glyph} /></Button>
        </OverlayTrigger>;
    }
}