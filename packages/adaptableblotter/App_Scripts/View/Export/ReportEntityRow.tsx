import * as React from 'react';

import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ReportHelper } from '../../Utilities/Helpers/ReportHelper';
import { OpenfinHelper } from '../../Utilities/Helpers/OpenfinHelper';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { iPushPullHelper } from '../../Utilities/Helpers/iPushPullHelper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityRowItem } from '../Components/EntityRowItem';

import icons from '../../components/icons';
import { ReactComponentLike } from 'prop-types';
import DropdownButton from '../../components/DropdownButton';

const ExportIcon = icons.export as ReactComponentLike;
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
    let csvMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.CSV),
      label: 'Export to CSV',
    };
    let clipboardMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.Clipboard),
      label: 'Export to Clipboard',
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

    let iPushPullExcelMenuItem = this.props.LiveReports.find(
      x => x.Report.Uuid == report.Uuid && x.ExportDestination == ExportDestination.iPushPull
    )
      ? {
          onClick: () => this.props.onReportStopLive(ExportDestination.iPushPull),
          label: 'Stop Sync with iPushPull',
        }
      : {
          onClick: () => this.props.onExport(ExportDestination.iPushPull),
          label: 'Start Sync with iPushPull',
        };

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

    const exportItems = [
      csvMenuItem,
      clipboardMenuItem,
      OpenfinHelper.isRunningInOpenfin() &&
        OpenfinHelper.isExcelOpenfinLoaded() &&
        openfinExcelMenuItem,
      iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem,
    ].filter(x => !!x);

    let exportButton = (
      <DropdownButton tooltip="Export Report" variant="text" items={exportItems}>
        <ExportIcon />
      </DropdownButton>
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
