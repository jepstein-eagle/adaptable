import * as Redux from 'redux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { IValidationService } from './Interface/IValidationService';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { ActionMode, MessageType, CellValueType } from '../../PredefinedConfig/Common/Enums';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import {
  CellValidationState,
  CellValidationRule,
} from '../../PredefinedConfig/CellValidationState';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import { FunctionAppliedDetails } from '../../Api/Events/AuditEvents';
import { IUIConfirmation } from '../Interface/IMessage';
import { ValidationResult } from '../../AdaptableOptions/EditOptions';
import StringExtensions from '../Extensions/StringExtensions';
import { AdaptableFunctionName, Scope } from '../../types';
import * as parser from '../../parser/src';

export class ValidationService implements IValidationService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  // Not sure where to put this: was in the strategy but might be better here until I can work out a way of having an event with a callback...
  public GetValidationRulesForDataChange(dataChangedInfo: DataChangedInfo): CellValidationRule[] {
    let failedWarningRules: CellValidationRule[] = [];

    // if the new value is the same as the old value then we can get out as we dont see it as an edit?
    if (dataChangedInfo.OldValue == dataChangedInfo.NewValue) {
      return failedWarningRules;
    }

    // first check that if primary key change, the new value is unique
    if (dataChangedInfo.ColumnId == this.adaptable.adaptableOptions.primaryKey) {
      if (this.adaptable.adaptableOptions.generalOptions!.preventDuplicatePrimaryKeyValues) {
        if (dataChangedInfo.OldValue != dataChangedInfo.NewValue) {
          let distinctValues: any[] = this.adaptable.api.columnApi.getDistinctDisplayValuesForColumn(
            dataChangedInfo.ColumnId
          );
          let existingItem = distinctValues.find(dv => dv == dataChangedInfo.NewValue);
          if (existingItem) {
            let scope: Scope = {
              ColumnIds: [dataChangedInfo.ColumnId],
            };
            let cellValidationRule: CellValidationRule = ObjectFactory.CreateCellValidationRule(
              scope,
              { PredicateId: 'PrimaryKeyDuplicate' },
              ActionMode.StopEdit
            );
            failedWarningRules.push(cellValidationRule);
          }
        }
      }
    }

    let editingRules = this.GetCellValidationState().CellValidations.filter(v =>
      this.adaptable.api.scopeApi.isColumnInScope(
        this.adaptable.api.columnApi.getColumnFromId(dataChangedInfo.ColumnId),
        v.Scope
      )
    );

    if (ArrayExtensions.IsEmpty(failedWarningRules) && ArrayExtensions.IsNotEmpty(editingRules)) {
      // first check the rules which have expressions
      let expressionRules: CellValidationRule[] = editingRules.filter(
        r =>
          StringExtensions.IsNotNullOrEmpty(r.Expression) ||
          StringExtensions.IsNotNullOrEmpty(r.SharedQueryId)
      );

      if (expressionRules.length > 0) {
        // loop through all rules with an expression (checking the prevent rules first)
        // if the expression is satisfied check if validation rule passes; if it fails then return immediately (if its prevent) or put the rule in return array (if its warning).
        // if expression isnt satisfied then we can ignore the rule but it means that we need subsequently to check all the rules with no expressions
        for (let expressionRule of expressionRules) {
          let expression = this.adaptable.api.queryApi.QueryObjectToString(expressionRule);

          let isSatisfiedExpression: boolean =
            dataChangedInfo.RowNode != null &&
            parser.evaluate(expression, {
              node: dataChangedInfo.RowNode,
              api: this.adaptable.api,
            });
          if (
            isSatisfiedExpression &&
            this.IsCellValidationRuleBroken(expressionRule, dataChangedInfo)
          ) {
            // if we fail then get out if its prevent and keep the rule and stop looping if its warning...
            if (expressionRule.ActionMode == 'Stop Edit') {
              this.logAuditValidationEvent(
                StrategyConstants.CellValidationStrategyId,
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
      let noExpressionRules: CellValidationRule[] = editingRules.filter(
        r =>
          StringExtensions.IsNullOrEmpty(r.Expression) &&
          StringExtensions.IsNullOrEmpty(r.SharedQueryId)
      );
      for (let noExpressionRule of noExpressionRules) {
        if (this.IsCellValidationRuleBroken(noExpressionRule, dataChangedInfo)) {
          if (noExpressionRule.ActionMode == 'Stop Edit') {
            this.logAuditValidationEvent(
              StrategyConstants.CellValidationStrategyId,
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
        StrategyConstants.CellValidationStrategyId,
        'Validating Cell Edit',
        'Warning Shown',
        {
          Warnings: failedWarningRules,
          DataChangingEvent: dataChangedInfo,
        }
      );
    } else {
      this.logAuditValidationEvent(
        StrategyConstants.CellValidationStrategyId,
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
    const failedRules: CellValidationRule[] = this.adaptable.ValidationService.GetValidationRulesForDataChange(
      dataChangedInfo
    );
    if (failedRules.length > 0) {
      // first see if its an error = should only be one item in array if so
      if (failedRules[0].ActionMode == 'Stop Edit') {
        const errorMessage: string = this.CreateCellValidationMessage(failedRules[0]);
        this.adaptable.api.alertApi.showAlertError('Validation Error', errorMessage);
        return false;
      }
      let warningMessage: string = '';
      failedRules.forEach(f => {
        warningMessage = `${warningMessage + this.CreateCellValidationMessage(f)}\n`;
      });
      const confirmAction: Redux.Action = GridRedux.GridSetValueLikeEdit(dataChangedInfo);
      const cancelAction: Redux.Action = null;
      const confirmation: IUIConfirmation = this.createCellValidationUIConfirmation(
        confirmAction,
        cancelAction,
        warningMessage
      );

      this.adaptable.api.internalApi.showPopupConfirmation(confirmation);
      // we prevent the save and depending on the user choice we will set the value to the edited value in the middleware
      return false;
    }
    return true;
  }

  private IsCellValidationRuleBroken(
    cellValidationRule: CellValidationRule,
    dataChangedEvent: DataChangedInfo
  ): boolean {
    const column: AdaptableColumn = this.adaptable.api.columnApi.getColumnFromId(
      dataChangedEvent.ColumnId
    );

    return this.adaptable.api.predicateApi.handlePredicate(
      cellValidationRule.Predicate,
      {
        value: dataChangedEvent.NewValue,
        oldValue: dataChangedEvent.OldValue,
        displayValue: this.adaptable.getValueFromRowNode(
          dataChangedEvent.RowNode,
          dataChangedEvent.ColumnId,
          CellValueType.DisplayValue
        ),
        node: dataChangedEvent.RowNode,
        column,
      },
      false
    );
  }

  private GetCellValidationState(): CellValidationState {
    return this.adaptable.api.cellValidationApi.getCellValidationState();
  }

  private logAuditValidationEvent(
    name: AdaptableFunctionName,
    action: string,
    info: string,
    data?: any
  ): void {
    if (this.adaptable.AuditLogService.isAuditFunctionEventsEnabled) {
      let functionAppliedDetails: FunctionAppliedDetails = {
        name: name,
        action: action,
        info: info,
        data: data,
      };
      this.adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
    }
  }

  public PerformServerValidation(
    dataChangedInfo: DataChangedInfo,
    config: { onServerValidationCompleted: () => void }
  ) {
    return (): boolean => {
      this.adaptable.adaptableOptions.editOptions
        .validateOnServer(dataChangedInfo)
        .then((validationResult: ValidationResult) => {
          if (validationResult.NewValue === undefined) {
            validationResult.NewValue = dataChangedInfo.NewValue;
          }
          // If they have changed the return value then we should update the grid, log the function change
          // otherwise the value will persist
          if (validationResult.NewValue !== dataChangedInfo.NewValue) {
            dataChangedInfo.NewValue = validationResult.NewValue;
            this.adaptable.setValue(dataChangedInfo, false);

            this.logAuditValidationEvent(
              StrategyConstants.CellValidationStrategyId,
              'Validating Cell Edit on Server',
              validationResult.ValidationMessage,
              {
                DataChangingEvent: dataChangedInfo,
              }
            );
            if (
              StringExtensions.IsNotNullOrEmpty(validationResult.ValidationMessage) &&
              this.adaptable.adaptableOptions.editOptions.displayServerValidationMessages
            ) {
              this.adaptable.api.alertApi.showAlertInfo(
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

  public createCellValidationDescription(cellValidationRule: CellValidationRule): string {
    return (
      this.adaptable.api.scopeApi.getScopeDescription(cellValidationRule.Scope) +
      ' ' +
      this.adaptable.api.predicateApi.predicateToString(cellValidationRule.Predicate)
    );
  }

  public createCellValidationUIConfirmation(
    confirmAction: Redux.Action,
    cancelAction: Redux.Action,
    warningMessage: string = 'Do you want to continue?'
  ): IUIConfirmation {
    return {
      CancelButtonText: 'Cancel Edit',
      Header: 'Cell Validation Failed',
      Msg: warningMessage,
      ConfirmButtonText: 'Bypass Rule',
      CancelAction: cancelAction,
      ConfirmAction: confirmAction,
      ShowInputBox: true,
      MessageType: MessageType.Warning,
    };
  }

  public CreateCellValidationMessage(cellValidation: CellValidationRule): string {
    let returnMessage: string = this.createCellValidationDescription(cellValidation);
    let expressionDescription: string = this.adaptable.api.queryApi.QueryObjectToString(
      cellValidation
    );
    if (expressionDescription) {
      returnMessage += ' when ' + expressionDescription;
    }
    return returnMessage;
  }
}
