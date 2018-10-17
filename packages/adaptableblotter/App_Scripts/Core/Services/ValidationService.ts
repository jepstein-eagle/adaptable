
import { IDataChangingEvent } from './Interface/IAuditService';
import { IValidationService } from './Interface/IValidationService';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { LeafExpressionOperator, DistinctCriteriaPairValue, ActionMode, RangeOperandType } from '../Enums';
import { CellValidationState } from '../../Redux/ActionsReducers/Interface/IState';
import * as StrategyConstants from '../Constants/StrategyConstants'
import { IColumn } from '../Interface/IColumn';
import { ICellValidationRule } from '../Api/Interface/IAdaptableBlotterObjects';
import { ExpressionHelper, IRangeEvaluation } from '../Helpers/ExpressionHelper';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ObjectFactory } from '../ObjectFactory';

export class ValidationService implements IValidationService {

    constructor(private blotter: IAdaptableBlotter) {
    }

    // Not sure where to put this: was in the strategy but might be better here until I can work out a way of having an event with a callback...
    public ValidateCellChanging(dataChangedEvent: IDataChangingEvent): ICellValidationRule[] {
        let failedWarningRules: ICellValidationRule[] = [];
        // first check that if primary key change, the new value is unique
        if (dataChangedEvent.ColumnId == this.blotter.BlotterOptions.primaryKey) {
            let displayValuePair: IRawValueDisplayValuePair[] = this.blotter.getColumnValueDisplayValuePairDistinctList(dataChangedEvent.ColumnId, DistinctCriteriaPairValue.DisplayValue)
            let existingItem = displayValuePair.find(dv => dv.DisplayValue == dataChangedEvent.NewValue);
            if (existingItem) {
                let range = ObjectFactory.CreateRange(LeafExpressionOperator.PrimaryKeyDuplicate, dataChangedEvent.ColumnId, null, RangeOperandType.Column, null)
                let cellValidationRule: ICellValidationRule = ObjectFactory.CreateCellValidationRule(dataChangedEvent.ColumnId, range, ActionMode.StopEdit, ExpressionHelper.CreateEmptyExpression());
                failedWarningRules.push(cellValidationRule);
            }
        }

        let editingRules = this.GetCellValidationState().CellValidations.filter(v => v.ColumnId == dataChangedEvent.ColumnId);

        if (ArrayExtensions.IsEmpty(failedWarningRules) && ArrayExtensions.IsNotEmpty(editingRules)) {
            let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;

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
                            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId,
                                "CheckCellChanging",
                                "Failed",
                                { failedRules: [expressionRule], DataChangingEvent: dataChangedEvent })
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
                        this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId,
                            "CheckCellChanging",
                            "Failed",
                            { failedRules: [noExpressionRule], DataChangingEvent: dataChangedEvent })
                        return [noExpressionRule];
                    } else {
                        failedWarningRules.push(noExpressionRule);
                    }
                }
            }
        }
        if (failedWarningRules.length > 0) {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId,
                "CheckCellChanging",
                "Warning",
                { failedRules: failedWarningRules, DataChangingEvent: dataChangedEvent })
        }
        else {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(StrategyConstants.CellValidationStrategyId,
                "CheckCellChanging",
                "Ok",
                { DataChangingEvent: dataChangedEvent })
        }
        return failedWarningRules;
    }

    // changing this so that it now checks the opposite!
    private IsCellValidationRuleBroken(cellValidationRule: ICellValidationRule, dataChangedEvent: IDataChangingEvent, columns: IColumn[]): boolean {
        // if its none then validation fails immediately
        if (cellValidationRule.Range.Operator == LeafExpressionOperator.None) {
            return true;
        }
        // todo: change the last argument from null as we might want to do evaluation based on other cells...
        let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(cellValidationRule.Range, dataChangedEvent.NewValue, this.blotter.AuditService.getExistingDataValue(dataChangedEvent), columns.find(c => c.ColumnId == dataChangedEvent.ColumnId), this.blotter, null)
        return ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.blotter)
    }

    private GetCellValidationState(): CellValidationState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation;
    }


}
