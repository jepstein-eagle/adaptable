import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { DataType, MessageType, StateChangedTrigger } from '../PredefinedConfig/Common/Enums';
import { IStrategyActionReturn } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IBulkUpdateStrategy } from './Interface/IBulkUpdateStrategy';
import { BulkUpdateState } from '../PredefinedConfig/RunTimeState/BulkUpdateState';
import { ICellInfo } from '../Utilities/Interface/ICellInfo';
import { PreviewHelper } from '../Utilities/Helpers/PreviewHelper';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import { IPreviewInfo, IPreviewResult } from '../Utilities/Interface/IPreview';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { FunctionAppliedDetails } from '../Api/Events/AuditEvents';
import { BULK_UPDATE_APPLY } from '../Redux/ActionsReducers/BulkUpdateRedux';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { CellValidationRule } from '../PredefinedConfig/RunTimeState/CellValidationState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { ISelectedCell } from '../Utilities/Interface/SelectedCell/ISelectedCell';

export class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.BulkUpdateStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.BulkUpdateStrategyName,
      ScreenPopups.BulkUpdatePopup,
      StrategyConstants.BulkUpdateGlyph
    );
  }

  public ApplyBulkUpdate(newValues: ICellInfo[]): void {
    if (this.blotter.AuditLogService.isAuditFunctionEventsEnabled) {
      // logging audit log function here as there is no obvious Action to listen to in the Store - not great but not end of the world...
      let functionAppliedDetails: FunctionAppliedDetails = {
        name: StrategyConstants.BulkUpdateStrategyId,
        action: BULK_UPDATE_APPLY,
        info: 'Bulk Update Applied',
        data: newValues,
      };
      this.blotter.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
    }
    this.blotter.setValueBatch(newValues);
  }

  public CheckCorrectCellSelection(): IStrategyActionReturn<boolean> {
    let selectedCellInfo: ISelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
    if (selectedCellInfo == null || ArrayExtensions.IsNullOrEmpty(selectedCellInfo.Columns)) {
      return {
        Alert: {
          Header: 'Bulk Update Error',
          Msg: 'No cells are selected.\nPlease select some cells.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }

    if (ArrayExtensions.NotCorrectLength(selectedCellInfo.Columns, 1)) {
      return {
        Alert: {
          Header: 'Bulk Update Error',
          Msg: 'Bulk Update only supports single column edit.\nPlease adjust cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }

    if (selectedCellInfo.Columns[0].ReadOnly) {
      return {
        Alert: {
          Header: 'Bulk Update Error',
          Msg:
            'Bulk Update is not permitted on readonly columns.\nPlease adjust the cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }
    return { ActionReturn: true };
  }

  public BuildPreviewValues(bulkUpdateValue: any): IPreviewInfo {
    let selectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
    let previewResults: IPreviewResult[] = [];
    let columnId: string = '';
    if (selectedCellInfo != null && selectedCellInfo.Columns.length > 0) {
      columnId = selectedCellInfo.Columns[0].ColumnId;
      let typedBulkUpdateValue: any;
      switch (selectedCellInfo.Columns[0].DataType) {
        case DataType.Number:
          typedBulkUpdateValue = Number(bulkUpdateValue);
          break;
        case DataType.String:
          typedBulkUpdateValue = bulkUpdateValue;
          break;
        case DataType.Date:
          typedBulkUpdateValue = new Date(bulkUpdateValue);
          break;
      }

      selectedCellInfo.SelectedCells.forEach((selectedCell: ISelectedCell) => {
        let dataChangedEvent: DataChangedInfo = {
          OldValue: selectedCell.value,
          NewValue: typedBulkUpdateValue,
          ColumnId: selectedCell.columnId,
          IdentifierValue: selectedCell.primaryKeyValue,
          Record: null,
        };

        let validationRules: CellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(
          dataChangedEvent
        );
        let previewResult: IPreviewResult = {
          Id: selectedCell.primaryKeyValue,
          InitialValue: selectedCell.value,
          ComputedValue: typedBulkUpdateValue,
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
