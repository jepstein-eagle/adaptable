import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Flex } from 'rebass';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AlertWizard } from './Wizard/AlertWizard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { AlertEntityRow } from './AlertEntityRow';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { MessageType, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { AlertDefinition } from '../../PredefinedConfig/RunTimeState/AlertState';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import EmptyContent from '../../components/EmptyContent';
import SimpleButton from '../../components/SimpleButton';

interface AlertPopupProps extends StrategyViewPopupProps<AlertPopupComponent> {
  AlertDefinitions: AlertDefinition[];
  onAddAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionAddAction;
  onEditAlert: (Alert: AlertDefinition) => AlertRedux.AlertDefinitionEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class AlertPopupComponent extends React.Component<AlertPopupProps, EditableConfigEntityState> {
  constructor(props: AlertPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        if (this.props.PopupParams.action == 'New') {
          let alertDefinition = ObjectFactory.CreateEmptyAlertDefinition();
          alertDefinition.ColumnId = this.props.PopupParams.columnId;
          this.setState({
            EditedAdaptableBlotterObject: alertDefinition,
            WizardStartIndex: 1,
            WizardStatus: WizardStatus.New,
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
      let column = ColumnHelper.getColumnFromId(alertDefinition.ColumnId, this.props.Columns);
      return (
        <AlertEntityRow
          key={index}
          colItems={colItems}
          AdaptableBlotterObject={alertDefinition}
          Column={column}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          onEdit={() => this.onEdit(alertDefinition)}
          onShare={() => this.props.onShare(alertDefinition)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={AlertRedux.AlertDefinitionDelete(alertDefinition)}
          onChangeMessageType={(alertDef, messageType) =>
            this.onMessageTypeChanged(alertDef, messageType)
          }
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.createAlertDefinition()}
        tooltip="Create Alert"
        AccessLevel={this.props.AccessLevel}
      />
    );

    let startWizardText =
      this.props.AccessLevel == AccessLevel.ReadOnly
        ? 'You have no Alert Definitions.'
        : "Click 'New' to start creating Alert Definitions.  An alert will be triggered whenever an edit - or external data change - matches the condition in the Alert Definition.";

    return (
      <PanelWithButton
        bodyProps={{ padding: 0 }}
        headerText={StrategyConstants.AlertStrategyName}
        button={newButton}
        glyphicon={StrategyConstants.AlertGlyph}
        infoBody={infoBody}
      >
        {alertEntities.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={alertEntities} />
        ) : (
          <EmptyContent>{startWizardText}</EmptyContent>
        )}

        {this.state.WizardStatus != WizardStatus.None && (
          <AlertWizard
            EditedAdaptableBlotterObject={
              this.state.EditedAdaptableBlotterObject as AlertDefinition
            }
            ConfigEntities={null}
            ModalContainer={this.props.ModalContainer}
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

  createAlertDefinition() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyAlertDefinition(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onMessageTypeChanged(alertDefinition: AlertDefinition, messageType: MessageType) {
    alertDefinition.MessageType = messageType;
    this.props.onEditAlert(alertDefinition);
  }

  onEdit(alert: AlertDefinition) {
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(alert),
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
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
    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddAlert(this.state.EditedAdaptableBlotterObject as AlertDefinition);
    } else if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditAlert(this.state.EditedAdaptableBlotterObject as AlertDefinition);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let AlertRule = this.state.EditedAdaptableBlotterObject as AlertDefinition;
    return (
      StringExtensions.IsNotNullOrEmpty(AlertRule.ColumnId) &&
      ExpressionHelper.IsNullOrEmptyOrValidExpression(AlertRule.Expression)
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    AlertDefinitions: state.Alert.AlertDefinitions,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddAlert: (alert: AlertDefinition) => dispatch(AlertRedux.AlertDefinitionAdd(alert)),
    onEditAlert: (alert: AlertDefinition) => dispatch(AlertRedux.AlertDefinitionEdit(alert)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId)),
  };
}

export let AlertPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertPopupComponent);
