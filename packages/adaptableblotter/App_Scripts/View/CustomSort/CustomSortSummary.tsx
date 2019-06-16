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
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StrategyProfile } from '../Components/StrategyProfile';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';
import { ICustomSort } from '../../PredefinedConfig/IUserState/CustomSortState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';

export interface CustomSortSummaryProps extends StrategySummaryProps<CustomSortSummaryComponent> {
  CustomSorts: ICustomSort[];
  onAddCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortAddAction;
  onEditCustomSort: (customSort: ICustomSort) => CustomSortRedux.CustomSortEditAction;
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
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__customsort';
    let customSort: ICustomSort = this.props.CustomSorts.find(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let noCustomSort: boolean = customSort == null;

    let customSortRow: any;

    if (!this.props.SummarisedColumn.Sortable) {
      customSortRow = (
        <StrategyHeader
          cssClassName={this.props.cssClassName}
          key={StrategyConstants.CustomSortStrategyName}
          StrategyId={StrategyConstants.CustomSortStrategyId}
          StrategySummary={'Column is not sortable'}
          NewButtonDisabled={true}
          onNew={() => this.onNew()}
          NewButtonTooltip={StrategyConstants.CustomSortStrategyName}
          AccessLevel={this.props.AccessLevel}
        />
      );
    } else if (noCustomSort) {
      // title row
      customSortRow = (
        <StrategyHeader
          cssClassName={this.props.cssClassName}
          key={StrategyConstants.CustomSortStrategyName}
          StrategyId={StrategyConstants.CustomSortStrategyId}
          StrategySummary={'No Custom Sort Set'}
          onNew={() => this.onNew()}
          AccessLevel={this.props.AccessLevel}
          NewButtonTooltip={StrategyConstants.CustomSortStrategyName}
        />
      );
    } else {
      customSortRow = (
        <StrategyDetail
          cssClassName={this.props.cssClassName}
          key={StrategyConstants.CustomSortStrategyName}
          Item1={
            <StrategyProfile
              cssClassName={this.props.cssClassName}
              StrategyId={StrategyConstants.CustomSortStrategyId}
            />
          }
          Item2={customSort.SortedValues.join(', ')}
          ConfigEnity={customSort}
          EntityType={StrategyConstants.CustomSortStrategyName}
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

        {this.state.EditedAdaptableBlotterObject && (
          <CustomSortWizard
            cssClassName={cssWizardClassName}
            EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as ICustomSort}
            ConfigEntities={this.props.CustomSorts}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
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
    let configEntity: ICustomSort = ObjectFactory.CreateEmptyCustomSort();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableBlotterObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(customSort: ICustomSort) {
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(customSort),
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
    let customSort: ICustomSort = this.state.EditedAdaptableBlotterObject as ICustomSort;
    if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
      this.props.onEditCustomSort(customSort);
    } else {
      this.props.onAddCustomSort(customSort);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let customSort = this.state.EditedAdaptableBlotterObject as ICustomSort;
    return (
      StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) &&
      ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    CustomSorts: state.CustomSort.CustomSorts,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddCustomSort: (customSort: ICustomSort) =>
      dispatch(CustomSortRedux.CustomSortAdd(customSort)),
    onEditCustomSort: (customSort: ICustomSort) =>
      dispatch(CustomSortRedux.CustomSortEdit(customSort)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.CustomSortStrategyId)),
  };
}

export let CustomSortSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomSortSummaryComponent);
