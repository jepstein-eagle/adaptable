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
import { IPushPullReport } from '../../PredefinedConfig/IPushPullState';
import { ButtonExport } from '../Components/Buttons/ButtonExport';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { Flex } from 'rebass';
import { ButtonStop } from '../Components/Buttons/ButtonStop';
import { ButtonPlay } from '../Components/Buttons/ButtonPlay';

export interface IPushPullReportEntityRowProps
  extends SharedEntityExpressionRowProps<IPushPullReportEntityRow> {
  IsLiveReport: boolean;
  ReportService: IReportService;
  onIPushPullExport: (iPushPulleport: IPushPullReport) => void;
  onReportStopLive: () => void;
}

export class IPushPullReportEntityRow extends React.Component<IPushPullReportEntityRowProps, {}> {
  render(): any {
    let iPushPullReport: IPushPullReport = this.props.AdaptableObject as IPushPullReport;
    let report: Report = iPushPullReport.Report;

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

    colItems[3].Content = (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__Export__wrap">
        <ButtonExport
          marginLeft={1}
          className="ab-DashboardToolbar__ColumnFilter__clear"
          onClick={() => this.props.onIPushPullExport(iPushPullReport)}
          tooltip="Send Snapshot to iPushPull"
          disabled={this.props.IsLiveReport || iPushPullReport == null}
          AccessLevel={this.props.AccessLevel}
        />
        {this.props.IsLiveReport ? (
          <ButtonStop
            marginLeft={1}
            className="ab-DashboardToolbar__ColumnFilter__clear"
            onClick={() => this.props.onReportStopLive()}
            tooltip="Stop sync with iPushPull"
            disabled={iPushPullReport == null}
            AccessLevel={this.props.AccessLevel}
          />
        ) : (
          <ButtonPlay
            marginLeft={1}
            className="ab-DashboardToolbar__ColumnFilter__clear"
            onClick={() => this.props.onIPushPullExport(iPushPullReport)}
            tooltip="Start Sync with iPushPull"
            disabled={iPushPullReport == null}
            AccessLevel={this.props.AccessLevel}
          />
        )}
      </Flex>
    );

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(report)}
        showShare={this.props.TeamSharingActivated}
        shareClick={() => this.props.onShare()}
        EntityType="IPushPullReport"
        AccessLevel={this.props.AccessLevel}
      />
    );

    colItems[4].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
