/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { PanelProps, Panel, Form, Row, Col, Button, Glyphicon } from 'react-bootstrap';


interface PanelWithImageProps extends PanelProps {
    glyphicon?: string
}


//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithImage extends React.Component<PanelWithImageProps, {}> {
    render() {
        let className = "panel-with-image"
        if (this.props.className) {
            className += " " + this.props.className
        }

        let headerRow = <Form inline>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={12}>
                    {<Glyphicon glyph={this.props.glyphicon} style={marginRightStyle} />}
                    {this.props.header}
                </Col>
            </Row>
        </Form>;
        return <Panel header={headerRow} className={className} style={this.props.style} bsStyle={this.props.bsStyle}>
            {this.props.children}
        </Panel>;
    }

}

let marginRightStyle = {
    marginRight: '10px',
    padding: '0px'
}