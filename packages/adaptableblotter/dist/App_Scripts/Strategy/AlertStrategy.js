"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ExpressionHelper_1 = require("../Core/Helpers/ExpressionHelper");
const Enums_1 = require("../Core/Enums");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
const ColumnHelper_1 = require("../Core/Helpers/ColumnHelper");
const AlertHelper_1 = require("../Core/Helpers/AlertHelper");
class AlertStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.AlertStrategyId, blotter);
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
    }
    InitState() {
        if (this.AlertState != this.blotter.AdaptableBlotterStore.TheStore.getState().Alert) {
            this.AlertState = this.blotter.AdaptableBlotterStore.TheStore.getState().Alert;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Alert, this.AlertState);
            }
        }
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.AlertStrategyName, ScreenPopups.AlertPopup, StrategyIds.AlertGlyph);
    }
    handleDataSourceChanged(dataChangedEvent) {
        let alertDefinitions = this.CheckDataChanged(dataChangedEvent);
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            alertDefinitions.forEach(fr => {
                this.blotter.api.alertShow(ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(fr.ColumnId, columns), AlertHelper_1.AlertHelper.createAlertDescription(fr, columns), fr.MessageType, fr.ShowAsPopup);
            });
        }
    }
    CheckDataChanged(dataChangedEvent) {
        let editingRules = this.AlertState.AlertDefinitions.filter(v => v.ColumnId == dataChangedEvent.ColumnId);
        let triggeredAlerts = [];
        if (editingRules.length > 0) {
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            // first check the rules which have expressions
            let expressionRules = editingRules.filter(r => ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(r.Expression));
            if (expressionRules.length > 0) {
                for (let expressionRule of expressionRules) {
                    let isSatisfiedExpression = ExpressionHelper_1.ExpressionHelper.checkForExpression(expressionRule.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter);
                    if (isSatisfiedExpression && this.IsAlertTriggered(expressionRule, dataChangedEvent, columns)) {
                        triggeredAlerts.push(expressionRule);
                    }
                }
            }
            // now check the rules without expressions//
            let noExpressionRules = editingRules.filter(r => ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(r.Expression));
            for (let noExpressionRule of noExpressionRules) {
                if (this.IsAlertTriggered(noExpressionRule, dataChangedEvent, columns)) {
                    triggeredAlerts.push(noExpressionRule);
                }
            }
        }
        let dataChangingEvent = { NewValue: dataChangedEvent.NewValue, ColumnId: dataChangedEvent.ColumnId, IdentifierValue: dataChangedEvent.IdentifierValue };
        if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(triggeredAlerts)) {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.AlertStrategyId, "CheckingAudit", "AlertsTriggered", { failedRules: triggeredAlerts, DataChangingEvent: dataChangingEvent });
        }
        else {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.AlertStrategyId, "CheckingAudit", "Ok", { DataChangingEvent: dataChangingEvent });
        }
        return triggeredAlerts;
    }
    IsAlertTriggered(alert, dataChangedEvent, columns) {
        // if its none then alert triggers immediately
        if (alert.Range.Operator == Enums_1.LeafExpressionOperator.None) {
            return true;
        }
        // todo: change the last argument from null as we might want to do evaluation based on other cells...
        let rangeEvaluation = ExpressionHelper_1.ExpressionHelper.GetRangeEvaluation(alert.Range, dataChangedEvent.NewValue, dataChangedEvent.OldValue, columns.find(c => c.ColumnId == dataChangedEvent.ColumnId), this.blotter, null);
        return ExpressionHelper_1.ExpressionHelper.TestRangeEvaluation(rangeEvaluation);
    }
}
exports.AlertStrategy = AlertStrategy;
