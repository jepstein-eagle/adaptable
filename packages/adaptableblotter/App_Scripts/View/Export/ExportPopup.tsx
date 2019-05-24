import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ExportDestination, ReportColumnScope, ReportRowScope } from '../../Utilities/Enums';
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
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { IAdaptableBlotterObject } from '../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';
import { IReport } from '../../Utilities/Interface/BlotterObjects/IReport';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ReportWizard } from './Wizard/ReportWizard';

interface ExportPopupProps extends StrategyViewPopupProps<ExportPopupComponent> {
  Reports: IReport[];
  SystemReports: IReport[];
  LiveReports: ILiveReport[];
  CurrentReport: string;
  onApplyExport: (
    value: string,
    exportDestination: ExportDestination
  ) => ExportRedux.ExportApplyAction;
  onAddReport: (report: IReport) => ExportRedux.ReportAddAction;
  onEditReport: (report: IReport) => ExportRedux.ReportEditAction;
  onReportStopLive: (
    Report: string,
    exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
  ) => SystemRedux.ReportStopLiveAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class ExportPopupComponent extends React.Component<ExportPopupProps, EditableConfigEntityState> {
  constructor(props: ExportPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (this.props.PopupParams == 'New') {
      this.onNew();
    }
    if (this.props.PopupParams == 'Edit') {
      let selectedReport: IReport = this.props.Reports.find(
        a => a.Name == this.props.CurrentReport
      );
      this.onEdit(selectedReport);
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__export';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__export';

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
      (report: IReport, index) => {
        let reportIndex = index - this.props.SystemReports.length;
        return (
          <ReportEntityRow
            cssClassName={cssClassName}
            AdaptableBlotterObject={report}
            key={report.Uuid}
            colItems={colItems}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            LiveReports={this.props.LiveReports}
            onShare={() => this.props.onShare(report)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            onExport={exportDestination => this.onApplyExport(report.Name, exportDestination)}
            onReportStopLive={exportDestination =>
              this.props.onReportStopLive(report.Name, exportDestination)
            }
            onEdit={() => this.onEdit(report)}
            onDeleteConfirm={ExportRedux.ReportDelete(report)}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        cssClassName={cssClassName}
        onClick={() => this.onNew()}
        overrideTooltip="Create Report"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <div className={cssClassName}>
        <PanelWithButton
          cssClassName={cssClassName}
          headerText={StrategyConstants.ExportStrategyName}
          bsStyle="primary"
          glyphicon={StrategyConstants.ExportGlyph}
          infoBody={infoBody}
          button={newButton}
        >
          {Reports.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={Reports}
              allowOverflow={true}
            />
          ) : (
            <HelpBlock>
              Click 'New' to create a new Report. A Report is named group of columns and Unique
              values..
            </HelpBlock>
          )}

          {this.state.EditedAdaptableBlotterObject && (
            <ReportWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IReport}
              ModalContainer={this.props.ModalContainer}
              ConfigEntities={this.props.Reports}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              Blotter={this.props.Blotter}
              WizardStartIndex={this.state.WizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </div>
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
    let report: IReport = this.state.EditedAdaptableBlotterObject as IReport;
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
    let report = this.state.EditedAdaptableBlotterObject as IReport;
    if (StringExtensions.IsNullOrEmpty(report.Name)) {
      return false;
    }
    if (
      report.ReportRowScope == ReportRowScope.ExpressionRows &&
      ExpressionHelper.IsEmptyExpression(report.Expression)
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

  onEdit(ReportToEdit: IReport) {
    let clonedReportToEdit = Helper.cloneObject(ReportToEdit);
    this.setState({
      EditedAdaptableBlotterObject: clonedReportToEdit,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onApplyExport(Report: string, exportDestination: ExportDestination) {
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

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onApplyExport: (value: string, exportDestination: ExportDestination) =>
      dispatch(ExportRedux.ExportApply(value, exportDestination)),
    onAddReport: (report: IReport) => dispatch(ExportRedux.ReportAdd(report)),
    onEditReport: (report: IReport) => dispatch(ExportRedux.ReportEdit(report)),
    onReportStopLive: (
      Report: string,
      exportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
    ) => dispatch(SystemRedux.ReportStopLive(Report, exportDestination)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ExportStrategyId)),
  };
}

export let ExportPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportPopupComponent);
