import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ReportEntityRow } from './ReportEntityRow';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  WizardStatus,
  EditableExpressionConfigEntityState,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
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
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import * as parser from '../../parser/src';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';

interface ExportPopupProps extends StrategyViewPopupProps<ExportPopupComponent> {
  Reports: Report[];
  SystemReports: Report[];
  CurrentReport: string;
  onApplyExport: (
    report: Report,
    exportDestination: ExportDestination
  ) => ExportRedux.ExportApplyAction;
  onAddReport: (report: Report) => ExportRedux.ReportAddAction;
  onEditReport: (report: Report) => ExportRedux.ReportEditAction;
  onAddSharedQuery: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryAddAction;

  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class ExportPopupComponent extends React.Component<
  ExportPopupProps,
  EditableExpressionConfigEntityState
> {
  constructor(props: ExportPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  shouldClosePopupOnFinishWizard: boolean = false;

  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action) {
        if (this.props.popupParams.action == 'New') {
          this.onNew();
        }
        if (this.props.popupParams.action == 'Edit') {
          let selectedReport: Report = this.props.Reports.find(
            a => a.Name == this.props.CurrentReport
          );
          this.onEdit(selectedReport);
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'Toolbar';
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
            adaptableObject={report}
            key={report.Uuid}
            colItems={colItems}
            api={this.props.api}
            onShare={description => this.props.onShare(report, description)}
            teamSharingActivated={this.props.teamSharingActivated}
            onExport={exportDestination => this.onApplyExport(report, exportDestination)}
            onEdit={() => this.onEdit(report)}
            onDeleteConfirm={ExportRedux.ReportDelete(report)}
            accessLevel={this.props.accessLevel}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Report"
        accessLevel={this.props.accessLevel}
        style={{
          color: 'var(--ab-color-text-on-add)',
          fill: 'var(--ab-color-text-on-add',
          background: 'var(--ab-color-action-add)',
        }}
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

        {this.state.editedAdaptableObject && (
          <ReportWizard
            editedAdaptableObject={this.state.editedAdaptableObject as Report}
            modalContainer={this.props.modalContainer}
            configEntities={this.props.Reports}
            api={this.props.api}
            onSetNewSharedQueryName={(newSharedQueryName: string) =>
              this.setState({
                newSharedQueryName: newSharedQueryName,
              })
            }
            onSetUseSharedQuery={(useSharedQuery: boolean) =>
              this.setState({
                useSharedQuery: useSharedQuery,
              })
            }
            wizardStartIndex={this.state.wizardStartIndex}
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
    this.resetState();

    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let report: Report = this.state.editedAdaptableObject as Report;

    if (StringExtensions.IsNotNullOrEmpty(this.state.newSharedQueryName)) {
      const SharedQueryId = createUuid();
      this.props.onAddSharedQuery({
        Uuid: SharedQueryId,
        Name: this.state.newSharedQueryName,
        Expression: report.Expression,
      });
      report.Expression = undefined;
      report.SharedQueryId = SharedQueryId;
    }

    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditReport(report);
    } else {
      this.props.onAddReport(report);
    }

    this.resetState();
  }

  canFinishWizard() {
    let report = this.state.editedAdaptableObject as Report;
    if (StringExtensions.IsNullOrEmpty(report.Name)) {
      return false;
    }
    if (report.ReportRowScope == ReportRowScope.ExpressionRows) {
      if (this.state.useSharedQuery && StringExtensions.IsNullOrEmpty(report.SharedQueryId)) {
        return false;
      }

      if (!this.state.useSharedQuery && StringExtensions.IsNullOrEmpty(report.Expression)) {
        return false;
      }
      if (!this.state.useSharedQuery && !parser.validateBoolean(report.Expression)) {
        return false;
      }
    }

    if (
      report.ReportColumnScope == ReportColumnScope.ScopeColumns &&
      ArrayExtensions.IsNullOrEmpty(this.props.api.scopeApi.getColumnsForScope(report.Scope))
    ) {
      return false;
    }

    return true;
  }

  resetState() {
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
      newSharedQueryName: EMPTY_STRING,
      useSharedQuery: false,
    });
  }

  onNew() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptyReport(),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(ReportToEdit: Report) {
    let clonedReportToEdit = Helper.cloneObject(ReportToEdit);
    this.setState({
      editedAdaptableObject: clonedReportToEdit,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onApplyExport(report: Report, exportDestination: ExportDestination) {
    this.props.onApplyExport(report, exportDestination);
  }
}

function mapStateToProps(state: AdaptableState): Partial<ExportPopupProps> {
  return {
    Reports: state.Export.Reports,
    SystemReports: state.System.SystemReports,
    CurrentReport: state.Export.CurrentReport,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ExportPopupProps> {
  return {
    onApplyExport: (report: Report, exportDestination: ExportDestination) =>
      dispatch(ExportRedux.ExportApply(report, exportDestination)),
    onAddReport: (report: Report) => dispatch(ExportRedux.ReportAdd(report)),
    onEditReport: (report: Report) => dispatch(ExportRedux.ReportEdit(report)),
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(QueryRedux.SharedQueryAdd(sharedQuery)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ExportStrategyId, description)
      ),
  };
}

export let ExportPopup = connect(mapStateToProps, mapDispatchToProps)(ExportPopupComponent);
