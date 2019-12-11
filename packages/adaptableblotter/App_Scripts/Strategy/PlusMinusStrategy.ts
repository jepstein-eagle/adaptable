import { PlusMinusRule } from '../PredefinedConfig/PlusMinusState';
import { IPlusMinusStrategy } from './Interface/IPlusMinusStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as Redux from 'redux';
import * as PlusMinusRedux from '../Redux/ActionsReducers/PlusMinusRedux';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { Helper } from '../Utilities/Helpers/Helper';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { ExpressionHelper } from '../Utilities/Helpers/ExpressionHelper';
import { DataChangedInfo } from '../BlotterOptions/CommonObjects/DataChangedInfo';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { CellValidationRule } from '../PredefinedConfig/CellValidationState';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { AlertProperties } from '../PredefinedConfig/AlertState';

export class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.PlusMinusStrategyId, blotter);

    this.blotter._on('KeyDown', keyDownEvent => {
      this.handleKeyDown(keyDownEvent);
    });
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.PlusMinusStrategyName,
      ComponentName: ScreenPopups.PlusMinusPopup,
      Icon: StrategyConstants.PlusMinusGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      if (column && column.DataType == DataType.Number) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'New',
          source: 'ColumnMenu',
        };
        return this.createColumnMenuItemShowPopup(
          'Create Plus/Minus Rule',
          ScreenPopups.PlusMinusPopup,
          StrategyConstants.PlusMinusGlyph,
          popupParam
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
        let side = 1;
        if (keyEventString == '-') {
          side = -1;
        }
        let selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();

        let isPlusMinusApplicable: boolean = this.applyPlusMinus(
          plusMinusRules,
          selectedCellInfo.GridCells,
          side
        );
        if (isPlusMinusApplicable) {
          keyEvent.preventDefault();
        }
      }
    }
  }

  public applyPlusMinus(
    plusMinusRules: PlusMinusRule[],
    cellsToUpdate: GridCell[],
    side: number
  ): boolean {
    let shouldApplyPlusMinus = false;
    let columns: AdaptableBlotterColumn[] = this.blotter.api.gridApi.getColumns();
    let successfulValues: GridCell[] = [];
    let failedPreventEdits: CellValidationRule[] = [];
    let failedWarningEdits: CellValidationRule[] = [];
    let warningValues: GridCell[] = [];

    cellsToUpdate.forEach((selectedCell: GridCell) => {
      let rulesForColumn: PlusMinusRule[] = plusMinusRules.filter(
        pmr => pmr.ColumnId == selectedCell.columnId
      );

      if (ArrayExtensions.IsNotNullOrEmpty(rulesForColumn)) {
        let selectedColumn: AdaptableBlotterColumn = ColumnHelper.getColumnFromId(
          selectedCell.columnId,
          columns
        );
        if (selectedColumn.DataType == DataType.Number && !selectedColumn.ReadOnly) {
          //for aggrid as we are getting strings sometimes
          if (typeof selectedCell.value != 'number') {
            selectedCell.value = parseFloat(selectedCell.value);
          }
          let newValue: GridCell;
          //we try to find a condition with an expression for that column that matches the record
          let columnNudgesWithExpression = rulesForColumn.filter(x => !x.IsDefaultNudge);
          for (let columnNudge of columnNudgesWithExpression) {
            if (
              ExpressionHelper.checkForExpression(
                columnNudge.Expression,
                selectedCell.primaryKeyValue,
                columns,
                this.blotter
              )
            ) {
              newValue = {
                primaryKeyValue: selectedCell.primaryKeyValue,
                columnId: selectedCell.columnId,
                value: selectedCell.value + columnNudge.NudgeValue * side,
              };
            }
          }
          //we havent found any Condition with an Expression so we look for a general one for the column
          if (!newValue) {
            let columnNudge = rulesForColumn.find(x => x.IsDefaultNudge);
            if (columnNudge) {
              newValue = {
                primaryKeyValue: selectedCell.primaryKeyValue,
                columnId: selectedCell.columnId,
                value: selectedCell.value + columnNudge.NudgeValue * side,
              };
            }
            //we havent found a condition so we return false - this will allow a minus to be entered into the column
            else {
              return false;
            }
          }

          if (newValue) {
            shouldApplyPlusMinus = true;
          }
          //avoid the 0.0000000000x
          newValue.value = parseFloat(newValue.value.toFixed(12));

          let dataChangedEvent: DataChangedInfo = {
            OldValue: Number(selectedCell.value),
            NewValue: newValue.value,
            ColumnId: selectedCell.columnId,
            PrimaryKeyValue: selectedCell.primaryKeyValue,
          };

          let validationRules: CellValidationRule[] = this.blotter.ValidationService.GetValidationRulesForDataChange(
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
        }
      }
    });

    // first inform if any failed with prevent
    this.ShowErrorPreventMessage(failedPreventEdits);
    if (failedWarningEdits.length > 0) {
      this.ShowWarningMessages(failedWarningEdits, warningValues, successfulValues);
    } else {
      if (ArrayExtensions.IsNotNullOrEmpty(successfulValues)) {
        this.blotter.api.gridApi.setGridCells(successfulValues, false);
      }
    }

    return shouldApplyPlusMinus;
  }

  private ShowErrorPreventMessage(failedRules: CellValidationRule[]): void {
    if (failedRules.length > 0) {
      let failedMessages: string[] = [];
      failedRules.forEach(fr => {
        let failedMessage: string =
          this.blotter.ValidationService.CreateCellValidationMessage(fr) + '\n';
        let existingMessage = failedMessages.find(f => f == failedMessage);
        if (existingMessage == null) {
          failedMessages.push(failedMessage);
        }
      });

      this.blotter.api.alertApi.showAlertError('Nudge(s) failed rule', failedMessages.toString());
    }
  }

  private ShowWarningMessages(
    failedRules: CellValidationRule[],
    warningValues: GridCell[],
    successfulValues: GridCell[]
  ): void {
    if (failedRules.length > 0) {
      let allValues = warningValues.concat(...successfulValues);

      let warningMessages: string[] = [];
      failedRules.forEach(fr => {
        let warningMessage: string =
          this.blotter.ValidationService.CreateCellValidationMessage(fr) + '\n';
        let existingMessage = warningMessages.find(w => w == warningMessage);
        if (existingMessage == null) {
          warningMessages.push(warningMessage);
        }
      });
      let warningMessage: string =
        failedRules.length + ' Nudge(s) failed rule:\n' + warningMessages.toString();

      let confirmAction: Redux.Action = PlusMinusRedux.PlusMinusApply(allValues);
      let cancelAction: Redux.Action = PlusMinusRedux.PlusMinusApply(successfulValues);
      let confirmation: IUIConfirmation = this.blotter.ValidationService.createCellValidationUIConfirmation(
        confirmAction,
        cancelAction,
        warningMessage
      );
      this.blotter.api.internalApi.showPopupConfirmation(confirmation);
    }
  }
}
