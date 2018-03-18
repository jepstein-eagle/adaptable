import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Col, Row } from 'react-bootstrap';
import { IColItem } from "../UIInterfaces";

export interface AdaptableObjectRowProps extends React.ClassAttributes<AdaptableObjectRow> {
    ColItems: IColItem[]
}

export class AdaptableObjectRow extends React.Component<AdaptableObjectRowProps, {}> {
    render(): any {
        let colItems = this.props.ColItems.map((colItem: IColItem, index: number) => {
            return <Col key={index} xs={colItem.Size}>
                <span style={smallFontSizeStyle}>
                    {colItem.Content}
                </span>
            </Col>
        });

        return <div className="adaptable_blotter_style_rowobject">
            <li
                className="list-group-item"
                onClick={() => {
                    // no implementation: not sure if this is actually needed...
                }}
            >
                <Row style={{ display: "flex", alignItems: "center" }}>
                    {colItems}
                </Row>
            </li>
        </div>
    }

}
var smallFontSizeStyle = {
    fontSize: 'small'
};