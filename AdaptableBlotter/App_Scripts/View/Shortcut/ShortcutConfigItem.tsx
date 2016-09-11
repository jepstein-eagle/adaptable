import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, Checkbox} from 'react-bootstrap';
import {ColumnType} from '../../Core/Enums'
import {ShortcutAction} from '../../Core/Enums'


interface ShortcutConfigItemProps extends React.ClassAttributes<ShortcutConfigItem> {
    Shortcut: IShortcut
    onSelect: (Shortcut: IShortcut) => void;
    onEdit: (Shortcut: IShortcut) => void;
    onDelete: (Shortcut: IShortcut) => void;
}

export class ShortcutConfigItem extends React.Component<ShortcutConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row>
                <Col md={1} style={divStyle}>
                    <FormGroup>
                        <Checkbox inline onClick={() => this.props.onSelect(this.props.Shortcut) } checked={this.props.Shortcut.IsLive}></Checkbox>
                    </FormGroup>
                </Col>
                <Col md={1} style={divStyle}>
                    {this.props.Shortcut.ShortcutKey }
                </Col>
                <Col md={2} style={divStyle}>
                    {this.props.Shortcut.ShortcutResult }
                </Col>
                <Col md={2} style={divStyle}>
                    {ColumnType[this.props.Shortcut.ColumnType]}
                </Col>
                <Col md={2} style={divStyle}>
                    {ShortcutAction[this.props.Shortcut.ShortcutAction]}
                </Col>
                <Col md={2}>
                    <Button onClick={() => this.props.onEdit(this.props.Shortcut) }>Edit</Button>
                </Col>
                <Col md={2}>
                    <Button disabled={this.props.Shortcut.IsPredefined} onClick={() => this.props.onDelete(this.props.Shortcut) }>Delete</Button>
                </Col>

            </Row>
        </li>
    }
}


interface ShortcutConfigHeaderProps extends React.ClassAttributes<ShortcutConfigHeader> {
}

export class ShortcutConfigHeader extends React.Component<ShortcutConfigHeaderProps, {}> {
    render(): any {
        return <Panel>
            <Row>
                <Col md={1} style={headerStyle}>Live</Col>
                <Col md={1} style={headerStyle}>Key</Col>
                <Col md={2} style={headerStyle}>Result</Col>
                <Col md={2} style={headerStyle}>Columns</Col>
                <Col md={2} style={headerStyle}>Action</Col>
                <Col md={4} style={headerStyle}></Col>
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