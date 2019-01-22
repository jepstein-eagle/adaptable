import { ApiBase } from "./ApiBase";
import { IInternalApi } from './Interface/IInternalApi';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { IMenuItem } from '../Utilities/Interface/IMenu';
import { ExportDestination } from '../Utilities/Enums';
export declare class InternalApi extends ApiBase implements IInternalApi {
    ReportStartLive(reportName: string, workbookName: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): void;
    ColumnContextMenuClear(): void;
    ColumnContextMenuAddItem(menuItem: IMenuItem): void;
    PopupShowConfirmation(confirmation: IUIConfirmation): void;
}
