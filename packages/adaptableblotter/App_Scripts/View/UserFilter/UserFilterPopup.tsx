import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
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
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';

interface UserFilterPopupProps extends StrategyViewPopupProps<UserFilterPopupComponent> {
  onAddUserFilter: (userFilter: UserFilter) => UserFilterRedux.UserFilterAddAction;
  onEditUserFilter: (userFilter: UserFilter) => UserFilterRedux.UserFilterEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
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
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        if (this.props.PopupParams.action == 'New') {
          let userFilter: UserFilter = ObjectFactory.CreateEmptyUserFilter();
          userFilter.ColumnId = this.props.PopupParams.columnId;
          this.setState({
            EditedAdaptableBlotterObject: userFilter,
            WizardStartIndex: 1,
            WizardStatus: WizardStatus.New,
          });
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
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
      'Additionally they are available when creating other Queries (e.g. for Advanced Search)',
      <br />,
      <br />,
      'A User Filter Query can contain only one Column Condition; but that condition may contain as many column values, filter or ranges as required.',
    ];

    let selectedColumnId: string = '';
    if (this.state.EditedAdaptableBlotterObject != null) {
      let filter: UserFilter = this.state.EditedAdaptableBlotterObject as UserFilter;
      let editedColumn: string = filter.ColumnId;
      if (StringExtensions.IsNotNullOrEmpty(editedColumn)) {
        selectedColumnId = editedColumn;
      } else if (this.props.PopupParams) {
        if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
          selectedColumnId = this.props.PopupParams.columnId;
        }
      }
    }

    let colItems: IColItem[] = [
      { Content: 'Name', Size: 2 },
      { Content: 'Column', Size: 2 },
      { Content: 'Description', Size: 6 },
      { Content: '', Size: 2 },
    ];

    let UserFilterItems = this.props.UserFilters.map((userFilter, index) => {
      return (
        <UserFilterEntityRow
          AdaptableBlotterObject={userFilter}
          colItems={colItems}
          key={'CS' + index}
          onShare={() => this.props.onShare(userFilter)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          UserFilters={this.props.UserFilters}
          Columns={this.props.Columns}
          onEdit={() => this.onEdit(userFilter)}
          onDeleteConfirm={UserFilterRedux.UserFilterDelete(userFilter)}
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create User Filter"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.UserFilterStrategyName}
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
                queries (e.g. Advanced Search, Plus / Minus, Conditional Style etc.).
              </p>
            </EmptyContent>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <UserFilterWizard
              EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as UserFilter}
              Columns={this.props.Columns}
              ConfigEntities={null}
              ModalContainer={this.props.ModalContainer}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              NamedFilters={this.props.NamedFilters}
              ColumnCategories={this.props.ColumnCategories}
              WizardStartIndex={this.state.WizardStartIndex}
              SelectedColumnId={selectedColumnId}
              Blotter={this.props.Blotter}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyUserFilter(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(userFilter: UserFilter) {
    let clonedObject: UserFilter = Helper.cloneObject(userFilter);
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(clonedObject),
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
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let userFilter = this.state.EditedAdaptableBlotterObject as UserFilter;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditUserFilter(userFilter);
    } else {
      this.props.onAddUserFilter(userFilter);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let userFilter = this.state.EditedAdaptableBlotterObject as UserFilter;
    return (
      StringExtensions.IsNotNullOrEmpty(userFilter.Name) &&
      StringExtensions.IsNotEmpty(userFilter.ColumnId) &&
      ExpressionHelper.IsNotEmptyOrInvalidExpression(userFilter.Expression)
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddUserFilter: (userFilter: UserFilter) =>
      dispatch(UserFilterRedux.UserFilterAdd(userFilter)),
    onEditUserFilter: (userFilter: UserFilter) =>
      dispatch(UserFilterRedux.UserFilterEdit(userFilter)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.UserFilterStrategyId)),
  };
}

export let UserFilterPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFilterPopupComponent);
