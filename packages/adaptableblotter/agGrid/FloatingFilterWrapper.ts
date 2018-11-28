import * as ReactDOM from "react-dom";
import { IColumnFilterContext } from '../App_Scripts/Strategy/Interface/IColumnFilterStrategy';
import { AdaptableBlotter, } from './AdaptableBlotter'
import { IFloatingFilterComp, IFloatingFilterParams } from "ag-grid/dist/lib/filter/floatingFilter";
import { FloatingFilterFormReact } from "../App_Scripts/View/Components/FilterForm/FloatingFilterForm";
import { IColumn } from "../App_Scripts/Core/Interface/IColumn";
import { DistinctCriteriaPairValue } from "../App_Scripts/Core/Enums";
import { ColumnHelper } from "../App_Scripts/Utilities/Helpers/ColumnHelper";



export let FloatingFilterWrapperFactory = (blotter: AdaptableBlotter) => {
    return <any>class FilterWrapper implements IFloatingFilterComp<any, any, any> {
        private filterContainer: HTMLSpanElement
        init(params: IFloatingFilterParams<any, any>): void {
            let colId = params.column.getColId()
            this.filterContainer = document.createElement("div")
            this.filterContainer.id = "floatingFilter_" + colId
            let column: IColumn  = ColumnHelper.getColumnFromId(colId, blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            let filterContext: IColumnFilterContext = {
                Column:column,
                Blotter: blotter,
                ShowCloseButton: false,
            };
            ReactDOM.render(FloatingFilterFormReact(filterContext), this.filterContainer);
        }

        onParentModelChanged(parentModel: any): void {
            //  console.log(parentModel)
        }

        getGui(): HTMLElement {
            return this.filterContainer
        }

        destroy(): void {
            this.filterContainer = null
        }


    }
};

