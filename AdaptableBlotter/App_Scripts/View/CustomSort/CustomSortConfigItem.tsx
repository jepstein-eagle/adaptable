import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Button, Col, Row, ButtonGroup, Panel, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { EntityListActionButtons } from '../EntityListActionButtons';

interface CustomSortConfigItemProps extends React.ClassAttributes<CustomSortConfigItem> {
    CustomSort: ICustomSort
    ColumnLabel: string
    onEdit: (CustomSort: ICustomSort) => void;
    onDelete: (CustomSort: ICustomSort) => void;
}


export class CustomSortConfigItem extends React.Component<CustomSortConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col xs={2}>{this.props.ColumnLabel}</Col>
                <Col xs={7} >
                    {this.props.CustomSort.CustomSortItems.join()}
                </Col>
                <Col xs={3}>
                    <EntityListActionButtons
                        deleteClick={() => this.props.onDelete(this.props.CustomSort)}
                        editClick={() => this.props.onEdit(this.props.CustomSort)}>
                    </EntityListActionButtons>
                </Col>
            </Row>
        </li>
    }
}