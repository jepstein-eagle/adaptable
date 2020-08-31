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
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface AlertSummaryProps extends StrategySummaryProps<AlertSummaryComponent> {
  Alerts: AlertDefinition[];
  onAddAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionAddAction;
  onEditAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionEditAction;
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
    let strategySummaries: any = [];

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.AlertStrategyFriendlyName}
        functionName={StrategyConstants.AlertStrategyId}
        strategySummary={Helper.ReturnItemCount(
          this.props.Alerts.filter(item => item.ColumnId == this.props.summarisedColumn.ColumnId),
          StrategyConstants.AlertStrategyFriendlyName
        )}
        onNew={() => this.onNew()}
        newButtonTooltip={StrategyConstants.AlertStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    this.props.Alerts.map((item, index) => {
      if (item.ColumnId == this.props.summarisedColumn.ColumnId) {
        let detailRow = (
          <StrategyDetail
            key={'CV' + index}
            item1={'something here?'}
            item2={this.props.api.internalApi
              .getStrategyService()
              .createAlertDescription(item, this.props.api.columnApi.getColumns())}
            configEnity={item}
            entityType={StrategyConstants.AlertStrategyFriendlyName}
            showShare={this.props.teamSharingActivated}
            onEdit={() => this.onEdit(item)}
            onShare={description => this.props.onShare(item, description)}
            onDelete={AlertRedux.AlertDefinitionDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.editedAdaptableObject && (
          <AlertWizard
            editedAdaptableObject={this.state.editedAdaptableObject as AlertDefinition}
            configEntities={null}
            modalContainer={this.props.modalContainer}
            api={this.props.api}
            wizardStartIndex={this.state.wizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
            onSetNewSharedQueryName={() => {
              throw 'unimplemented';
            }}
            onSetUseSharedQuery={() => {
              throw 'unimplemented';
            }}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: AlertDefinition = ObjectFactory.CreateEmptyAlertDefinition();
    configEntity.ColumnId = this.props.summarisedColumn.ColumnId;
    this.setState({
      editedAdaptableObject: configEntity,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(Alert: AlertDefinition) {
    this.setState({
      editedAdaptableObject: Helper.cloneObject(Alert),
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    if (this.state.wizardStatus == WizardStatus.New) {
      this.props.onAddAlert(this.state.editedAdaptableObject as AlertDefinition);
    } else {
      this.props.onEditAlert(this.state.editedAdaptableObject as AlertDefinition);
    }

    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    //  let alertDefinition = this.state.editedAdaptableObject as AlertDefinition
    return true;
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<AlertSummaryProps> {
  return {
    Alerts: state.Alert.AlertDefinitions,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<AlertSummaryProps> {
  return {
    onAddAlert: (Alert: AlertDefinition) => dispatch(AlertRedux.AlertDefinitionAdd(Alert)),
    onEditAlert: (Alert: AlertDefinition) => dispatch(AlertRedux.AlertDefinitionEdit(Alert)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId, description)
      ),
  };
}

export let AlertSummary = connect(mapStateToProps, mapDispatchToProps)(AlertSummaryComponent);
