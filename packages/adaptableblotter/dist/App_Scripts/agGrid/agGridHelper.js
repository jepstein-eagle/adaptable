"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringExtensions_1 = require("../Utilities/Extensions/StringExtensions");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const LoggingHelper_1 = require("../Utilities/Helpers/LoggingHelper");
const Enums_1 = require("../Utilities/Enums");
/**
 * AdaptableBlotter ag-Grid implementation is getting really big and unwieldy
 * So lets put some of the more obvious 'Helper' functions here
 */
var agGridHelper;
(function (agGridHelper) {
    function CheckLicenceKey(licenceType) {
        if (licenceType == Enums_1.LicenceType.Community) {
            let licenceMessage = '\n';
            licenceMessage += '***********************************************************************************\n';
            licenceMessage += '********************* Adaptable Blotter Enterprise License ************************\n';
            licenceMessage += '**************** This licence is an evaluation / community licence ****************\n';
            licenceMessage += '************ It contains full functionality but you cannot load state *************\n';
            licenceMessage += '********* Please contact sales@adaptabletools.com for upgrade information *********\n';
            licenceMessage += '***********************************************************************************\n';
            LoggingHelper_1.LoggingHelper.LogError(licenceMessage);
        }
    }
    agGridHelper.CheckLicenceKey = CheckLicenceKey;
    function createCellRendererFunc(pcr) {
        let showNegatives = pcr.MinValue < 0;
        let showPositives = pcr.MaxValue > 0;
        let cellRendererFunc = (params) => {
            let isNegativeValue = params.value < 0;
            let value = params.value;
            let maxValue = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(pcr.MaxValueColumnId) ?
                this.getRawValueFromRecord(params.node, pcr.MaxValueColumnId) :
                pcr.MaxValue;
            let minValue = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(pcr.MinValueColumnId) ?
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
                    showValueBar.style.paddingLeft = (isNegativeValue) ? '50%' : '20%';
                }
                else {
                    showValueBar.style.paddingLeft = '5px';
                }
                showValueBar.innerHTML = params.value;
                eOuterDiv.appendChild(showValueBar);
            }
            if (showNegatives) {
                let fullWidth = (showPositives) ? 50 : 100;
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
        };
        return cellRendererFunc;
    }
    agGridHelper.createCellRendererFunc = createCellRendererFunc;
    function cleanValue(value) {
        if (value == null || value == 'null') {
            return null;
        }
        else if (value == undefined || value == 'undefined') {
            return undefined;
        }
        else {
            return String(value) || "";
        }
    }
    agGridHelper.cleanValue = cleanValue;
    function getRenderedValue(percentBars, colDef, valueToRender) {
        let isRenderedColumn = ArrayExtensions_1.ArrayExtensions.ContainsItem(percentBars, colDef.field);
        if (isRenderedColumn) {
            return valueToRender;
        }
        let render = colDef.cellRenderer;
        if (typeof render == "string") {
            return agGridHelper.cleanValue(valueToRender);
        }
        return render({ value: valueToRender }) || "";
    }
    agGridHelper.getRenderedValue = getRenderedValue;
    function safeSetColDefs(colDefs, gridOptions) {
        // bizarrely we need this line otherwise ag-Grid mangles the ColIds (e.g. 'tradeId' becomes 'tradeId_1')
        gridOptions.api.setColumnDefs([]);
        gridOptions.api.setColumnDefs(colDefs);
    }
    agGridHelper.safeSetColDefs = safeSetColDefs;
})(agGridHelper = exports.agGridHelper || (exports.agGridHelper = {}));
