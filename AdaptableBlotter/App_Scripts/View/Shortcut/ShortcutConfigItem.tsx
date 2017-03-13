import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Checkbox, FormControl, Label, HelpBlock } from 'react-bootstrap';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface ShortcutConfigItemProps extends React.ClassAttributes<ShortcutConfigItem> {
    Shortcut: IShortcut
    onSelect: (Shortcut: IShortcut) => void;
    onDeleteConfirm: Redux.Action;
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
            onClick={() => { }}>
            <Row style={{ display: "flex", alignItems: "center" }}>
                <Col md={1} >
                    <Checkbox onChange={() => this.props.onSelect(this.props.Shortcut)} checked={this.props.Shortcut.IsLive}></Checkbox>
                </Col>
                <Col md={1} >
                    <AdaptableBlotterForm inline key={this.props.Shortcut.ShortcutKey}>
                        <FormGroup controlId={this.props.Shortcut.ShortcutKey}>
                            <FormControl componentClass="select" value={this.props.Shortcut.ShortcutKey} onChange={(x) => this.onKeySelectChange(x)} >
                                {this.props.AvailableKeys.map(x => {
                                    return <option value={x} key={x}>{x}</option>
                                })}
                            </FormControl>
                        </FormGroup>
                    </AdaptableBlotterForm>
                </Col>
                <Col md={3} >
                    <HelpBlock>
                        {DataType[this.props.Shortcut.DataType]}
                    </HelpBlock>
                </Col>
                <Col md={2} >
                    {this.props.Shortcut.DataType == DataType.Date ?
                        ShortcutAction[this.props.Shortcut.ShortcutAction] :
                        <FormControl componentClass="select" value={this.props.Shortcut.ShortcutAction.toString()} onChange={(x) => this.onActionChange(x)} >
                            {
                                shortcutActionList.map((shortcutAction: ShortcutAction) => {
                                    return <option key={ShortcutAction[shortcutAction]} value={shortcutAction.toString()}>{ShortcutAction[shortcutAction]}</option>
                                })
                            }
                            <FormGroup controlId="formValidationSuccess1" validationState={undefined}>
                                Help text with validation state.
    </FormGroup>
                        </FormControl>
                    }
                </Col>
                <Col md={3}>
                    {this.props.Shortcut.IsDynamic ?
                        this.props.Shortcut.ShortcutResult :
                        this.props.Shortcut.DataType == DataType.Date ?
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
                <Col md={2} >
                    <EntityListActionButtons
                        showEdit={false}
                        ConfigEntity={this.props.Shortcut}
                        ConfirmDeleteAction={this.props.onDeleteConfirm}>
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

