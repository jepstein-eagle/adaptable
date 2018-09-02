import * as React from "react";
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { IColItem } from '../UIInterfaces';
import { IColumnFilter } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";

export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: IColumnFilter) => void;
    ColumnFilter: IColumnFilter;
}

export class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {

    render(): any {
        let colItems: IColItem[] = [].concat(this.props.colItems)
        colItems[0].Content = ColumnHelper.getFriendlyNameFromColumnId(this.props.ColumnFilter.ColumnId, this.props.Columns)
        colItems[1].Content = ExpressionHelper.ConvertExpressionToString(this.props.ColumnFilter.Filter, this.props.Columns, this.props.UserFilters)
        colItems[2].Content = <ButtonClear cssClassName={this.props.cssClassName} onClick={() => this.props.onClear(this.props.ColumnFilter)} overrideTooltip="Clear Column Filter"
            bsStyle={"danger"}
            DisplayMode="Glyph"
            size={"small"}
            overrideDisableButton={this.props.ColumnFilter == null} />

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} key={this.props.Index} />



    }

}