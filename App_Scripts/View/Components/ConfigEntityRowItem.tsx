import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Col, Row } from 'react-bootstrap';

export interface IColItem {
    size: number;
    content: any;
}

export interface ConfigEntityRowItemProps extends React.ClassAttributes<ConfigEntityRowItem> {
    items: IColItem[]
}

export class ConfigEntityRowItem extends React.Component<ConfigEntityRowItemProps, {}> {
    render(): any {
        let colItems = this.props.items.map((colItem: IColItem, index: number) => {
            return <Col key={index} xs={colItem.size}>
            <span style={expressionFontSizeStyle}>
                {colItem.content}
                </span>
            </Col>
        });

        return <li
            className="list-group-item"
           onClick={() => {
                // no implementation: not sure if this is actually needed...
            }}
        >
            <Row style={{ display: "flex", alignItems: "center" }}>
                {colItems}
            </Row>
        </li>

    }

}
var expressionFontSizeStyle = {
    fontSize: 'small'
};