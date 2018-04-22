import * as React from "react";
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';
import { Radio , FormControl, Button, Glyphicon} from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { IColItem } from "../UIInterfaces";
import { DEFAULT_LAYOUT } from "../../Core/Constants/GeneralConstants";
import { IGridSort } from "../../Core/Interface/Interfaces";
import { IColumn } from "../../Core/Interface/IColumn";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'
import { SelectionMode, SortOrder } from "../../Core/Enums";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { EnumExtensions } from "../../Core/Extensions/EnumExtensions";
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';


export interface GridSortRowProps<GridSortRow> extends SharedEntityExpressionRowProps<GridSortRow> {
   GridSort: IGridSort
   onGridSortColumnChanged: (column: IColumn) => void;
   onGridSortOrderChanged: (sortOrder: SortOrder) => void;
   onDeleteGridSort: () => void;
}

export class GridSortRow extends React.Component<GridSortRowProps<GridSortRow>, {}> {

   
  
    render(): any {
       
        let colItems: IColItem[] = [].concat(this.props.colItems);

        let sortOrders = EnumExtensions.getNames(SortOrder).map((enumName) => {
            return <option style={{ fontSize: "5px" }} key={enumName} value={enumName}>{enumName}</option>
        })
        
        colItems[0].Content=    <ColumnSelector SelectedColumnIds={[this.props.GridSort.Column]}
        ColumnList={this.props.Columns}
        onColumnChange={columns => this.onColumnSelectedChanged(columns)}
        SelectionMode={SelectionMode.Single} />

        colItems[1].Content=  <FormControl componentClass="select" placeholder="select"
        value={this.props.GridSort.SortOrder}
        onChange={(x: any) => this.onSortOrderChanged(x)} >
        {sortOrders}

    </FormControl>
        
        
     
        let deleteButton =   <ButtonDelete
        cssClassName={this.props.cssClassName}
         style={{marginLeft:"1px", marginTop:"2px", marginBottom:"2px",marginRight:"1px"}}
        overrideDisableButton={false}
            ConfigEntity={null}
            overrideTooltip={"hello"}
            DisplayMode="Glyph"
            ConfirmAction={null}
            ConfirmationMsg={""}
            ConfirmationTitle={"" }
            onClickAction={()=>this.props.onDeleteGridSort()}
            size="small" />
       
          
             colItems[2].Content = deleteButton;

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

  private  onColumnSelectedChanged(columns: IColumn[]): any {
            let column:IColumn = columns[0];
 
        this.props.onGridSortColumnChanged(column);
    }

  private  onSortOrderChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onGridSortOrderChanged(e.value as SortOrder);    
    }

     private onDeleteGridSort(): any {
            this.props.onDeleteGridSort();
        }
}



let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'marginBottom': '0'
}