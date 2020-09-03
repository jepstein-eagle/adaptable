import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Flex } from 'rebass';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AlertWizard } from './Wizard/AlertWizard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { AlertEntityRow } from './AlertEntityRow';
import {
  WizardStatus,
  EditableExpressionConfigEntityState,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import EmptyContent from '../../components/EmptyContent';
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import { EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

interface AlertPopupProps extends StrategyViewPopupProps<AlertPopupComponent> {
  AlertDefinitions: AlertDefinition[];
  onAddAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionAddAction;
  onEditAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionEditAction;
  onAddSharedQuery: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryAddAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class AlertPopupComponent extends React.Component<
  AlertPopupProps,
  EditableExpressionConfigEntityState
> {
  constructor(props: AlertPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        if (this.props.popupParams.action == 'New') {
          let alertDefinition = ObjectFactory.CreateEmptyAlertDefinition();
          alertDefinition.Scope = {
            ColumnIds: [this.props.popupParams.column.ColumnId],
          };
          this.setState({
            editedAdaptableObject: alertDefinition,
            wizardStartIndex: 1,
            wizardStatus: WizardStatus.New,
          });
        }
      }
    }
  }
  render() {
    let infoBody: any[] = [
      'Alert Definitions define which changes to the source data will trigger an Alert.',
      <br />,
      <br />,
      'An Alert will appear either as a popup or in the alerts toolbar.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Alert Definition', Size: 4 },
      { Content: 'Type', Size: 2 },
      { Content: 'Expression', Size: 4 },
      { Content: '', Size: 2 },
    ];

    let alertEntities = this.props.AlertDefinitions.map((alertDefinition, index) => {
      return (
        <AlertEntityRow
          key={index}
          colItems={colItems}
          api={this.props.api}
          adaptableObject={alertDefinition}
          onEdit={() => this.onEdit(alertDefinition)}
          onShare={description => this.props.onShare(alertDefinition, description)}
          teamSharingActivated={this.props.teamSharingActivated}
          onDeleteConfirm={AlertRedux.AlertDefinitionDelete(alertDefinition)}
          onChangeMessageType={(alertDef, messageType) =>
            this.onMessageTypeChanged(alertDef, messageType)
          }
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.createAlertDefinition()}
        tooltip="Create Alert"
        accessLevel={this.props.accessLevel}
        style={{
          color: 'var(--ab-color-text-on-add)',
          fill: 'var(--ab-color-text-on-add',
          background: 'var(--ab-color-action-add)',
        }}
      />
    );

    let startWizardText =
      this.props.accessLevel == 'ReadOnly'
        ? 'You have no Alert Definitions.'
        : "Click 'New' to start creating Alert Definitions.  An alert will be triggered whenever an edit - or external data change - matches the condition in the Alert Definition.";

    return (
      <PanelWithButton
        bodyProps={{ padding: 0 }}
        headerText={StrategyConstants.AlertStrategyFriendlyName}
        button={newButton}
        glyphicon={StrategyConstants.AlertGlyph}
        infoBody={infoBody}
      >
        {alertEntities.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={alertEntities} />
        ) : (
          <EmptyContent>{startWizardText}</EmptyContent>
        )}

        {this.state.wizardStatus != WizardStatus.None && (
          <AlertWizard
            editedAdaptableObject={this.state.editedAdaptableObject as AlertDefinition}
            configEntities={null}
            modalContainer={this.props.modalContainer}
            api={this.props.api}
            wizardStartIndex={this.state.wizardStartIndex}
            onSetNewSharedQueryName={newSharedQueryName =>
              this.setState({
                newSharedQueryName: newSharedQueryName,
              })
            }
            onSetUseSharedQuery={useSharedQuery =>
              this.setState({
                useSharedQuery: useSharedQuery,
              })
            }
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
          />
        )}
      </PanelWithButton>
    );
  }

  createAlertDefinition() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptyAlertDefinition(),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onMessageTypeChanged(alertDefinition: AlertDefinition, messageType: MessageType) {
    alertDefinition.MessageType = messageType;
    this.props.onEditAlert(alertDefinition);
  }

  onEdit(alert: AlertDefinition) {
    this.setState({
      editedAdaptableObject: Helper.cloneObject(alert),
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.resetState();
  }

  onFinishWizard() {
    const alertDefinition = this.state.editedAdaptableObject as AlertDefinition;

    if (StringExtensions.IsNotNullOrEmpty(this.state.newSharedQueryName)) {
      const SharedQueryId = createUuid();
      this.props.onAddSharedQuery({
        Uuid: SharedQueryId,
        Name: this.state.newSharedQueryName,
        Expression: alertDefinition.Expression,
      });
      alertDefinition.Expression = undefined;
      alertDefinition.SharedQueryId = SharedQueryId;
    }

    if (this.state.wizardStatus == WizardStatus.New) {
      this.props.onAddAlert(alertDefinition);
    } else if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditAlert(alertDefinition);
    }

    this.resetState();
  }

  canFinishWizard() {
    let alertDefinition = this.state.editedAdaptableObject as AlertDefinition;
    return alertDefinition.Scope != null; // can it be?
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
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<AlertPopupProps> {
  return {
    AlertDefinitions: state.Alert.AlertDefinitions,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<AlertPopupProps> {
  return {
    onAddAlert: (alert: AlertDefinition) => dispatch(AlertRedux.AlertDefinitionAdd(alert)),
    onEditAlert: (alert: AlertDefinition) => dispatch(AlertRedux.AlertDefinitionEdit(alert)),
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(QueryRedux.SharedQueryAdd(sharedQuery)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId, description)
      ),
  };
}

export let AlertPopup = connect(mapStateToProps, mapDispatchToProps)(AlertPopupComponent);
