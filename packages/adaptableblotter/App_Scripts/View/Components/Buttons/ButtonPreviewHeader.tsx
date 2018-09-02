import * as React from "react";
import { ButtonBase, ButtonProps } from './ButtonBase'
import * as StyleConstants from '../../../Core/Constants/StyleConstants';

export class ButtonPrev extends React.Component<ButtonProps, {}> {
    render() {
        return <ButtonBase ToolTipAndText=""
            bsStyle={this.props.bsStyle}
            bsSize={this.props.size}
            ConfigEntity={this.props.ConfigEntity}
            glyph={this.props.glyph}
            onClick={() => this.props.onClick()}
            overrideDisableButton={this.props.overrideDisableButton}
            overrideTooltip={this.props.overrideTooltip}
            style={this.props.style}
            DisplayMode={this.props.DisplayMode}
            overrideText={this.props.overrideText}
            cssClassName={this.props.cssClassName + StyleConstants.WIZARD_ACTION_BUTTON}
            hideToolTip={true}
        />;
    }
}

