import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ReportEntityRow } from './ReportEntityRow';
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
import { ReportWizard } from './Wizard/ReportWizard';
import {
  ExportDestination,
  ReportRowScope,
  ReportColumnScope,
} from '../../PredefinedConfig/Common/Enums';
import EmptyContent from '../../components/EmptyContent';
import { LiveReport } from '../../Api/Events/LiveDataChanged';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface ExportPopupProps extends StrategyViewPopupProps<ExportPopupComponent> {
  Reports: Report[];
  SystemReports: Report[];
  LiveReports: LiveReport[];
  CurrentReport: string;
  onApplyExport: (
    report: Report,
    exportDestination: ExportDestination,
    isLiveReport: boolean
  ) => ExportRedux.ExportApplyAction;
  onAddReport: (report: Report) => ExportRedux.ReportAddAction;
  onEditReport: (report: Report) => ExportRedux.ReportEditAction;
  onReportStopLive: (
    report: Report,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
  ) => SystemRedux.ReportStopLiveAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

class ExportPopupComponent extends React.Component<ExportPopupProps, EditableConfigEntityState> {
  constructor(props: ExportPopupProps) {
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
          let selectedReport: Report = this.props.Reports.find(
            a => a.Name == this.props.CurrentReport
          );
          this.onEdit(selectedReport);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'Toolbar';
    }
  }

  render() {
    let infoBody: any[] = [
      "Create a 'Report' (or use a predefined one) and then export it to specified location.",
      <br />,
      <br />,
    ];

    let colItems: IColItem[] = [
      { Content: 'Report', Size: 3 },
      { Content: 'Columns', Size: 3 },
      { Content: 'Query Details', Size: 3 },
      { Content: 'Export', Size: 1 },
      { Content: '', Size: 2 },
    ];

    let Reports = this.props.SystemReports.concat(this.props.Reports).map(
      (report: Report, index) => {
        return (
          <ReportEntityRow
            AdaptableObject={report}
            key={report.Uuid}
            colItems={colItems}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            LiveReports={this.props.LiveReports}
            onShare={() => this.props.onShare(report)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            onExport={exportDestination => this.onApplyExport(report, exportDestination)}
            onReportStopLive={exportDestination =>
              this.props.onReportStopLive(report, exportDestination)
            }
            onEdit={() => this.onEdit(report)}
            onDeleteConfirm={ExportRedux.ReportDelete(report)}
            AccessLevel={this.props.AccessLevel}
            ReportService={this.props.Adaptable.ReportService}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Report"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <PanelWithButton
        headerText={StrategyConstants.ExportStrategyFriendlyName}
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.ExportGlyph}
        infoBody={infoBody}
        button={newButton}
      >
        {Reports.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={Reports} allowOverflow={true} />
        ) : (
          <EmptyContent>
            <p>
              Click 'New' to create a new Report. A Report is named group of columns and Unique
              values.
            </p>
          </EmptyContent>
        )}

        {this.state.EditedAdaptableObject && (
          <ReportWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as Report}
            ModalContainer={this.props.ModalContainer}
            ConfigEntities={this.props.Reports}
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
    let report: Report = this.state.EditedAdaptableObject as Report;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditReport(report);
    } else {
      this.props.onAddReport(report);
    }

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let report = this.state.EditedAdaptableObject as Report;
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

    return true;
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyReport(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(ReportToEdit: Report) {
    let clonedReportToEdit = Helper.cloneObject(ReportToEdit);
    this.setState({
      EditedAdaptableObject: clonedReportToEdit,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onApplyExport(report: Report, exportDestination: ExportDestination) {
    let isLiveReport: boolean = this.props.Adaptable.ReportService.IsReportLiveReport(
      report,
      exportDestination
    );
    this.props.onApplyExport(report, exportDestination, isLiveReport);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    CurrentReport: state.Export.CurrentReport,
    LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onApplyExport: (report: Report, exportDestination: ExportDestination, isLiveReport: boolean) =>
      dispatch(ExportRedux.ExportApply(report, exportDestination, isLiveReport)),
    onAddReport: (report: Report) => dispatch(ExportRedux.ReportAdd(report)),
    onEditReport: (report: Report) => dispatch(ExportRedux.ReportEdit(report)),
    onReportStopLive: (
      report: Report,
      exportDestination: ExportDestination.OpenfinExcel | ExportDestination.Glue42
    ) => dispatch(SystemRedux.ReportStopLive(report, exportDestination)),
    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ExportStrategyId)),
  };
}

export let ExportPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportPopupComponent);
