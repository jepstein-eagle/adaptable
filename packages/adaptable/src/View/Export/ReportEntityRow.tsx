import * as React from 'react';

import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { Report } from '../../PredefinedConfig/ExportState';
import { EntityRowItem } from '../Components/EntityRowItem';
import icons from '../../components/icons';
import { ReactComponentLike } from 'prop-types';
import DropdownButton from '../../components/DropdownButton';
import { IReportService } from '../../Utilities/Services/Interface/IReportService';
import { LiveReport } from '../../Api/Events/LiveReportUpdated';

const ExportIcon = icons.export as ReactComponentLike;
export interface ReportEntityRowProps extends SharedEntityExpressionRowProps<ReportEntityRow> {
  LiveReports: LiveReport[];
  ReportService: IReportService;
  onExport: (exportDestination: ExportDestination) => void;
  onReportStopLive: (
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
  ) => void;
}

export class ReportEntityRow extends React.Component<ReportEntityRowProps, {}> {
  render(): any {
    let report: Report = this.props.AdaptableObject as Report;
    let csvMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.CSV),
      label: 'CSV',
    };
    let jsonMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.JSON),
      label: 'JSON',
    };
    let clipboardMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.Clipboard),
      label: 'Clipboard',
    };
    let openfinExcelMenuItem = this.props.LiveReports.find(x => x.Report.Uuid == report.Uuid)
      ? {
          onClick: () => this.props.onReportStopLive(ExportDestination.OpenfinExcel),
          label: 'Stop Live Openfin Excel',
        }
      : {
          onClick: () => this.props.onExport(ExportDestination.OpenfinExcel),
          label: 'Start Live Openfin Excel',
        };

    let glue42MenuItem = {
      onClick: () => this.props.onExport(ExportDestination.Glue42),
      label: 'Export to Excel (via Glue42)',
    };

    let isSystemReport: boolean = this.props.ReportService.IsSystemReport(report);
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={report.Name} />;
    colItems[1].Content = (
      <EntityRowItem
        Content={this.props.ReportService.GetReportColumnsDescription(report, this.props.Columns)}
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={this.props.ReportService.GetReportExpressionDescription(
          report,
          this.props.Columns
        )}
      />
    );

    const exportItems = [
      csvMenuItem,
      clipboardMenuItem,
      jsonMenuItem,
      this.props.ReportService.IsReportDestinationActive(ExportDestination.OpenfinExcel) &&
        openfinExcelMenuItem,

      this.props.ReportService.IsReportDestinationActive(ExportDestination.Glue42) &&
        glue42MenuItem,
    ].filter(x => !!x);

    let exportButton = (
      <DropdownButton tooltip="Export Report" variant="text" items={exportItems}>
        <ExportIcon />
      </DropdownButton>
    );

    colItems[3].Content = exportButton;

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(report)}
        overrideDisableEdit={isSystemReport}
        overrideDisableDelete={isSystemReport}
        overrideDisableShare={isSystemReport}
        showShare={this.props.TeamSharingActivated}
        shareClick={() => this.props.onShare()}
        EntityType="Report"
        AccessLevel={this.props.AccessLevel}
      />
    );

    colItems[4].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
