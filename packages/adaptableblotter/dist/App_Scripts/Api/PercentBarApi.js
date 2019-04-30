"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PercentBarRedux = require("../Redux/ActionsReducers/PercentBarRedux");
const ApiBase_1 = require("./ApiBase");
class PercentBarApi extends ApiBase_1.ApiBase {
    getPercentBarState() {
        return this.getBlotterState().PercentBar;
    }
    getAllPercentBar() {
        return this.getBlotterState().PercentBar.PercentBars;
    }
    getPercentBarByColumn(columnId) {
        let percentBar = this.getBlotterState().PercentBar.PercentBars.find(pcb => pcb.ColumnId == columnId);
        return percentBar;
    }
    addPercentBar(percentBar) {
        this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar));
    }
    createPercentBar(columnId, minValue, maxValue, positiveColor, negativeColor, showValue) {
        let percentBar = {
            ColumnId: columnId,
            MinValue: minValue,
            MaxValue: maxValue,
            PositiveColor: positiveColor,
            NegativeColor: negativeColor,
            ShowValue: showValue
        };
        this.addPercentBar(percentBar);
    }
    editPercentBarByIndex(index, percentBar) {
        this.dispatchAction(PercentBarRedux.PercentBarEdit(index, percentBar));
    }
    editPercentBar(percentBar) {
        let index = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.editPercentBarByIndex(index, percentBar);
    }
    editPercentBarMinValue(minValue, columnId) {
        let percentBar = this.getPercentBarByColumn(columnId);
        percentBar.MinValue = minValue;
        let index = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.editPercentBarByIndex(index, percentBar);
    }
    editPercentBarMaxValue(maxValue, columnId) {
        let percentBar = this.getPercentBarByColumn(columnId);
        percentBar.MaxValue = maxValue;
        let index = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.editPercentBarByIndex(index, percentBar);
    }
    editPercentBarPositiveColor(positiveColor, columnId) {
        let percentBar = this.getPercentBarByColumn(columnId);
        percentBar.PositiveColor = positiveColor;
        let index = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.editPercentBarByIndex(index, percentBar);
    }
    editPercentBarNegativeColor(negativeColor, columnId) {
        let percentBar = this.getPercentBarByColumn(columnId);
        percentBar.NegativeColor = negativeColor;
        let index = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.editPercentBarByIndex(index, percentBar);
    }
    editPercentBarShowValue(showValue, columnId) {
        let percentBar = this.getPercentBarByColumn(columnId);
        percentBar.ShowValue = showValue;
        let index = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.editPercentBarByIndex(index, percentBar);
    }
    deletePercentBar(columnId) {
        let index = this.getAllPercentBar().findIndex(pcb => pcb.ColumnId == columnId);
        this.dispatchAction(PercentBarRedux.PercentBarDelete(index));
    }
}
exports.PercentBarApi = PercentBarApi;
