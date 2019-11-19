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
import { DataChangedInfo } from '../../BlotterOptions/CommonObjects/DataChangedInfo';
import { FunctionAppliedDetails } from '../../Api/Events/AuditEvents';
import { IUIConfirmation, AdaptableAlert } from '../Interface/IMessage';
import CellValidationHelper from '../Helpers/CellValidationHelper';
import { ValidationResult } from '../../BlotterOptions/EditOptions';
import LoggingHelper from '../Helpers/LoggingHelper';
import { GridCell } from '../Interface/Selection/GridCell';
import StringExtensions from '../Extensions/StringExtensions';

export class ValidationService implements IValidationService {
  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  // Not sure where to put this: was in the strategy but might be better here until I can work out a way of having an event with a callback...
  public GetValidationRulesForDataChange(dataChangedInfo: DataChangedInfo): CellValidationRule[] {
    let failedWarningRules: CellValidationRule[] = [];
    // if the new value is the same as the old value then we can get out as we dont see it as an edit?
    if (dataChangedInfo.OldValue == dataChangedInfo.NewValue) {
      return failedWarningRules;
    }

    // first check that if primary key change, the new value is unique
    if (dataChangedInfo.ColumnId == this.blotter.blotterOptions.primaryKey) {
      if (this.blotter.blotterOptions.generalOptions!.preventDuplicatePrimaryKeyValues) {
        if (dataChangedInfo.OldValue != dataChangedInfo.NewValue) {
          let displayValuePair: IRawValueDisplayValuePair[] = this.blotter.getColumnValueDisplayValuePairDistinctList(
            dataChangedInfo.ColumnId,
            DistinctCriteriaPairValue.DisplayValue,
            false
          );
          let existingItem = displayValuePair.find(
            dv => dv.DisplayValue == dataChangedInfo.NewValue
          );
          if (existingItem) {
            let range = ObjectFactory.CreateRange(
              LeafExpressionOperator.PrimaryKeyDuplicate,
              dataChangedInfo.ColumnId,
              null,
              RangeOperandType.Column,
              null
            );
            let cellValidationRule: CellValidationRule = ObjectFactory.CreateCellValidationRule(
              dataChangedInfo.ColumnId,
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
      v => v.ColumnId == dataChangedInfo.ColumnId
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
            dataChangedInfo.PrimaryKeyValue,
            columns,
            this.blotter
          );
          if (
            isSatisfiedExpression &&
            this.IsCellValidationRuleBroken(expressionRule, dataChangedInfo, columns)
          ) {
            // if we fail then get out if its prevent and keep the rule and stop looping if its warning...
            if (expressionRule.ActionMode == 'Stop Edit') {
              this.logAuditValidationEvent(
                StrategyConstants.CellValidationStrategyName,
                'Validating Cell Edit',
                'Failed',
                {
                  Errors: [expressionRule],
                  DataChangingEvent: dataChangedInfo,
                }
              );
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
        if (this.IsCellValidationRuleBroken(noExpressionRule, dataChangedInfo, columns)) {
          if (noExpressionRule.ActionMode == 'Stop Edit') {
            this.logAuditValidationEvent(
              StrategyConstants.CellValidationStrategyName,
              'Validating Cell Edit',
              'Failed',
              {
                Errors: [noExpressionRule],
                DataChangingEvent: dataChangedInfo,
              }
            );
            return [noExpressionRule];
          } else {
            failedWarningRules.push(noExpressionRule);
          }
        }
      }
    }
    if (failedWarningRules.length > 0) {
      this.logAuditValidationEvent(
        StrategyConstants.CellValidationStrategyName,
        'Validating Cell Edit',
        'Warning Shown',
        {
          Warnings: failedWarningRules,
          DataChangingEvent: dataChangedInfo,
        }
      );
    } else {
      this.logAuditValidationEvent(
        StrategyConstants.CellValidationStrategyName,
        'Validating Cell Edit',
        'Success',
        {
          DataChangingEvent: dataChangedInfo,
        }
      );
    }
    return failedWarningRules;
  }

  public PerformCellValidation(dataChangedInfo: DataChangedInfo): boolean {
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
      return false;
    }
    return true;
  }

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

  private logAuditValidationEvent(name: string, action: string, info: string, data?: any): void {
    if (this.blotter.AuditLogService.isAuditFunctionEventsEnabled) {
      let functionAppliedDetails: FunctionAppliedDetails = {
        name: name,
        action: action,
        info: info,
        data: data,
      };
      this.blotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
    }
  }

  public PerformServerValidation(
    dataChangedInfo: DataChangedInfo,
    config: { onServerValidationCompleted: () => void }
  ) {
    return (): boolean => {
      this.blotter.blotterOptions.editOptions
        .validateOnServer(dataChangedInfo)
        .then((validationResult: ValidationResult) => {
          if (validationResult.NewValue === undefined) {
            validationResult.NewValue = dataChangedInfo.NewValue;
          }
          // If they have changed the return value then we should update the grid, log the function change
          // otherwise the value will persist
          if (validationResult.NewValue !== dataChangedInfo.NewValue) {
            dataChangedInfo.NewValue = validationResult.NewValue;
            this.blotter.setValue(dataChangedInfo);

            this.logAuditValidationEvent(
              'Server Validation',
              'Validating Cell Edit on Server',
              validationResult.ValidationMessage,
              {
                DataChangingEvent: dataChangedInfo,
              }
            );
            if (
              StringExtensions.IsNotNullOrEmpty(validationResult.ValidationMessage) &&
              this.blotter.blotterOptions.editOptions.displayServerValidationMessages
            ) {
              this.blotter.api.alertApi.showAlertInfo(
                'Server Validation Message',
                validationResult.ValidationMessage
              );
            }
          }
          config.onServerValidationCompleted();
        });

      return false;
    };
  }
}
