import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IUpdatedRowStrategy } from './Interface/IUpdatedRowStrategy';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { UpdatedRowState } from '../PredefinedConfig/UpdatedRowState';
import { UpdatedRowInfo, ChangeDirection } from '../Utilities/Services/Interface/IDataService';
import { DataType } from '../PredefinedConfig/Common/Enums';

export abstract class UpdatedRowStrategy extends AdaptableStrategyBase
  implements IUpdatedRowStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.UpdatedRowStrategyId,
      StrategyConstants.UpdatedRowStrategyFriendlyName,
      StrategyConstants.UpdatedRowGlyph,
      ScreenPopups.UpdatedRowPopup,
      adaptable
    );

    this.adaptable.DataService.on('DataChanged', (dataChangedInfo: DataChangedInfo) => {
      this.handleDataSourceChanged(dataChangedInfo);
    });
  }

  public addColumnMenuItems(): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      let currentRowInfos: UpdatedRowInfo[] = this.adaptable.api.internalApi.getUpdatedRowInfos();
      if (ArrayExtensions.IsNotNullOrEmpty(currentRowInfos)) {
        return [
          this.createColumnMenuItemReduxAction(
            'Clear Updated Rows',
            StrategyConstants.UpdatedRowGlyph,
            SystemRedux.SystemUpdatedRowDeleteAll(currentRowInfos)
          ),
        ];
      }
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (this.canCreateMenuItem('ReadOnly')) {
      if (menuInfo.Column && menuInfo.RowNode) {
        let updatedRowInfos: UpdatedRowInfo[] = this.adaptable.api.internalApi.getUpdatedRowInfos();
        if (ArrayExtensions.IsNotNullOrEmpty(updatedRowInfos)) {
          let updatedRowInfo: UpdatedRowInfo = updatedRowInfos.find(
            a => a.primaryKeyValue == menuInfo.PrimaryKeyValue
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
    }
    return menuItemShowPopup;
  }

  protected handleDataSourceChanged(dataChangedInfo: DataChangedInfo): void {
    let updatedRowState: UpdatedRowState = this.adaptable.api.updatedRowApi.getUpdatedRowState();
    if (updatedRowState.EnableUpdatedRow) {
      let colsToRefresh: Array<string> = this.adaptable.api.columnApi
        .getColumns()
        .map(c => c.ColumnId);

      if (ArrayExtensions.IsNotNullOrEmpty(colsToRefresh)) {
        let updatedRowInfo: UpdatedRowInfo = {
          primaryKeyValue: dataChangedInfo.PrimaryKeyValue,
          changeDirection: this.getChangeDirection(dataChangedInfo),
        };
        this.adaptable.api.updatedRowApi.addUpdatedRowInfo(updatedRowInfo);

        if (updatedRowState.JumpToRow) {
          this.adaptable.jumpToRow(dataChangedInfo.RowNode);
        }

        this.adaptable.refreshCells([dataChangedInfo.RowNode], colsToRefresh);
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

    let columnDataType = this.adaptable.api.columnApi.getColumnDataTypeFromColumnId(
      dataChangedInfo.ColumnId
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
