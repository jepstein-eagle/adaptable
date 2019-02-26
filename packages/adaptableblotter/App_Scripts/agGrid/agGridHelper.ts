import { ICellRendererFunc, ICellRendererParams, ColDef, GridOptions, SideBarDef, ToolPanelDef } from "ag-grid-community";
import { StringExtensions } from "../Utilities/Extensions/StringExtensions";
import { IPercentBar } from "../Utilities/Interface/BlotterObjects/IPercentBar";
import { ArrayExtensions } from "../Utilities/Extensions/ArrayExtensions";
import { LoggingHelper } from "../Utilities/Helpers/LoggingHelper";
import { LicenceType } from "../Utilities/Enums";

/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy 
 * So lets put some of the more obvious 'Helper' functions here
 */

export module agGridHelper {

    export function CheckLicenceKey(licenceType: LicenceType): void {
        switch (licenceType) {
            case LicenceType.Community:
                let licenceMessage: string = '\n';
                licenceMessage += '***********************************************************************************\n'
                licenceMessage += '************************** Adaptable Blotter License ******************************\n'
                licenceMessage += '********************* This is an evaluation / community licence *******************\n'
                licenceMessage += '************ It contains full functionality but you cannot load state *************\n'
                licenceMessage += '********* Please contact sales@adaptabletools.com for upgrade information *********\n'
                licenceMessage += '***********************************************************************************\n'
                LoggingHelper.LogError(licenceMessage);
                break;

            case LicenceType.Standard:
                LoggingHelper.LogAdaptableBlotterSuccess(" Licence Type: Standard")
                break;
            case LicenceType.Enterprise:
                LoggingHelper.LogAdaptableBlotterSuccess(" Licence Type: Enterprise")
                break;
        }

    }

    export function createCellRendererFunc(pcr: IPercentBar): ICellRendererFunc {
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
                negativeDivBlankBar.style.width = (fullWidth - percentageNegativeValue) + '%';
                eOuterDiv.appendChild(negativeDivBlankBar);

                let negativeDivPercentBar = document.createElement('div');
                negativeDivPercentBar.className = 'ab_div-colour-render-bar';
                negativeDivPercentBar.style.width = percentageNegativeValue + '%';
                if (isNegativeValue) {
                    negativeDivPercentBar.style.backgroundColor = pcr.NegativeColor;
                }
                eOuterDiv.appendChild(negativeDivPercentBar);
            }

            if (showPositives) {
                let positivePercentBarDiv = document.createElement('div');
                positivePercentBarDiv.className = 'ab_div-colour-render-bar';
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



    export function cleanValue(value: string): string {
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
            return agGridHelper.cleanValue(valueToRender)
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
        return{
            id: 'adaptableBlotterToolPanel',
            labelDefault: 'Adaptable Blotter',
            labelKey: 'adaptableBlotterToolPanel',
            iconKey: 'menu',
            toolPanel: 'adaptableBlotterToolPanel',
        };
    }

}
