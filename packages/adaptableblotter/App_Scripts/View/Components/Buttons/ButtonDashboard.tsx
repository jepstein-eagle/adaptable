import * as React from "react";
import { ButtonBase, ButtonProps, ButtonBaseProps } from './ButtonBase'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { AccessLevel } from "../../../Utilities/Enums";

export class ButtonDashboard extends React.Component<ButtonBaseProps, {}> {
    render() {
        return <ButtonBase 
            bsStyle={this.props.bsStyle}
            bsSize={this.props.bsSize}
            glyph={this.props.glyph}
            onClick={() => this.props.onClick()}
            overrideDisableButton={this.props.overrideDisableButton}
            overrideTooltip={this.props.overrideTooltip}
            style={this.props.style}
            DisplayMode={this.props.DisplayMode}
            overrideText={this.props.overrideText}
            ToolTipAndText={this.props.ToolTipAndText}
            cssClassName={this.props.cssClassName + StyleConstants.DASHBOARD_BUTTON}
            AccessLevel={AccessLevel.Full}
            showDefaultStyle={this.props.showDefaultStyle}
            />;
    }
}