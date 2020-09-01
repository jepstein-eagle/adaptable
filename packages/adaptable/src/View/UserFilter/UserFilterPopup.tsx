import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { UserFilterWizard } from './Wizard/UserFilterWizard';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { UserFilterEntityRow } from './UserFilterEntityRow';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { UserFilter } from '../../PredefinedConfig/FilterState';

interface UserFilterPopupProps extends StrategyViewPopupProps<UserFilterPopupComponent> {
  onAddUserFilter: (userFilter: UserFilter) => FilterRedux.UserFilterAddAction;
  onEditUserFilter: (userFilter: UserFilter) => FilterRedux.UserFilterEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class UserFilterPopupComponent extends React.Component<
  UserFilterPopupProps,
  EditableConfigEntityState
> {
  constructor(props: UserFilterPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        if (this.props.popupParams.action == 'New') {
          let userFilter: UserFilter = ObjectFactory.CreateEmptyUserFilter();
          userFilter.Scope = { ColumnIds: [this.props.popupParams.column.ColumnId] };
          this.setState({
            editedAdaptableObject: userFilter,
            wizardStartIndex: 1,
            wizardStatus: WizardStatus.New,
          });
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'ColumnMenu';
    }
  }
  render() {
    let infoBody: any[] = [
      'User Filters are named, reusable Column Queries.',
      <br />,
      <br />,
      "Once created, User Filters are available in the column's filter dropdown as if a single colum value.",
      <br />,
      <br />,
      'Additionally they are available when creating other Queries (e.g. for Reports)',
      <br />,
      <br />,
      'A User Filter Query can contain only one Column Condition; but that condition may contain as many column values, filter or ranges as required.',
    ];

    let selectedColumnId: string = '';
    if (this.state.editedAdaptableObject != null) {
      let filter: UserFilter = this.state.editedAdaptableObject as UserFilter;
      let editedColumn: string = ''; //filter.Scope.ColumnIds[0];
      if (StringExtensions.IsNotNullOrEmpty(editedColumn)) {
        selectedColumnId = editedColumn;
      } else if (this.props.popupParams) {
        if (this.props.popupParams.action && this.props.popupParams.column) {
          selectedColumnId = this.props.popupParams.column.ColumnId;
        }
      }
    }

    let colItems: IColItem[] = [
      { Content: 'Name', Size: 2 },
      { Content: 'Column', Size: 2 },
      { Content: 'Description', Size: 6 },
      { Content: '', Size: 2 },
    ];

    let UserFilterItems = this.props.api.filterApi.getAllUserFilter().map((userFilter, index) => {
      return (
        <UserFilterEntityRow
          adaptableObject={userFilter}
          api={this.props.api}
          colItems={colItems}
          key={'CS' + index}
          onShare={description => this.props.onShare(userFilter, description)}
          teamSharingActivated={this.props.teamSharingActivated}
          onEdit={() => this.onEdit(userFilter)}
          onDeleteConfirm={FilterRedux.UserFilterDelete(userFilter)}
          accessLevel={this.props.accessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create User Filter"
        accessLevel={this.props.accessLevel}
        style={{
          color: 'var(--ab-color-text-on-add)',
          fill: 'var(--ab-color-text-on-add',
          background: 'var(--ab-color-add)',
        }}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.UserFilterStrategyFriendlyName}
          infoBody={infoBody}
          button={newButton}
          glyphicon={StrategyConstants.UserFilterGlyph}
          bodyProps={{ padding: 0 }}
        >
          {UserFilterItems.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={UserFilterItems} />
          ) : (
            <EmptyContent>
              <p>Click 'New' to start creating user filters.</p>
              <p />
              <p>
                Once created, user filters are accessible both when filtering columns and creating
                queries (e.g. Export, Plus / Minus, Conditional Style etc.).
              </p>
            </EmptyContent>
          )}

          {this.state.editedAdaptableObject != null && (
            <UserFilterWizard
              editedAdaptableObject={this.state.editedAdaptableObject as UserFilter}
              configEntities={null}
              modalContainer={this.props.modalContainer}
              wizardStartIndex={this.state.wizardStartIndex}
              SelectedColumnId={selectedColumnId}
              api={this.props.api}
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
        </PanelWithButton>
      </Flex>
    );
  }

  onNew() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptyUserFilter(),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(userFilter: UserFilter) {
    let clonedObject: UserFilter = Helper.cloneObject(userFilter);
    this.setState({
      editedAdaptableObject: Helper.cloneObject(clonedObject),
      wizardStartIndex: 1,
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
    let userFilter = this.state.editedAdaptableObject as UserFilter;
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditUserFilter(userFilter);
    } else {
      this.props.onAddUserFilter(userFilter);
    }

    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let userFilter = this.state.editedAdaptableObject as UserFilter;
    return true; // to do!
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<UserFilterPopupProps> {
  return {};
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<UserFilterPopupProps> {
  return {
    onAddUserFilter: (userFilter: UserFilter) => dispatch(FilterRedux.UserFilterAdd(userFilter)),
    onEditUserFilter: (userFilter: UserFilter) => dispatch(FilterRedux.UserFilterEdit(userFilter)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.UserFilterStrategyId,
          description
        )
      ),
  };
}

export let UserFilterPopup = connect(mapStateToProps, mapDispatchToProps)(UserFilterPopupComponent);
