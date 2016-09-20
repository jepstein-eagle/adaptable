import {ICustomSort} from '../Core/Interface/ICustomSortStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { Button, Col, Row, ButtonGroup, Panel, Glyphicon, OverlayTrigger,Tooltip} from 'react-bootstrap';

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
            <Row style={{display: "flex", alignItems: "center"}}>
                <Col xs={2}>{this.props.ColumnLabel}</Col>
                <Col xs={7} style={divStyle}>
                    {this.props.CustomSort.CustomSortItems.join() }
                </Col>
                <Col xs={3}>
                    <ButtonGroup>
                        <OverlayTrigger  overlay={ <Tooltip id="tooltipEdit"><strong>Edit</strong></Tooltip>}>
                            <Button onClick={() => this.props.onEdit(this.props.CustomSort) }><Glyphicon glyph="pencil"></Glyphicon></Button>
                        </OverlayTrigger>
                        <OverlayTrigger  overlay={ <Tooltip id="tooltipDelete">Delete</Tooltip>}>
                            <Button onClick={() => this.props.onDelete(this.props.CustomSort) }><Glyphicon glyph="trash"/></Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Col>
            </Row>
        </li>
    }
}

interface CustomSortConfigHeaderProps extends React.ClassAttributes<CustomSortConfigHeader> {
}

export class CustomSortConfigHeader extends React.Component<CustomSortConfigHeaderProps, {}> {
    render(): any {
        return <Panel style={panelHeaderStyle}>
            <Row>
                <Col xs={2} style={headerStyle}>Column</Col>
                <Col xs={6} style={headerStyle}>Sort Order</Col>
                <Col xs={4}></Col>
            </Row>
        </Panel>
    }
}

var headerStyle = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

var divStyle = {
    wordWrap: 'break-word'
};

let panelHeaderStyle = {
    marginBottom: '0px'
}