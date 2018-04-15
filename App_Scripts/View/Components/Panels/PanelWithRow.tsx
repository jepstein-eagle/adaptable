import * as React from "react";
import { PanelProps, Panel, Row, Col } from 'react-bootstrap';
import { IColItem } from "../../UIInterfaces";
import { AdaptableBlotterForm } from "../Forms/AdaptableBlotterForm";

export interface PanelWithRowProps extends PanelProps {
   // CellInfo: [string, number][]
   ColItems: IColItem[]
}


//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithRow extends React.Component<PanelWithRowProps, {}> {
    render() {

        let className = "panel-with-button"; // this will change...

        let optionColumns = this.props.ColItems.map((colItem: IColItem)=> {
            return <Col key={colItem.Content + colItem.Size} xs={colItem.Size}>{colItem.Content}</Col>
        })

        let header = <AdaptableBlotterForm horizontal>
            <Row  style={{ display: "flex", alignItems: "center", fontSize:"small"}} >
                {optionColumns}
            </Row>
        </AdaptableBlotterForm>;
        return <Panel header={header} bsSize={"small"} className="no_padding_no_margin_style"  bsStyle={this.props.bsStyle} >
            {this.props.children}
        </Panel>;
    }

}

