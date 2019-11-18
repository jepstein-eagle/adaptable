import * as Redux from 'redux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { IValidationService } from './Interface/IValidationService';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ExpressionHelper, IRangeEvaluation } from '../Helpers/ExpressionHelper';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import {
  DistinctCriteriaPairValue,
  LeafExpressionOperator,
  RangeOperandType,
  ActionMode,
  DisplayAction,
} from '../../PredefinedConfig/Common/Enums';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import {
  CellValidationState,
  CellValidationRule,
} from '../../PredefinedConfig/CellValidationState';
import { DataChangedInfo } from '../Interface/DataChangedInfo';
import { FunctionAppliedDetails } from '../../Api/Events/AuditEvents';
import { IUIConfirmation } from '../Interface/IMessage';
import CellValidationHelper from '../Helpers/CellValidationHelper';

export class ValidationService implements IValidationService {
  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  // Not sure where to put this: was in the strategy but might be better here until I can work out a way of having an event with a callback...
  public GetValidationRulesForDataChange(dataChangedEvent: DataChangedInfo): CellValidationRule[] {
    let failedWarningRules: CellValidationRule[] = [];
    // if the new value is the same as the old value then we can get out as we dont see it as an edit?
    if (dataChangedEvent.OldValue == dataChangedEvent.NewValue) {
      return failedWarningRules;
    }

    // first check that if primary key change, the new value is unique
    if (dataChangedEvent.ColumnId == this.blotter.blotterOptions.primaryKey) {
      if (this.blotter.blotterOptions.generalOptions!.preventDuplicatePrimaryKeyValues) {
        if (dataChangedEvent.OldValue != dataChangedEvent.NewValue) {
          let displayValuePair: IRawValueDisplayValuePair[] = this.blotter.getColumnValueDisplayValuePairDistinctList(
            dataChangedEvent.ColumnId,
            DistinctCriteriaPairValue.DisplayValue,
            false
          );
          let existingItem = displayValuePair.find(
            dv => dv.DisplayValue == dataChangedEvent.NewValue
          );
          if (existingItem) {
            let range = ObjectFactory.CreateRange(
              LeafExpressionOperator.PrimaryKeyDuplicate,
              dataChangedEvent.ColumnId,
              null,
              RangeOperandType.Column,
              null
            );
            let cellValidationRule: CellValidationRule = ObjectFactory.CreateCellValidationRule(
              dataChangedEvent.ColumnId,
              range,
              ActionMode.StopEdit,
              ExpressionHelper.CreateEmptyExpression()
            );
            failedWarningRules.push(cellValidationRule);
          }
        }
      }
    }

    let editingRules = this.GetCellValidationState().CellValidations.filter(
      v => v.ColumnId == dataChangedEvent.ColumnId
    );

    if (ArrayExtensions.IsEmpty(failedWarningRules) && ArrayExtensions.IsNotEmpty(editingRules)) {
      let columns: AdaptableBlotterColumn[] = this.blotter.api.gridApi.getColumns();

      // first check the rules which have expressions
      let expressionRules: CellValidationRule[] = editingRules.filter(r =>
        ExpressionHelper.IsNotNullOrEmptyExpression(r.Expression)
      );

      if (expressionRules.length > 0) {
        // loop through all rules with an expression (checking the prevent rules first)
        // if the expression is satisfied check if validation rule passes; if it fails then return immediately (if its prevent) or put the rule in return array (if its warning).
        // if expression isnt satisfied then we can ignore the rule but it means that we need subsequently to check all the rules with no expressions
        for (let expressionRule of expressionRules) {
          let isSatisfiedExpression: boolean = ExpressionHelper.checkForExpression(
            expressionRule.Expression,
            dataChangedEvent.IdentifierValue,
            columns,
            this.blotter
          );
          if (
            isSatisfiedExpression &&
            this.IsCellValidationRuleBroken(expressionRule, dataChangedEvent, columns)
          ) {
            // if we fail then get out if its prevent and keep the rule and stop looping if its warning...
            if (expressionRule.ActionMode == 'Stop Edit') {
              this.logAuditValidationEvent('Validating Cell Edit', 'Failed', {
                Errors: [expressionRule],
                DataChangingEvent: dataChangedEvent,
              });
              return [expressionRule];
            } else {
              failedWarningRules.push(expressionRule);
            }
          }
        }
      }

      // now check the rules without expressions
      let noExpressionRules: CellValidationRule[] = editingRules.filter(r =>
        ExpressionHelper.IsNullOrEmptyExpression(r.Expression)
      );
      for (let noExpressionRule of noExpressionRules) {
        if (this.IsCellValidationRuleBroken(noExpressionRule, dataChangedEvent, columns)) {
          if (noExpressionRule.ActionMode == 'Stop Edit') {
            this.logAuditValidationEvent('Validating Cell Edit', 'Failed', {
              Errors: [noExpressionRule],
              DataChangingEvent: dataChangedEvent,
            });
            return [noExpressionRule];
          } else {
            failedWarningRules.push(noExpressionRule);
          }
        }
      }
    }
    if (failedWarningRules.length > 0) {
      this.logAuditValidationEvent('Validating Cell Edit', 'Warning Shown', {
        Warnings: failedWarningRules,
        DataChangingEvent: dataChangedEvent,
      });
    } else {
      this.logAuditValidationEvent('Validating Cell Edit', 'Success', {
        DataChangingEvent: dataChangedEvent,
      });
    }
    return failedWarningRules;
  }

