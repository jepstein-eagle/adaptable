import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../api/Interface/IAdaptableBlotter';
import { IAlertDefinition } from '../Api/Interface/IAdaptableBlotterObjects';
import { IColumn } from '../Api/Interface/IColumn';
import { ExpressionHelper, IRangeEvaluation } from '../Utilities/Helpers/ExpressionHelper';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';
import { LeafExpressionOperator, StateChangedTrigger } from '../Utilities/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { AlertHelper } from '../Utilities/Helpers/AlertHelper';
import { IDataChangedEvent, IDataChangingEvent } from '../Utilities/Services/Interface/IAuditService';


export class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
    protected AlertState: AlertState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.AlertStrategyId, blotter)
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
    }

    protected InitState() {
        if (this.AlertState != this.blotter.AdaptableBlotterStore.TheStore.getState().Alert) {
            this.AlertState = this.blotter.AdaptableBlotterStore.TheStore.getState().Alert;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Alert, this.AlertState)
            }
        }
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.AlertStrategyName, ScreenPopups.AlertPopup, StrategyConstants.AlertGlyph);
    }

    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        let alertDefinitions: IAlertDefinition[] = this.CheckDataChanged(dataChangedEvent);
        if (ArrayExtensions.IsNotNullOrEmpty(alertDefinitions)) {
            let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            alertDefinitions.forEach(fr => { // might be better to do a single alert with all the messages?
                this.blotter.api.alertShow(ColumnHelper.getFriendlyNameFromColumnId(fr.ColumnId, columns), AlertHelper.createAlertDescription(fr, columns), fr.MessageType, fr.ShowAsPopup)
            })
        }
    }

    public CheckDataChanged(dataChangedEvent: IDataChangedEvent): IAlertDefinition[] {
        let editingRules = this.AlertState.AlertDefinitions.filter(v => v.ColumnId == dataChangedEvent.ColumnId);
        let triggeredAlerts: IAlertDefinition[] = [];
        if (editingRules.length > 0) {
            let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;

            // first check the rules which have expressions
            let expressionRules: IAlertDefinition[] = editingRules.filter(r => ExpressionHelper.IsNotEmptyExpression(r.Expression));

            if (expressionRules.length > 0) {
                for (let expressionRule of expressionRules) {
                    let isSatisfiedExpression: boolean = ExpressionHelper.checkForExpression(expressionRule.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter);
                    if (isSatisfiedExpression && this.IsAlertTriggered(expressionRule, dataChangedEvent, columns)) {
                        triggeredAlerts.push(expressionRule);
                    }
                }
            }

            // now check the rules without expressions//
            let noExpressionRules: IAlertDefinition[] = editingRules.filter(r => ExpressionHelper.IsEmptyExpression(r.Expression));
            for (let noExpressionRule of noExpressionRules) {
                if (this.IsAlertTriggered(noExpressionRule, dataChangedEvent, columns)) {
                    triggeredAlerts.push(noExpressionRule);
                }
            }
        }
        let dataChangingEvent: IDataChangingEvent = { NewValue: dataChangedEvent.NewValue, ColumnId: dataChangedEvent.ColumnId, IdentifierValue: dataChangedEvent.IdentifierValue }
        if (ArrayExtensions.IsNotEmpty(triggeredAlerts)) {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.AlertStrategyId,
                "CheckingAudit",
                "AlertsTriggered",
                { failedRules: triggeredAlerts, DataChangingEvent: dataChangingEvent })
        } else {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.AlertStrategyId,
                "CheckingAudit",
                "Ok",
                { DataChangingEvent: dataChangingEvent })
        }
        return triggeredAlerts;
    }

    private IsAlertTriggered(alert: IAlertDefinition, dataChangedEvent: IDataChangedEvent, columns: IColumn[]): boolean {
        // if its none then alert triggers immediately
        if (alert.Range.Operator == LeafExpressionOperator.None) {
            return true;
        }
        // todo: change the last argument from null as we might want to do evaluation based on other cells...
        let column: IColumn =ColumnHelper.getColumnFromId(dataChangedEvent.ColumnId, columns)
        let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(alert.Range, dataChangedEvent.NewValue, dataChangedEvent.OldValue, column, this.blotter, null)
        return ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.blotter)
    }
}