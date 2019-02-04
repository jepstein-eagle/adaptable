import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { Col, Row } from 'react-bootstrap';
import { IColItem } from "../UIInterfaces";
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';

export interface AdaptableObjectRowProps extends React.ClassAttributes<AdaptableObjectRow> {
    colItems: IColItem[]
    cssClassName: string
    fontSize?: string
}

export class AdaptableObjectRow extends React.Component<AdaptableObjectRowProps, {}> {
    render(): any {
        let cssClassName = this.props.cssClassName + StyleConstants.LIST_GROUP_ITEM
        let fontSize = this.props.fontSize ? this.props.fontSize : "small"
        let colItems = this.props.colItems.map((colItem: IColItem, index: number) => {
            return <Col key={index} xs={colItem.Size}>
                <span style={{ fontSize: fontSize }}>
                    {colItem.Content}
                </span>
            </Col>
        });

        return <div className={cssClassName}>
            <li
                className="list-group-item"
                onClick={() => {
                    // no implementation: not sure if this is actually needed...
                }}
            >
                <Row style={{ display: "flex", alignItems: "center", overflowY: 'visible' }}>
                    {colItems}
                </Row>
            </li>
        </div>
    }

}
