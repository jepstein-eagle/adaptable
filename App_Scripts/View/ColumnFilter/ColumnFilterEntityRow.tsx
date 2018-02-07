import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import * as React from "react";
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { IColItem, IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { ButtonClear } from '../Components/Buttons/ButtonClear';

export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: IColumnFilter) => void;
    ColumnFilter: IColumnFilter;
}

export class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {

    render(): any {
        let colItems: IColItem[] = [].concat(this.props.ColItems)
        colItems[0].Content = this.props.Columns.find(c => c.ColumnId == this.props.ColumnFilter.ColumnId).FriendlyName
        colItems[1].Content = ExpressionHelper.ConvertExpressionToString(this.props.ColumnFilter.Filter, this.props.Columns, this.props.UserFilters)
        colItems[2].Content = <ButtonClear onClick={() => this.props.onClear(this.props.ColumnFilter)} overrideTooltip="Clear Column Filter"
            DisplayMode="Glyph"
            size={"small"}
            overrideDisableButton={this.props.ColumnFilter == null} />
         
        return <ConfigEntityRowItem ColItems={colItems} key={this.props.Index} />



    }

}