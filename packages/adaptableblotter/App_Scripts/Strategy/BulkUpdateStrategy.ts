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
import { IDataChangedInfo } from '../Utilities/Interface/IDataChangedInfo';
import { IPreviewInfo, IPreviewResult } from '../Utilities/Interface/IPreview';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { FunctionAppliedDetails } from '../Api/Events/AuditEvents';
import { BULK_UPDATE_APPLY } from '../Redux/ActionsReducers/BulkUpdateRedux';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { CellValidationRule } from '../PredefinedConfig/RunTimeState/CellValidationState';

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
    if (selectedCellInfo == null || selectedCellInfo.Selection.size == 0) {
      return {
        Alert: {
          Header: 'Bulk Update Error',
          Msg: 'No cells are selected.\nPlease select some cells.',
          MessageType: MessageType.Error,
          ShowAsPopup: true,
        },
      };
    }

    if (selectedCellInfo.Columns.length != 1) {
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
    let selectedCells = this.blotter.api.gridApi.getSelectedCellInfo();
    let previewResults: IPreviewResult[] = [];
    let columnId: string = '';
    if (selectedCells != null && selectedCells.Columns.length > 0) {
      columnId = selectedCells.Columns[0].ColumnId;
      let typedBulkUpdateValue;
      switch (selectedCells.Columns[0].DataType) {
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

      for (let pair of selectedCells.Selection) {
        for (let selectedCell of pair[1]) {
          let dataChangedEvent: IDataChangedInfo = {
            OldValue: selectedCell.value,
            NewValue: typedBulkUpdateValue,
            ColumnId: selectedCell.columnId,
            IdentifierValue: pair[0],
            Record: null,
          };

          let validationRules: CellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(
            dataChangedEvent
          );
          let previewResult: IPreviewResult = {
            Id: pair[0],
            InitialValue: selectedCell.value,
            ComputedValue: typedBulkUpdateValue,
            ValidationRules: validationRules,
          };
          previewResults.push(previewResult);
        }
      }
    }
    return {
      ColumnId: columnId,
      PreviewResults: previewResults,
      PreviewValidationSummary: PreviewHelper.GetPreviewValidationSummary(previewResults),
    };
  }
}
