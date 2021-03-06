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
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface PlusMinusSummaryProps extends StrategySummaryProps<PlusMinusSummaryComponent> {
  PlusMinusRules: PlusMinusRule[];
  onAddPlusMinusRule: (PlusMinus: PlusMinusRule) => PlusMinusRedux.PlusMinusRuleAddAction;
  onEditPlusMinusRule: (PlusMinus: PlusMinusRule) => PlusMinusRedux.PlusMinusRuleEditAction;
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
    let strategySummaries: any = [];

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.PlusMinusStrategyFriendlyName}
        functionName={StrategyConstants.PlusMinusStrategyId}
        strategySummary={Helper.ReturnItemCount(
          this.props.PlusMinusRules.filter(
            item => item.ColumnId == this.props.summarisedColumn.ColumnId
          ),
          'Plus Minus Condition'
        )}
        onNew={() => this.onNew()}
        newButtonTooltip={'Plus / Minus Rule'}
        accessLevel={this.props.accessLevel}
      />
    );

    strategySummaries.push(titleRow);

    // existing items
    this.props.PlusMinusRules.map((item, index) => {
      if (item.ColumnId == this.props.summarisedColumn.ColumnId) {
        let detailRow = (
          <StrategyDetail
            key={'PM' + index}
            item1={'Nudge Value: ' + item.NudgeValue}
            item2={this.wrapExpressionDescription(
              this.props.api.queryApi.QueryObjectToString(item)
            )}
            configEnity={item}
            showShare={this.props.teamSharingActivated}
            entityType={StrategyConstants.PlusMinusStrategyFriendlyName}
            onEdit={() => this.onEdit(item)}
            onShare={description => this.props.onShare(item, description)}
            onDelete={PlusMinusRedux.PlusMinusRuleDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.editedAdaptableObject && (
          <PlusMinusWizard
            editedAdaptableObject={this.state.editedAdaptableObject as PlusMinusRule}
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

  onNew() {
    let configEntity: PlusMinusRule = ObjectFactory.CreateEmptyPlusMinusRule();
    configEntity.ColumnId = this.props.summarisedColumn.ColumnId;
    this.setState({
      editedAdaptableObject: configEntity,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(PlusMinus: PlusMinusRule) {
    this.setState({
      editedAdaptableObject: Helper.cloneObject(PlusMinus),
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
    let plusMinus = this.state.editedAdaptableObject as PlusMinusRule;

    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditPlusMinusRule(plusMinus);
    } else {
      this.props.onAddPlusMinusRule(plusMinus);
    }

    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let plusMinus = this.state.editedAdaptableObject as PlusMinusRule;
    return (
      StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
      StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
      (plusMinus.IsDefaultNudge ||
        StringExtensions.IsNullOrEmpty(plusMinus.Expression) ||
        StringExtensions.IsNullOrEmpty(plusMinus.SharedQueryId))
    );
  }

  wrapExpressionDescription(expressionDescription: string): string {
    return expressionDescription == 'Any' ? '[Default Column Nudge Value]' : expressionDescription;
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any): Partial<PlusMinusSummaryProps> {
  return {
    PlusMinusRules: state.PlusMinus.PlusMinusRules,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<PlusMinusSummaryProps> {
  return {
    onAddPlusMinusRule: (PlusMinusRule: PlusMinusRule) =>
      dispatch(PlusMinusRedux.PlusMinusRuleAdd(PlusMinusRule)),
    onEditPlusMinusRule: (PlusMinusRule: PlusMinusRule) =>
      dispatch(PlusMinusRedux.PlusMinusRuleEdit(PlusMinusRule)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.PlusMinusStrategyId,
          description
        )
      ),
  };
}

export let PlusMinusSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlusMinusSummaryComponent);
