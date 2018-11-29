import * as React from "react";
import { ButtonBase, ButtonProps } from './ButtonBase'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';


export interface InfoButtonProps extends ButtonProps {
    glyph: string
    tooltipText: string
}


export class ButtonInfo extends React.Component<InfoButtonProps, {}> {
    render() {
        return <ButtonBase
            ToolTipAndText={this.props.tooltipText}
            bsStyle={this.props.bsStyle}
            bsSize={this.props.size}
            glyph={this.props.glyph}
            onClick={() => this.props.onClick()}
            overrideDisableButton={this.props.overrideDisableButton}
            overrideTooltip={this.props.overrideTooltip}
            style={this.props.style}
            DisplayMode={this.props.DisplayMode}
            overrideText={this.props.overrideText}
            cssClassName={this.props.cssClassName + StyleConstants.APPLY_BUTTON}
        />;
    }
}