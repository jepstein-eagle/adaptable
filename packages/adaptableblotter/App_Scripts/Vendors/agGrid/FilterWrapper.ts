import { IFilterComp, IDoesFilterPassParams, IFilterParams, Column } from "ag-grid"
import * as ReactDOM from "react-dom";
import { IColumnFilterContext } from '../../Strategy/Interface/IColumnFilterStrategy';
import { AdaptableBlotter, } from './AdaptableBlotter'
import { FilterFormReact } from "../../View/Components/FilterForm/FilterForm";
import { DistinctCriteriaPairValue } from "../../Core/Enums";
import { IColumn } from "../../Core/Interface/IColumn";
import { IPercentCellRenderer } from "../../Core/Api/Interface/IAdaptableBlotterObjects";

export let FilterWrapperFactory = (blotter: AdaptableBlotter) => {
    return <any>class FilterWrapper implements IFilterComp {
        private params: IFilterParams
        private filterContainer: HTMLDivElement
        private column: Column
        init(params: IFilterParams): void {
            this.params = params
            this.column = params.column
            this.filterContainer = document.createElement("div")
            this.filterContainer.id = "filter_" + this.params.column.getColId()
        }
        isFilterActive() {
            //make the small filter icon to appear when there is a filter
            return blotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters.findIndex(x => x.ColumnId == this.params.column.getColId()) > -1
        }

        doesFilterPass(params: IDoesFilterPassParams): boolean {
            //we do not filter here.... we filter using the doesExternalFilterPass. Not sure there is a difference....
            return true
        }

        getModel(): any {
            //
        }
        setModel(model: any): void {
            //
        }
        getGui(): HTMLElement {
            return this.filterContainer
        }

        afterGuiAttached?(params?: { hidePopup?: Function }): void {
            //we always unmount first so the autofocus from the form works... in other grids we unmount when hidden
            ReactDOM.unmountComponentAtNode(this.filterContainer)
            let column: IColumn  = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == this.column.getColId());
            let renderedColumn: IPercentCellRenderer = blotter.AdaptableBlotterStore.TheStore.getState().CellRenderer.PercentCellRenderers.find(c=>c.ColumnId ==column.ColumnId)   
            let filterContext: IColumnFilterContext = {
                Column: column,
                Blotter: blotter,
                ShowCloseButton : (params != null && params.hidePopup !=null),
                DistinctCriteriaPairValue: (renderedColumn)? DistinctCriteriaPairValue.RawValue: DistinctCriteriaPairValue.DisplayValue
            };
            blotter.hideFilterFormPopup = (params)? params.hidePopup: null
            ReactDOM.render(FilterFormReact(filterContext), this.filterContainer);
        }
    }
};



