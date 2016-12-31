/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Button, OverlayTrigger, Glyphicon, Popover } from 'react-bootstrap';
import { StringExtensions } from '../Core/Extensions';


/*
Very basic - for now! - info box that allows us to show information where required.
2 params:
1. HeaderText - if not supplied then no header appears
2. BodyText - the main message
*/


interface InformationPopoverProps extends React.ClassAttributes<InformationPopover> {
    headerText: string
    bodyText: string
}


export class InformationPopover extends React.Component<InformationPopoverProps, {}> {
    render() {
        const popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" title={StringExtensions.IsNotNullOrEmpty(this.props.headerText) ? this.props.headerText : ""}>
                {this.props.bodyText}
            </Popover>);

        return <OverlayTrigger trigger="hover" rootClose placement="bottom" overlay={popoverClickRootClose}>
            <Button style={buttonNoMarginStyle} bsStyle="info" bsSize="xsmall">
                <Glyphicon glyph="info-sign" />
            </Button>
        </OverlayTrigger>
    }
}

let buttonNoMarginStyle = {
    margin: '0px',
}