import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Report } from '../../PredefinedConfig/ExportState';
import { ExportDestination, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import DropdownButton from '../../components/DropdownButton';
import icons from '../../components/icons';
import join from '../../components/utils/join';
import { ReactComponentLike } from 'prop-types';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableBlotterToolPanel } from '../../PredefinedConfig/ToolPanelState';
import {
  LiveReport,
  LiveReportUpdatedInfo,
  LiveReportUpdatedEventArgs,
} from '../../Api/Events/LiveReportUpdated';

const ExportIcon = icons.export as ReactComponentLike;

interface ExportToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<ExportToolPanelComponent> {
  onApplyExport: (
    Report: Report,
    exportDestination: ExportDestination
  ) => ExportRedux.ExportApplyAction;
  onSelectReport: (Report: string) => ExportRedux.ReportSelectAction;
  onNewReport: () => PopupRedux.PopupShowScreenAction;
  onEditReport: () => PopupRedux.PopupShowScreenAction;
  onReportStopLive: (
    Report: Report,
    exportDestination:
      | ExportDestination.OpenfinExcel
      | ExportDestination.iPushPull
      | ExportDestination.Glue42
  ) => SystemRedux.ReportStopLiveAction;
  Columns: AdaptableBlotterColumn[];
  Reports: Report[] | undefined;
  SystemReports: Report[] | undefined;
  CurrentReport: string | undefined;
  LiveReports: LiveReport[];
}

interface ExportToolPanelComponentState {
  IsMinimised: boolean;
}

class ExportToolPanelComponent extends React.Component<
  ExportToolPanelComponentProps,
  ExportToolPanelComponentState
