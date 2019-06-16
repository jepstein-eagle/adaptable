import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PlusMinusWizard } from './Wizard/PlusMinusWizard';
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';
import { IPlusMinusRule } from '../../PredefinedConfig/IUserState Interfaces/PlusMinusState';

export interface PlusMinusSummaryProps extends StrategySummaryProps<PlusMinusSummaryComponent> {
  PlusMinusRules: IPlusMinusRule[];
  onAddPlusMinusRule: (PlusMinus: IPlusMinusRule) => PlusMinusRedux.PlusMinusRuleAddAction;
  onEditPlusMinusRule: (PlusMinus: IPlusMinusRule) => PlusMinusRedux.PlusMinusRuleEditAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class PlusMinusSummaryComponent extends React.Component<
  PlusMinusSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: PlusMinusSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  render(): any {
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__plusminus';
    let strategySummaries: any = [];

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.PlusMinusStrategyName}
        cssClassName={this.props.cssClassName}
        StrategyId={StrategyConstants.PlusMinusStrategyId}
        StrategySummary={Helper.ReturnItemCount(
          this.props.PlusMinusRules.filter(
            item => item.ColumnId == this.props.SummarisedColumn.ColumnId
          ),
          'Plus Minus Condition'
        )}
        onNew={() => this.onNew()}
        NewButtonTooltip={'Plus / Minus Rule'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    strategySummaries.push(titleRow);

    // existing items
    this.props.PlusMinusRules.map((item, index) => {
      if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
        let detailRow = (
          <StrategyDetail
            key={'PM' + index}
            cssClassName={this.props.cssClassName}
            Item1={'Nudge Value: ' + item.NudgeValue}
            Item2={this.wrapExpressionDescription(
              ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns)
            )}
            ConfigEnity={item}
            showShare={this.props.TeamSharingActivated}
            EntityType={StrategyConstants.PlusMinusStrategyName}
            onEdit={() => this.onEdit(item)}
            onShare={() => this.props.onShare(item)}
            onDelete={PlusMinusRedux.PlusMinusRuleDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.EditedAdaptableBlotterObject && (
          <PlusMinusWizard
            cssClassName={cssWizardClassName}
            EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as IPlusMinusRule}
            ConfigEntities={null}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            SelectedColumnId={this.props.SummarisedColumn.ColumnId}
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
    let configEntity: IPlusMinusRule = ObjectFactory.CreateEmptyPlusMinusRule();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    this.setState({
      EditedAdaptableBlotterObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(PlusMinus: IPlusMinusRule) {
    this.setState({
      EditedAdaptableBlotterObject: Helper.cloneObject(PlusMinus),
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
    let plusMinus = this.state.EditedAdaptableBlotterObject as IPlusMinusRule;

    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditPlusMinusRule(plusMinus);
    } else {
      this.props.onAddPlusMinusRule(plusMinus);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let plusMinus = this.state.EditedAdaptableBlotterObject as IPlusMinusRule;
    return (
      StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
      StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
      (plusMinus.IsDefaultNudge ||
        ExpressionHelper.IsNullOrEmptyOrValidExpression(plusMinus.Expression))
    );
  }

  wrapExpressionDescription(expressionDescription: string): string {
    return expressionDescription == 'Any' ? '[Default Column Nudge Value]' : expressionDescription;
  }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    PlusMinusRules: state.PlusMinus.PlusMinusRules,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddPlusMinusRule: (PlusMinusRule: IPlusMinusRule) =>
      dispatch(PlusMinusRedux.PlusMinusRuleAdd(PlusMinusRule)),
    onEditPlusMinusRule: (PlusMinusRule: IPlusMinusRule) =>
      dispatch(PlusMinusRedux.PlusMinusRuleEdit(PlusMinusRule)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PlusMinusStrategyId)),
  };
}

export let PlusMinusSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlusMinusSummaryComponent);
