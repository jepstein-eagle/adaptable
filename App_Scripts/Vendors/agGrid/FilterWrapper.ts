import { IFilterComp, IDoesFilterPassParams, IFilterParams } from "ag-grid"
import * as ReactDOM from "react-dom";
import { IColumnFilterContext } from '../../Strategy/Interface/IColumnFilterStrategy';
import { AdaptableBlotter, } from '../../Vendors/agGrid/AdaptableBlotter'
import { DistinctCriteriaPairValue } from '../../Core/Enums'
import { FilterFormReact } from "../../View/Components/FilterForm/FilterForm";

export let FilterWrapperFactory = (blotter: AdaptableBlotter) => {
    return <any>class FilterWrapper implements IFilterComp {
        private params: IFilterParams
        private filterContainer: HTMLDivElement
        init(params: IFilterParams): void {
            this.params = params
            this.filterContainer = document.createElement("div")
            this.filterContainer.id = "filter" + this.params.column.getColId()
        }
        isFilterActive() {
            //make the small filter icon to appear when there is a filter
            return blotter.AdaptableBlotterStore.TheStore.getState().Filter.ColumnFilters.findIndex(x => x.ColumnId == this.params.column.getColId()) > -1
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
            let filterContext: IColumnFilterContext = {
                Column: blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == this.params.column.getColId()),
                Blotter: blotter,
             };
            blotter.hideFilterFormPopup = params.hidePopup
            ReactDOM.render(FilterFormReact(filterContext), this.filterContainer);
        }
    }
};

