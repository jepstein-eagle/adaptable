import { IShortcutStrategy } from './Interface/IShortcutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as Redux from 'redux';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { DataType, MathOperation, ActionMode } from '../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { ICellInfo } from '../Utilities/Interface/ICellInfo';
import { IColumn } from '../Utilities/Interface/IColumn';
import { ColumnHelper } from '../Utilities/Helpers/ColumnHelper';
import { Helper } from '../Utilities/Helpers/Helper';
import { IDataChangedInfo } from '../Utilities/Interface/IDataChangedInfo';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { CellValidationHelper } from '../Utilities/Helpers/CellValidationHelper';
import { FunctionAppliedDetails } from '../Api/Events/AuditEvents';
import { Shortcut } from '../PredefinedConfig/RunTimeState/ShortcutState';
import { CellValidationRule } from '../PredefinedConfig/RunTimeState/CellValidationState';

export class ShortcutStrategy extends AdaptableStrategyBase implements IShortcutStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ShortcutStrategyId, blotter);
    blotter.onKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent));
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ShortcutStrategyName,
      ScreenPopups.ShortcutPopup,
      StrategyConstants.ShortcutGlyph
    );
  }

  private handleKeyDown(keyEvent: KeyboardEvent | any) {
    let shortcuts = this.blotter.api.shortcutApi.getAllShortcut();
    if (ArrayExtensions.IsNullOrEmpty(shortcuts)) {
      return;
    }
    let activeCell: ICellInfo = this.blotter.getActiveCell();
    if (!activeCell) {
      return;
    }
    let selectedColumn: IColumn = ColumnHelper.getColumnFromId(
      activeCell.ColumnId,
      this.blotter.api.gridApi.getColumns()
    );
    if (activeCell && !selectedColumn.ReadOnly) {
      let columnDataType: DataType = selectedColumn.DataType;
      let keyEventString: string = Helper.getStringRepresentionFromKey(keyEvent);
      let activeShortcut: Shortcut;
      let valueToReplace: any;
      switch (columnDataType) {
        case DataType.Number: {
          activeShortcut = shortcuts
            .filter(s => s.ColumnType == DataType.Number)
            .find(x => keyEventString == x.ShortcutKey.toLowerCase());
          if (activeShortcut) {
            let currentCellValue: any;
            // Another complication is that the cell might have been edited or not, so we need to work out which method to use...
            if (this.blotter.gridHasCurrentEditValue()) {
              currentCellValue = this.blotter.getCurrentCellEditValue();
              valueToReplace = this.CalculateShortcut(
                currentCellValue,
                activeShortcut.ShortcutResult,
                activeShortcut.ShortcutOperation as MathOperation
              );
            } else {
              currentCellValue = activeCell.Value;
              valueToReplace = this.CalculateShortcut(
                currentCellValue,
                activeShortcut.ShortcutResult,
                activeShortcut.ShortcutOperation as MathOperation
              );
            }
          }
          break;
        }
        case DataType.Date: {
          activeShortcut = shortcuts
            .filter(s => s.ColumnType == DataType.Date)
            .find(x => keyEventString == x.ShortcutKey.toLowerCase());
          if (activeShortcut) {
            // Date we ONLY replace so dont need to worry about replacing values
            if (activeShortcut.IsDynamic) {
              valueToReplace = this.blotter.CalendarService.GetDynamicDate(
                activeShortcut.ShortcutResult
              );
            } else {
              valueToReplace = new Date(activeShortcut.ShortcutResult);
            }
          }
          break;
        }
      }

      if (activeShortcut) {
        let dataChangedEvent: IDataChangedInfo = {
          OldValue: activeCell.Value,
          NewValue: valueToReplace,
          ColumnId: activeCell.ColumnId,
          IdentifierValue: activeCell.Id,
          Record: null,
        };

        let validationRules: CellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(
          dataChangedEvent
        );
        let hasErrorPrevent: boolean =
          validationRules.length > 0 && validationRules[0].ActionMode == ActionMode.StopEdit;
        let hasErrorWarning: boolean =
          validationRules.length > 0 && validationRules[0].ActionMode == ActionMode.WarnUser;

        //   this.AuditFunctionAction("HandleKeyDown",                     "Key Pressed: " + keyEventString,                     { Shortcut: activeShortcut, PrimaryKey: activeCell.Id, ColumnId: activeCell.ColumnId })

        //We cancel the edit before doing anything so there is no issue when showing a popup or performing the shortcut
        this.blotter.cancelEdit();

        if (hasErrorPrevent) {
          this.ShowErrorPreventMessage(validationRules[0]);
        } else {
          if (hasErrorWarning) {
            this.ShowWarningMessages(
              validationRules,
              activeShortcut,
              activeCell,
              keyEventString,
              valueToReplace
            );
          } else {
            this.applyShortcut(activeShortcut, activeCell, valueToReplace, keyEventString);
          }
        }
        // useful feature - prevents the main thing happening you want to on the keypress.
        keyEvent.preventDefault();
      }
    }
  }

  private CalculateShortcut(first: any, second: any, shortcutOperation: MathOperation): number {
    let firstNumber: number = Number(first);
    let secondNumber: number = Number(second);

    switch (shortcutOperation) {
      case MathOperation.Add:
        return firstNumber + secondNumber;
      case MathOperation.Subtract:
        return firstNumber - secondNumber;
      case MathOperation.Multiply:
        return firstNumber * secondNumber;
      case MathOperation.Divide:
        return firstNumber / secondNumber;
      case MathOperation.Replace:
        return secondNumber;
    }
  }

  private applyShortcut(
    activeShortcut: Shortcut,
    activeCell: ICellInfo,
    newValue: any,
    keyEventString: string
  ): void {
    this.blotter.setValueBatch([
      { Id: activeCell.Id, ColumnId: activeCell.ColumnId, Value: newValue },
    ]);

    let functionAppliedDetails: FunctionAppliedDetails = {
      name: StrategyConstants.ShortcutStrategyId,
      action: ShortcutRedux.SHORTCUT_APPLY,
      info: 'KeyPressed:' + keyEventString,
      data: {
        Shortcut: activeShortcut,
        PrimaryKey: activeCell.Id,
        ColumnId: activeCell.ColumnId,
        NewValue: newValue,
      },
    };
    this.blotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
  }

  private ShowErrorPreventMessage(failedRule: CellValidationRule): void {
    this.blotter.api.alertApi.showAlertError(
      'Shortcut Failed',
      ObjectFactory.CreateCellValidationMessage(failedRule, this.blotter),
      true
    );
  }

  private ShowWarningMessages(
    failedRules: CellValidationRule[],
    shortcut: Shortcut,
    activeCell: ICellInfo,
    keyEventString: string,
    newValue: any
  ): void {
    let warningMessage: string = '';
    failedRules.forEach(f => {
      warningMessage =
        warningMessage + ObjectFactory.CreateCellValidationMessage(f, this.blotter) + '\n';
    });

    let confirmAction: Redux.Action = ShortcutRedux.ShortcutApply(
      shortcut,
      activeCell,
      keyEventString,
      newValue
    );
    let cancelAction: Redux.Action = null;
    let confirmation: IUIConfirmation = CellValidationHelper.createCellValidationUIConfirmation(
      confirmAction,
      cancelAction,
      warningMessage
    );
    this.blotter.api.internalApi.showPopupConfirmation(confirmation);
  }
}
