import { IFilterComp, IDoesFilterPassParams, IFilterParams } from "ag-grid"
import * as ReactDOM from "react-dom";
import { IColumnFilterContext } from '../../Strategy/Interface/IColumnFilterStrategy';
import { AdaptableBlotter, } from './AdaptableBlotter'
import { FilterFormReact } from "../../View/Components/FilterForm/FilterForm";
import { IFloatingFilterComp, IFloatingFilterParams } from "ag-grid/dist/lib/filter/floatingFilter";
import { ExpressionHelper } from "../../Core/Helpers/ExpressionHelper";
import { Expression } from "../../Core/Api/Expression";
import { IColumnFilter } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { StringExtensions } from "../../Core/Extensions/StringExtensions";
import { FloatingFilterFormReact } from "../../View/Components/FilterForm/FloatingFilterForm";

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

export let FloatingFilterWrapperFactory = (blotter: AdaptableBlotter) => {
    return <any>class FilterWrapper implements IFloatingFilterComp<any, any, any> {
        private params: IFloatingFilterParams<any, any>
        private filterContainer: HTMLSpanElement
        private eFilterInput: HTMLInputElement
        init(params: IFloatingFilterParams<any, any>): void {
            this.params = params
            let colId = params.column.getColId()
            console.log("building filter for: " + colId)
           // let width: number = this.params.column.getActualWidth() - 20
            this.filterContainer = document.createElement("div")
          //  this.filterContainer.innerHTML = '<input style="width: ' + width + 'px" type="text"/>'
            this.filterContainer.id = "floatingFilter" + colId
          //  let that = this;
          //  function onInputBoxChanged() {
          //      let filterValue = that.eFilterInput.value
          //      if (StringExtensions.IsNullOrEmpty(filterValue)) {
          //          blotter.api.columnFilterClearByColumn(colId)
          //      } else {

           //         let expression: Expression
           //         expression = ExpressionHelper.CreateSingleColumnExpression(colId, [filterValue], [], [], [])

            //        let columnFilter: IColumnFilter = { ColumnId: colId, Filter: expression, IsReadOnly: false };
            //        console.log(columnFilter)
            //        blotter.api.columnFilterSet([columnFilter])
             //   }
            //}

           // this.eFilterInput = this.filterContainer.querySelector('input');
          //  this.eFilterInput.addEventListener('input', onInputBoxChanged);
            let filterContext: IColumnFilterContext = {
                Column: blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == colId),
                Blotter: blotter,
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

