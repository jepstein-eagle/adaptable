import * as ReactDOM from "react-dom";
import { IColumnFilterContext } from "../Utilities/Interface/IColumnFilterContext";
import { AdaptableBlotter, } from './AdaptableBlotter'
import { IFloatingFilterComp, IFloatingFilterParams } from "ag-grid-community/dist/lib/filter/floatingFilter";
import { FloatingFilterFormReact } from "../View/Components/FilterForm/FloatingFilterForm";
import { IColumn } from "../Utilities/Interface/IColumn";
import { ColumnHelper } from "../Utilities/Helpers/ColumnHelper";



export let FloatingFilterWrapperFactory = (blotter: AdaptableBlotter) => {
    return <any>class FloatingFilterWrapper implements IFloatingFilterComp<any, any, any> {
        private filterContainer: HTMLSpanElement
        init(params: IFloatingFilterParams<any, any>): void {
            let colId = params.column.getColId()
            this.filterContainer = document.createElement("div")
            this.filterContainer.id = "floatingFilter_" + colId + "_" + blotter.blotterOptions.blotterId;
            let column: IColumn  = ColumnHelper.getColumnFromId(colId, blotter.api.gridApi.getColumns());
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
