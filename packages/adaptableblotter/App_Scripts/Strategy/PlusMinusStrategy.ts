import { PlusMinusState } from '../Redux/ActionsReducers/Interface/IState';
import { IPlusMinusStrategy } from './Interface/IPlusMinusStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as Redux from 'redux';
import * as PlusMinusRedux from '../Redux/ActionsReducers/PlusMinusRedux';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { DataType } from '../Utilities/Enums';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IColumn } from '../Utilities/Interface/IColumn';
import { Helper } from '../Utilities/Helpers/Helper';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ICellInfo } from '../Utilities/Interface/ICellInfo';
import { ICellValidationRule } from '../Utilities/Interface/BlotterObjects/ICellValidationRule';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { ExpressionHelper } from '../Utilities/Helpers/ExpressionHelper';
import { IDataChangedInfo } from '../Utilities/Interface/IDataChangedInfo';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { CellValidationHelper } from '../Utilities/Helpers/CellValidationHelper';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';

export class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.PlusMinusStrategyId, blotter);
    blotter.onKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent));
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.PlusMinusStrategyName,
      ScreenPopups.PlusMinusPopup,
      StrategyConstants.PlusMinusGlyph
    );
  }

  public addContextMenuItem(column: IColumn): void {
    if (this.canCreateContextMenuItem(column, this.blotter)) {
      if (column && column.DataType == DataType.Number) {
        this.createContextMenuItemShowPopup(
          'Create Plus/Minus Rule',
          ScreenPopups.PlusMinusPopup,
          StrategyConstants.PlusMinusGlyph,
          'New|' + column.ColumnId
        );
      }
    }
  }

  private handleKeyDown(keyEvent: KeyboardEvent | any) {
    //it's a speacial key so we handle the string representation of the key '
    let keyEventString: string = Helper.getStringRepresentionFromKey(keyEvent);
    if (keyEventString == '-' || keyEventString == '+') {
      let plusMinusRules = this.blotter.api.plusMinusApi.getAllPlusMinus();

      if (ArrayExtensions.IsNotNullOrEmpty(plusMinusRules)) {
        let successfulValues: ICellInfo[] = [];
        let side = 1;
        if (Helper.getStringRepresentionFromKey(keyEvent) == '-') {
          side = -1;
        }

        let columns: IColumn[] = this.blotter.api.gridApi.getColumns();
        let selectedCellInfo: ISelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();

        let failedPreventEdits: ICellValidationRule[] = [];
        let failedWarningEdits: ICellValidationRule[] = [];
        let warningValues: ICellInfo[] = [];

        for (var keyValuePair of selectedCellInfo.Selection) {
          for (var selectedCell of keyValuePair[1]) {
            let selectedColumn: IColumn = ColumnHelper.getColumnFromId(
              selectedCell.columnId,
              this.blotter.api.gridApi.getColumns()
            );
            if (selectedColumn.DataType == DataType.Number && !selectedColumn.ReadOnly) {
              //for aggrid as we are getting strings sometimes
              if (typeof selectedCell.value != 'number') {
                selectedCell.value = parseFloat(selectedCell.value);
              }
              let newValue: ICellInfo;
              //we try to find a condition with an expression for that column that matches the record
              let columnNudgesWithExpression = plusMinusRules.filter(
                x => x.ColumnId == selectedCell.columnId && !x.IsDefaultNudge
              );
              for (let columnNudge of columnNudgesWithExpression) {
                if (
                  ExpressionHelper.checkForExpression(
                    columnNudge.Expression,
                    keyValuePair[0],
                    columns,
                    this.blotter
                  )
                ) {
                  newValue = {
                    Id: keyValuePair[0],
                    ColumnId: selectedCell.columnId,
                    Value: selectedCell.value + columnNudge.NudgeValue * side,
                  };
                }
              }
              //we havent found any Condition with an Expression so we look for a general one for the column
              if (!newValue) {
                let columnNudge = plusMinusRules.find(
                  x => x.ColumnId == selectedCell.columnId && x.IsDefaultNudge
                );
                if (columnNudge) {
                  newValue = {
                    Id: keyValuePair[0],
                    ColumnId: selectedCell.columnId,
                    Value: selectedCell.value + columnNudge.NudgeValue * side,
                  };
                }
                //we havent found a condition so we return - this will allow a minus to be entered into the column
                else {
                  return;
                }
              }

              //avoid the 0.0000000000x
              newValue.Value = parseFloat(newValue.Value.toFixed(12));

              let dataChangedEvent: IDataChangedInfo = {
                OldValue: Number(selectedCell.value),
                NewValue: newValue.Value,
                ColumnId: selectedCell.columnId,
                IdentifierValue: keyValuePair[0],
                Record: null,
              };

              let validationRules: ICellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(
                dataChangedEvent
              );

              if (validationRules.length > 0) {
                if (validationRules[0].ActionMode == 'Stop Edit') {
                  failedPreventEdits.push(validationRules[0]);
                } else {
                  failedWarningEdits.push(validationRules[0]);
                  warningValues.push(newValue);
                }
              } else {
                successfulValues.push(newValue);
              }

              //Jo : I've added this for agGrid. Shouldnt cause harm and I even think it should have been there since the beginning
              keyEvent.preventDefault();
            }
          }
        }

        // first inform if any failed with prevent
        this.ShowErrorPreventMessage(failedPreventEdits);
        if (failedWarningEdits.length > 0) {
          this.ShowWarningMessages(
            failedWarningEdits,
            warningValues,
            successfulValues,
            keyEventString
          );
        } else {
          this.ApplyPlusMinus(keyEventString, successfulValues);
        }
      }
    }
  }

  private ShowErrorPreventMessage(failedRules: ICellValidationRule[]): void {
    if (failedRules.length > 0) {
      let failedMessages: string[] = [];
      failedRules.forEach(fr => {
        let failedMessage: string =
          ObjectFactory.CreateCellValidationMessage(fr, this.blotter) + '\n';
        let existingMessage = failedMessages.find(f => f == failedMessage);
        if (existingMessage == null) {
          failedMessages.push(failedMessage);
        }
      });
      this.blotter.api.alertApi.showAlertError(
        'Nudge(s) failed rule',
        failedMessages.toString(),
        true
      );
    }
  }

  private ShowWarningMessages(
    failedRules: ICellValidationRule[],
    warningValues: ICellInfo[],
    successfulValues: ICellInfo[],
    keyEventString: string
  ): void {
    if (failedRules.length > 0) {
      let allValues = warningValues.concat(...successfulValues);

      let warningMessages: string[] = [];
      failedRules.forEach(fr => {
        let warningMessage: string =
          ObjectFactory.CreateCellValidationMessage(fr, this.blotter) + '\n';
        let existingMessage = warningMessages.find(w => w == warningMessage);
        if (existingMessage == null) {
          warningMessages.push(warningMessage);
        }
      });
      let warningMessage: string =
        failedRules.length + ' Nudge(s) failed rule:\n' + warningMessages.toString();

      let confirmAction: Redux.Action = PlusMinusRedux.PlusMinusApply(allValues, keyEventString);
      let cancelAction: Redux.Action = PlusMinusRedux.PlusMinusApply(
        successfulValues,
        keyEventString
      );
      let confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
        confirmAction,
        cancelAction,
        warningMessage
      );
      this.blotter.api.internalApi.PopupShowConfirmation(confirmation);
    }
  }

  public ApplyPlusMinus(keyEventString: string, successfulValues: ICellInfo[]): void {
    if (successfulValues.length > 0) {
      this.blotter.setValueBatch(successfulValues);
    }
  }

  protected GetPlusMinusState(): PlusMinusState {
    return this.blotter.api.plusMinusApi.getPlusMinusState();
  }
}
