"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PercentBarRedux = require("../Redux/ActionsReducers/PercentBarRedux");
const ApiBase_1 = require("./ApiBase");
class PercentBarApi extends ApiBase_1.ApiBase {
    // Percent Bars api methods
    GetAll() {
        return this.getState().PercentBar.PercentBars;
    }
    GetByColumn(columnId) {
        let percentBar = this.getState().PercentBar.PercentBars.find(pcb => pcb.ColumnId == columnId);
        return percentBar;
    }
    Add(percentBar) {
        this.dispatchAction(PercentBarRedux.PercentBarAdd(percentBar));
    }
    Create(columnId, minValue, maxValue, positiveColor, negativeColor, showValue) {
        let percentBar = {
            ColumnId: columnId,
            MinValue: minValue,
            MaxValue: maxValue,
            PositiveColor: positiveColor,
            NegativeColor: negativeColor,
            ShowValue: showValue
        };
        this.Add(percentBar);
    }
    EditByIndex(index, percentBar) {
        this.dispatchAction(PercentBarRedux.PercentBarEdit(index, percentBar));
    }
    Edit(percentBar) {
        let index = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.EditByIndex(index, percentBar);
    }
    EditMinValue(minValue, columnId) {
        let percentBar = this.GetByColumn(columnId);
        percentBar.MinValue = minValue;
        let index = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.EditByIndex(index, percentBar);
    }
    EditMaxValue(maxValue, columnId) {
        let percentBar = this.GetByColumn(columnId);
        percentBar.MaxValue = maxValue;
        let index = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.EditByIndex(index, percentBar);
    }
    EditPositiveColor(positiveColor, columnId) {
        let percentBar = this.GetByColumn(columnId);
        percentBar.PositiveColor = positiveColor;
        let index = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.EditByIndex(index, percentBar);
    }
    EditNegativeColor(negativeColor, columnId) {
        let percentBar = this.GetByColumn(columnId);
        percentBar.NegativeColor = negativeColor;
        let index = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.EditByIndex(index, percentBar);
    }
    EditShowValue(showValue, columnId) {
        let percentBar = this.GetByColumn(columnId);
        percentBar.ShowValue = showValue;
        let index = this.GetAll().findIndex(pcb => pcb.ColumnId == percentBar.ColumnId);
        this.EditByIndex(index, percentBar);
    }
    Delete(columnId) {
        let index = this.GetAll().findIndex(pcb => pcb.ColumnId == columnId);
        this.dispatchAction(PercentBarRedux.PercentBarDelete(index));
    }
}
exports.PercentBarApi = PercentBarApi;
