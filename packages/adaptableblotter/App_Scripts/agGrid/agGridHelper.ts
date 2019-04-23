import { ICellRendererFunc, ICellRendererParams, ColDef, GridOptions, SideBarDef, ToolPanelDef, RowNode } from "ag-grid-community";
import { StringExtensions } from "../Utilities/Extensions/StringExtensions";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
import { ArrayExtensions } from "../Utilities/Extensions/ArrayExtensions";
import { IAdaptableBlotterOptions } from "../Utilities/Interface/BlotterOptions/IAdaptableBlotterOptions";
import { string } from "prop-types";

/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy 
 * So lets put some of the more obvious 'Helper' functions here
 * This is a bit crap - it should take a GridOptions object...
 */

export module agGridHelper {

    export function getLightThemeName(): string {
        return "ag-theme-balham";
    }

    export function getDarkThemeName(): string {
        return "ag-theme-balham-dark";
    }

    export function TrySetUpNodeIds(gridOptions: GridOptions, blotterOptions: IAdaptableBlotterOptions): boolean {
        // need some way of checking if running on client on server
        // if on server then we return false

        // if they have not set primary key then we get out
        if (StringExtensions.IsNullOrEmpty(blotterOptions.primaryKey)) {
            return false;
        }

        // otherwise lets set the Id so that it returns the primaryKey
        gridOptions.getRowNodeId = function (data) {
            return data[blotterOptions.primaryKey];
        }
        return true;
    }

    export function createCellRendererFunc(pcr: IPercentBar, blotterId: string): ICellRendererFunc {
        let showNegatives: boolean = pcr.MinValue < 0;
        let showPositives: boolean = pcr.MaxValue > 0;

        let cellRendererFunc: ICellRendererFunc = (params: ICellRendererParams) => {
            let isNegativeValue: boolean = params.value < 0;
            let value = params.value;

            let maxValue = StringExtensions.IsNotNullOrEmpty(pcr.MaxValueColumnId) ?
                this.getRawValueFromRecord(params.node, pcr.MaxValueColumnId) :
                pcr.MaxValue;
            let minValue = StringExtensions.IsNotNullOrEmpty(pcr.MinValueColumnId) ?
                this.getRawValueFromRecord(params.node, pcr.MinValueColumnId) :
                pcr.MinValue;

            if (isNegativeValue) {
                value = value * -1;
            }
            let percentagePositiveValue = ((100 / maxValue) * value);
            let percentageNegativeValue = ((100 / (minValue * -1)) * value);

            if (showNegatives && showPositives) { // if need both then half the space
                percentagePositiveValue = percentagePositiveValue / 2;
                percentageNegativeValue = percentageNegativeValue / 2;
            }

            let eOuterDiv = document.createElement('div');
            eOuterDiv.className = 'ab_div-colour-render-div';
            if (pcr.ShowValue) {
                let showValueBar = document.createElement('div');
                showValueBar.id = 'ab_div-colour-render-text_' + blotterId + '_' + pcr.ColumnId;
                showValueBar.className = 'ab_div-colour-render-text';
                if (showNegatives && showPositives) {
                    showValueBar.style.paddingLeft = (isNegativeValue) ? '50%' : '20%'
                } else {
                    showValueBar.style.paddingLeft = '5px'
                }
                showValueBar.innerHTML = params.value;
                eOuterDiv.appendChild(showValueBar);
            }

            if (showNegatives) {
                let fullWidth = (showPositives) ? 50 : 100

                let negativeDivBlankBar = document.createElement('div');
                negativeDivBlankBar.className = 'ab_div-colour-render-bar';
                negativeDivBlankBar.id = 'ab_div-colour-blank-bar_' + blotterId + '_' + pcr.ColumnId;
                negativeDivBlankBar.style.width = (fullWidth - percentageNegativeValue) + '%';
                eOuterDiv.appendChild(negativeDivBlankBar);

                let negativeDivPercentBar = document.createElement('div');
                negativeDivPercentBar.className = 'ab_div-colour-render-bar';
                negativeDivBlankBar.id = 'ab_div-colour-negative-bar_' + blotterId + '_' + pcr.ColumnId;
                negativeDivPercentBar.style.width = percentageNegativeValue + '%';
                if (isNegativeValue) {
                    negativeDivPercentBar.style.backgroundColor = pcr.NegativeColor;
                }
                eOuterDiv.appendChild(negativeDivPercentBar);
            }

            if (showPositives) {
                let positivePercentBarDiv = document.createElement('div');
                positivePercentBarDiv.className = 'ab_div-colour-render-bar';
                positivePercentBarDiv.id = 'ab_div-colour-positive-bar_' + blotterId + '_' + pcr.ColumnId;
                positivePercentBarDiv.style.width = percentagePositiveValue + '%';
                if (!isNegativeValue) {
                    positivePercentBarDiv.style.backgroundColor = pcr.PositiveColor;
                }
                eOuterDiv.appendChild(positivePercentBarDiv);
            }
            return eOuterDiv;
        }

        return cellRendererFunc;
    }



    export function getCleanValue(value: string): string {
        if (value == null || value == 'null') {
            return null;
        } else if (value == undefined || value == 'undefined') {
            return undefined;
        } else {
            return String(value) || "";
        }
    }

    export function getRenderedValue(percentBars: IPercentBar[], colDef: ColDef, valueToRender: any): any {
        let isRenderedColumn = ArrayExtensions.ContainsItem(percentBars, colDef.field);
        if (isRenderedColumn) {
            return valueToRender;
        }

        let render: any = colDef.cellRenderer
        if (typeof render == "string") {
            return getCleanValue(valueToRender)
        }
        return render({ value: valueToRender }) || "";
    }

    export function safeSetColDefs(colDefs: ColDef[], gridOptions: GridOptions) {
        // bizarrely we need this line otherwise ag-Grid mangles the ColIds (e.g. 'tradeId' becomes 'tradeId_1')
        gridOptions.api.setColumnDefs([])
        gridOptions.api.setColumnDefs(colDefs)
    }

    export function createAdaptableBlotterSideBarDefs(showFilterPanel: boolean, showColumnsPanel: boolean): SideBarDef {
        let toolPanelDef: ToolPanelDef[] = [];

        if (showFilterPanel) {
            let filterToolPanel: ToolPanelDef = {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
            }
            toolPanelDef.push(filterToolPanel);
        }

        if (showColumnsPanel) {
            let columnsToolPanel: ToolPanelDef = {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
            }
            toolPanelDef.push(columnsToolPanel);
        }
        toolPanelDef.push(createAdaptableBlotterToolPanel())

        let abSideBarDef: SideBarDef = {
            toolPanels: toolPanelDef,
            defaultToolPanel: '' // for now we wont show an open (default) tool panel in this scenario - might revisit
        }
        return abSideBarDef;
    }

    export function createAdaptableBlotterToolPanel(): ToolPanelDef {
        return {
            id: 'adaptableBlotterToolPanel',
            labelDefault: 'Adaptable Blotter',
            labelKey: 'adaptableBlotterToolPanel',
            iconKey: 'menu',
            toolPanel: 'adaptableBlotterToolPanel',
        };
    }


}
