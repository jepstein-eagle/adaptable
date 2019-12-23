import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { CustomSortWizard } from './Wizard/CustomSortWizard';
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StrategyProfile } from '../Components/StrategyProfile';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface CustomSortSummaryProps extends StrategySummaryProps<CustomSortSummaryComponent> {
  CustomSorts: CustomSort[];
  onAddCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortAddAction;
  onEditCustomSort: (customSort: CustomSort) => CustomSortRedux.CustomSortEditAction;
}

export class CustomSortSummaryComponent extends React.Component<
  CustomSortSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: CustomSortSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  render(): any {
    let customSort: CustomSort = this.props.CustomSorts.find(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let noCustomSort: boolean = customSort == null;

    let customSortRow: any;

    if (!this.props.SummarisedColumn.Sortable) {
      customSortRow = (
        <StrategyHeader
          key={StrategyConstants.CustomSortStrategyFriendlyName}
          FunctionName={StrategyConstants.CustomSortStrategyId}
          StrategySummary={'Column is not sortable'}
          NewButtonDisabled={true}
          onNew={() => this.onNew()}
          NewButtonTooltip={StrategyConstants.CustomSortStrategyFriendlyName}
          AccessLevel={this.props.AccessLevel}
        />
      );
    } else if (noCustomSort) {
      // title row
      customSortRow = (
        <StrategyHeader
          key={StrategyConstants.CustomSortStrategyFriendlyName}
          FunctionName={StrategyConstants.CustomSortStrategyId}
          StrategySummary={'No Custom Sort Set'}
          onNew={() => this.onNew()}
          AccessLevel={this.props.AccessLevel}
          NewButtonTooltip={StrategyConstants.CustomSortStrategyFriendlyName}
        />
      );
    } else {
      customSortRow = (
        <StrategyDetail
          key={StrategyConstants.CustomSortStrategyFriendlyName}
          Item1={<StrategyProfile FunctionName={StrategyConstants.CustomSortStrategyId} />}
          Item2={customSort.SortedValues.join(', ')}
          ConfigEnity={customSort}
          EntityType={StrategyConstants.CustomSortStrategyFriendlyName}
          onEdit={() => this.onEdit(customSort)}
          onShare={() => this.props.onShare(customSort)}
          showShare={this.props.TeamSharingActivated}
          onDelete={CustomSortRedux.CustomSortDelete(customSort)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {customSortRow}

        {this.state.EditedAdaptableObject && (
          <CustomSortWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as CustomSort}
            ConfigEntities={this.props.CustomSorts}
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
      </div>
    );
  }

  onNew() {
    let configEntity: CustomSort = ObjectFactory.CreateEmptyCustomSort();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(customSort: CustomSort) {
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(customSort),
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
    let customSort: CustomSort = this.state.EditedAdaptableObject as CustomSort;
    if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
      this.props.onEditCustomSort(customSort);
    } else {
      this.props.onAddCustomSort(customSort);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let customSort = this.state.EditedAdaptableObject as CustomSort;
    return (
      StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) &&
      ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    CustomSorts: state.CustomSort.CustomSorts,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortAdd(customSort)),
    onEditCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortEdit(customSort)),
    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CustomSortStrategyId)),
  };
}

export let CustomSortSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomSortSummaryComponent);
