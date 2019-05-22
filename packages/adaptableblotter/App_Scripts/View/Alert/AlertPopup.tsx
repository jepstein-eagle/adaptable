import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { HelpBlock } from 'react-bootstrap';
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
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IAdaptableBlotterObject } from '../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';
import { IAlertDefinition } from '../../Utilities/Interface/BlotterObjects/IAlertDefinition';
import { MessageType, AccessLevel } from '../../Utilities/Enums';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';

interface AlertPopupProps extends StrategyViewPopupProps<AlertPopupComponent> {
  AlertDefinitions: IAlertDefinition[];
  onAddAlert: (Alert: IAlertDefinition) => AlertRedux.AlertDefinitionAddAction;
  onEditAlert: (Alert: IAlertDefinition) => AlertRedux.AlertDefinitionEditAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class AlertPopupComponent extends React.Component<AlertPopupProps, EditableConfigEntityState> {
  constructor(props: AlertPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  componentDidMount() {
    if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
      let arrayParams = this.props.PopupParams.split('|');
      if (arrayParams.length == 2 && arrayParams[0] == 'New') {
        let cellValitdation = ObjectFactory.CreateEmptyAlertDefinition();
        cellValitdation.ColumnId = arrayParams[1];
        this.setState({
          EditedAdaptableBlotterObject: cellValitdation,
          EditedAdaptableBlotterObjectIndex: -1,
          WizardStartIndex: 1,
        });
      }
    }
  }
  render() {
    let cssClassName: string = this.props.cssClassName + '__Alert';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__Alert';

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

    let alertEntities = this.props.AlertDefinitions.map((x, index) => {
      let column = ColumnHelper.getColumnFromId(x.ColumnId, this.props.Columns);
      return (
        <AlertEntityRow
          key={index}
          cssClassName={cssClassName}
          colItems={colItems}
          AdaptableBlotterObject={x}
          Column={column}
          Columns={this.props.Columns}
          UserFilters={this.props.UserFilters}
          Index={index}
          onEdit={(index, x) => this.onEdit(index, x as IAlertDefinition)}
          onShare={() => this.props.onShare(x)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onDeleteConfirm={AlertRedux.AlertDefinitionDelete(x)}
          onChangeMessageType={(index, messageType) => this.onMessageTypeChanged(messageType, x)}
        />
      );
    });

    let newButton = (
      <ButtonNew
        cssClassName={cssClassName}
        onClick={() => this.createAlert()}
        overrideTooltip="Create Alert"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <div className={cssClassName}>
        <PanelWithButton
          headerText={StrategyConstants.AlertStrategyName}
          bsStyle="primary"
          cssClassName={cssClassName}
          button={newButton}
          glyphicon={StrategyConstants.AlertGlyph}
          infoBody={infoBody}
        >
          {alertEntities.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={alertEntities}
            />
          ) : (
            <div>
              <HelpBlock>You have no Alert Definitions.</HelpBlock>
              {this.props.AccessLevel != AccessLevel.ReadOnly && (
                <div>
                  <HelpBlock>Click 'New' to start creating alert definitions.</HelpBlock>
                  <HelpBlock>
                    An alert will be triggered whenever an edit - or external data change - matches
                    the condition in the alert definition.
                  </HelpBlock>
                </div>
              )}
            </div>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
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
        </PanelWithButton>
      </div>
    );
  }

  createAlert() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyAlertDefinition(),
      EditedAdaptableBlotterObjectIndex: -1,
      WizardStartIndex: 0,
    });
  }

  onMessageTypeChanged(messageType: MessageType, alertDefinition: IAlertDefinition) {
    alertDefinition.MessageType = messageType;
    this.props.onEditAlert(alertDefinition);
  }

  onEdit(index: number, Alert: IAlertDefinition) {
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(Alert),
      EditedAdaptableBlotterObjectIndex: index,
      WizardStartIndex: 1,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      EditedAdaptableBlotterObjectIndex: -1,
    });
  }

  onFinishWizard() {
    if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
      this.props.onEditAlert(this.state.EditedAdaptableBlotterObject as IAlertDefinition);
    } else {
      this.props.onAddAlert(this.state.EditedAdaptableBlotterObject as IAlertDefinition);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      EditedAdaptableBlotterObjectIndex: -1,
    });
  }

  canFinishWizard() {
    let AlertRule = this.state.EditedAdaptableBlotterObject as IAlertDefinition;
    return (
      StringExtensions.IsNotNullOrEmpty(AlertRule.ColumnId) &&
      ExpressionHelper.IsEmptyOrValidExpression(AlertRule.Expression)
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    AlertDefinitions: state.Alert.AlertDefinitions,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddAlert: (alert: IAlertDefinition) => dispatch(AlertRedux.AlertDefinitionAdd(alert)),
    onEditAlert: (alert: IAlertDefinition) => dispatch(AlertRedux.AlertDefinitionEdit(alert)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId)),
  };
}

export let AlertPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertPopupComponent);
