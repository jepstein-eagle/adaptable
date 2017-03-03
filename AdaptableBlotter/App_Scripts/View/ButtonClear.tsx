/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { IUIError } from '../Core/Interface/IStrategy';
import { IConfigEntity } from '../Core/Interface/IAdaptableBlotter';
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { ButtonBase, ButtonProps } from './ButtonBase'

export class ButtonClear extends React.Component<ButtonProps, {}> {
    render() {
        return <ButtonBase ToolTip="Clear"
            bsStyle='info'
            ConfigEntity={this.props.ConfigEntity}
            glyph="erase"
            onClick={() => this.props.onClick()}
            overrideDisableButton={this.props.overrideDisableButton}
            overrideTooltip={this.props.overrideTooltip}
            style={this.props.style}
        />;
    }
}