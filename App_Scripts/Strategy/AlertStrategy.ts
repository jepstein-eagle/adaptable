import { IAlertStrategy } from './Interface/IAlertStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent, IDataChangingEvent } from '../Core/Services/Interface/IAuditService';
import { IAlertDefinition } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { IColumn } from '../Core/Interface/IColumn';
import { ExpressionHelper, IRangeEvaluation } from '../Core/Helpers/ExpressionHelper';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';
import { LeafExpressionOperator } from '../Core/Enums';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import { ColumnHelper } from '../Core/Helpers/ColumnHelper';


export class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
    protected AlertState: AlertState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AlertStrategyId, blotter)
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
    }

    protected InitState() {
        if (this.AlertState != this.blotter.AdaptableBlotterStore.TheStore.getState().Alert) {
            this.AlertState = this.blotter.AdaptableBlotterStore.TheStore.getState().Alert;
        }
    }
    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.AlertStrategyName, ScreenPopups.AlertPopup, StrategyGlyphs.AlertGlyph);
    }

    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        let failedRules: IAlertDefinition[] = this.CheckDataChanged(dataChangedEvent);

        failedRules.forEach(fr => { // might be better to do a single alert with all the messages?
            this.blotter.api.alertShow("Alert for: " + ColumnHelper.getFriendlyNameFromColumnId(fr.ColumnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns), fr.Description, fr.AlertType)
        })
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
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.AlertStrategyId,
                "CheckingAudit",
                "AlertsTriggered",
                { failedRules: triggeredAlerts, DataChangingEvent: dataChangingEvent })
        } else {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyIds.AlertStrategyId,
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
        let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(alert.Range, dataChangedEvent.NewValue, dataChangedEvent.OldValue, columns.find(c => c.ColumnId == dataChangedEvent.ColumnId), this.blotter, null)
        return ExpressionHelper.TestRangeEvaluation(rangeEvaluation)
    }
}