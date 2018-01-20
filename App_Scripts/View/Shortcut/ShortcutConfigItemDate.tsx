/*import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Checkbox, FormControl, Label, HelpBlock } from 'react-bootstrap';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

export interface ShortcutConfigItemDateProps extends React.ClassAttributes<ShortcutConfigItemDate> {
    Shortcut: IShortcut
    onDeleteConfirm: Redux.Action;
    onChangeKey: (shortcut: IShortcut, NewShortcutKey: string) => void;
    onChangeResult: (shortcut: IShortcut, NewShortcutResult: any) => void;
    AvailableKeys: Array<string>
    onShare: () => void;
    TeamSharingActivated: boolean
}

export class ShortcutConfigItemDate extends React.Component<ShortcutConfigItemDateProps, {}> {
    render(): any {
        return <li
            className="list-group-item"
            onClick={() => { }}>
            <Row style={{ display: "flex", alignItems: "center" }}>
                 <Col md={2} >
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
           
                <Col md={6}>
                    {this.props.Shortcut.IsDynamic ?
                        this.props.Shortcut.ShortcutResult :
                            <FormControl
                                type="date"
                                placeholder="Shortcut Result"
                                onChange={(e) => this.onResultChange(e)}
                                value={this.props.Shortcut.ShortcutResult}
                            /> 
                    }
                </Col>
                <Col md={3} >
                    <EntityListActionButtons
                        showEdit={false}
                        showShare={this.props.TeamSharingActivated}
                        shareClick={() => this.props.onShare()}
                        ConfigEntity={this.props.Shortcut}
                        ConfirmDeleteAction={this.props.onDeleteConfirm}
                        EntityName="Shortcut">
                    </EntityListActionButtons>
                </Col>

            </Row>
        </li>
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

*/