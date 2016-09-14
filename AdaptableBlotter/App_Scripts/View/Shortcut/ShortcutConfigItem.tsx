import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, Checkbox, ButtonGroup} from 'react-bootstrap';
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
                <Col md={1} >
                    <FormGroup>
                        <Checkbox inline onClick={() => this.props.onSelect(this.props.Shortcut) } checked={this.props.Shortcut.IsLive}></Checkbox>
                    </FormGroup>
                </Col>
                <Col md={1} style={rowElementStyle}>
                    {this.props.Shortcut.ShortcutKey }
                </Col>
                <Col md={2} style={rowElementStyle}>
                    {ColumnType[this.props.Shortcut.ColumnType]}
                </Col>
                <Col md={2} style={rowElementStyle}>
                    {ShortcutAction[this.props.Shortcut.ShortcutAction]}
                </Col>
                <Col md={3} style={rowElementStyle}>
                    {this.props.Shortcut.ShortcutResult }
                </Col>
                <Col md={3} >
                    <ButtonGroup>
                        <Button style={buttonStyle} onClick={() => this.props.onEdit(this.props.Shortcut) }>Edit</Button>
                        <Button style={buttonStyle} disabled={this.props.Shortcut.IsPredefined} onClick={() => this.props.onDelete(this.props.Shortcut) }>Delete</Button>
                    </ButtonGroup>
                </Col>

            </Row>
        </li>
    }
}


interface ShortcutConfigHeaderProps extends React.ClassAttributes<ShortcutConfigHeader> {
}

export class ShortcutConfigHeader extends React.Component<ShortcutConfigHeaderProps, {}> {
    render(): any {
        return <Panel style={panelHeaderStyle} >
            <Row >
                <Col md={1} style={headerStyle}>Live</Col>
                <Col md={1} style={headerStyle}>Key</Col>
                <Col md={2} style={headerStyle}>Columns</Col>
                <Col md={2} style={headerStyle}>Action</Col>
                <Col md={3} style={headerStyle}>Result</Col>
                <Col md={3} style={headerStyle}></Col>
            </Row>
        </Panel>
    }
}

var headerStyle = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

var rowElementStyle = {
    wordWrap: 'break-word',
    marginTop: '10px'
};

var buttonStyle = {
    margin: '4px'
};

let panelHeaderStyle= {
    marginBottom: '0px'
}