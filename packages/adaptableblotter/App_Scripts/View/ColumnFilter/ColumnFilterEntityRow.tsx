import * as React from "react";
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { IColItem } from '../UIInterfaces';
import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { ButtonSave } from "../Components/Buttons/ButtonSave";
import { ArrayExtensions } from "../../Utilities/Extensions/ArrayExtensions";
import { AccessLevel } from "../../Utilities/Enums";
import { DANGER_BSSTYLE } from "../../Utilities/Constants/StyleConstants";

export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: IColumnFilter) => void;
    onSaveColumnFilterasUserFilter:(columnFilter:IColumnFilter)=> void;
    ColumnFilter: IColumnFilter;
    AccessLevel: AccessLevel
}

export class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {

    render(): any {
        let colItems: IColItem[] = [].concat(this.props.colItems)
        colItems[0].Content = ColumnHelper.getFriendlyNameFromColumnId(this.props.ColumnFilter.ColumnId, this.props.Columns)
        colItems[1].Content = ExpressionHelper.ConvertExpressionToString(this.props.ColumnFilter.Filter, this.props.Columns)
        colItems[2].Content = <span>
            <ButtonSave cssClassName={this.props.cssClassName} onClick={() => this.props.onSaveColumnFilterasUserFilter(this.props.ColumnFilter)}
                overrideTooltip="Save as User Filter"
                bsStyle={"primary"}
                DisplayMode="Glyph"
                size={"small"}
                overrideDisableButton={this.props.ColumnFilter == null || ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilter.Filter.FilterExpressions) } 
                AccessLevel={this.props.AccessLevel}
                />
            {' '}
            <ButtonClear cssClassName={this.props.cssClassName} onClick={() => this.props.onClear(this.props.ColumnFilter)} overrideTooltip="Clear Column Filter"
                bsStyle={DANGER_BSSTYLE}
                DisplayMode="Glyph"
                size={"small"}
                overrideDisableButton={this.props.ColumnFilter == null} 
                AccessLevel={this.props.AccessLevel}
                />
        </span>

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} key={this.props.Index} />



    }

}