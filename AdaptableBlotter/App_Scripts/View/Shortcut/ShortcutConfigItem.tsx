import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import {ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Modal, MenuItem, Checkbox, FormControl} from 'react-bootstrap';
import {ColumnType} from '../../Core/Enums'
import {ShortcutAction} from '../../Core/Enums'


interface ShortcutConfigItemProps extends React.ClassAttributes<ShortcutConfigItem> {
    Shortcut: IShortcut
    onSelect: (Shortcut: IShortcut) => void;
    onEdit: (Shortcut: IShortcut) => void;
    onDelete: (Shortcut: IShortcut) => void;
    onEdited: (Shortcut: IShortcut) => void;
    AvailableKeys: Array<string>
}

export class ShortcutConfigItem extends React.Component<ShortcutConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row>
                <Col md={1} >
                    <Checkbox onChange={() => this.props.onSelect(this.props.Shortcut) } checked={this.props.Shortcut.IsLive}></Checkbox>
                </Col>
                <Col md={2} >
                    <Form inline key={this.props.Shortcut.ShortcutKey}>
                        <FormGroup  controlId={this.props.Shortcut.ShortcutKey}>
                            <FormControl componentClass="select" value={this.props.Shortcut.ShortcutKey} onChange={(x) => this.onKeySelectChange(x) } >
                                {this.props.AvailableKeys.map(x => {
                                    return <option value={x} key={x}>{x}</option>
                                }) }
                            </FormControl>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={2} >
                    {ColumnType[this.props.Shortcut.ColumnType]}
                </Col>
                <Col md={2} >
                    {ShortcutAction[this.props.Shortcut.ShortcutAction]}
                </Col>
                <Col md={2}>
                    {this.props.Shortcut.ShortcutResult }
                </Col>
                <Col md={3} >
                    <ButtonToolbar>
                        <Button onClick={() => this.props.onEdit(this.props.Shortcut) } disabled={this.props.Shortcut.IsDynamic}>Edit</Button>
                        <Button disabled={this.props.Shortcut.IsPredefined} onClick={() => this.props.onDelete(this.props.Shortcut) }>Delete</Button>
                    </ButtonToolbar>
                </Col>

            </Row>
        </li>
    }

    onKeySelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onEdited(Object.assign(this.props.Shortcut, { ShortcutKey: e.value }));
    }
}


interface ShortcutConfigHeaderProps extends React.ClassAttributes<ShortcutConfigHeader> {
}

export class ShortcutConfigHeader extends React.Component<ShortcutConfigHeaderProps, {}> {
    render(): any {
        return <Panel style={panelHeaderStyle} >
            <Row >
                <Col md={1} style={headerStyle}>Live</Col>
                <Col md={2} style={headerStyle}>Key</Col>
                <Col md={2} style={headerStyle}>Columns</Col>
                <Col md={2} style={headerStyle}>Action</Col>
                <Col md={2} style={headerStyle}>Result</Col>
                <Col md={3} style={headerStyle}></Col>
            </Row>
        </Panel>
    }
}

var headerStyle = {
    wordWrap: 'break-word',
    fontWeight: 'bold'
};

let panelHeaderStyle = {
    marginBottom: '0px'
}