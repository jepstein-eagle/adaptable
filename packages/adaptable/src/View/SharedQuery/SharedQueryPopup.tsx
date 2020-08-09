import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as SharedQueryRedux from '../../Redux/ActionsReducers/SharedQueryRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { SharedQueryWizard } from './Wizard/SharedQueryWizard';
import { SortOrder } from '../../PredefinedConfig/Common/Enums';
import { SharedQueryEntityRow } from './SharedQueryEntityRow';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { SharedQuery } from '../../PredefinedConfig/SharedQueryState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface SharedQueryPopupProps extends StrategyViewPopupProps<SharedQueryPopupComponent> {
  onAddSharedQuery: (sharedQuery: SharedQuery) => SharedQueryRedux.SharedQueryAddAction;
  onEditSharedQuery: (sharedQuery: SharedQuery) => SharedQueryRedux.SharedQueryEditAction;
  SharedQueries: Array<SharedQuery>;
  SharedQueryErrorMessage: string;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class SharedQueryPopupComponent extends React.Component<
  SharedQueryPopupProps,
  EditableConfigEntityState
> {
  constructor(props: SharedQueryPopupProps) {
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

    let sharedQueries = this.props.SharedQueries.map((sharedQuery: SharedQuery, index) => {
      return (
        <SharedQueryEntityRow
          colItems={colItems}
          api={this.props.Api}
          onShare={description => this.props.onShare(sharedQuery, description)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          AdaptableObject={sharedQuery}
          key={sharedQuery.Uuid}
          onEdit={sharedQuery => this.onEdit(sharedQuery as SharedQuery)}
          onDeleteConfirm={SharedQueryRedux.SharedQueryDelete(sharedQuery)}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

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
        headerText={StrategyConstants.SharedQueryStrategyFriendlyName}
        className="ab_main_popup"
        infoBody={infoBody}
        button={newButton}
        border="none"
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.SharedQueryGlyph}
      >
        {this.props.SharedQueries.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={sharedQueries} />
        ) : (
          <EmptyContent>Click 'New' to create a new Shared Expression.</EmptyContent>
        )}

        {/* we dont pass in directly the value GetErrorMessage as the steps are cloned in the wizzard. */}
        {this.state.EditedAdaptableObject && (
          <SharedQueryWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as SharedQuery}
            ConfigEntities={this.props.SharedQueries}
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
      EditedAdaptableObject: ObjectFactory.CreateEmptySharedQuery(value),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(sharedQuery: SharedQuery) {
    let clonedObject = Helper.cloneObject(sharedQuery);
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
    let sharedQuery: SharedQuery = Helper.cloneObject(this.state.EditedAdaptableObject);
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditSharedQuery(sharedQuery);
    } else {
      this.props.onAddSharedQuery(sharedQuery);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let sharedQuery = this.state.EditedAdaptableObject as SharedQuery;
    // TODO: validate expression
    return (
      StringExtensions.IsNotNullOrEmpty(sharedQuery.Name) &&
      StringExtensions.IsNotNullOrEmpty(sharedQuery.Expression)
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<SharedQueryPopupProps> {
  return {
    SharedQueries: state.SharedQuery.SharedQueries,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<SharedQueryPopupProps> {
  return {
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(SharedQueryRedux.SharedQueryAdd(sharedQuery)),
    onEditSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(SharedQueryRedux.SharedQueryEdit(sharedQuery)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.SharedQueryStrategyId,
          description
        )
      ),
  };
}

export let SharedQueryPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SharedQueryPopupComponent);
