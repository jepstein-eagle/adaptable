/// <reference path="../../../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../../Core/Helper'
import { PanelProps, Panel, Form, Row, Col, Button } from 'react-bootstrap';
import { AdaptableBlotterForm } from './../../AdaptableBlotterForm'

interface PanelWithRowProps extends PanelProps {
    CellInfo: [string, number][]
}


//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithRow extends React.Component<PanelWithRowProps, {}> {
    render() {

        let className = "panel-with-button"; // this will change...

        let optionColumns = this.props.CellInfo.map(x => {
            return <Col key={x[1] + x[0]} xs={x[1]}>{x[0]}</Col>
        })

        let header = <AdaptableBlotterForm horizontal>
            <Row style={{ display: "flex", alignItems: "center" }}>
                {optionColumns}
            </Row>
        </AdaptableBlotterForm>;
        return <Panel header={header} className={className} style={panelWithRowStyle} bsStyle={this.props.bsStyle}>
            {this.props.children}
        </Panel>;
    }

}

let panelWithRowStyle = {
    margin: '0px'
}