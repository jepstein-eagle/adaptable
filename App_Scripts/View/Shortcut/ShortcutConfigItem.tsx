import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { ButtonToolbar, ControlLabel, FormGroup, Button, Form, Col, Panel, Row, Checkbox, FormControl, Label, HelpBlock } from 'react-bootstrap';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';

export interface ShortcutConfigItemProps extends React.ClassAttributes<ShortcutConfigItem> {
    Shortcut: IShortcut
    onDeleteConfirm: Redux.Action;
    onChangeKey: (shortcut: IShortcut, NewShortcutKey: string) => void;
    onChangeResult: (shortcut: IShortcut, NewShortcutResult: any) => void;
    onChangeOperation: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => void;
    AvailableKeys: Array<string>;
    onShare: () => void;
    TeamSharingActivated: boolean
}

export class ShortcutConfigItem extends React.Component<ShortcutConfigItemProps, {}> {
    render(): any {
        const shortcutActionList: Array<ShortcutAction> = [ShortcutAction.Add, ShortcutAction.Subtract, ShortcutAction.Multiply, ShortcutAction.Divide];

        let myCols: IColItem[] = []
        myCols.push({
            size: 2, content: this.props.Shortcut.DataType == DataType.Date ? "Date" : "Numeric"
        });
        myCols.push({
            size: 1, content:
                <AdaptableBlotterForm inline key={this.props.Shortcut.ShortcutKey}>
                    <FormGroup controlId={this.props.Shortcut.ShortcutKey}>
                        <FormControl componentClass="select" value={this.props.Shortcut.ShortcutKey} onChange={(x) => this.onKeySelectChange(x)} >
                            {this.props.AvailableKeys.map(x => {
                                return <option value={x} key={x}>{x}</option>
                            })}
                        </FormControl>
                    </FormGroup>
                </AdaptableBlotterForm>
        });

        myCols.push({
            size: 3, content:
                this.props.Shortcut.DataType == DataType.Date ?
                    "Replace Cell"
                    :
                    this.props.Shortcut.IsPredefined ?
                        ShortcutAction[this.props.Shortcut.ShortcutAction] :
                        <FormControl componentClass="select" value={this.props.Shortcut.ShortcutAction} onChange={(x) => this.onActionChange(x)} >
                            {
                                shortcutActionList.map((shortcutAction: ShortcutAction) => {
                                    return <option key={ShortcutAction[shortcutAction]} value={shortcutAction}>{ShortcutAction[shortcutAction]}</option>
                                })
                            }
                        </FormControl>

        });

        myCols.push({
            size: 3, content:
                this.props.Shortcut.IsDynamic ?
                    this.props.Shortcut.ShortcutResult :
                    <FormControl
                        type={this.props.Shortcut.DataType == DataType.Date ? "date" : "number"}
                        placeholder="Shortcut Result"
                        onChange={(e) => this.onResultChange(e)}
                        value={this.props.Shortcut.ShortcutResult}
                    />
        });


        myCols.push({
            size: 3, content:
                <EntityListActionButtons
                    showEdit={false}
                    shareClick={() => this.props.onShare()}
                    showShare={this.props.TeamSharingActivated}
                    ConfigEntity={this.props.Shortcut}
                    ConfirmDeleteAction={this.props.onDeleteConfirm}
                    EntityName="Shortcut">
                </EntityListActionButtons>
        });

        return <ConfigEntityRowItem    items={myCols} />

    }

    onResultChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeResult(this.props.Shortcut, e.value);
    }

    onKeySelectChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeKey(this.props.Shortcut, e.value);
    }

    onActionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeOperation(this.props.Shortcut, e.value as ShortcutAction);
    }


}

