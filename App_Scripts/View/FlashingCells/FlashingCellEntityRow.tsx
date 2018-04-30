import * as React from "react";
import { Checkbox, FormControl } from 'react-bootstrap';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ColorPicker } from '../ColorPicker';
import { IColItem } from "../UIInterfaces";
import { IFlashingCell } from "../../Core/Api/Interface/AdaptableBlotterObjects";


export interface FlashingCellEntityRowProps extends SharedEntityExpressionRowProps<FlashingCellEntityRow> {
    FlashingCellDurations: any[]
    ColorPalette: string[];
    onSelect: (flashingCell: IFlashingCell) => void;
    onChangeFlashingDuration: (flashingCell: IFlashingCell, NewFlashDuration: number) => void;
    onChangeDownColorFlashingCell: (flashingCell: IFlashingCell, DownColor: string) => void;
    onChangeUpColorFlashingCell: (flashingCell: IFlashingCell, UpColor: string) => void;
}

export class FlashingCellEntityRow extends React.Component<FlashingCellEntityRowProps, {}> {
    render(): any {
        let flashingCell: IFlashingCell = this.props.AdaptableBlotterObject as IFlashingCell;

        //we could have the typeahead combobox with freetext and the correct items in the list
        //but I don't think we should allow users to enter a value....
        //I'm only managing the case where the duration is not one of the predefined ones to be nicely displayed in the UI
        let durations = this.props.FlashingCellDurations.map((flashingCellDuration) => {
            return <option key={flashingCellDuration} value={flashingCellDuration}>{this.getFriendlyFlashingDuration(flashingCellDuration)}</option>
        })
        if (!this.props.FlashingCellDurations.find(x => x == flashingCell.FlashingCellDuration)) {
            durations.push(<option key={flashingCell.FlashingCellDuration} value={flashingCell.FlashingCellDuration}>{this.getFriendlyFlashingDuration(flashingCell.FlashingCellDuration)}</option>)
        }

        let isDisabled = flashingCell.IsReadOnly
        let column = this.props.Columns.find(f => f.ColumnId == flashingCell.ColumnId)
        if (!column) {
            return null
        }

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = <Checkbox disabled={isDisabled} onChange={() => this.props.onSelect(flashingCell)} checked={flashingCell.IsLive}></Checkbox>
        colItems[1].Content = column.FriendlyName
        colItems[2].Content = <FormControl disabled={isDisabled} componentClass="select" value={flashingCell.FlashingCellDuration} onChange={(x) => this.onActionChange(x)} >
            {durations}
        </FormControl>
        colItems[3].Content = <ColorPicker ColorPalette={this.props.ColorPalette} disabled={isDisabled} value={flashingCell.UpColor} onChange={(x) => this.onUpColorChange(x)} />
        colItems[4].Content = <ColorPicker   ColorPalette={this.props.ColorPalette} disabled={isDisabled} value={flashingCell.DownColor} onChange={(x) => this.onDownColorChange(x)} />
        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems}
        />
    }

    onActionChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeFlashingDuration(this.props.AdaptableBlotterObject as IFlashingCell, Number.parseInt(e.value));
    }

    onDownColorChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeDownColorFlashingCell(this.props.AdaptableBlotterObject as IFlashingCell, e.value);
    }

    onUpColorChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onChangeUpColorFlashingCell(this.props.AdaptableBlotterObject as IFlashingCell, e.value);
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