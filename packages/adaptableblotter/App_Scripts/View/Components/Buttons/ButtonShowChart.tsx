import * as React from "react";
import { ButtonBase, ButtonProps } from './ButtonBase'
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export class ButtonShowChart extends React.Component<ButtonProps, {}> {
    render() {
        return <ButtonBase ToolTipAndText="Show Chart"
            bsStyle='primary'
            bsSize={this.props.size}
            glyph="stats"
            onClick={() => this.props.onClick()}
            overrideDisableButton={this.props.overrideDisableButton}
            overrideTooltip={this.props.overrideTooltip}
            style={this.props.style}
            DisplayMode={this.props.DisplayMode}
            overrideText={this.props.overrideText}
            cssClassName={this.props.cssClassName + StyleConstants.SHOW_CHARTS_BUTTON}
            showDefaultStyle={this.props.showDefaultStyle}
            />;
    }
}