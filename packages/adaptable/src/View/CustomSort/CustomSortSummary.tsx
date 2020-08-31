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
      c => c.ColumnId == this.props.summarisedColumn.ColumnId
    );
    let noCustomSort: boolean = customSort == null;

    let customSortRow: any;

    if (!this.props.summarisedColumn.Sortable) {
      customSortRow = (
        <StrategyHeader
          key={StrategyConstants.CustomSortStrategyFriendlyName}
          functionName={StrategyConstants.CustomSortStrategyId}
          strategySummary={'Column is not sortable'}
          newButtonDisabled={true}
          onNew={() => this.onNew()}
          newButtonTooltip={StrategyConstants.CustomSortStrategyFriendlyName}
          accessLevel={this.props.accessLevel}
        />
      );
    } else if (noCustomSort) {
      // title row
      customSortRow = (
        <StrategyHeader
          key={StrategyConstants.CustomSortStrategyFriendlyName}
          functionName={StrategyConstants.CustomSortStrategyId}
          strategySummary={'No Custom Sort Set'}
          onNew={() => this.onNew()}
          accessLevel={this.props.accessLevel}
          newButtonTooltip={StrategyConstants.CustomSortStrategyFriendlyName}
        />
      );
    } else {
      customSortRow = (
        <StrategyDetail
          key={StrategyConstants.CustomSortStrategyFriendlyName}
          item1={<StrategyProfile FunctionName={StrategyConstants.CustomSortStrategyId} />}
          item2={this.getCustomSortedValues(customSort)}
          configEnity={customSort}
          entityType={StrategyConstants.CustomSortStrategyFriendlyName}
          onEdit={() => this.onEdit(customSort)}
          showEdit={customSort.CustomSortComparerFunction == undefined}
          onShare={description => this.props.onShare(customSort, description)}
          showShare={this.props.teamSharingActivated}
          onDelete={CustomSortRedux.CustomSortDelete(customSort)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {customSortRow}

        {this.state.editedAdaptableObject && (
          <CustomSortWizard
            editedAdaptableObject={this.state.editedAdaptableObject as CustomSort}
            configEntities={this.props.CustomSorts}
            modalContainer={this.props.modalContainer}
            api={this.props.api}
            wizardStartIndex={this.state.wizardStartIndex}
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
    configEntity.ColumnId = this.props.summarisedColumn.ColumnId;
    this.setState({
      editedAdaptableObject: configEntity,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(customSort: CustomSort) {
    this.setState({
      editedAdaptableObject: Helper.cloneObject(customSort),
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
    let customSort: CustomSort = this.state.editedAdaptableObject as CustomSort;
    if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
      this.props.onEditCustomSort(customSort);
    } else {
      this.props.onAddCustomSort(customSort);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let customSort = this.state.editedAdaptableObject as CustomSort;
    return (
      StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) &&
      ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)
    );
  }

  private getCustomSortedValues(customSort: CustomSort): any {
    if (ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)) {
      return customSort.SortedValues.join(', ');
    } else {
      return 'Custom Sort uses a bespoke function';
    }
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<CustomSortSummaryProps> {
  return {
    CustomSorts: state.CustomSort.CustomSorts,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<CustomSortSummaryProps> {
  return {
    onAddCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortAdd(customSort)),
    onEditCustomSort: (customSort: CustomSort) =>
      dispatch(CustomSortRedux.CustomSortEdit(customSort)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.CustomSortStrategyId,
          description
        )
      ),
  };
}

export let CustomSortSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomSortSummaryComponent);
