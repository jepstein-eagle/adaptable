import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux'
import { ApiBase } from "./ApiBase";
import { IInternalApi } from './Interface/IInternalApi';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { IMenuItem } from '../Utilities/Interface/IMenu';
import { ExportDestination } from '../Utilities/Enums';

export class InternalApi extends ApiBase implements IInternalApi {

  // System Redux Actions
  public ReportStartLive(reportName: string, workbookName: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): void {
    this.dispatchAction(
      SystemRedux.ReportStartLive(reportName, workbookName, exportDestination));
  }

  // Menu Redux Actions
  public ColumnContextMenuClear(): void {
    this.dispatchAction(MenuRedux.ClearColumnContextMenu());
  }

  public ColumnContextMenuAddItem(menuItem: IMenuItem): void {
    this.dispatchAction(MenuRedux.AddItemColumnContextMenu(menuItem));
  }


  // Popup Redux Actions
  public PopupShowConfirmation(confirmation: IUIConfirmation): void {
    this.dispatchAction(PopupRedux.PopupShowConfirmation(confirmation));
  }
}