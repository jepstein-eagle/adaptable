import { ApiBase } from "./ApiBase";
import { IInternalApi } from './Interface/IInternalApi';
import { IUIConfirmation } from '../Utilities/Interface/IMessage';
import { IMenuItem } from '../Utilities/Interface/IMenu';
import { ExportDestination } from '../Utilities/Enums';
import { SystemState } from '../Redux/ActionsReducers/Interface/IState';
import { ICalendar } from '../Utilities/Interface/BlotterObjects/ICalendar';
import { IChartData } from '../Utilities/Interface/BlotterObjects/Charting/IChartData';
import { ChartVisibility } from '../Utilities/ChartEnums';
import { IReport } from '../Utilities/Interface/BlotterObjects/IReport';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';
export declare class InternalApi extends ApiBase implements IInternalApi {
    ReportStartLive(reportName: string, workbookName: string, exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): void;
    GetSystemState(): SystemState;
    GetAvailableCalendars(): ICalendar[];
    SetChartData(chartData: IChartData): void;
    SetChartVisibility(chartVisbility: ChartVisibility): void;
    getSystemReports(): IReport[];
    getLiveReports(): ILiveReport[];
    ColumnContextMenuClear(): void;
    ColumnContextMenuAddItem(menuItem: IMenuItem): void;
    PopupShowConfirmation(confirmation: IUIConfirmation): void;
}
