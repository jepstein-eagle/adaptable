import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { DataType, MessageType } from '../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IBulkUpdateStrategy, BulkUpdateValidationResult } from './Interface/IBulkUpdateStrategy';
import { PreviewHelper } from '../Utilities/Helpers/PreviewHelper';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';
import { IPreviewInfo, IPreviewResult } from '../Utilities/Interface/IPreview';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { FunctionAppliedDetails } from '../Api/Events/AuditEvents';
import { BULK_UPDATE_APPLY } from '../Redux/ActionsReducers/BulkUpdateRedux';
import StringExtensions from '../Utilities/Extensions/StringExtensions';
import { CellValidationRule } from '../PredefinedConfig/CellValidationState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import ObjectFactory from '../Utilities/ObjectFactory';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class BulkUpdateStrategy extends AdaptableStrategyBase implements IBulkUpdateStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.BulkUpdateStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.BulkUpdateStrategyFriendlyName,
      ComponentName: ScreenPopups.BulkUpdatePopup,
      Icon: StrategyConstants.BulkUpdateGlyph,
    });
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    // not sure if this is right but logic is that
    // if the context cell is one of a selection taht can have smart edit applied
    // then open the smart edit screen
    // perhaps this is faulty logic though?
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (
      menuInfo.Column &&
      !menuInfo.Column.ReadOnly &&
      menuInfo.IsSelectedCell &&
      menuInfo.IsSingleSelectedColumn
    ) {
      let popUpParams: StrategyParams = {
        source: 'ContextMenu',
      };
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: 'Apply ' + StrategyConstants.BulkUpdateStrategyFriendlyName,
        ComponentName: ScreenPopups.BulkUpdatePopup,
        Icon: StrategyConstants.BulkUpdateGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }

  public ApplyBulkUpdate(newValues: GridCell[]): void {
    if (this.adaptable.AuditLogService.isAuditFunctionEventsEnabled) {
      // logging audit log function here as there is no obvious Action to listen to in the Store - not great but not end of the world...
      let functionAppliedDetails: FunctionAppliedDetails = {
        name: StrategyConstants.BulkUpdateStrategyId,
        action: BULK_UPDATE_APPLY,
        info: 'Bulk Update Applied',
        data: newValues,
      };
      this.adaptable.AuditLogService.addFunctionAppliedAuditLog(functionAppliedDetails);
    }
    this.adaptable.api.gridApi.setGridCells(newValues, true, false);
  }

  public CheckCorrectCellSelection(): BulkUpdateValidationResult {
    let selectedCellInfo: SelectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();

    if (this.adaptable.api.internalApi.isGridInPivotMode()) {
      return {
        IsValid: false,
        Alert: {
          Header: 'Bulk Update Error',
          Msg: 'Cannot edit while Grid is in Pivot Mode.',
          AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
            MessageType.Error
          ),
        },
      };
    }

    if (selectedCellInfo == null || ArrayExtensions.IsNullOrEmpty(selectedCellInfo.Columns)) {
      return {
        IsValid: false,
        Alert: {
          Header: 'Bulk Update Error',
          Msg: 'No cells are selected.\nPlease select some cells.',
          AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
            MessageType.Error
          ),
        },
      };
    }

    if (ArrayExtensions.NotCorrectLength(selectedCellInfo.Columns, 1)) {
      return {
        IsValid: false,
        Alert: {
          Header: 'Bulk Update Error',
          Msg: 'Bulk Update only supports single column edit.\nPlease adjust cell selection.',
          AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
            MessageType.Error
          ),
        },
      };
    }

    let selectedColumn: AdaptableColumn = selectedCellInfo.Columns[0];
    if (selectedColumn && selectedColumn.ReadOnly) {
      return {
        IsValid: false,
        Alert: {
          Header: 'Bulk Update Error',
          Msg:
            'Bulk Update is not permitted on readonly columns.\nPlease adjust the cell selection.',
          AlertDefinition: ObjectFactory.CreateInternalAlertDefinitionForMessages(
            MessageType.Error
          ),
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
    let selectedCellInfo = this.adaptable.api.gridApi.getSelectedCellInfo();

    let columnId: string = '';
    if (!this.adaptable.api.internalApi.isGridInPivotMode()) {
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
            OldValue: selectedCell.rawValue,
            NewValue: typedBulkUpdateValue,
            ColumnId: selectedCell.columnId,
            PrimaryKeyValue: selectedCell.primaryKeyValue,
          };

          let validationRules: CellValidationRule[] = this.adaptable.ValidationService.GetValidationRulesForDataChange(
            dataChangedEvent
          );
          let previewResult: IPreviewResult = {
            Id: selectedCell.primaryKeyValue,
            InitialValue: selectedCell.rawValue,
            ComputedValue: typedBulkUpdateValue,
            ValidationRules: validationRules,
          };
          previewResults.push(previewResult);
        });
      }
    }
    return {
      ColumnId: columnId,
      PreviewResults: previewResults,
      PreviewValidationSummary: PreviewHelper.GetPreviewValidationSummary(previewResults),
    };
  }
}
