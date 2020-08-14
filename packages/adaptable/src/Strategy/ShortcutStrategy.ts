import { IShortcutStrategy } from './Interface/IShortcutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { DataType, MathOperation } from '../PredefinedConfig/Common/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { Helper } from '../Utilities/Helpers/Helper';
import { FunctionAppliedDetails } from '../Api/Events/AuditEvents';
import { Shortcut } from '../PredefinedConfig/ShortcutState';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';

export class ShortcutStrategy extends AdaptableStrategyBase implements IShortcutStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ShortcutStrategyId, adaptable);

    this.adaptable._on('KeyDown', keyDownEvent => {
      this.handleKeyDown(keyDownEvent);
    });
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('Full')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.ShortcutStrategyFriendlyName,
        ComponentName: ScreenPopups.ShortcutPopup,
        Icon: StrategyConstants.ShortcutGlyph,
      });
    }
  }

  private handleKeyDown(keyEvent: KeyboardEvent | any) {
    let shortcuts = this.adaptable.api.shortcutApi.getAllShortcut();
    if (ArrayExtensions.IsNullOrEmpty(shortcuts)) {
      return;
    }
    let activeCell: GridCell = this.adaptable.getActiveCell();
    if (!activeCell) {
      return;
    }
    let selectedColumn: AdaptableColumn = this.adaptable.api.gridApi.getColumnFromId(
      activeCell.columnId
    );
    if (activeCell && !selectedColumn.ReadOnly) {
      let columnDataType = selectedColumn.DataType;
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
            if (this.adaptable.gridHasCurrentEditValue()) {
              currentCellValue = this.adaptable.getCurrentCellEditValue();
              valueToReplace = this.calculateShortcut(
                currentCellValue,
                activeShortcut.ShortcutResult,
                activeShortcut.ShortcutOperation as MathOperation
              );
            } else {
              currentCellValue = activeCell.rawValue;
              valueToReplace = this.calculateShortcut(
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
              valueToReplace = this.adaptable.api.calendarApi.getDynamicDate(
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
        //We cancel the edit before doing anything so there is no issue when showing a popup or performing the shortcut
        this.adaptable.cancelEdit();

        let newGridCell: GridCell = {
          columnId: activeCell.columnId,
          rawValue: valueToReplace,
          displayValue: valueToReplace,
          primaryKeyValue: activeCell.primaryKeyValue,
        };

        this.adaptable.api.internalApi.setLastAppliedShortCut(newGridCell);

        this.applyShortcut(activeShortcut, newGridCell, valueToReplace, keyEventString);
        keyEvent.preventDefault();
        setTimeout(() => {
          this.adaptable.api.internalApi.setLastAppliedShortCut(undefined);
        }, 500);
      }
    }
  }

  private calculateShortcut(first: any, second: any, shortcutOperation: MathOperation): number {
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
    newGridCell: GridCell,
    newValue: any,
    keyEventString: string
  ): void {
    this.adaptable.api.internalApi.setGridCell(newGridCell, true, true);

    let functionAppliedDetails: FunctionAppliedDetails = {
      name: StrategyConstants.ShortcutStrategyId,
      action: ShortcutRedux.SHORTCUT_APPLY,
      info: 'KeyPressed:' + keyEventString,
      data: {
        Shortcut: activeShortcut,
        PrimaryKey: newGridCell.primaryKeyValue,
        ColumnId: newGridCell.columnId,
        NewValue: newValue,
      },
    };
    this.adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
  }

  public getTeamSharingAction(): TeamSharingImportInfo<Shortcut> {
    return {
      FunctionEntities: this.adaptable.api.shortcutApi.getAllShortcut(),
      AddAction: ShortcutRedux.ShortcutAdd,
      EditAction: ShortcutRedux.ShortcutEdit,
    };
  }
}
