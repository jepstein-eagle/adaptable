import { IUIConfirmation } from "../../Utilities/Interface/IMessage";
import { IMenuItem } from "../../Utilities/Interface/IMenu";
import { ExportDestination } from "../../Utilities/Enums";
export interface IInternalApi {
    ReportStartLive(reportName: string, workbookName: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): void;
    ColumnContextMenuClear(): void;
    ColumnContextMenuAddItem(menuItem: IMenuItem): void;
    PopupShowConfirmation(confirmation: IUIConfirmation): void;
}
