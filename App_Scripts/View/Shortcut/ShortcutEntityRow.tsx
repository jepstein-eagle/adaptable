import { IShortcut } from '../../Strategy/Interface/IShortcutStrategy';
import * as React from "react";
import {  FormGroup, FormControl } from 'react-bootstrap';
import { DataType } from '../../Core/Enums'
import { ShortcutAction } from '../../Core/Enums'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';


export interface ShortcutEntityRowProps extends SharedEntityRowProps<ShortcutEntityRow> {
    onChangeKey: (shortcut: IShortcut, NewShortcutKey: string) => void;
    onChangeResult: (shortcut: IShortcut, NewShortcutResult: any) => void;
    onChangeOperation: (shortcut: IShortcut, NewShortcutAction: ShortcutAction) => void;
    AvailableKeys: Array<string>;
    AvailableActions: Array<ShortcutAction>
}

export class ShortcutEntityRow extends React.Component<ShortcutEntityRowProps, {}> {
    render(): any {

        let shortcut: IShortcut = this.props.ConfigEntity as IShortcut;
      
        let myCols: IColItem[] = []
        myCols.push({
            size: this.props.EntityRowInfo[0].Width,
            content: shortcut.DataType == DataType.Date ? "Date" : "Numeric"
        });
        myCols.push({
            size: this.props.EntityRowInfo[1].Width,
            content:
                <AdaptableBlotterForm inline key={shortcut.ShortcutKey}>
                    <FormGroup controlId={shortcut.ShortcutKey}>
                        <FormControl componentClass="select" value={shortcut.ShortcutKey} onChange={(x) => this.onKeySelectChange(x)} >
                            {this.props.AvailableKeys.map(x => {
                                return <option value={x} key={x}>{x}</option>
                            })}
                        </FormControl>
                    </FormGroup>
                </AdaptableBlotterForm>
        });

        myCols.push({
            size: this.props.EntityRowInfo[2].Width, content:
                shortcut.DataType == DataType.Date ?
                    "Replace Cell"
                    :
                    shortcut.IsPredefined ?
                        ShortcutAction[shortcut.ShortcutAction] :
                        <FormControl componentClass="select" value={shortcut.ShortcutAction} onChange={(x) => this.onActionChange(x)} >
                            {
                                this.props.AvailableActions.map((shortcutAction: ShortcutAction) => {
                                    return <option key={ShortcutAction[shortcutAction]} value={shortcutAction}>{ShortcutAction[shortcutAction]}</option>
                                })
                            }
                        </FormControl>

        });

        myCols.push({
            size: this.props.EntityRowInfo[3].Width,
            content:
                shortcut.IsDynamic ?
                    shortcut.ShortcutResult :
                    <FormControl
                        type={shortcut.DataType == DataType.Date ? "date" : "number"}
                        placeholder="Shortcut Result"
                        onChange={(e) => this.onResultChange(e)}
                        value={shortcut.ShortcutResult}
                    />
        });

        myCols.push({
            size: this.props.EntityRowInfo[4].Width,
            content:
                <EntityListActionButtons
                    showEdit={false}
                    shareClick={() => this.props.onShare()}
                    showShare={this.props.TeamSharingActivated}
                    ConfigEntity={shortcut}
                    ConfirmDeleteAction={this.props.onDeleteConfirm}
                    EntityName="Shortcut">
                </EntityListActionButtons>
        });

        return <ConfigEntityRowItem items={myCols} />

    }

    onResultChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeResult(this.props.ConfigEntity as IShortcut, e.value);
    }

    onKeySelectChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeKey(this.props.ConfigEntity as IShortcut, e.value);
    }

    onActionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeOperation(this.props.ConfigEntity as IShortcut, e.value as ShortcutAction);
    }


}

