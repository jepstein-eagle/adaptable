import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as IPushPullRedux from '../../Redux/ActionsReducers/IPushPullRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { Report } from '../../PredefinedConfig/ExportState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import {
  ExportDestination,
  ReportRowScope,
  ReportColumnScope,
} from '../../PredefinedConfig/Common/Enums';
import EmptyContent from '../../components/EmptyContent';
import { LiveReport } from '../../Api/Events/LiveReportUpdated';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { IPushPullReport, IPushPullDomain } from '../../PredefinedConfig/IPushPullState';
import { IPushPullReportEntityRow } from './IPushPullReportEntityRow';
import { IPushPullReportWizard } from './Wizard/IPushPullReportWizard';

interface IPushPullPopupProps extends StrategyViewPopupProps<IPushPullPopupComponent> {
  IPushPullReports: IPushPullReport[];
  LiveReports: LiveReport[];
  CurrentIPushPullReport: string;
  onIPushPullExport: (
    report: IPushPullReport,
    isLiveReport: boolean
  ) => IPushPullRedux.IPushPullExportAction;
  onAddIPushPullReport: (report: IPushPullReport) => IPushPullRedux.IPushPullReportAddAction;
  onEditIPushPullReport: (report: IPushPullReport) => IPushPullRedux.IPushPullReportEditAction;
  onReportStopLive: (report: Report) => SystemRedux.ReportStopLiveAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class IPushPullPopupComponent extends React.Component<
  IPushPullPopupProps,
  EditableConfigEntityState
> {
  constructor(props: IPushPullPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  shouldClosePopupOnFinishWizard: boolean = false;

  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action) {
        if (this.props.PopupParams.action == 'New') {
          this.onNew();
        }
        if (this.props.PopupParams.action == 'Edit') {
          let selectedReport: IPushPullReport = this.props.IPushPullReports.find(
            a => a.Report.Name == this.props.CurrentIPushPullReport
          );
          this.onEdit(selectedReport);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
    }
  }

  render() {
    let infoBody: any[] = ['Create a report to send to iPushPull.', <br />, <br />];

    let colItems: IColItem[] = [
      { Content: 'Report', Size: 3 },
      { Content: 'Columns', Size: 3 },
      { Content: 'Query Details', Size: 3 },
      { Content: 'Export', Size: 1 },
      { Content: '', Size: 2 },
    ];

    let iPushPullReports = ArrayExtensions.IsNotNullOrEmpty(this.props.IPushPullReports)
      ? this.props.IPushPullReports.map((iPushPullReport: IPushPullReport, index) => {
          let isLiveReport: boolean = this.props.Adaptable.api.iPushPullApi.isIPushPullReportLive(
            iPushPullReport
          );
          return (
            <IPushPullReportEntityRow
              AdaptableObject={iPushPullReport}
              key={iPushPullReport.Uuid}
              colItems={colItems}
              Columns={this.props.Columns}
              IsLiveReport={isLiveReport}
              UserFilters={this.props.UserFilters}
              onShare={() => this.props.onShare(iPushPullReport)}
              TeamSharingActivated={this.props.TeamSharingActivated}
              onIPushPullExport={() => this.onApplyExport(iPushPullReport)}
              onReportStopLive={() => this.props.onReportStopLive(iPushPullReport.Report)}
              onEdit={() => this.onEdit(iPushPullReport)}
              onDeleteConfirm={IPushPullRedux.IPushPullReportDelete(iPushPullReport)}
              AccessLevel={this.props.AccessLevel}
              ReportService={this.props.Adaptable.ReportService}
            />
          );
        })
      : null;

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Report"
        AccessLevel={this.props.AccessLevel}
      />
    );

    let iPushPullDomainPages: IPushPullDomain[] = this.props.Adaptable.api.iPushPullApi.getIPushPullDomainsPages();

    return (
      <PanelWithButton
        headerText={StrategyConstants.IPushPullStrategyFriendlyName}
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.IPushPullGlyph}
        infoBody={infoBody}
        button={newButton}
      >
        {ArrayExtensions.IsNotNullOrEmpty(iPushPullReports) ? (
          <AdaptableObjectCollection
            colItems={colItems}
            items={iPushPullReports}
            allowOverflow={true}
          />
        ) : (
          <EmptyContent>
            <p>
              Click 'New' to create a new iPushPull Report. An iPushPull Report is a 'normal' report
              but which is sent to iPushPull and can be Live.
            </p>
          </EmptyContent>
        )}

        {this.state.EditedAdaptableObject && (
          <IPushPullReportWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as Report}
            ModalContainer={this.props.ModalContainer}
            ConfigEntities={this.props.IPushPullReports}
            IPushPullDomainPages={iPushPullDomainPages}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            Adaptable={this.props.Adaptable}
            WizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
          />
        )}
      </PanelWithButton>
    );
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });

    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let iPushPullReport: IPushPullReport = this.state.EditedAdaptableObject as IPushPullReport;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditIPushPullReport(iPushPullReport);
    } else {
      this.props.onAddIPushPullReport(iPushPullReport);
    }

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let iPushPullReport: IPushPullReport = this.state.EditedAdaptableObject as IPushPullReport;
    let report: Report = iPushPullReport.Report;
    if (StringExtensions.IsNullOrEmpty(report.Name)) {
      return false;
    }
    if (
      report.ReportRowScope == ReportRowScope.ExpressionRows &&
      ExpressionHelper.IsNullOrEmptyExpression(report.Expression)
    ) {
      return false;
    }
    if (
      report.ReportColumnScope == ReportColumnScope.BespokeColumns &&
      ArrayExtensions.IsNullOrEmpty(report.ColumnIds)
    ) {
      return false;
    }
    if (report.AutoExport != null) {
      if (report.AutoExport.Schedule.Hour == null || report.AutoExport.Schedule.Minute == null) {
        return false;
      }
      if (
        report.AutoExport.Schedule.OneOffDate == null &&
        ArrayExtensions.IsEmpty(report.AutoExport.Schedule.DaysOfWeek)
      ) {
        return false;
      }
    }
    if (StringExtensions.IsNullOrEmpty(iPushPullReport.Folder)) {
      return false;
    }
    if (StringExtensions.IsNullOrEmpty(iPushPullReport.Page)) {
      return false;
    }
    return true;
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyIPushPullReport(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(reportToEdit: IPushPullReport) {
    let clonedReportToEdit: IPushPullReport = Helper.cloneObject(reportToEdit);
    this.setState({
      EditedAdaptableObject: clonedReportToEdit,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onApplyExport(iPushPullReport: IPushPullReport) {
    let isLiveReport: boolean = this.props.Adaptable.api.iPushPullApi.isIPushPullReportLive(
      iPushPullReport
    );
    this.props.onIPushPullExport(iPushPullReport, isLiveReport);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    IPushPullReports: state.IPushPull.IPushPullReports,
    CurrentIPushPullReport: state.IPushPull.CurrentIPushPullReport,
    LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onIPushPullExport: (report: IPushPullReport, isLiveReport: boolean) =>
      dispatch(IPushPullRedux.IPushPullExport(report, isLiveReport)),
    onAddIPushPullReport: (report: IPushPullReport) =>
      dispatch(IPushPullRedux.IPushPullReportAdd(report)),
    onEditIPushPullReport: (report: IPushPullReport) =>
      dispatch(IPushPullRedux.IPushPullReportEdit(report)),
    onReportStopLive: (report: Report) =>
      dispatch(SystemRedux.ReportStopLive(report, ExportDestination.iPushPull)),
    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.IPushPullStrategyId)),
  };
}

export let IPushPullPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(IPushPullPopupComponent);
