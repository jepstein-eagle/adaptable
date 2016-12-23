/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Button, OverlayTrigger, Glyphicon, Popover } from 'react-bootstrap';


/*
Very basic - for now! - info box that allows us to show information where required.
2 params:
1. HeaderText - if not supplied then no header appears
2. BodyText - the main message
Simple button with an image.  Trigger is click - though not sure if hover isnt actually better?
*/


interface InformationPopoverProps extends React.ClassAttributes<InformationPopover> {
    headerText: string
    bodyText: string
}


export class InformationPopover extends React.Component<InformationPopoverProps, {}> {
    render() {
        const popoverClickRootClose = (
            <Popover id="popover-trigger-click-root-close" title={this.props.headerText != "" ? this.props.headerText : ""}>
                {this.props.bodyText}
            </Popover>);

        return <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverClickRootClose}>
            <Button style={divStyle} bsStyle="info" bsSize="xsmall">
                <Glyphicon glyph="info-sign" />
            </Button>
        </OverlayTrigger>
    }
}

let divStyle = {
    margin: '0px',
    //    padding: '5px'
}