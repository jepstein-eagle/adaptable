import { IFlashingColumn } from '../../Strategy/Interface/IFlashingCellsStrategy';
import * as React from "react";
import { Checkbox, FormControl } from 'react-bootstrap';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ColorPicker } from '../ColorPicker';
import { IColItem } from "../UIInterfaces";


export interface FlashingCellEntityRowProps extends SharedEntityExpressionRowProps<FlashingCellEntityRow> {
    FlashingCellDurations: any[]
    PredefinedColorChoices: string[];
    onSelect: (flashingColumn: IFlashingColumn) => void;
    onChangeFlashingDuration: (flashingColumn: IFlashingColumn, NewFlashDuration: number) => void;
    onChangeDownColorFlashingColumn: (flashingCell: IFlashingColumn, DownColor: string) => void;
    onChangeUpColorFlashingColumn: (flashingCell: IFlashingColumn, UpColor: string) => void;
}

export class FlashingCellEntityRow extends React.Component<FlashingCellEntityRowProps, {}> {
    render(): any {
        let flashingColumn: IFlashingColumn = this.props.AdaptableBlotterObject as IFlashingColumn;

        //we could have the typeahead combobox with freetext and the correct items in the list
        //but I don't think we should allow users to enter a value....
        //I'm only managing the case where the duration is not one of the predefined ones to be nicely displayed in the UI
        let durations = this.props.FlashingCellDurations.map((flashingCellDuration) => {
            return <option key={flashingCellDuration} value={flashingCellDuration}>{this.getFriendlyFlashingDuration(flashingCellDuration)}</option>
        })
        if (!this.props.FlashingCellDurations.find(x => x == flashingColumn.FlashingCellDuration)) {
            durations.push(<option key={flashingColumn.FlashingCellDuration} value={flashingColumn.FlashingCellDuration}>{this.getFriendlyFlashingDuration(flashingColumn.FlashingCellDuration)}</option>)
        }

        let isDisabled = flashingColumn.IsPredefined
        let column = this.props.Columns.find(f => f.ColumnId == flashingColumn.ColumnName)
        if (!column) {
            return null
        }

        let colItems: IColItem[] = [].concat(this.props.ColItems);

        colItems[0].Content = <Checkbox disabled={isDisabled} onChange={() => this.props.onSelect(flashingColumn)} checked={flashingColumn.IsLive}></Checkbox>
        colItems[1].Content = column.FriendlyName
        colItems[2].Content = <FormControl disabled={isDisabled} componentClass="select" value={flashingColumn.FlashingCellDuration} onChange={(x) => this.onActionChange(x)} >
            {durations}
        </FormControl>
        colItems[3].Content = <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} disabled={isDisabled} value={flashingColumn.UpBackColor} onChange={(x) => this.onUpColorChange(x)} />
        colItems[4].Content = <ColorPicker PredefinedColorChoices={this.props.PredefinedColorChoices} disabled={isDisabled} value={flashingColumn.DownBackColor} onChange={(x) => this.onDownColorChange(x)} />
        return <AdaptableObjectRow ColItems={colItems}
        />
    }

    onActionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeFlashingDuration(this.props.AdaptableBlotterObject as IFlashingColumn, Number.parseInt(e.value));
    }

    onDownColorChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeDownColorFlashingColumn(this.props.AdaptableBlotterObject as IFlashingColumn, e.value);
    }

    onUpColorChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeUpColorFlashingColumn(this.props.AdaptableBlotterObject as IFlashingColumn, e.value);
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