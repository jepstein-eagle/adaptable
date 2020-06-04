import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ColumnCategoryWizard } from './Wizard/ColumnCategoryWizard';
import * as ColumnCategoryRedux from '../../Redux/ActionsReducers/ColumnCategoryRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { StrategyProfile } from '../Components/StrategyProfile';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import { CalculatedColumnSummaryProps } from '../CalculatedColumn/CalculatedColumnSummary';

export interface ColumnCategorySummaryProps
  extends StrategySummaryProps<ColumnCategorySummaryComponent> {
  ColumnCategorys: ColumnCategory[];
  // onAddUpdateColumnCategory: (index: number, ColumnCategory: ColumnCategory) => ColumnCategoryRedux.ColumnCategoryAddUpdateConditionAction
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

export class ColumnCategorySummaryComponent extends React.Component<
  ColumnCategorySummaryProps,
  EditableConfigEntityState
> {
  constructor(props: ColumnCategorySummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  render(): any {
    let ColumnCategory: ColumnCategory = this.props.ColumnCategorys.find(lk =>
      ArrayExtensions.ContainsItem(lk.ColumnIds, this.props.SummarisedColumn.ColumnId)
    );
    let noColumnCategory: boolean = ColumnCategory == null;

    let ColumnCategoryRow: any;
    if (noColumnCategory) {
      ColumnCategoryRow = (
        <StrategyHeader
          key={StrategyConstants.ColumnCategoryStrategyFriendlyName}
          FunctionName={StrategyConstants.ColumnCategoryStrategyId}
          StrategySummary={'None'}
          onNew={() => this.onNew()}
          NewButtonTooltip={StrategyConstants.ColumnCategoryStrategyFriendlyName}
          AccessLevel={this.props.AccessLevel}
        />
      );
    } else {
      ColumnCategoryRow = (
        <StrategyDetail
          key={StrategyConstants.ColumnCategoryStrategyFriendlyName}
          Item1={<StrategyProfile FunctionName={StrategyConstants.ColumnCategoryStrategyId} />}
          Item2={ColumnCategory.ColumnCategoryId}
          ConfigEnity={ColumnCategory}
          showShare={this.props.TeamSharingActivated}
          EntityType={StrategyConstants.ColumnCategoryStrategyFriendlyName}
          onEdit={() => this.onEdit(ColumnCategory)}
          onShare={description => this.props.onShare(ColumnCategory, description)}
          onDelete={ColumnCategoryRedux.ColumnCategoryDelete(ColumnCategory)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {ColumnCategoryRow}

        {this.state.EditedAdaptableObject && (
          <ColumnCategoryWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as ColumnCategory}
            ConfigEntities={null}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            ColumnCategorys={this.props.ColumnCategorys}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            Adaptable={this.props.Adaptable}
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
    let configEntity: ColumnCategory = ObjectFactory.CreateEmptyColumnCategory();
    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(ColumnCategory: ColumnCategory) {
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(ColumnCategory),
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
    //  this.props.onAddUpdateColumnCategory(this.state.EditedAdaptableObjectIndex, this.state.EditedAdaptableObject as ColumnCategory);
    //  this.setState({ EditedAdaptableObject: null, WizardStartIndex: 0, EditedAdaptableObjectIndex: -1, });
  }

  canFinishWizard() {
    //   let ColumnCategory = this.state.EditedAdaptableObject as ColumnCategory
    //   return StringExtensions.IsNotNullOrEmpty(ColumnCategory.ColumnId) &&
    //       StringExtensions.IsNotNullOrEmpty(ColumnCategory.NudgeValue.toString()) && // check its a number??
    //       (ColumnCategory.IsDefaultNudge || ExpressionHelper.IsNotEmptyOrInvalidExpression(ColumnCategory.Expression))
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<ColumnCategorySummaryProps> {
  return {
    Columns: state.Grid.Columns,
    ColumnCategorys: state.ColumnCategory.ColumnCategories,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    NamedFilters: state.NamedFilter.NamedFilters,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ColumnCategorySummaryProps> {
  return {
    //   onAddUpdateColumnCategory: (index: number, ColumnCategory: ColumnCategory) => dispatch(ColumnCategoryRedux.ColumnCategoryAddUpdateCondition(index, ColumnCategory)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.ColumnCategoryStrategyId,
          description
        )
      ),
  };
}

export let ColumnCategorySummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnCategorySummaryComponent);
