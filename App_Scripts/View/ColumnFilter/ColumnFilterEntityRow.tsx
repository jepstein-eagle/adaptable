import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import * as React from "react";
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { IColItem } from '../UIInterfaces';

export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: IColumnFilter) => void;
    ColumnFilter: IColumnFilter;
}

export class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {

    render(): any {
        let colItems: IColItem[] = [].concat(this.props.colItems)
        colItems[0].Content = this.props.Columns.find(c => c.ColumnId == this.props.ColumnFilter.ColumnId).FriendlyName
        colItems[1].Content = ExpressionHelper.ConvertExpressionToString(this.props.ColumnFilter.Filter, this.props.Columns, this.props.UserFilters)
        colItems[2].Content = <ButtonClear cssClassName={this.props.cssClassName} onClick={() => this.props.onClear(this.props.ColumnFilter)} overrideTooltip="Clear Column Filter"
            DisplayMode="Glyph"
            size={"small"}
            overrideDisableButton={this.props.ColumnFilter == null} />
         
        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} key={this.props.Index} />



    }

}