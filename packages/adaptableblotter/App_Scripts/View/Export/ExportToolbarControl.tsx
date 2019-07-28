import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
//import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';

import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';

import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

import { OpenfinHelper } from '../../Utilities/Helpers/OpenfinHelper';
import { iPushPullHelper } from '../../Utilities/Helpers/iPushPullHelper';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { Report } from '../../PredefinedConfig/RunTimeState/ExportState';
import { ReportHelper } from '../../Utilities/Helpers/ReportHelper';

import { Glue42Helper } from '../../Utilities/Helpers/Glue42Helper';
import { ExportDestination, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';

import Dropdown from '../../components/Dropdown';
import DropdownButton from '../../components/DropdownButton';
import icons from '../../components/icons';
import { ReactComponentLike } from 'prop-types';

const ExportIcon = icons.export as ReactComponentLike;

interface ExportToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ExportToolbarControlComponent> {
  onApplyExport: (
    Report: Report,
    exportDestination: ExportDestination
  ) => ExportRedux.ExportApplyAction;
  onSelectReport: (Report: string) => ExportRedux.ReportSelectAction;
  onNewReport: () => PopupRedux.PopupShowScreenAction;
  onEditReport: () => PopupRedux.PopupShowScreenAction;
  onReportStopLive: (
    Report: Report,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ) => SystemRedux.ReportStopLiveAction;
  Columns: IColumn[];
  Reports: Report[];
  SystemReports: Report[];
  CurrentReport: string;
  LiveReports: ILiveReport[];
}

class ExportToolbarControlComponent extends React.Component<
  ExportToolbarControlComponentProps,
  {}
> {
  render(): any {
    const selectReportString: string = 'Select a Report';
    let allReports: Report[] = this.props.SystemReports.concat(this.props.Reports);

    let currentReport: Report = this.props.Blotter.api.exportApi.getCurrentReport();

    let cssClassName: string = this.props.cssClassName + '__export';
    let savedReport: Report = allReports.find(s => s.Name == this.props.CurrentReport);
    let savedReportIndex = this.props.Reports.findIndex(s => s.Name == this.props.CurrentReport);

    let currentReportId = StringExtensions.IsNullOrEmpty(this.props.CurrentReport)
      ? selectReportString
      : this.props.CurrentReport;

    let availableReports: any[] = allReports.map((report, index) => {
      return {
        label: report.Name,
        value: report.Name,
      };
    });

    let csvMenuItem = {
      onClick: () => this.props.onApplyExport(currentReport, ExportDestination.CSV),
      label: 'CSV',
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
      ,
      OpenfinHelper.isRunningInOpenfin() &&
        OpenfinHelper.isExcelOpenfinLoaded() &&
        openfinExcelMenuItem,
      iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem,
      Glue42Helper.isRunningGlue42() && glue42MenuItem,
    ].filter(x => !!x);

    let content = (
      <Flex alignItems="stretch">
        <Dropdown
          disabled={allReports.length == 0}
          style={{ minWidth: 200 }}
          options={availableReports}
          placeholder="Select Report"
          onChange={(reportName: string) => this.onSelectedReportChanged(reportName)}
          value={currentReport ? currentReport.Name : null}
          showClearButton
        ></Dropdown>

        <DropdownButton
          mx={2}
          variant="text"
          disabled={currentReportId == selectReportString}
          items={exportItems}
        >
          <ExportIcon />
        </DropdownButton>
        <Flex
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
          alignItems="stretch"
        >
          <ButtonEdit
            onClick={() => this.props.onEditReport()}
            tooltip="Edit Report"
            disabled={savedReport == null || ReportHelper.IsSystemReport(savedReport)}
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonNew
            variant="text"
            children={null}
            onClick={() => this.props.onNewReport()}
            tooltip="Create New Report"
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonDelete
            tooltip="Delete Report"
            disabled={savedReport == null || ReportHelper.IsSystemReport(savedReport)}
            ConfirmAction={ExportRedux.ReportDelete(savedReport)}
            ConfirmationMsg={deleteMessage}
            ConfirmationTitle={'Delete Report'}
            AccessLevel={this.props.AccessLevel}
          />
        </Flex>
      </Flex>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        headerText={StrategyConstants.ExportStrategyName}
        glyphicon={StrategyConstants.ExportGlyph}
        onClose={() => this.props.onClose(StrategyConstants.ExportStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  onSelectedReportChanged(reportName: string) {
    this.props.onSelectReport(reportName);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    CurrentReport: state.Export.CurrentReport,
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onApplyExport: (Report: Report, exportDestination: ExportDestination) =>
      dispatch(ExportRedux.ExportApply(Report, exportDestination)),
    onSelectReport: (Report: string) => dispatch(ExportRedux.ReportSelect(Report)),
    onReportStopLive: (
      Report: Report,
      exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
    ) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
    onNewReport: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ExportStrategyId,
          ScreenPopups.ExportPopup,
          'New'
        )
      ),
    onEditReport: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ExportStrategyId,
          ScreenPopups.ExportPopup,
          'Edit'
        )
      ),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ExportStrategyId, ScreenPopups.ExportPopup)
      ),
  };
}

export let ExportToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportToolbarControlComponent);
