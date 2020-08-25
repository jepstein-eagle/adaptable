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
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { UserFilter } from '../../PredefinedConfig/FilterState';

export interface UserFilterSummaryProps extends StrategySummaryProps<UserFilterSummaryComponent> {
  onAddUserFilter: (UserFilter: UserFilter) => FilterRedux.UserFilterAddAction;
  onEditUserFilter: (UserFilter: UserFilter) => FilterRedux.UserFilterEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
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

    let userFilters: UserFilter[] = this.props.Api.filterApi.getAllUserFilter();

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.UserFilterStrategyFriendlyName}
        FunctionName={StrategyConstants.UserFilterStrategyId}
        StrategySummary={this.getSummary()}
        onNew={() => this.onNew()}
        NewButtonDisabled={!this.isFilterable()}
        NewButtonTooltip={StrategyConstants.UserFilterStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    userFilters.map((item, index) => {
      if (this.props.Api.columnApi.isColumnInScope(this.props.SummarisedColumn, item.Scope)) {
        let detailRow = (
          <StrategyDetail
            key={item.Uuid}
            Item1={item.Name}
            Item2={this.getDescription(item)}
            ConfigEnity={item}
            showShare={this.props.TeamSharingActivated}
            showEdit={this.isFilterable()}
            EntityType={StrategyConstants.UserFilterStrategyFriendlyName}
            onEdit={() => this.onEdit(item)}
            onShare={description => this.props.onShare(item, description)}
            onDelete={FilterRedux.UserFilterDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.EditedAdaptableObject && (
          <UserFilterWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as UserFilter}
            ConfigEntities={null}
            ModalContainer={this.props.ModalContainer}
            SelectedColumnId={this.props.SummarisedColumn.ColumnId}
            Api={this.props.Api}
            WizardStartIndex={this.state.WizardStartIndex}
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

  getSummary(): string {
    if (!this.isColumnFilterable()) {
      return 'Column is not filterable';
    }

    return '5';
  }

  getDescription(userFilter: UserFilter): string {
    if (!this.isColumnFilterable()) {
      return 'Column is not filterable';
    }

    return 'Need to do do this';
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
    // configEntity.Scope.ColumnIds[0] = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(UserFilter: UserFilter) {
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(UserFilter),
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let userFilter = this.state.EditedAdaptableObject as UserFilter;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditUserFilter(userFilter);
    } else {
      this.props.onAddUserFilter(userFilter);
    }

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let userFilter = this.state.EditedAdaptableObject as UserFilter;
    return StringExtensions.IsNotNullOrEmpty(userFilter.Name); //&&
    // StringExtensions.IsNotEmpty(userFilter.Scope.ColumnIds[0])
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any): Partial<UserFilterSummaryProps> {
  return {};
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<UserFilterSummaryProps> {
  return {
    onAddUserFilter: (UserFilter: UserFilter) => dispatch(FilterRedux.UserFilterAdd(UserFilter)),
    onEditUserFilter: (UserFilter: UserFilter) => dispatch(FilterRedux.UserFilterEdit(UserFilter)),
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

export let UserFilterSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserFilterSummaryComponent);
