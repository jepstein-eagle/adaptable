import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Api/Interface/IColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IPercentBar } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { ColorPicker } from "../ColorPicker";
import { IAdaptableBlotter } from "../../Api/Interface/IAdaptableBlotter";
import { FormControl } from "react-bootstrap";


export interface PercentBarEntityRowProps extends SharedEntityExpressionRowProps<PercentBarEntityRow> {
    Column: IColumn
    ColorPalette: string[]
    onMinimumValueChanged: (PercentBar: IPercentBar, minimumValue: number) => void;
    onMaximumValueChanged: (PercentBar: IPercentBar, maximumValue: number) => void;
    onPositiveColorChanged: (PercentBar: IPercentBar, positiveColor: string) => void;
    onNegativeColorChanged: (PercentBar: IPercentBar, negativeColor: string) => void;
}

export class PercentBarEntityRow extends React.Component<PercentBarEntityRowProps, {}> {
    render(): any {
        let PercentBar: IPercentBar = this.props.AdaptableBlotterObject as IPercentBar;

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = ColumnHelper.getFriendlyNameFromColumn(PercentBar.ColumnId, this.props.Column)
        colItems[1].Content = <FormControl
            type={"number"}
            placeholder="Min Value"
            onChange={(e) => this.onMinimumValueChanged(e)}
            value={PercentBar.MinValue}
        />
        colItems[2].Content = <FormControl
            type={"number"}
            placeholder="Max Value"
            onChange={(e) => this.onMaximumValueChanged(e)}
            value={PercentBar.MaxValue}
        />
        colItems[3].Content = <ColorPicker ColorPalette={this.props.ColorPalette} value={PercentBar.PositiveColor} onChange={(x) => this.onPositiveColorChanged(x)} />
        colItems[4].Content = <ColorPicker ColorPalette={this.props.ColorPalette} value={PercentBar.NegativeColor} onChange={(x) => this.onNegativeColorChanged(x)} />


        colItems[5].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, PercentBar)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
            EntityName={StrategyConstants.PercentBarStrategyName} />


        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }


    onMinimumValueChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (!isNaN(Number(e.value))) {
            let minValue: number = Number(e.value);
            this.props.onMinimumValueChanged(this.props.AdaptableBlotterObject as IPercentBar, minValue);
        }
    }

    onMaximumValueChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (!isNaN(Number(e.value))) {
            let maxValue: number = Number(e.value);
             this.props.onMaximumValueChanged(this.props.AdaptableBlotterObject as IPercentBar, maxValue);
        }
    }

    onPositiveColorChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onPositiveColorChanged(this.props.AdaptableBlotterObject as IPercentBar, e.value);
    }

    onNegativeColorChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onNegativeColorChanged(this.props.AdaptableBlotterObject as IPercentBar, e.value);
    }




}

