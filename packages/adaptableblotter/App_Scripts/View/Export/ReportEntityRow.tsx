import * as React from 'react';
import { DropdownButton, MenuItem, Col, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ReportHelper } from '../../Utilities/Helpers/ReportHelper';
import { OpenfinHelper } from '../../Utilities/Helpers/OpenfinHelper';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { iPushPullHelper } from '../../Utilities/Helpers/iPushPullHelper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { Report } from '../../PredefinedConfig/IUserState/ExportState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface ReportEntityRowProps extends SharedEntityExpressionRowProps<ReportEntityRow> {
  LiveReports: ILiveReport[];
  onExport: (exportDestination: ExportDestination) => void;
  onReportStopLive: (
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ) => void;
}

export class ReportEntityRow extends React.Component<ReportEntityRowProps, {}> {
  render(): any {
    let report: Report = this.props.AdaptableBlotterObject as Report;
    let csvMenuItem: any = (
      <MenuItem onClick={() => this.props.onExport(ExportDestination.CSV)} key={'csv'}>
        {'Export to CSV'}
      </MenuItem>
    );
    let clipboardMenuItem: any = (
      <MenuItem onClick={() => this.props.onExport(ExportDestination.Clipboard)} key={'clipboard'}>
        {' '}
        {'Export to Clipboard'}
      </MenuItem>
    );
    let openfinExcelMenuItem = this.props.LiveReports.find(x => x.Report.Uuid == report.Uuid) ? (
      <MenuItem
        onClick={() => this.props.onReportStopLive(ExportDestination.OpenfinExcel)}
        key={'OpenfinExcel'}
      >
        {' '}
        {'Stop Live Openfin Excel'}
      </MenuItem>
    ) : (
      <MenuItem
        onClick={() => this.props.onExport(ExportDestination.OpenfinExcel)}
        key={'OpenfinExcel'}
      >
        {' '}
        {'Start Live Openfin Excel'}
      </MenuItem>
    );

    let iPushPullExcelMenuItem = this.props.LiveReports.find(
      x => x.Report.Uuid == report.Uuid && x.ExportDestination == ExportDestination.iPushPull
    ) ? (
      <MenuItem
        onClick={() => this.props.onReportStopLive(ExportDestination.iPushPull)}
        key={'IPPExcel'}
      >
        {' '}
        {'Stop Sync with iPushPull'}
      </MenuItem>
    ) : (
      <MenuItem onClick={() => this.props.onExport(ExportDestination.iPushPull)} key={'IPPExcel'}>
        {' '}
        {'Start Sync with iPushPull'}
      </MenuItem>
    );

    let exportGlyph: any = <Glyphicon glyph={StrategyConstants.ExportGlyph} />;
    // let hasLive = this.props.LiveReports.find(x => x.Report == report.Name && x.ExportDestination == ExportDestination.iPushPull) != null
    let isSystemReport: boolean = ReportHelper.IsSystemReport(report);

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={report.Name} />;
    colItems[1].Content = (
      <EntityRowItem
        Content={ReportHelper.GetReportColumnsDescription(report, this.props.Columns)}
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={ReportHelper.GetReportExpressionDescription(report, this.props.Columns)}
      />
    );

    let exportButton = (
      <OverlayTrigger overlay={<Tooltip id="tooltipButton"> {'Export Report'}</Tooltip>}>
        <DropdownButton
          bsSize={'xsmall'}
          bsStyle={'default'}
          title={exportGlyph}
          key={report.Name}
          id={report.Name}
        >
          {csvMenuItem}
          {clipboardMenuItem}
          {OpenfinHelper.isRunningInOpenfin() &&
            OpenfinHelper.isExcelOpenfinLoaded() &&
            openfinExcelMenuItem}
          {iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem}
        </DropdownButton>
      </OverlayTrigger>
    );

    colItems[3].Content = exportButton;

    let buttons: any = (
      <EntityListActionButtons
        cssClassName={this.props.cssClassName}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(report)}
        overrideDisableEdit={isSystemReport}
        overrideDisableDelete={isSystemReport}
        overrideDisableShare={isSystemReport}
        showShare={this.props.TeamSharingActivated}
        shareClick={() => this.props.onShare()}
        EntityType="Report"
      />
    );

    colItems[4].Content = buttons;

    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }
}