> {
  constructor(props: ExportToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

  public componentDidMount() {
    if (this.props.Blotter) {
      this.props.Blotter.api.eventApi.on(
        'LiveReportUpdated',
        (liveReportUpdatedEventArgs: LiveReportUpdatedEventArgs) => {
          let liveReportUpdatedInfo: LiveReportUpdatedInfo = liveReportUpdatedEventArgs.data[0].id;
          if (
            liveReportUpdatedInfo.LiveReportTrigger == 'Connected' ||
            liveReportUpdatedInfo.LiveReportTrigger == 'Disconnected'
          ) {
            this.forceUpdate();
          }
        }
      );
    }
  }

  render(): any {
    const selectReportString: string = 'Select a Report';
    let allReports: Report[] = this.props.SystemReports!.concat(this.props.Reports);

    let currentReport: Report = this.props.BlotterApi.exportApi.getCurrentReport();

    let savedReport: Report | undefined = allReports.find(s => s.Name == this.props.CurrentReport);

    let currentReportId = StringExtensions.IsNullOrEmpty(this.props.CurrentReport)
      ? selectReportString
      : this.props.CurrentReport;

    let availableReports: any[] = allReports.map(report => {
      return {
        label: report.Name,
        value: report.Name,
      };
    });

    let csvMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.CSV),
      label: 'CSV',
    };

    let jsonMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.JSON),
      label: 'JSON',
    };
    let clipboardMenuItem = {
      label: 'Clipboard',
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.Clipboard),
    };

    let openfinExcelMenuItem;
    if (
      this.props.LiveReports.find(
        x => x.Report == currentReport && x.ExportDestination == ExportDestination.OpenfinExcel
      )
    ) {
      openfinExcelMenuItem = {
        onClick: () => this.props.onReportStopLive(currentReport, ExportDestination.OpenfinExcel),
        label: 'Stop Live Openfin Excel',
      };
    } else {
      openfinExcelMenuItem = {
        onClick: () => this.props.onApplyExport(currentReport, ExportDestination.OpenfinExcel),

        label: 'Start Live Openfin Excel',
      };
    }

    let iPushPullExcelMenuItem;
    if (
      this.props.LiveReports.find(
        x => x.Report == currentReport && x.ExportDestination == ExportDestination.iPushPull
      )
    ) {
      iPushPullExcelMenuItem = {
        onClick: () => this.props.onReportStopLive(currentReport, ExportDestination.iPushPull),
        label: 'Stop Sync with iPushPull',
      };
    } else {
      iPushPullExcelMenuItem = {
        onClick: () => this.props.onApplyExport(currentReport, ExportDestination.iPushPull),
        label: 'Start Sync with iPushPull',
      };
    }

    let glue42MenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.Glue42),
      label: 'Export to Excel (via Glue42)',
    };

    let deleteMessage: string = "Are you sure you want to delete '";
    if (savedReport != null) {
      deleteMessage = deleteMessage + savedReport.Name + '?';
    }

    const exportItems = [
      csvMenuItem,
      clipboardMenuItem,
      jsonMenuItem,
      this.props.Blotter.ReportService.IsReportDestinationActive(ExportDestination.OpenfinExcel) &&
        openfinExcelMenuItem,
      this.props.Blotter.ReportService.IsReportDestinationActive(ExportDestination.iPushPull) &&
        iPushPullExcelMenuItem,
      this.props.Blotter.ReportService.IsReportDestinationActive(ExportDestination.Glue42) &&
        glue42MenuItem,
    ].filter(x => !!x);

    let content = (
      <Flex flexDirection="column" alignItems="stretch" className="ab-ToolPanel__Export__wrap">
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Export__wrap">
          <Dropdown
            disabled={allReports.length == 0}
            style={{ minWidth: 160 }}
            options={availableReports}
            className="ab-ToolPanel__Export__select"
            placeholder="Select Report"
            onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
            value={currentReport ? currentReport.Name : null}
            showClearButton
            marginRight={2}
          ></Dropdown>
        </Flex>
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Export_wrap">
          <DropdownButton
            className="ab-ToolPanel__Export__export"
            columns={['label']}
            variant="text"
            disabled={currentReportId == selectReportString}
            items={exportItems}
          >
            <ExportIcon />
          </DropdownButton>
          <Flex
            className={join(
              this.props.AccessLevel == AccessLevel.ReadOnly
                ? GeneralConstants.READ_ONLY_STYLE
                : '',
              'ab-ToolPanel__Export__controls'
            )}
            alignItems="stretch"
          >
            <ButtonEdit
              onClick={() => this.props.onEditReport()}
              tooltip="Edit Report"
              className="ab-ToolPanel__Export__edit"
              disabled={
                savedReport == null || this.props.Blotter.ReportService.IsSystemReport(savedReport)
              }
              AccessLevel={this.props.AccessLevel}
            />

            <ButtonNew
              variant="text"
              className="ab-ToolPanel__Export__new"
              tone="neutral"
              children={null}
              onClick={() => this.props.onNewReport()}
              tooltip="Create New Report"
              AccessLevel={this.props.AccessLevel}
            />

            <ButtonDelete
              tooltip="Delete Report"
              className="ab-ToolPanel__Export__delete"
              disabled={
                savedReport == null || this.props.Blotter.ReportService.IsSystemReport(savedReport)
              }
              ConfirmAction={ExportRedux.ReportDelete(savedReport as Report)}
              ConfirmationMsg={deleteMessage}
              ConfirmationTitle={'Delete Report'}
              AccessLevel={this.props.AccessLevel}
            />
          </Flex>
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Export"
        headerText={StrategyConstants.ExportStrategyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Export')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }

  onSelectedReportChanged(reportName: string) {
    this.props.onSelectReport(reportName);
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    CurrentReport: state.Export.CurrentReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onApplyExport: (Report: Report, exportDestination: ExportDestination) =>
      dispatch(ExportRedux.ExportApply(Report, exportDestination)),
    onSelectReport: (Report: string) => dispatch(ExportRedux.ReportSelect(Report)),
    onReportStopLive: (
      Report: Report,
      exportDestination:
        | ExportDestination.OpenfinExcel
        | ExportDestination.iPushPull
        | ExportDestination.Glue42
    ) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
    onNewReport: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup, {
          action: 'New',
          source: 'Toolbar',
        })
      ),
    onEditReport: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup, {
          action: 'Edit',
          source: 'Toolbar',
        })
      ),
    onClose: (toolPanel: AdaptableBlotterToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup)
      ),
  };
}

export let ExportToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportToolPanelComponent);
