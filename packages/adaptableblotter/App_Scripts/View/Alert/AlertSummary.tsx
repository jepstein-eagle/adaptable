import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AlertWizard } from './Wizard/AlertWizard';
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { AlertHelper } from '../../Utilities/Helpers/AlertHelper';
import { IAlertDefinition } from '../../PredefinedConfig/IUserState Interfaces/AlertState';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';

export interface AlertSummaryProps extends StrategySummaryProps<AlertSummaryComponent> {
  Alerts: IAlertDefinition[];
  onAddAlert: (Alert: IAlertDefinition) => AlertRedux.AlertDefinitionAddAction;
  onEditAlert: (Alert: IAlertDefinition) => AlertRedux.AlertDefinitionEditAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class AlertSummaryComponent extends React.Component<
  AlertSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: AlertSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__Alert';
    let strategySummaries: any = [];

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.AlertStrategyName}
        cssClassName={this.props.cssClassName}
        StrategyId={StrategyConstants.AlertStrategyId}
        StrategySummary={Helper.ReturnItemCount(
          this.props.Alerts.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId),
          StrategyConstants.AlertStrategyName
        )}
        onNew={() => this.onNew()}
        NewButtonTooltip={StrategyConstants.AlertStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    this.props.Alerts.map((item, index) => {
      if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
        let detailRow = (
          <StrategyDetail
            cssClassName={this.props.cssClassName}
            key={'CV' + index}
            Item1={'something here?'}
            Item2={AlertHelper.createAlertDescription(item, this.props.Columns)}
            ConfigEnity={item}
            EntityType={StrategyConstants.AlertStrategyName}
            showShare={this.props.TeamSharingActivated}
            onEdit={() => this.onEdit(item)}
            onShare={() => this.props.onShare(item)}
            onDelete={AlertRedux.AlertDefinitionDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.EditedAdaptableBlotterObject && (
          <AlertWizard
            cssClassName={cssWizardClassName}
            EditedAdaptableBlotterObject={
              this.state.EditedAdaptableBlotterObject as IAlertDefinition
            }
            ConfigEntities={null}
            ModalContainer={this.props.ModalContainer}
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
      </div>
    );
  }

  onNew() {
    let configEntity: IAlertDefinition = ObjectFactory.CreateEmptyAlertDefinition();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableBlotterObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(Alert: IAlertDefinition) {
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(Alert),
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddAlert(this.state.EditedAdaptableBlotterObject as IAlertDefinition);
    } else {
      this.props.onEditAlert(this.state.EditedAdaptableBlotterObject as IAlertDefinition);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    //  let alertDefinition = this.state.EditedAdaptableBlotterObject as IAlertDefinition
    return true;
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    Alerts: state.Alert.AlertDefinitions,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddAlert: (Alert: IAlertDefinition) => dispatch(AlertRedux.AlertDefinitionAdd(Alert)),
    onEditAlert: (Alert: IAlertDefinition) => dispatch(AlertRedux.AlertDefinitionEdit(Alert)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId)),
  };
}

export let AlertSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertSummaryComponent);
