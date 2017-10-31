import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Checkbox, FormControl, Label, HelpBlock } from 'react-bootstrap';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

export interface ShortcutConfigItemNumberProps extends React.ClassAttributes<ShortcutConfigItemNumber> {
    Shortcut: IShortcut
    onDeleteConfirm: Redux.Action;
    onChangeKey: (shortcut: IShortcut, NewShortcutKey: string) => void;
    onChangeOperation: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => void;
    onChangeResult: (shortcut: IShortcut, NewShortcutResult: any) => void;
    AvailableKeys: Array<string>
}

const shortcutActionList: Array<ShortcutAction> = [ShortcutAction.Add, ShortcutAction.Subtract, ShortcutAction.Multiply, ShortcutAction.Divide];

export class ShortcutConfigItemNumber extends React.Component<ShortcutConfigItemNumberProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { }}>
            <Row style={{ display: "flex", alignItems: "center" }}>
                 <Col md={2} >
                    <AdaptableBlotterForm inline key={this.props.Shortcut.ShortcutKey}>
                        <FormGroup controlId={this.props.Shortcut.ShortcutKey}>
                     {this.props.Shortcut.IsPredefined ?
                      this.props.Shortcut.ShortcutKey :
                            <FormControl componentClass="select" value={this.props.Shortcut.ShortcutKey} onChange={(x) => this.onKeySelectChange(x)} >
                                {this.props.AvailableKeys.map(x => {
                                    return <option value={x} key={x}>{x}</option>
                                })}
                            </FormControl>
                     }
                        </FormGroup>
                    </AdaptableBlotterForm>
                </Col>
                <Col md={3} >
                      {this.props.Shortcut.IsPredefined ?
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
                    {this.props.Shortcut.IsPredefined ?
                        this.props.Shortcut.ShortcutResult :
                            <FormControl
                                type="number"
                                placeholder="Shortcut Result"
                                onChange={(e) => this.onResultChange(e)}
                                value={this.props.Shortcut.ShortcutResult}
                            />
                    }
                </Col>
                <Col md={3} >
                    <EntityListActionButtons
                        showEdit={false}
                        ConfigEntity={this.props.Shortcut}
                        ConfirmDeleteAction={this.props.onDeleteConfirm}
                        EntityName="Shortcut">
                    </EntityListActionButtons>
                </Col>

            </Row>
        </li>
    }

    onActionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeOperation(this.props.Shortcut, Number.parseInt(e.value));
    }

    onResultChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeResult(this.props.Shortcut, e.value);
    }

    onKeySelectChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeKey(this.props.Shortcut, e.value);
    }
}

