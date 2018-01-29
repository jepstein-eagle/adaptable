import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { Col, Panel, Row, Checkbox, FormControl } from 'react-bootstrap';
import { IFlashingColumn } from '../../Core/Interface/IFlashingCellsStrategy';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { EnumExtensions } from '../../Core/Extensions';
import { ColorPicker } from '../ColorPicker';
import { ObjectFactory } from '../../Core/ObjectFactory';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';

export interface FlashingCellConfigItemProps extends React.ClassAttributes<FlashingCellConfigItem> {
    FlashingColumn: IFlashingColumn;
    Columns: IColumn[];
    PredefinedColorChoices: string[];
    FlashingCellDurations: number[];
    onSelect: (flashingColumn: IFlashingColumn) => void;
    onChangeFlashingDuration: (flashingColumn: IFlashingColumn, NewFlashDuration: number) => void;
    onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => void;
    onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => void;
}

export class FlashingCellConfigItem extends React.Component<FlashingCellConfigItemProps, {}> {

    render(): any {
        let isDisabled = this.props.FlashingColumn.IsPredefined
        let column = this.props.Columns.find(f => f.ColumnId == this.props.FlashingColumn.ColumnName)
        if (!column) {
            return null
        }
        //we could have the typeahead combobox with freetext and the correct items in the list
        //but I don't think we should allow users to enter a value....
        //I'm only managing the case where the duration is not one of the predefined ones to be nicely displayed in the UI
        let durations = this.props.FlashingCellDurations.map((flashingCellDuration) => {
            return <option key={flashingCellDuration} value={flashingCellDuration}>{this.getFriendlyFlashingDuration(flashingCellDuration)}</option>
        })
        if (!ObjectFactory.GetFlashingCellDurations().find(x => x == this.props.FlashingColumn.FlashingCellDuration)) {
            durations.push(<option key={this.props.FlashingColumn.FlashingCellDuration} value={this.props.FlashingColumn.FlashingCellDuration}>{this.getFriendlyFlashingDuration(this.props.FlashingColumn.FlashingCellDuration)}</option>)
        }

        let myCols: IColItem[] = []
        myCols.push({
            size: 1, content: <Checkbox disabled={isDisabled} onChange={() => this.props.onSelect(this.props.FlashingColumn)} checked={this.props.FlashingColumn.IsLive}></Checkbox>

        });
        myCols.push({ size: 4, content: column.FriendlyName });
        myCols.push({
            size: 3, content: <FormControl disabled={isDisabled} componentClass="select" value={this.props.FlashingColumn.FlashingCellDuration} onChange={(x) => this.onActionChange(x)} >
                {durations}
            </FormControl>
        });
        myCols.push({ size: 2, content: <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} disabled={isDisabled} value={this.props.FlashingColumn.UpBackColor} onChange={(x) => this.onUpColorChange(x)} /> });
        myCols.push({
            size: 2, content: <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} disabled={isDisabled} value={this.props.FlashingColumn.DownBackColor} onChange={(x) => this.onDownColorChange(x)} />
        });

        return <ConfigEntityRowItem
            items={myCols} />
    }

    onActionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeFlashingDuration(this.props.FlashingColumn, Number.parseInt(e.value));
    }

    onDownColorChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeDownColorFlashingColumn(this.props.FlashingColumn, e.value);
    }

    onUpColorChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeUpColorFlashingColumn(this.props.FlashingColumn, e.value);
    }

    getFriendlyFlashingDuration(duration: number) {
        switch (duration) {
            case 250:
                return "1/4 Second"
            case 500:
                return "1/2 Second"
            case 750:
                return "3/4 Second"
            case 1000:
                return "1 Second"
            default:
                return String(duration) + " ms";
        }
    }
}

