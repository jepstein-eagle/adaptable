import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';

import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
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
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

interface QueryPopupProps extends StrategyViewPopupProps<QueryPopupComponent> {
  onAddSharedQuery: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryAddAction;
  onEditSharedQuery: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryEditAction;
  SharedQueries: Array<SharedQuery>;
  SharedQueryErrorMessage: string;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class QueryPopupComponent extends React.Component<QueryPopupProps, EditableConfigEntityState> {
  constructor(props: QueryPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action === 'New') {
        this.onExisting(this.props.popupParams.value);
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'Toolbar';
    }
  }

  render() {
    let infoBody: any[] = ['TODO: explain shared queries'];

    let colItems: IColItem[] = [
      { Content: 'Name', Size: 2 },
      { Content: 'Expression', Size: 8 },
      { Content: '', Size: 2 },
    ];

    let sharedQueries = this.props.SharedQueries.map((sharedQuery: SharedQuery, index) => {
      return (
        <SharedQueryEntityRow
          colItems={colItems}
          api={this.props.api}
          onShare={description => this.props.onShare(sharedQuery, description)}
          teamSharingActivated={this.props.teamSharingActivated}
          adaptableObject={sharedQuery}
          key={sharedQuery.Uuid}
          onEdit={sharedQuery => this.onEdit(sharedQuery as SharedQuery)}
          onDeleteConfirm={QueryRedux.SharedQueryDelete(sharedQuery)}
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => {
          this.onNew();
        }}
        tooltip="Create Shared Query"
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
        headerText={StrategyConstants.QueryStrategyFriendlyName}
        className="ab_main_popup"
        infoBody={infoBody}
        button={newButton}
        border="none"
        bodyProps={{ padding: 0 }}
        glyphicon={StrategyConstants.QueryGlyph}
      >
        {this.props.SharedQueries.length > 0 ? (
          <AdaptableObjectCollection colItems={colItems} items={sharedQueries} />
        ) : (
          <EmptyContent>Click 'New' to create a new Shared Query.</EmptyContent>
        )}

        {this.state.editedAdaptableObject && (
          <SharedQueryWizard
            editedAdaptableObject={this.state.editedAdaptableObject as SharedQuery}
            configEntities={this.props.SharedQueries}
            modalContainer={this.props.modalContainer}
            api={this.props.api}
            wizardStartIndex={this.state.wizardStartIndex}
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
      editedAdaptableObject: ObjectFactory.CreateEmptySharedQuery(value),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onExisting(value?: string) {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptySharedQuery(value),
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(sharedQuery: SharedQuery) {
    let clonedObject = Helper.cloneObject(sharedQuery);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let sharedQuery: SharedQuery = Helper.cloneObject(this.state.editedAdaptableObject);
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditSharedQuery(sharedQuery);
    } else {
      this.props.onAddSharedQuery(sharedQuery);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let sharedQuery = this.state.editedAdaptableObject as SharedQuery;
    // TODO: validate expression
    return (
      StringExtensions.IsNotNullOrEmpty(sharedQuery.Name) &&
      StringExtensions.IsNotNullOrEmpty(sharedQuery.Expression)
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<QueryPopupProps> {
  return {
    SharedQueries: state.Query.SharedQueries,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<QueryPopupProps> {
  return {
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(QueryRedux.SharedQueryAdd(sharedQuery)),
    onEditSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(QueryRedux.SharedQueryEdit(sharedQuery)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.QueryStrategyId, description)
      ),
  };
}

export let QueryPopup = connect(mapStateToProps, mapDispatchToProps)(QueryPopupComponent);
