import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IColumn } from '../Interface/IColumn';
import { IReport, IUserFilter } from '../Api/Interface/AdaptableBlotterObjects';
export declare module ReportHelper {
    const ALL_DATA_REPORT = "All Data";
    const VISIBLE_DATA_REPORT = "Visible Data";
    const SELECTED_CELLS_REPORT = "Selected Cells";
    function GetReportColumnsDescription(Report: IReport, cols: IColumn[]): string;
    function GetReportExpressionDescription(Report: IReport, cols: IColumn[], userFilters: IUserFilter[]): string;
    function ConvertReportToArray(blotter: IAdaptableBlotter, Report: IReport): IStrategyActionReturn<any[]>;
    function CreateSystemReports(): Array<IReport>;
}
