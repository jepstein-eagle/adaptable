import { IStrategyActionReturn } from '../../Strategy/Interface/IStrategyActionReturn';
import { IReport } from "../Interface/BlotterObjects/IReport";
import { IColumn } from '../Interface/IColumn';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
export declare module ReportHelper {
    const ALL_DATA_REPORT = "All Data";
    const VISIBLE_DATA_REPORT = "Visible Data";
    const SELECTED_CELLS_REPORT = "Selected Cells";
    function IsSystemReport(Report: IReport): boolean;
    function GetReportColumnsDescription(Report: IReport, cols: IColumn[]): string;
    function GetReportExpressionDescription(Report: IReport, cols: IColumn[]): string;
    function ConvertReportToArray(blotter: IAdaptableBlotter, Report: IReport): IStrategyActionReturn<any[]>;
    function CreateSystemReports(): Array<IReport>;
}
