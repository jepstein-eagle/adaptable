
import { IValidationService } from './Interface/IValidationService';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { ICellValidationRule } from "../Interface/BlotterObjects/ICellValidationRule";
import { ExpressionHelper, IRangeEvaluation } from '../Helpers/ExpressionHelper';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { DistinctCriteriaPairValue, LeafExpressionOperator, RangeOperandType, ActionMode, DisplayAction } from '../Enums';
import { IColumn } from '../Interface/IColumn';
import { CellValidationState } from '../../Redux/ActionsReducers/Interface/IState';
import { IDataChangedInfo } from '../Interface/IDataChangedInfo';

export class ValidationService implements IValidationService {

    constructor(private blotter: IAdaptableBlotter) {
        this.blotter = blotter;
    }

    // Not sure where to put this: was in the strategy but might be better here until I can work out a way of having an event with a callback...
    public ValidateCellChanging(dataChangedEvent: IDataChangedInfo): ICellValidationRule[] {
        let failedWarningRules: ICellValidationRule[] = [];
        // if the new value is the same as the old value then we can get out as we dont see it as an edit?
        if (dataChangedEvent.OldValue == dataChangedEvent.NewValue) {
            return failedWarningRules;
        }

        // first check that if primary key change, the new value is unique
        if (dataChangedEvent.ColumnId == this.blotter.blotterOptions.primaryKey) {
            if (this.blotter.blotterOptions.generalOptions.preventDuplicatePrimaryKeyValues) {
                if (dataChangedEvent.OldValue != dataChangedEvent.NewValue) {
                    let displayValuePair: IRawValueDisplayValuePair[] = this.blotter.getColumnValueDisplayValuePairDistinctList(dataChangedEvent.ColumnId, DistinctCriteriaPairValue.DisplayValue, false)
                    let existingItem = displayValuePair.find(dv => dv.DisplayValue == dataChangedEvent.NewValue);
                    if (existingItem) {
                        let range = ObjectFactory.CreateRange(LeafExpressionOperator.PrimaryKeyDuplicate, dataChangedEvent.ColumnId, null, RangeOperandType.Column, null)
                        let cellValidationRule: ICellValidationRule = ObjectFactory.CreateCellValidationRule(dataChangedEvent.ColumnId, range, ActionMode.StopEdit, ExpressionHelper.CreateEmptyExpression());
                        failedWarningRules.push(cellValidationRule);
                    }
                }
            }
        }

        let editingRules = this.GetCellValidationState().CellValidations.filter(v => v.ColumnId == dataChangedEvent.ColumnId);

        if (ArrayExtensions.IsEmpty(failedWarningRules) && ArrayExtensions.IsNotEmpty(editingRules)) {
            let columns: IColumn[] = this.blotter.api.gridApi.getColumns();

            // first check the rules which have expressions
            let expressionRules: ICellValidationRule[] = editingRules.filter(r => ExpressionHelper.IsNotEmptyExpression(r.Expression));

            if (expressionRules.length > 0) {

                // loop through all rules with an expression (checking the prevent rules first)
                // if the expression is satisfied check if validation rule passes; if it fails then return immediately (if its prevent) or put the rule in return array (if its warning).
                // if expression isnt satisfied then we can ignore the rule but it means that we need subsequently to check all the rules with no expressions
                for (let expressionRule of expressionRules) {
                    let isSatisfiedExpression: boolean = ExpressionHelper.checkForExpression(expressionRule.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter);
                    if (isSatisfiedExpression && this.IsCellValidationRuleBroken(expressionRule, dataChangedEvent, columns)) {
                        // if we fail then get out if its prevent and keep the rule and stop looping if its warning...
                        if (expressionRule.ActionMode == 'Stop Edit') {
                            this.logAuditValidationEvent('Validating Cell Edit', 'Failed', { Errors: [expressionRule], DataChangingEvent: dataChangedEvent })
                            return [expressionRule];
                        } else {
                            failedWarningRules.push(expressionRule);
                        }
                    }
                }
            }

            // now check the rules without expressions
            let noExpressionRules: ICellValidationRule[] = editingRules.filter(r => ExpressionHelper.IsEmptyExpression(r.Expression));
            for (let noExpressionRule of noExpressionRules) {
                if (this.IsCellValidationRuleBroken(noExpressionRule, dataChangedEvent, columns)) {
                    if (noExpressionRule.ActionMode == 'Stop Edit') {
                        this.logAuditValidationEvent('Validating Cell Edit', 'Failed', { Errors: [noExpressionRule], DataChangingEvent: dataChangedEvent })
                        return [noExpressionRule];
                    } else {
                        failedWarningRules.push(noExpressionRule);
                    }
                }
            }
        }
        if (failedWarningRules.length > 0) {
            this.logAuditValidationEvent('Validating Cell Edit', 'Warning Shown', { Warnings: failedWarningRules, DataChangingEvent: dataChangedEvent })
        }
        else {
            this.logAuditValidationEvent('Validating Cell Edit', 'Success', { DataChangingEvent: dataChangedEvent })
        }
        return failedWarningRules;
    }

    // changing this so that it now checks the opposite!
    private IsCellValidationRuleBroken(cellValidationRule: ICellValidationRule, dataChangedEvent: IDataChangedInfo, columns: IColumn[]): boolean {
        // if its none then validation fails immediately
        if (cellValidationRule.Range.Operator == LeafExpressionOperator.None) {
            return true;
        }
        // todo: change the last argument from null as we might want to do evaluation based on other cells...
        let column: IColumn = ColumnHelper.getColumnFromId(dataChangedEvent.ColumnId, columns);
        let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(cellValidationRule.Range, dataChangedEvent.NewValue, dataChangedEvent.OldValue, column, this.blotter, null)
        return ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.blotter)
    }

    private GetCellValidationState(): CellValidationState {
        return this.blotter.api.cellValidationApi.getCellValidationState();
    }

    private logAuditValidationEvent(action: string, info: string, data?: any): void {
        if (this.blotter.AuditLogService.IsAuditFunctionEventsEnabled) {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId,
                action,
                info,
                data)
        }
    }


}
