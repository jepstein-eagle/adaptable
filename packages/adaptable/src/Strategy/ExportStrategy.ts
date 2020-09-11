import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { Helper } from '../Utilities/Helpers/Helper';
import { Report } from '../PredefinedConfig/ExportState';
import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import {
  VISIBLE_DATA_REPORT,
  SELECTED_CELLS_REPORT,
} from '../Utilities/Constants/GeneralConstants';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { MenuItemDoClickFunction } from '../Utilities/MenuItem';
import { SelectedCellInfo } from '../PredefinedConfig/Selection/SelectedCellInfo';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import LoggingHelper from '../Utilities/Helpers/LoggingHelper';

export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.ExportStrategyId,
      StrategyConstants.ExportStrategyFriendlyName,
      StrategyConstants.ExportGlyph,
      ScreenPopups.ExportPopup,
      adaptable
    );
  }

  public tidyOldConfig(): void {
    this.adaptable.api.exportApi
      .getAllReports()
      .filter(r => !this.adaptable.ReportService.IsSystemReport(r))
      .forEach((report: Report) => {
        if ((report.ReportColumnScope as any) == 'BespokeColumns') {
          if ((report as any).ColumnIds) {
            const newReport = Helper.cloneObject(report);
            const oldReport: any = report as any;
            newReport.ReportColumnScope = 'ScopeColumns';
            newReport.Scope = {
              ColumnIds: oldReport.ColumnIds,
            };
            LoggingHelper.LogAdaptableInfo(
              'Updating Report: ' + report.Name + ' to use new "Scope" object'
            );
            this.adaptable.api.exportApi.editReport(newReport);
          }
        }
      });
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemClickFunction: MenuItemDoClickFunction | undefined = undefined;
    if (this.canCreateMenuItem('ReadOnly')) {
      if (
        ArrayExtensions.IsNotNullOrEmpty(menuInfo.SelectedCellInfo.Columns) &&
        ArrayExtensions.IsNotNullOrEmpty(menuInfo.SelectedCellInfo.GridCells)
      ) {
        let selectedCellReport: Report = this.adaptable.api.exportApi.getReportByName(
          SELECTED_CELLS_REPORT
        );
        let clickFunction = () => {
          this.export(selectedCellReport, ExportDestination.Excel);
        };
        menuItemClickFunction = this.createColumnMenuItemClickFunction(
          'Export Selected Cells',
          StrategyConstants.ExportGlyph,
          clickFunction
        );
      }
    }

    return menuItemClickFunction;
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

    let cols: AdaptableColumn[];
    if (report.ReportColumnScope == 'CustomColumns') {
      cols = this.adaptable.api.scopeApi.getColumnsForScope(report.Scope);
    } else {
      cols = this.adaptable.api.columnApi.getColumnsFromFriendlyNames(reportCols);
    }
    this.adaptable.api.exportApi.exportDataToExcel(
      cols.map(c => c.FriendlyName),
      reportAsArray,
      report.Name
    );
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

  public getSpecialColumnReferences(specialColumnId: string, references: string[]): void {
    let reports: Report[] = this.adaptable.api.exportApi.getAllReports().filter((r: Report) =>
      this.adaptable.api.scopeApi
        .getColumnsForScope(r.Scope)
        .map(c => {
          return c.ColumnId;
        })
        .includes(specialColumnId)
    );

    if (ArrayExtensions.IsNotNullOrEmpty(reports)) {
      references.push(
        'Reports: ' +
          reports
            .map(r => {
              return r.Name;
            })
            .join(',')
      );
    }
  }
}
