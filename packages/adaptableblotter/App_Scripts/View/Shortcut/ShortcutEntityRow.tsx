import * as React from "react";
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { FormGroup, FormControl } from 'react-bootstrap';
import { DataType } from '../../Utilities/Enums'
import { MathOperation } from '../../Utilities/Enums'
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { AdaptableBlotterForm } from '../Components/Forms/AdaptableBlotterForm';
import { IShortcut } from "../../Utilities/Interface/BlotterObjects/IShortcut";
import { EntityRowItem } from "../Components/EntityRowItem";

export interface ShortcutEntityRowProps extends SharedEntityRowProps<ShortcutEntityRow> {
    onChangeKey: (shortcut: IShortcut, NewShortcutKey: string) => void;
    onChangeResult: (shortcut: IShortcut, NewShortcutResult: any) => void;
    onChangeOperation: (shortcut: IShortcut, NewShortcutOperation: MathOperation) => void;
    AvailableKeys: Array<string>;
    AvailableActions: Array<MathOperation>
}

export class ShortcutEntityRow extends React.Component<ShortcutEntityRowProps, {}> {
    render(): any {

        let shortcut: IShortcut = this.props.AdaptableBlotterObject as IShortcut;
        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content =  <EntityRowItem Content={ shortcut.ColumnType == DataType.Date ? "Date" : "Numeric" } />;

        colItems[1].Content =
        <EntityRowItem Content={
            <AdaptableBlotterForm inline key={shortcut.ShortcutKey}>
                <FormGroup controlId={shortcut.ShortcutKey}>
                    <FormControl bsSize={'small'} componentClass="select" value={shortcut.ShortcutKey} onChange={(x) => this.onKeySelectChange(x)} >
                        {this.props.AvailableKeys.map(x => {
                            return <option value={x} key={x}>{x}</option>
                        })}
                    </FormControl>
                </FormGroup>
            </AdaptableBlotterForm>
        } />;

        colItems[2].Content =
        <EntityRowItem Content={
               shortcut.ColumnType == DataType.Date ?
           
                "Replace Cell"
                :
                <FormControl componentClass="select" bsSize={'small'} value={shortcut.ShortcutOperation} onChange={(x) => this.onActionChange(x)} >
                    {
                        this.props.AvailableActions.map((shortcutOperation: MathOperation) => {
                            return <option key={MathOperation[shortcutOperation]} value={shortcutOperation}>{MathOperation[shortcutOperation]}</option>
                        })
                    }
                </FormControl>
            } />;

        colItems[3].Content = 
        <EntityRowItem Content={
            shortcut.IsDynamic ?
                shortcut.ShortcutResult :
                <FormControl
                bsSize={'small'}
                type={shortcut.ColumnType == DataType.Date ? "date" : "number"}
                    placeholder="Shortcut Result"
                    onChange={(e) => this.onResultChange(e)}
                    value={shortcut.ShortcutResult}
                />
        }/>;
        colItems[4].Content =
            <EntityListActionButtons
                cssClassName={this.props.cssClassName}
                showEdit={false}
                shareClick={() => this.props.onShare()}
                showShare={this.props.TeamSharingActivated}
                ConfirmDeleteAction={this.props.onDeleteConfirm}
                EntityType={StrategyConstants.ShortcutStrategyName} />

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />

    }

    onResultChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeResult(this.props.AdaptableBlotterObject as IShortcut, e.value);
    }

    onKeySelectChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeKey(this.props.AdaptableBlotterObject as IShortcut, e.value);
    }

    onActionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeOperation(this.props.AdaptableBlotterObject as IShortcut, e.value as MathOperation);
    }


}

