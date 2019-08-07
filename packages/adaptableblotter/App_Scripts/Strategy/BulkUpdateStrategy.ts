import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { DataType, MessageType } from '../PredefinedConfig/Common/Enums';
import { BulkUpdateValidationResult } from './Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IBulkUpdateStrategy } from './Interface/IBulkUpdateStrategy';
import { PreviewHelper } from '../Utilities/Helpers/PreviewHelper';
import { DataChangedInfo } from '../Utilities/Interface/DataChangedInfo';
import { IPreviewInfo, IPreviewResult } from '../Utilities/Interface/IPreview';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { FunctionAppliedDetails } from '../Api/Events/AuditEvents';
import { BULK_UPDATE_APPLY } from '../Redux/ActionsReducers/BulkUpdateRedux';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { CellValidationRule } from '../PredefinedConfig/RunTimeState/CellValidationState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { IColumn } from '../Utilities/Interface/IColumn';

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

  public ApplyBulkUpdate(newValues: GridCell[]): void {
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

  public CheckCorrectCellSelection(): BulkUpdateValidationResult {
    let selectedCellInfo: SelectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();
    if (selectedCellInfo == null || ArrayExtensions.IsNullOrEmpty(selectedCellInfo.Columns)) {
      return {
        IsValid: false,
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
        IsValid: false,
        Alert: {
          Header: 'Bulk Update Error',
          Msg: 'Bulk Update only supports single column edit.\nPlease adjust cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }

    let selectedColumn: IColumn = selectedCellInfo.Columns[0];
    if (selectedColumn.ReadOnly) {
      return {
        IsValid: false,
        Alert: {
          Header: 'Bulk Update Error',
          Msg:
            'Bulk Update is not permitted on readonly columns.\nPlease adjust the cell selection.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }
    return { IsValid: true, Column: selectedColumn };
  }

  public BuildPreviewValues(bulkUpdateValue: any): IPreviewInfo {
    let previewResults: IPreviewResult[] = [];
    if (StringExtensions.IsNullOrEmpty(String(bulkUpdateValue))) {
      return null;
    }
    let selectedCellInfo = this.blotter.api.gridApi.getSelectedCellInfo();

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

      selectedCellInfo.GridCells.forEach((selectedCell: GridCell) => {
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
