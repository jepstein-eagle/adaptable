import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { Helper } from '../Utilities/Helpers/Helper';
import * as _ from 'lodash';
import { Report } from '../PredefinedConfig/ExportState';
import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { VISIBLE_DATA_REPORT } from '../Utilities/Constants/GeneralConstants';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import ColumnHelper from '../Utilities/Helpers/ColumnHelper';

export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ExportStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.ExportStrategyFriendlyName,
        ComponentName: ScreenPopups.ExportPopup,
        Icon: StrategyConstants.ExportGlyph,
      });
    }
  }

  public export(report: Report, exportDestination: ExportDestination): void {
    if (report.Name === VISIBLE_DATA_REPORT) {
      switch (exportDestination) {
        case ExportDestination.Clipboard:
          this.adaptable.exportVisibleToClipboard(report);
          break;
        case ExportDestination.CSV:
          this.adaptable.exportVisibleToCsv(report);
          break;
        case ExportDestination.Excel:
          this.adaptable.exportVisibleToExcel(report);
          break;
        case ExportDestination.JSON:
          this.convertReportToJSON(report);
          break;
      }
      return;
    }

    switch (exportDestination) {
      case ExportDestination.Clipboard:
        this.copyToClipboard(report);
        break;
      case ExportDestination.CSV:
        this.convertReportToCsv(report);
        break;
      case ExportDestination.Excel:
        this.convertReportToExcel(report);
        break;
      case ExportDestination.JSON:
        this.convertReportToJSON(report);
        break;
    }
  }

  private convertReportToJSON(report: Report): void {
    let reportAsArray: any[] = this.ConvertReportToArray(report);
    if (reportAsArray) {
      let reportAsJSON = JSON.stringify(reportAsArray);
      if (reportAsJSON) {
        let csvFileName: string = report.Name + '.json';
        Helper.createDownloadedFile(reportAsJSON, csvFileName, 'application/json');
      }
    }
  }

  private convertReportToCsv(report: Report): void {
    let csvContent: string = this.createCSVContent(report);
    if (csvContent) {
      let csvFileName: string = report.Name + '.csv';
      Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
    }
  }

  private convertReportToExcel(report: Report): void {
    let reportAsArray: any[] = this.ConvertReportToArray(report);

    let reportCols = reportAsArray.shift();

    let cols: AdaptableColumn[] = this.adaptable.api.gridApi.getColumnsFromFriendlyNames(
      reportCols
    );

    this.adaptable.exportToExcel(report, cols, reportAsArray);
  }

  private copyToClipboard(report: Report) {
    let csvContent: string = this.createTabularContent(report);
    if (csvContent) {
      Helper.copyToClipboard(csvContent);
    }
  }

  private createCSVContent(report: Report): string {
    let reportAsArray: any[] = this.ConvertReportToArray(report);
    if (reportAsArray) {
      return Helper.convertArrayToCsv(reportAsArray, ',');
    }
    return null;
  }

  private createTabularContent(report: Report): string {
    let ReportAsArray: any[] = this.ConvertReportToArray(report);
    if (ReportAsArray) {
      return Helper.convertArrayToCsv(ReportAsArray, '\t');
    }
    return null;
  }

  // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
  private ConvertReportToArray(report: Report): any[] {
    let actionReturnObj = this.adaptable.ReportService.ConvertReportToArray(report);
    if (actionReturnObj.Alert) {
      this.adaptable.api.alertApi.displayMessageAlertPopup(actionReturnObj.Alert);
      return null;
    }
    return actionReturnObj.ActionReturn;
  }

  public getTeamSharingAction(): TeamSharingImportInfo<Report> {
    return {
      FunctionEntities: this.adaptable.api.exportApi.getAllReports(),
      AddAction: ExportRedux.ReportAdd,
      EditAction: ExportRedux.ReportEdit,
    };
  }
}
