import * as React from "react";
import { Button, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import { IAdaptableBlotterObject } from "../../../Core/Interface/Interfaces";

export interface ButtonProps extends React.ClassAttributes<ButtonBase> {
    onClick?: () => void
    //override disabled normal status. i.e. when IsPredefined == true. 
    overrideDisableButton?: boolean
    //Override normal tooltip i.e. Edit
    overrideTooltip?: string
    //The entity we pass in to check normal disabled status
    ConfigEntity?: IAdaptableBlotterObject
    style?: React.CSSProperties;
    size?: ReactBootstrap.Sizes;
    //Override normal Text i.e. Edit
    overrideText?: string
    DisplayMode: "Glyph" | "Text" | "Glyph+Text"
    transformGlyph?: boolean
}

export interface ButtonBaseProps extends ButtonProps {
    ToolTipAndText: string,
    bsStyle: string;
    bsSize: ReactBootstrap.Sizes
    glyph: string
}

export class ButtonBase extends React.Component<ButtonBaseProps, {}> {
    public static defaultProps: ButtonBaseProps = {
        overrideDisableButton: false,
        ConfigEntity: null,
        ToolTipAndText: "",
        bsStyle: "",
        bsSize: null,
        glyph: "",
        DisplayMode: "Glyph+Text",
        transformGlyph: false
    };
    render() {
        let isDisabled: boolean
        if (this.props.ConfigEntity) {
            isDisabled = this.props.ConfigEntity.IsPredefined == true
        }
        if (this.props.overrideDisableButton) {
            isDisabled = true
        }
        let text = this.props.ToolTipAndText
        if (this.props.overrideText) {
            text = this.props.overrideText
        }
        let tooltip = this.props.ToolTipAndText
        if (this.props.overrideTooltip) {
            tooltip = this.props.overrideTooltip
        }
        let content: React.ReactElement<any>
        if (this.props.DisplayMode == "Glyph") {
            if (this.props.transformGlyph) {
            content = <Glyphicon glyph={this.props.glyph} style={{"transform": "scale(-1, 1)"}} />
        }else{
            content = <Glyphicon glyph={this.props.glyph} />
        }
    }
        else if (this.props.DisplayMode == "Text") {
            content = <span>{text}</span>
        }
        else if (this.props.DisplayMode == "Glyph+Text") {
            content = <div><Glyphicon glyph={this.props.glyph} />
                {' '}{text}
            </div>
        }
        let button = <Button style={this.props.style}
            bsStyle={this.props.bsStyle}
            disabled={isDisabled}
            bsSize ={this.props.bsSize}
            onClick={() => this.props.onClick()}>
            {content}</Button>
        let buttonwithtooltip = <OverlayTrigger overlay={<Tooltip id="tooltipButton" > {tooltip}</Tooltip >}>
            {button}
        </OverlayTrigger >
        return isDisabled ? button : buttonwithtooltip
    }
}