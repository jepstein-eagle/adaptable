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
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { UserFilter } from '../../PredefinedConfig/FilterState';

export interface UserFilterSummaryProps extends StrategySummaryProps<UserFilterSummaryComponent> {
  onAddUserFilter: (UserFilter: UserFilter) => FilterRedux.UserFilterAddAction;
  onEditUserFilter: (UserFilter: UserFilter) => FilterRedux.UserFilterEditAction;
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

    let userFilters: UserFilter[] = []; //  this.props.api.filterApi.getAllUserFilter();

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.UserFilterStrategyFriendlyName}
        functionName={StrategyConstants.UserFilterStrategyId}
        strategySummary={this.getSummary()}
        onNew={() => this.onNew()}
        newButtonDisabled={!this.isFilterable()}
        newButtonTooltip={StrategyConstants.UserFilterStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    userFilters.map(item => {
      if (this.props.api.scopeApi.isColumnInScope(this.props.summarisedColumn, item.Scope)) {
        let detailRow = (
          <StrategyDetail
            key={item.Uuid}
            item1={item.Name}
            item2={this.getDescription()}
            configEnity={item}
            showShare={this.props.teamSharingActivated}
            showEdit={this.isFilterable()}
            entityType={StrategyConstants.UserFilterStrategyFriendlyName}
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

        {this.state.editedAdaptableObject && (
          <UserFilterWizard
            editedAdaptableObject={this.state.editedAdaptableObject as UserFilter}
            configEntities={null}
            modalContainer={this.props.modalContainer}
            SelectedColumnId={this.props.summarisedColumn.ColumnId}
            api={this.props.api}
            wizardStartIndex={this.state.wizardStartIndex}
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

  getDescription(): string {
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
    if (this.props.summarisedColumn && !this.props.summarisedColumn.Filterable) {
      return false;
    }
    return true;
  }

  onNew() {
    let configEntity: UserFilter = ObjectFactory.CreateEmptyUserFilter();
    // configEntity.Scope.ColumnIds[0] = this.props.SummarisedColumn.ColumnId;
    this.setState({
      editedAdaptableObject: configEntity,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(UserFilter: UserFilter) {
    this.setState({
      editedAdaptableObject: Helper.cloneObject(UserFilter),
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
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
    return StringExtensions.IsNotNullOrEmpty(userFilter.Name); //&&
    // StringExtensions.IsNotEmpty(userFilter.Scope.ColumnIds[0])
  }
}
function mapStateToProps(): Partial<UserFilterSummaryProps> {
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
