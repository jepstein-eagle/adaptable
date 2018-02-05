import * as React from "react";
import { PanelProps, Panel, Row, Col } from 'react-bootstrap';
import { AdaptableBlotterForm } from './../../AdaptableBlotterForm'
import { IEntityRowInfo } from '../../../Core/Interface/IAdaptableBlotter';

export interface PanelWithRowProps extends PanelProps {
   // CellInfo: [string, number][]
   entityRowInfo: IEntityRowInfo[]
}


//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithRow extends React.Component<PanelWithRowProps, {}> {
    render() {

        let className = "panel-with-button"; // this will change...

        let optionColumns = this.props.entityRowInfo.map(x => {
            return <Col key={x.Caption + x.Width} xs={x.Width}>{x.Caption}</Col>
        })

        let header = <AdaptableBlotterForm horizontal>
            <Row  style={{ display: "flex", alignItems: "center" }}>
                {optionColumns}
            </Row>
        </AdaptableBlotterForm>;
        return <Panel header={header} bsSize={"small"} className={className} style={panelWithRowStyle} bsStyle={this.props.bsStyle}>
            {this.props.children}
        </Panel>;
    }

}

let panelWithRowStyle = {
    margin: '0px',
    padding: '0px'
}