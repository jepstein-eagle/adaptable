import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
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
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { Report } from '../../PredefinedConfig/ExportState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ReportWizard } from './Wizard/ReportWizard';
import {
  ExportDestination,
  ReportRowScope,
  ReportColumnScope,
} from '../../PredefinedConfig/Common/Enums';
import SimpleButton from '../../components/SimpleButton';
import EmptyContent from '../../components/EmptyContent';

interface ExportPopupProps extends StrategyViewPopupProps<ExportPopupComponent> {
  Reports: Report[];
  SystemReports: Report[];
  LiveReports: ILiveReport[];
  CurrentReport: string;
  onApplyExport: (
    report: Report,
    exportDestination: ExportDestination
  ) => ExportRedux.ExportApplyAction;
  onAddReport: (report: Report) => ExportRedux.ReportAddAction;
  onEditReport: (report: Report) => ExportRedux.ReportEditAction;
  onReportStopLive: (
    Report: Report,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ) => SystemRedux.ReportStopLiveAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class ExportPopupComponent extends React.Component<ExportPopupProps, EditableConfigEntityState> {
  constructor(props: ExportPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

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
            AdaptableBlotterObject={report}
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
            ReportService={this.props.Blotter.ReportService}
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
        headerText={StrategyConstants.ExportStrategyName}
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

        {this.state.EditedAdaptableBlotterObject && (
          <ReportWizard
            EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as Report}
            ModalContainer={this.props.ModalContainer}
            ConfigEntities={this.props.Reports}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            Blotter={this.props.Blotter}
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
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let report: Report = this.state.EditedAdaptableBlotterObject as Report;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditReport(report);
    } else {
      this.props.onAddReport(report);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let report = this.state.EditedAdaptableBlotterObject as Report;
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
    return true;
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyReport(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(ReportToEdit: Report) {
    let clonedReportToEdit = Helper.cloneObject(ReportToEdit);
    this.setState({
      EditedAdaptableBlotterObject: clonedReportToEdit,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onApplyExport(Report: Report, exportDestination: ExportDestination) {
    this.props.onApplyExport(Report, exportDestination);
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    CurrentReport: state.Export.CurrentReport,
    LiveReports: state.System.CurrentLiveReports,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onApplyExport: (report: Report, exportDestination: ExportDestination) =>
      dispatch(ExportRedux.ExportApply(report, exportDestination)),
    onAddReport: (report: Report) => dispatch(ExportRedux.ReportAdd(report)),
    onEditReport: (report: Report) => dispatch(ExportRedux.ReportEdit(report)),
    onReportStopLive: (
      Report: Report,
      exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
    ) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ExportStrategyId)),
  };
}

export let ExportPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportPopupComponent);
