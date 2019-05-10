import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import {
  DropdownButton,
  MenuItem,
  SplitButton,
  OverlayTrigger,
  Tooltip,
  Glyphicon,
  InputGroup,
} from 'react-bootstrap';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
//import { IDashboardStrategyControlConfiguration } from '../../Strategy/Interface/IDashboardStrategy';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ExportDestination, SortOrder, AccessLevel, DashboardSize } from '../../Utilities/Enums';
import { OpenfinHelper } from '../../Utilities/Helpers/OpenfinHelper';
import { iPushPullHelper } from '../../Utilities/Helpers/iPushPullHelper';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { IReport } from '../../Utilities/Interface/BlotterObjects/IReport';
import { ReportHelper } from '../../Utilities/Helpers/ReportHelper';
import { PRIMARY_BSSTYLE, DEFAULT_BSSTYLE } from '../../Utilities/Constants/StyleConstants';
import { Glue42Helper } from '../../Utilities/Helpers/Glue42Helper';

interface ExportToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ExportToolbarControlComponent> {
  onApplyExport: (
    Report: string,
    exportDestination: ExportDestination
  ) => ExportRedux.ExportApplyAction;
  onSelectReport: (Report: string) => ExportRedux.ReportSelectAction;
  onNewReport: () => PopupRedux.PopupShowScreenAction;
  onEditReport: () => PopupRedux.PopupShowScreenAction;
  onReportStopLive: (
    Report: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ) => SystemRedux.ReportStopLiveAction;
  Columns: IColumn[];
  Reports: IReport[];
  SystemReports: IReport[];
  CurrentReport: string;
  LiveReports: ILiveReport[];
}

class ExportToolbarControlComponent extends React.Component<
  ExportToolbarControlComponentProps,
  {}
