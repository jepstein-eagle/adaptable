import * as ReactDOM from "react-dom";
import { IColumnFilterContext } from '../../Strategy/Interface/IColumnFilterStrategy';
import { AdaptableBlotter, } from './AdaptableBlotter'
import { IFloatingFilterComp, IFloatingFilterParams } from "ag-grid/dist/lib/filter/floatingFilter";
import { FloatingFilterFormReact } from "../../View/Components/FilterForm/FloatingFilterForm";



export let FloatingFilterWrapperFactory = (blotter: AdaptableBlotter) => {
    return <any>class FilterWrapper implements IFloatingFilterComp<any, any, any> {
        private filterContainer: HTMLSpanElement
        init(params: IFloatingFilterParams<any, any>): void {
            let colId = params.column.getColId()
            this.filterContainer = document.createElement("div")
            this.filterContainer.id = "floatingFilter_" + colId
            let filterContext: IColumnFilterContext = {
                Column: blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == colId),
                Blotter: blotter,
                ShowCloseButton: false
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

