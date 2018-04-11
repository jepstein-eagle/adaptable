import * as React from "react";
import { Label, OverlayTrigger, Glyphicon, Popover } from 'react-bootstrap';
import { StringExtensions } from '../Core/Extensions/StringExtensions';
import { PopoverType } from '../Core/Enums';


/*
Very basic - for now! - info box that allows us to show Error where required.
3 params:
1. HeaderText - if not supplied then no header appears
2. BodyText - the main message (sent not as a string but as an array so it can include html elements)
3. PopoverType - Info, Warning or Error (matching the bootstrap types)
*/

export interface AdaptablePopoverProps extends React.ClassAttributes<AdaptablePopover> {
    headerText: string
    bodyText: any[],
    popoverType: PopoverType
}


export class AdaptablePopover extends React.Component<AdaptablePopoverProps, {}> {
    render() {
        const popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" title={StringExtensions.IsNotNullOrEmpty(this.props.headerText) ? this.props.headerText : ""}>
                {this.props.bodyText.map((textOrHTML: any, index: any) => <span key={index}>{textOrHTML}</span>)}
            </Popover>);

        return <span className="adaptableblotter_info_button" >
            <OverlayTrigger rootClose placement="bottom" overlay={popoverClickRootClose}>
                <Label bsSize="large" bsStyle={this.getStyle()} className="medium_padding_style">
                    <Glyphicon glyph={this.getGlyphName()} />
                </Label>
            </OverlayTrigger>
        </span>
    }


    private getStyle(): string {
        switch (this.props.popoverType) {
            case PopoverType.Error:
                return "danger";
            case PopoverType.Warning:
                return "warning";
            case PopoverType.Info:
                return "info";
        }


    }

    private getGlyphName(): string {
        switch (this.props.popoverType) {
            case PopoverType.Error:
                return "exclamation-sign";
            case PopoverType.Warning:
                return "warning-sign";
            case PopoverType.Info:
                return "info-sign";
        }
    }
}

