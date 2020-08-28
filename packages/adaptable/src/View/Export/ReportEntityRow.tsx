import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { Report } from '../../PredefinedConfig/ExportState';
import { EntityRowItem } from '../Components/EntityRowItem';
import icons from '../../components/icons';
import { ReactComponentLike } from 'prop-types';
import DropdownButton from '../../components/DropdownButton';
import { IReportService } from '../../Utilities/Services/Interface/IReportService';
const ExportIcon = icons.export as ReactComponentLike;
export interface ReportEntityRowProps extends SharedEntityRowProps<ReportEntityRow> {
  onExport: (exportDestination: ExportDestination) => void;
}

export class ReportEntityRow extends React.Component<ReportEntityRowProps, {}> {
  render(): any {
    let report: Report = this.props.AdaptableObject as Report;
    let csvMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.CSV),
      label: 'CSV',
    };
    let excelMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.Excel),
      label: 'Excel',
    };
    let jsonMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.JSON),
      label: 'JSON',
    };
    let clipboardMenuItem: any = {
      onClick: () => this.props.onExport(ExportDestination.Clipboard),
      label: 'Clipboard',
    };
    let isSystemReport: boolean = this.props.api.internalApi
      .getReportService()
      .IsSystemReport(report);
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={report.Name} />;
    colItems[1].Content = (
      <EntityRowItem
        Content={this.props.api.internalApi
          .getReportService()
          .GetReportColumnScopeShortDescription(report)}
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={this.props.api.internalApi
          .getReportService()
          .GetReportExpressionDescription(report, this.props.api.columnApi.getColumns())}
      />
    );

    const exportItems = [
      this.props.api.exportApi.canExportToExcel() && excelMenuItem,
      ,
      csvMenuItem,
      clipboardMenuItem,
      jsonMenuItem,
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
        overrideDisableEdit={isSystemReport || report.ReportColumnScope == 'CustomColumns'}
        overrideDisableDelete={isSystemReport}
        overrideDisableShare={isSystemReport}
        showShare={this.props.TeamSharingActivated}
        shareClick={(description: string) => this.props.onShare(description)}
        EntityType="Report"
        AccessLevel={this.props.AccessLevel}
      />
    );

    colItems[4].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
