import { IColumnFilter } from '../../Strategy/Interface/IColumnFilterStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helpers/Helper';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { ExpressionEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { ButtonClear } from '../Components/Buttons/ButtonClear';

export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow> extends ExpressionEntityRowProps<AdvancedSearchEntityRow> {
    onClear: (columnFilter: IColumnFilter) => void;
   ColumnFilter: IColumnFilter;
}

export class ColumnFilterEntityRow extends React.Component<ColumnFilterEntityRowProps<ColumnFilterEntityRow>, {}> {
   
    
    render(): any {
     
        let myCols: IColItem[] = []
        myCols.push({
                size: this.props.EntityRowInfo[0].Width, content: this.props.Columns.find(c=>c.ColumnId == this.props.ColumnFilter.ColumnId).FriendlyName
            });
            myCols.push({
                size: this.props.EntityRowInfo[1].Width, content: ExpressionHelper.ConvertExpressionToString(this.props.ColumnFilter.Filter, this.props.Columns, this.props.UserFilters)
              });
            let buttons: any = <ButtonClear onClick={() => this.props.onClear(this.props.ColumnFilter)} overrideTooltip="Clear Column Filter"
            DisplayMode="Glyph"
            overrideDisableButton={this.props.ColumnFilter == null} />
            myCols.push({ size: this.props.EntityRowInfo[2].Width, content: buttons });

            return <ConfigEntityRowItem items={myCols} key={this.props.Index} />
       
      

    }

}