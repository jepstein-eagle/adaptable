import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as SharedExpressionRedux from '../../Redux/ActionsReducers/SharedExpressionRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { SharedExpressionWizard } from './Wizard/SharedExpressionWizard';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { SharedExpressionEntityRow } from './SharedExpressionEntityRow';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { SharedExpression } from '../../PredefinedConfig/SharedExpressionState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface SharedExpressionPopupProps
  extends StrategyViewPopupProps<SharedExpressionPopupComponent> {
  onAddSharedExpression: (
    sharedExpression: SharedExpression
  ) => SharedExpressionRedux.SharedExpressionAddAction;
  onEditSharedExpression: (
    sharedExpression: SharedExpression
  ) => SharedExpressionRedux.SharedExpressionEditAction;
  SharedExpressions: Array<SharedExpression>;
  SharedExpressionErrorMessage: string;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class SharedExpressionPopupComponent extends React.Component<
  SharedExpressionPopupProps,
  EditableConfigEntityState
> {
  constructor(props: SharedExpressionPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action === 'New') {
        this.onNew(this.props.PopupParams.value);
      }
    }
  }

  render() {
    let infoBody: any[] = ['TODO: explain shared expressions'];

    let colItems: IColItem[] = [
      { Content: 'Name', Size: 2 },
      { Content: 'Expression', Size: 8 },
      { Content: '', Size: 2 },
    ];

    let sharedExpressions = this.props.SharedExpressions.map(
      (sharedExpression: SharedExpression, index) => {
        // let index = this.props.SharedExpressions.indexOf(sharedExpression)

        return (
          <SharedExpressionEntityRow
            colItems={colItems}
            api={this.props.Api}
            onShare={description => this.props.onShare(sharedExpression, description)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            AdaptableObject={sharedExpression}
            key={sharedExpression.Uuid}
            onEdit={sharedExpression => this.onEdit(sharedExpression as SharedExpression)}
            onDeleteConfirm={SharedExpressionRedux.SharedExpressionDelete(sharedExpression)}
            AccessLevel={this.props.AccessLevel}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => {
          this.onNew();
        }}
        tooltip="Create Shared Expression"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <PanelWithButton
        headerText={StrategyConstants.SharedExpressionStrategyFriendlyName}
        className="ab_main_popup"
        infoBody={infoBody}
        button={newButton}
        border="none"
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.SharedExpressionGlyph}
      >
        {this.props.SharedExpressions.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={sharedExpressions} />
        ) : (
          <EmptyContent>Click 'New' to create a new Shared Expression.</EmptyContent>
        )}

        {/* we dont pass in directly the value GetErrorMessage as the steps are cloned in the wizzard. */}
        {this.state.EditedAdaptableObject && (
          <SharedExpressionWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as SharedExpression}
            ConfigEntities={this.props.SharedExpressions}
            ModalContainer={this.props.ModalContainer}
            Api={this.props.Api}
            WizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
          />
        )}
      </PanelWithButton>
    );
  }

  onNew(value?: string) {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptySharedExpression(value),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(sharedExpression: SharedExpression) {
    let clonedObject = Helper.cloneObject(sharedExpression);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let sharedExpression: SharedExpression = Helper.cloneObject(this.state.EditedAdaptableObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditSharedExpression(sharedExpression);
    } else {
      this.props.onAddSharedExpression(sharedExpression);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let sharedExpression = this.state.EditedAdaptableObject as SharedExpression;
    // TODO: validate expression
    return (
      StringExtensions.IsNotNullOrEmpty(sharedExpression.Name) &&
      StringExtensions.IsNotNullOrEmpty(sharedExpression.Expression)
    );
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<SharedExpressionPopupProps> {
  return {
    SharedExpressions: state.SharedExpression.SharedExpressions,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<SharedExpressionPopupProps> {
  return {
    onAddSharedExpression: (sharedExpression: SharedExpression) =>
      dispatch(SharedExpressionRedux.SharedExpressionAdd(sharedExpression)),
    onEditSharedExpression: (sharedExpression: SharedExpression) =>
      dispatch(SharedExpressionRedux.SharedExpressionEdit(sharedExpression)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.SharedExpressionStrategyId,
          description
        )
      ),
  };
}

export let SharedExpressionPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedExpressionPopupComponent);