> {
  render(): any {
    const selectReportString: string = 'Select a Report';
    let allReports: IReport[] = this.props.SystemReports.concat(this.props.Reports);

    let cssClassName: string = this.props.cssClassName + '__export';
    let savedReport: IReport = allReports.find(s => s.Name == this.props.CurrentReport);
    let savedReportIndex = this.props.Reports.findIndex(s => s.Name == this.props.CurrentReport);

    let currentReportId = StringExtensions.IsNullOrEmpty(this.props.CurrentReport)
      ? selectReportString
      : this.props.CurrentReport;

    let availableReports: any[] = allReports
      .filter(s => s.Name != this.props.CurrentReport)
      .map((report, index) => {
        return (
          <MenuItem
            key={index}
            eventKey={index}
            onClick={() => this.onSelectedReportChanged(report.Name)}
          >
            {report.Name}
          </MenuItem>
        );
      });

    let csvMenuItem = (
      <MenuItem
        disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
        onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.CSV)}
        key={'csv'}
      >
        {'CSV'}
      </MenuItem>
    );
    let clipboardMenuItem = (
      <MenuItem
        disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
        onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.Clipboard)}
        key={'clipboard'}
      >
        {' '}
        {'Clipboard'}
      </MenuItem>
    );
    let openfinExcelMenuItem;
    if (
      this.props.LiveReports.find(
        x => x.Report == currentReportId && x.ExportDestination == ExportDestination.OpenfinExcel
      )
    ) {
      openfinExcelMenuItem = (
        <MenuItem
          disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
          onClick={() =>
            this.props.onReportStopLive(currentReportId, ExportDestination.OpenfinExcel)
          }
          key={'OpenfinExcel'}
        >
          {' '}
          {'Stop Live Openfin Excel'}
        </MenuItem>
      );
    } else {
      openfinExcelMenuItem = (
        <MenuItem
          disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
          onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.OpenfinExcel)}
          key={'OpenfinExcel'}
        >
          {' '}
          {'Start Live Openfin Excel'}
        </MenuItem>
      );
    }

    let iPushPullExcelMenuItem;
    if (
      this.props.LiveReports.find(
        x => x.Report == currentReportId && x.ExportDestination == ExportDestination.iPushPull
      )
    ) {
      iPushPullExcelMenuItem = (
        <MenuItem
          disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
          onClick={() => this.props.onReportStopLive(currentReportId, ExportDestination.iPushPull)}
          key={'IPPExcel'}
        >
          {' '}
          {'Stop Sync with iPushPull'}
        </MenuItem>
      );
    } else {
      iPushPullExcelMenuItem = (
        <MenuItem
          disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
          onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.iPushPull)}
          key={'IPPExcel'}
        >
          {' '}
          {'Start Sync with iPushPull'}
        </MenuItem>
      );
    }

    let glue42MenuItem = (
      <MenuItem
        disabled={this.props.AccessLevel == AccessLevel.ReadOnly}
        onClick={() => this.props.onApplyExport(currentReportId, ExportDestination.Glue42)}
        key={'Glue42'}
      >
        {' '}
        {'Export to Excel (via Glue42)'}
      </MenuItem>
    );

    let deleteMessage: string = "Are you sure you want to delete '";
    if (savedReport != null) {
      deleteMessage = deleteMessage + savedReport.Name + '?';
    }

    let exportDropdownStyle: string = this.props.UseSingleColourForButtons
      ? DEFAULT_BSSTYLE
      : PRIMARY_BSSTYLE;

    const exportGlyph: any = (
      <OverlayTrigger
        key={'exportOverlay'}
        overlay={<Tooltip id="tooltipButton"> {'Export'}</Tooltip>}
      >
        <Glyphicon glyph={StrategyConstants.ExportGlyph} />
      </OverlayTrigger>
    );

    let content = (
      <span>
        <InputGroup>
          <DropdownButton
            disabled={allReports.length == 0}
            style={{ minWidth: '120px' }}
            className={cssClassName}
            bsSize={this.props.DashboardSize}
            bsStyle={'default'}
            title={currentReportId}
            id="report"
          >
            {availableReports}
          </DropdownButton>

          {currentReportId != selectReportString && (
            <InputGroup.Button>
              <ButtonClear
                bsStyle={'default'}
                cssClassName={cssClassName}
                onClick={() => this.onSelectedReportChanged('')}
                size={this.props.DashboardSize}
                overrideTooltip="Clear Report"
                overrideDisableButton={currentReportId == selectReportString}
                DisplayMode="Glyph"
                AccessLevel={this.props.AccessLevel}
                showDefaultStyle={this.props.UseSingleColourForButtons}
              />
            </InputGroup.Button>
          )}
        </InputGroup>

        <span
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
        >
          <DropdownButton
            style={{ marginLeft: '5px' }}
            bsSize={this.props.DashboardSize}
            bsStyle={exportDropdownStyle}
            title={exportGlyph}
            id="exportDropdown"
            disabled={currentReportId == selectReportString}
          >
            {csvMenuItem}
            {clipboardMenuItem}
            {OpenfinHelper.isRunningInOpenfin() &&
              OpenfinHelper.isExcelOpenfinLoaded() &&
              openfinExcelMenuItem}
            {iPushPullHelper.isIPushPullLoaded() && iPushPullExcelMenuItem}
            {Glue42Helper.isRunningGlue42() && glue42MenuItem}
          </DropdownButton>

          <ButtonEdit
            style={{ marginLeft: '2px' }}
            onClick={() => this.props.onEditReport()}
            cssClassName={cssClassName}
            size={this.props.DashboardSize}
            overrideTooltip="Edit Report"
            overrideDisableButton={savedReport == null || ReportHelper.IsSystemReport(savedReport)}
            DisplayMode="Glyph"
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />

          <ButtonNew
            style={{ marginLeft: '2px' }}
            cssClassName={cssClassName}
            onClick={() => this.props.onNewReport()}
            size={this.props.DashboardSize}
            overrideTooltip="Create New Report"
            DisplayMode="Glyph"
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />

          <ButtonDelete
            style={{ marginLeft: '2px' }}
            cssClassName={cssClassName}
            size={this.props.DashboardSize}
            overrideTooltip="Delete Report"
            overrideDisableButton={savedReport == null || ReportHelper.IsSystemReport(savedReport)}
            DisplayMode="Glyph"
            ConfirmAction={ExportRedux.ReportDelete(savedReportIndex)}
            ConfirmationMsg={deleteMessage}
            ConfirmationTitle={'Delete Report'}
            AccessLevel={this.props.AccessLevel}
            showDefaultStyle={this.props.UseSingleColourForButtons}
          />
        </span>
      </span>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
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
    onApplyExport: (Report: string, exportDestination: ExportDestination) =>
      dispatch(ExportRedux.ExportApply(Report, exportDestination)),
    onSelectReport: (Report: string) => dispatch(ExportRedux.ReportSelect(Report)),
    onReportStopLive: (
      Report: string,
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
