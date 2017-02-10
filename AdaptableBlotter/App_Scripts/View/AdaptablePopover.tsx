/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Label, OverlayTrigger, Glyphicon, Popover } from 'react-bootstrap';
import { StringExtensions } from '../Core/Extensions';
import { PopoverType } from '../Core/Enums';


/*
Very basic - for now! - info box that allows us to show Error where required.
2 params:
1. HeaderText - if not supplied then no header appears
2. BodyText - the main message
*/

interface AdaptablePopoverProps extends React.ClassAttributes<AdaptablePopover> {
    headerText: string
    bodyText: string,
    popoverType: PopoverType
}


export class AdaptablePopover extends React.Component<AdaptablePopoverProps, {}> {
    render() {
        const popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" title={StringExtensions.IsNotNullOrEmpty(this.props.headerText) ? this.props.headerText : ""}>
                {this.props.bodyText.split("\n").map(function (item, index) {
                    return (
                        <span key={index}>
                            {item}
                            <br />
                        </span>
                    )
                })}
            </Popover>);

        return <OverlayTrigger rootClose placement="bottom" overlay={popoverClickRootClose}>
            <Label bsStyle={this.getStyle()}>
                <Glyphicon glyph={this.getGlyphName()} />
            </Label>
        </OverlayTrigger>
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
