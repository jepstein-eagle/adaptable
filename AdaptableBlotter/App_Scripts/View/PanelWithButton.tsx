/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { PanelProps, Panel, Form, Row, Col, Button } from 'react-bootstrap';


interface PanelWithButtonProps extends PanelProps {
    buttonContent?: React.ReactNode;
    buttonClick?: () => void;
    headerText : string
}


//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithButton extends React.Component<PanelWithButtonProps, {}> {
    render() {
        let { buttonContent } = this.props
        let className = "panel-with-button"
        if(this.props.className)
        {
            className += " " + this.props.className
        }
         if(buttonContent)
        {
            className += " " + "panel-with-button-reduce-header-padding"
        }
        let header = <Form horizontal>
            <Row style={{ display: "flex", alignItems: "center"}}>
                <Col xs={7}>{this.props.headerText}</Col>
                <Col xs={5}>
                    {buttonContent &&
                     
                        <Button bsSize="small"  onClick={() => this.props.buttonClick()} style={{ float: 'right' }}>
                            {buttonContent}
                        </Button>}
                </Col>
            </Row>
        </Form>;
        return <Panel header={header} className={className} style={this.props.style} bsStyle={this.props.bsStyle}>
            {this.props.children}
        </Panel>;
    }

}