  public ValidateDataChange(dataChangedInfo: DataChangedInfo): boolean {
    const failedRules: CellValidationRule[] = this.blotter.ValidationService.GetValidationRulesForDataChange(
      dataChangedInfo
    );
    if (failedRules.length > 0) {
      // first see if its an error = should only be one item in array if so
      if (failedRules[0].ActionMode == 'Stop Edit') {
        const errorMessage: string = ObjectFactory.CreateCellValidationMessage(
          failedRules[0],
          this.blotter
        );
        this.blotter.api.alertApi.showAlertError('Validation Error', errorMessage);
        return false;
      }
      let warningMessage: string = '';
      failedRules.forEach(f => {
        warningMessage = `${warningMessage +
          ObjectFactory.CreateCellValidationMessage(f, this.blotter)}\n`;
      });
      const confirmAction: Redux.Action = GridRedux.GridSetValueLikeEdit(dataChangedInfo);
      const cancelAction: Redux.Action = null;
      const confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
        confirmAction,
        cancelAction,
        warningMessage
      );

      this.blotter.api.internalApi.showPopupConfirmation(confirmation);
      // we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
      // we need urgently to test that this does all the post edit functionality
      return false;
    }
    return true;
  }

  // changing this so that it now checks the opposite!
  private IsCellValidationRuleBroken(
    cellValidationRule: CellValidationRule,
    dataChangedEvent: DataChangedInfo,
    columns: AdaptableBlotterColumn[]
  ): boolean {
    // if its any change then validation fails immediately
    if (cellValidationRule.Range.Operator == LeafExpressionOperator.AnyChange) {
      return true;
    }
    // todo: change the last argument from null as we might want to do evaluation based on other cells...
    let column: AdaptableBlotterColumn = ColumnHelper.getColumnFromId(
      dataChangedEvent.ColumnId,
      columns
    );
    let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(
      cellValidationRule.Range,
      dataChangedEvent.NewValue,
      dataChangedEvent.OldValue,
      column,
      this.blotter,
      null
    );
    return ExpressionHelper.TestRangeEvaluation(rangeEvaluation, this.blotter);
  }

  private GetCellValidationState(): CellValidationState {
    return this.blotter.api.cellValidationApi.getCellValidationState();
  }

  private logAuditValidationEvent(action: string, info: string, data?: any): void {
    if (this.blotter.AuditLogService.isAuditFunctionEventsEnabled) {
      let functionAppliedDetails: FunctionAppliedDetails = {
        name: StrategyConstants.CellValidationStrategyId,
        action: action,
        info: info,
        data: data,
      };
      this.blotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
    }
  }
}
