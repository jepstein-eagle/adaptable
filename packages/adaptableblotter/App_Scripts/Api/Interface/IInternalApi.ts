import { IUIConfirmation } from "../../Utilities/Interface/IMessage";
import { IMenuItem } from "../../Utilities/Interface/IMenu";
import { ExportDestination } from "../../Utilities/Enums";

export interface IInternalApi {

    // System Redux
     ReportStartLive(reportName: string, workbookName: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): void 
  

    // Menu Redux
    ColumnContextMenuClear(): void;
    ColumnContextMenuAddItem(menuItem: IMenuItem): void

    // Popup Redux
    PopupShowConfirmation(confirmation: IUIConfirmation): void;

}

