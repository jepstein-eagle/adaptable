import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Modal, MenuItem, Checkbox, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ColumnType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { EntityListActionButtons } from '../EntityListActionButtons';


interface ShortcutConfigItemProps extends React.ClassAttributes<ShortcutConfigItem> {
    Shortcut: IShortcut
    onSelect: (Shortcut: IShortcut) => void;
    onDelete: (Shortcut: IShortcut) => void;
    onChangeKey: (shortcut: IShortcut, NewShortcutKey: string) => void;
    onChangeOperation: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => void;
    onChangeResult: (shortcut: IShortcut, NewShortcutResult: any) => void;
    AvailableKeys: Array<string>
}

const shortcutActionList: Array<ShortcutAction> = [ShortcutAction.Add, ShortcutAction.Subtract, ShortcutAction.Multiply, ShortcutAction.Divide, ShortcutAction.Replace];

export class ShortcutConfigItem extends React.Component<ShortcutConfigItemProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { } }>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col md={1} >
                    <Checkbox onChange={() => this.props.onSelect(this.props.Shortcut)} checked={this.props.Shortcut.IsLive}></Checkbox>
                </Col>
                <Col md={2} >
                    <Form inline key={this.props.Shortcut.ShortcutKey}>
                        <FormGroup controlId={this.props.Shortcut.ShortcutKey}>
                            <FormControl componentClass="select" value={this.props.Shortcut.ShortcutKey} onChange={(x) => this.onKeySelectChange(x)} >
                                {this.props.AvailableKeys.map(x => {
                                    return <option value={x} key={x}>{x}</option>
                                })}
                            </FormControl>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={2} >
                    {ColumnType[this.props.Shortcut.ColumnType]}
                </Col>
                <Col md={3} >
                    {this.props.Shortcut.ColumnType == ColumnType.Date ?
                        ShortcutAction[this.props.Shortcut.ShortcutAction] :
                        <FormControl componentClass="select" value={this.props.Shortcut.ShortcutAction.toString()} onChange={(x) => this.onActionChange(x)} >
                            {
                                shortcutActionList.map((shortcutAction: ShortcutAction) => {
                                    return <option key={ShortcutAction[shortcutAction]} value={shortcutAction.toString()}>{ShortcutAction[shortcutAction]}</option>
                                })
                            }
                        </FormControl>
                    }
                </Col>
                <Col md={3}>
                    {this.props.Shortcut.IsDynamic ?
                        this.props.Shortcut.ShortcutResult :
                        this.props.Shortcut.ColumnType == ColumnType.Date ?
                            <FormControl
                                type="date"
                                placeholder="Shortcut Result"
                                onChange={(e) => this.onResultChange(e)}
                                value={this.props.Shortcut.ShortcutResult}
                                /> :
                            <FormControl
                                type="number"
                                placeholder="Shortcut Result"
                                onChange={(e) => this.onResultChange(e)}
                                value={this.props.Shortcut.ShortcutResult}
                                />}
                </Col>
                <Col md={1} >
                    <EntityListActionButtons
                        deleteClick={() => this.props.onDelete(this.props.Shortcut)}
                        showEdit={false}
                        deleteDisabled={this.props.Shortcut.IsPredefined}>
                    </EntityListActionButtons>
                </Col>

            </Row>
        </li>
    }

    onActionChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeOperation(this.props.Shortcut, Number.parseInt(e.value));
    }

    onResultChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeResult(this.props.Shortcut, e.value);
    }

    onKeySelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeKey(this.props.Shortcut, e.value);
    }
}

