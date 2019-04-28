"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const ExpressionHelper_1 = require("../Utilities/Helpers/ExpressionHelper");
const Enums_1 = require("../Utilities/Enums");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
const AlertHelper_1 = require("../Utilities/Helpers/AlertHelper");
class AlertStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.AlertStrategyId, blotter);
        this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText));
    }
    InitState() {
        if (this.AlertState != this.blotter.adaptableBlotterStore.TheStore.getState().Alert) {
            this.AlertState = this.blotter.adaptableBlotterStore.TheStore.getState().Alert;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Alert, this.AlertState);
            }
        }
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.AlertStrategyName, ScreenPopups.AlertPopup, StrategyConstants.AlertGlyph);
    }
    handleDataSourceChanged(dataChangedEvent) {
        let alertDefinitions = this.CheckDataChanged(dataChangedEvent);
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
            let columns = this.blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns;
            alertDefinitions.forEach(fr => {
                this.blotter.api.alertApi.Show(ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(fr.ColumnId, columns), AlertHelper_1.AlertHelper.createAlertDescription(fr, columns), fr.MessageType, fr.ShowAsPopup);
            });
        }
    }
    CheckDataChanged(dataChangedEvent) {
        let relatedAlertDefinitions = this.AlertState.AlertDefinitions.filter(v => v.ColumnId == dataChangedEvent.ColumnId);
        let triggeredAlerts = [];
        if (relatedAlertDefinitions.length > 0) {
            let columns = this.blotter.adaptableBlotterStore.TheStore.getState().Grid.Columns;
            // first check the rules which have expressions
            let expressionAlertDefinitions = relatedAlertDefinitions.filter(r => ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(r.Expression));
            if (expressionAlertDefinitions.length > 0) {
                for (let expressionRule of expressionAlertDefinitions) {
                    let isSatisfiedExpression = ExpressionHelper_1.ExpressionHelper.checkForExpression(expressionRule.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter);
                    if (isSatisfiedExpression && this.IsAlertTriggered(expressionRule, dataChangedEvent, columns)) {
                        triggeredAlerts.push(expressionRule);
                    }
                }
            }
            // now check the rules without expressions//
            let noExpressionRules = relatedAlertDefinitions.filter(r => ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(r.Expression));
            for (let noExpressionRule of noExpressionRules) {
                if (this.IsAlertTriggered(noExpressionRule, dataChangedEvent, columns)) {
                    triggeredAlerts.push(noExpressionRule);
                }
            }
            if (ArrayExtensions_1.ArrayExtensions.IsNotEmpty(triggeredAlerts)) {
                if (this.blotter.AuditLogService.IsAuditFunctionEventsEnabled) {
                    this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.AlertStrategyId, "Data Changed", "Alerts Triggered", { TriggeredAlerts: triggeredAlerts, DataChangedEvent: dataChangedEvent });
                }
            }
        }
        return triggeredAlerts;
    }
    IsAlertTriggered(alert, dataChangedEvent, columns) {
        // if its none then alert triggers immediately
        if (alert.Range.Operator == Enums_1.LeafExpressionOperator.None) {
            return true;
        }
        // todo: change the last argument from null as we might want to do evaluation based on other cells...
        let column = ColumnHelper_1.ColumnHelper.getColumnFromId(dataChangedEvent.ColumnId, columns);
        let rangeEvaluation = ExpressionHelper_1.ExpressionHelper.GetRangeEvaluation(alert.Range, dataChangedEvent.NewValue, dataChangedEvent.OldValue, column, this.blotter, null);
        return ExpressionHelper_1.ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.blotter);
    }
}
exports.AlertStrategy = AlertStrategy;
