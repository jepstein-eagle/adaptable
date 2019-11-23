import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { UserFilterWizard } from './Wizard/UserFilterWizard';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdaptableBlotterObject } from '../../PredefinedConfig/Common/AdaptableBlotterObject';

export interface UserFilterSummaryProps extends StrategySummaryProps<UserFilterSummaryComponent> {
  onAddUserFilter: (UserFilter: UserFilter) => UserFilterRedux.UserFilterAddAction;
  onEditUserFilter: (UserFilter: UserFilter) => UserFilterRedux.UserFilterEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class UserFilterSummaryComponent extends React.Component<
  UserFilterSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: UserFilterSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let strategySummaries: any = [];

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.UserFilterStrategyName}
        StrategyId={StrategyConstants.UserFilterStrategyId}
        StrategySummary={this.getSummary()}
        onNew={() => this.onNew()}
        NewButtonDisabled={!this.isFilterable()}
        NewButtonTooltip={StrategyConstants.UserFilterStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    this.props.UserFilters.map((item, index) => {
      if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
        let detailRow = (
          <StrategyDetail
            key={item.Uuid}
            Item1={item.Name}
            Item2={this.getDescription(item)}
            ConfigEnity={item}
            showShare={this.props.TeamSharingActivated}
            showEdit={this.isFilterable()}
            EntityType={StrategyConstants.UserFilterStrategyName}
            onEdit={() => this.onEdit(item)}
            onShare={() => this.props.onShare(item)}
            onDelete={UserFilterRedux.UserFilterDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.EditedAdaptableBlotterObject && (
          <UserFilterWizard
            EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as UserFilter}
            ConfigEntities={null}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            SelectedColumnId={this.props.SummarisedColumn.ColumnId}
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

  getSummary(): string {
    if (!this.isColumnFilterable()) {
      return 'Column is not filterable';
    }

    return Helper.ReturnItemCount(
      this.props.UserFilters.filter(uf => uf.ColumnId == this.props.SummarisedColumn.ColumnId),
      StrategyConstants.UserFilterStrategyName
    );
  }

  getDescription(userFilter: UserFilter): string {
    if (!this.isColumnFilterable()) {
      return 'Column is not filterable';
    }

    return ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns);
  }

  isFilterable(): boolean {
    if (!this.isColumnFilterable()) {
      return false;
    }
    return true;
  }

  isColumnFilterable(): boolean {
    if (this.props.SummarisedColumn && !this.props.SummarisedColumn.Filterable) {
      return false;
    }
    return true;
  }

  onNew() {
    let configEntity: UserFilter = ObjectFactory.CreateEmptyUserFilter();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableBlotterObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(UserFilter: UserFilter) {
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(UserFilter),
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
  return {
    Columns: state.Grid.Columns,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    NamedFilters: state.NamedFilter.NamedFilters,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddUserFilter: (UserFilter: UserFilter) =>
      dispatch(UserFilterRedux.UserFilterAdd(UserFilter)),
    onEditUserFilter: (UserFilter: UserFilter) =>
      dispatch(UserFilterRedux.UserFilterEdit(UserFilter)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.UserFilterStrategyId)),
  };
}

export let UserFilterSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFilterSummaryComponent);
