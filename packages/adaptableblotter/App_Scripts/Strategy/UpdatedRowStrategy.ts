import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IUpdatedRowStrategy } from './Interface/IUpdatedRowStrategy';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableBlotterMenuItem, ContextMenuInfo } from '../PredefinedConfig/Common/Menu';
import { DataChangedInfo } from '../BlotterOptions/CommonObjects/DataChangedInfo';
import { AdaptableAlert } from '../Utilities/Interface/IMessage';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { UpdatedRowState } from '../PredefinedConfig/UpdatedRowState';
import { UpdatedRowInfo, ChangeDirection } from '../Utilities/Services/Interface/IDataService';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import ColumnHelper from '../Utilities/Helpers/ColumnHelper';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export abstract class UpdatedRowStrategy extends AdaptableStrategyBase
  implements IUpdatedRowStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.UpdatedRowStrategyId, blotter);

    this.blotter.DataService.OnDataSourceChanged().Subscribe((sender, eventText) =>
      this.handleDataSourceChanged(eventText)
    );
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.UpdatedRowStrategyName,
      ComponentName: ScreenPopups.UpdatedRowPopup,
      Icon: StrategyConstants.UpdatedRowGlyph,
    });
  }

  public addColumnMenuItem(): AdaptableBlotterMenuItem | undefined {
    let currentRowInfos: UpdatedRowInfo[] = this.blotter.api.internalApi.getUpdatedRowInfos();
    if (ArrayExtensions.IsNotNullOrEmpty(currentRowInfos)) {
      return this.createColumnMenuItemReduxAction(
        'Clear Updated Rows',
        StrategyConstants.UpdatedRowGlyph,
        SystemRedux.SystemUpdatedRowDeleteAll(currentRowInfos)
      );
    }
  }

  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (contextMenuInfo.column && contextMenuInfo.rowNode) {
      let updatedRowInfos: UpdatedRowInfo[] = this.blotter.api.internalApi.getUpdatedRowInfos();
      if (ArrayExtensions.IsNotNullOrEmpty(updatedRowInfos)) {
        let updatedRowInfo: UpdatedRowInfo = updatedRowInfos.find(
          a => a.primaryKeyValue == contextMenuInfo.primaryKeyValue
        );
        if (updatedRowInfo) {
          menuItemShowPopup = this.createColumnMenuItemReduxAction(
            'Clear Updated Row',
            StrategyConstants.UpdatedRowGlyph,
            SystemRedux.SystemUpdatedRowDelete(updatedRowInfo)
          );
        }
      }
    }
    return menuItemShowPopup;
  }

  protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void {
    let updatedRowState: UpdatedRowState = this.blotter.api.updatedRowApi.getUpdatedRowState();
    if (updatedRowState.EnableUpdatedRow) {
      let colsToRefresh: Array<string> = this.blotter.api.gridApi.getColumns().map(c => c.ColumnId);

      if (ArrayExtensions.IsNotNullOrEmpty(colsToRefresh)) {
        let updatedRowInfo: UpdatedRowInfo = {
          primaryKeyValue: dataChangedInfo.PrimaryKeyValue,
          changeDirection: this.getChangeDirection(dataChangedInfo),
        };
        this.blotter.api.updatedRowApi.addUpdatedRowInfo(updatedRowInfo);

        if (updatedRowState.JumpToRow) {
          this.blotter.jumpToRow(dataChangedInfo.RowNode);
        }

        this.blotter.refreshCells([dataChangedInfo.RowNode], colsToRefresh);
      }
    }
  }

  private getChangeDirection(dataChangedInfo: DataChangedInfo): ChangeDirection {
    if (
      dataChangedInfo.OldValue == null ||
      dataChangedInfo.NewValue == null ||
      dataChangedInfo.OldValue == dataChangedInfo.NewValue
    ) {
      return ChangeDirection.Neutral;
    }

    let columnDataType: DataType = ColumnHelper.getColumnDataTypeFromColumnId(
      dataChangedInfo.ColumnId,
      this.blotter.api.gridApi.getColumns()
    );

    if (columnDataType != DataType.Number && columnDataType != DataType.Date) {
      return ChangeDirection.Neutral;
    }

    return dataChangedInfo.NewValue > dataChangedInfo.OldValue
      ? ChangeDirection.Up
      : ChangeDirection.Down;
  }

  public abstract initStyles(): void;
}
