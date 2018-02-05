import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { IStyle } from '../../Core/Interface/IStyle';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { IColumn } from "../../Core/Interface/IAdaptableBlotter";

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