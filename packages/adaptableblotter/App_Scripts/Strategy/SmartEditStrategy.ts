import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import {
  MathOperation,
  DataType,
  MessageType,
  StateChangedTrigger,
} from '../PredefinedConfig/Common/Enums';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISmartEditStrategy } from './Interface/ISmartEditStrategy';
import { PreviewHelper } from '../Utilities/Helpers/PreviewHelper';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import { IPreviewInfo, IPreviewResult } from '../Utilities/Interface/IPreview';
import { FunctionAppliedDetails } from '../Api/Events/AuditEvents';
import { SMARTEDIT_APPLY } from '../Redux/ActionsReducers/SmartEditRedux';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { CellValidationRule } from '../PredefinedConfig/RunTimeState/CellValidationState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';

export class SmartEditStrategy extends AdaptableStrategyBase implements ISmartEditStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SmartEditStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.SmartEditStrategyName,
      ScreenPopups.SmartEditPopup,
      StrategyConstants.SmartEditGlyph
    );
  }

  public ApplySmartEdit(newValues: GridCell[]): void {
    if (this.blotter.AuditLogService.isAuditFunctionEventsEnabled) {
      // logging audit log function here as there is no obvious Action to listen to in the Store - not great but not end of the world...
      let functionAppliedDetails: FunctionAppliedDetails = {
        name: StrategyConstants.SmartEditStrategyId,
        action: SMARTEDIT_APPLY,
        info: 'Smart Edit Applied',
        data: newValues,
      };
      this.blotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
    }

    this.blotter.api.gridApi.setGridCellBatch(newValues);
  }

  public CheckCorrectCellSelection(): IStrategyActionReturn<boolean> {
    let selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
    if (selectedCellInfo == null || ArrayExtensions.IsNullOrEmpty(selectedCellInfo.Columns)) {
      return {
        Alert: {
          Header: 'Smart Edit Error',
          Msg: 'No cells are selected.\nPlease select some cells.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }

    if (ArrayExtensions.NotCorrectLength(selectedCellInfo.Columns, 1)) {
      return {
        Alert: {
          Header: 'Smart Edit Error',
          Msg: 'Smart Edit only supports single column edit.\nPlease adjust cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }

    if (selectedCellInfo.Columns[0].DataType != DataType.Number) {
      return {
        Alert: {
          Header: 'Smart Edit Error',
          Msg:
            'Smart Edit only supports editing of numeric columns.\nPlease adjust the cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }
    if (selectedCellInfo.Columns[0].ReadOnly) {
      return {
        Alert: {
          Header: 'Smart Edit Error',
          Msg:
            'Smart Edit is not permitted on readonly columns.\nPlease adjust the cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }
    return { ActionReturn: true };
  }

  public BuildPreviewValues(
    smartEditValue: number,
    smartEditOperation: MathOperation
  ): IPreviewInfo {
    let selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
    let previewResults: IPreviewResult[] = [];
    let columnId: string = '';
    if (ArrayExtensions.IsNotNullOrEmpty(selectedCellInfo.Columns)) {
      columnId = selectedCellInfo.Columns[0].ColumnId;

      selectedCellInfo.GridCells.forEach((selectedCell: GridCell) => {
        let newValue: number;
        switch (smartEditOperation) {
          case MathOperation.Add:
            newValue = Number(selectedCell.value) + smartEditValue;
            break;
          case MathOperation.Subtract:
            newValue = Number(selectedCell.value) - smartEditValue;
            break;
          case MathOperation.Multiply:
            newValue = Number(selectedCell.value) * smartEditValue;
            break;
          case MathOperation.Divide:
            newValue = Number(selectedCell.value) / smartEditValue;
            break;
        }
        //avoid the 0.0000000000x
        newValue = parseFloat(newValue.toFixed(12));

        let dataChangedEvent: DataChangedInfo = {
          OldValue: Number(selectedCell.value),
          NewValue: newValue,
          ColumnId: selectedCell.columnId,
          IdentifierValue: selectedCell.primaryKeyValue,
          Record: null,
        };

        let validationRules: CellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(
          dataChangedEvent
        );

        let previewResult: IPreviewResult = {
          Id: selectedCell.primaryKeyValue,
          InitialValue: Number(selectedCell.value),
          ComputedValue: newValue,
          ValidationRules: validationRules,
        };
        previewResults.push(previewResult);
      });
    }
    return {
      ColumnId: columnId,
      PreviewResults: previewResults,
      PreviewValidationSummary: PreviewHelper.GetPreviewValidationSummary(previewResults),
    };
  }
}
