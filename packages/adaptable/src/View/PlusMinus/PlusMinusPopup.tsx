import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PlusMinusWizard } from './Wizard/PlusMinusWizard';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import {
  WizardStatus,
  EditableExpressionConfigEntityState,
} from '../Components/SharedProps/EditableConfigEntityState';
import { PlusMinusEntityRow } from './PlusMinusEntityRow';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import { EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

interface PlusMinusPopupProps extends StrategyViewPopupProps<PlusMinusPopupComponent> {
  DefaultNudgeValue: number;
  PlusMinusRules: PlusMinusRule[];
  onAddPlusMinusRule: (plusMinusRule: PlusMinusRule) => PlusMinusRedux.PlusMinusRuleAddAction;
  onEditPlusMinusRule: (plusMinusRule: PlusMinusRule) => PlusMinusRedux.PlusMinusRuleEditAction;
  onConfirmWarningCellValidation: (
    confirmation: IUIConfirmation
  ) => PopupRedux.PopupShowConfirmationAction;
  onAddSharedQuery: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryAddAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class PlusMinusPopupComponent extends React.Component<
  PlusMinusPopupProps,
  EditableExpressionConfigEntityState
> {
  constructor(props: PlusMinusPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        if (this.props.PopupParams.action == 'New') {
          let plusMinus = ObjectFactory.CreateEmptyPlusMinusRule();
          plusMinus.ColumnId = this.props.PopupParams.columnId;
          this.setState({
            EditedAdaptableObject: plusMinus,
            WizardStatus: WizardStatus.New,
            WizardStartIndex: 1,
          });
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
    }
  }

  render() {
    let infoBody: any[] = [
      "Enables the creation of Plus/Minus 'Nudge' Rules (i.e. how much to increment numeric cells when ",
      <i>'+'</i>,
      ' or ',
      <i>'-'</i>,
      ' keys are pressed on the keyboard).',
      <br />,
      <br />,
      "Plus/Minus 'Nudge' Rules can be set for any numeric column, with option to specify whether a nudge is always applied or only when a particular condition is met.",
    ];

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 3 },
      { Content: 'Nudge Value', Size: 2 },
      { Content: 'Row Condition', Size: 5 },
      { Content: '', Size: 2 },
    ];
    let PlusMinusRules = this.props.PlusMinusRules.map((x, index) => {
      let column = this.props.Api.columnApi.getColumnFromId(x.ColumnId);

      return (
        <PlusMinusEntityRow
          colItems={colItems}
          api={this.props.Api}
          AdaptableObject={x}
          key={index}
          onEdit={() => this.onEdit(x)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onShare={description => this.props.onShare(x, description)}
          onDeleteConfirm={PlusMinusRedux.PlusMinusRuleDelete(x)}
          Column={column}
          onColumnDefaultNudgeValueChange={(plusMinusRule, event) =>
            this.onColumnDefaultNudgeValueChange(plusMinusRule, event)
          }
          AccessLevel={this.props.AccessLevel}
        />
      );
    });

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Plus / Minus Rule"
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.PlusMinusStrategyFriendlyName}
          bodyProps={{ padding: 0 }}
          button={newButton}
          glyphicon={StrategyConstants.PlusMinusGlyph}
          infoBody={infoBody}
        >
          {PlusMinusRules.length > 0 ? (
            <AdaptableObjectCollection colItems={colItems} items={PlusMinusRules} />
          ) : (
            <EmptyContent>
              Click 'New' to create new Nudge Value rules for when the '+' or '-' keys are clicked
              while in a numeric cell.
            </EmptyContent>
          )}

          {this.state.EditedAdaptableObject != null && (
            <PlusMinusWizard
              editedAdaptableObject={this.state.EditedAdaptableObject as PlusMinusRule}
              configEntities={null}
              modalContainer={this.props.ModalContainer}
              wizardStartIndex={this.state.WizardStartIndex}
              SelectedColumnId={null}
              api={this.props.Api}
              onSetNewSharedQueryName={(newSharedQueryName: string) =>
                this.setState({
                  NewSharedQueryName: newSharedQueryName,
                })
              }
              onSetUseSharedQuery={(useSharedQuery: boolean) =>
                this.setState({
                  UseSharedQuery: useSharedQuery,
                })
              }
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
      EditedAdaptableObject: ObjectFactory.CreateEmptyPlusMinusRule(),
      WizardStatus: WizardStatus.New,
      WizardStartIndex: 0,
    });
  }
  onEdit(plusMinusRule: PlusMinusRule) {
    let clonedObject: PlusMinusRule = Helper.cloneObject(plusMinusRule);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStatus: WizardStatus.Edit,
      WizardStartIndex: 1,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.resetState();
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    let plusMinus = this.state.EditedAdaptableObject as PlusMinusRule;

    if (StringExtensions.IsNotNullOrEmpty(this.state.NewSharedQueryName)) {
      const SharedQueryId = createUuid();
      this.props.onAddSharedQuery({
        Uuid: SharedQueryId,
        Name: this.state.NewSharedQueryName,
        Expression: plusMinus.Expression,
      });
      plusMinus.Expression = undefined;
      plusMinus.SharedQueryId = SharedQueryId;
    }

    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditPlusMinusRule(plusMinus);
    } else {
      this.props.onAddPlusMinusRule(plusMinus);
    }
    this.resetState();
  }

  canFinishWizard() {
    let plusMinus = this.state.EditedAdaptableObject as PlusMinusRule;
    return (
      StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
      StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
      (plusMinus.IsDefaultNudge ||
        StringExtensions.IsNullOrEmpty(plusMinus.Expression) ||
        StringExtensions.IsNullOrEmpty(plusMinus.SharedQueryId))
    );
  }

  resetState() {
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
      NewSharedQueryName: EMPTY_STRING,
      UseSharedQuery: false,
    });
  }

  onColumnDefaultNudgeValueChange(plusMinusRule: PlusMinusRule, event: React.FormEvent<any>) {
    let clonedObject: PlusMinusRule = Helper.cloneObject(plusMinusRule);

    let e = event.target as HTMLInputElement;
    clonedObject.NudgeValue = parseFloat(e.value);

    this.props.onEditPlusMinusRule(clonedObject);
  }

  onAddPlusMinusRule(index: number, plusMinusRule: PlusMinusRule) {
    // check if its a default nudge value that there is not one already set for that column
    if (plusMinusRule.IsDefaultNudge) {
      let existingIndex: number = this.props.PlusMinusRules.findIndex(
        p => p.ColumnId == plusMinusRule.ColumnId && p.IsDefaultNudge
      );
      if (existingIndex > -1) {
        if (existingIndex == index) {
          // editing the existing default nudge so just do an edit
          this.props.onEditPlusMinusRule(plusMinusRule);
        } else {
          // its a new one so need warning that will update
          this.onConfirmWarningCellValidation(existingIndex, plusMinusRule);
        }
      } else {
        this.props.onAddPlusMinusRule(plusMinusRule);
      }
    } else {
      // not quite sure that this is right... need to test:
      if (this.state.WizardStatus == WizardStatus.Edit) {
        this.props.onEditPlusMinusRule(plusMinusRule);
      } else {
        this.props.onAddPlusMinusRule(plusMinusRule);
      }
    }
  }

  private onConfirmWarningCellValidation(index: number, plusMinusRule: PlusMinusRule) {
    let confirmation: IUIConfirmation = {
      CancelButtonText: 'Cancel',
      Header: 'Existing Default Column Nudge Value for: ' + plusMinusRule.ColumnId,
      Msg: 'Do you want to override it with new value: ?',
      ConfirmButtonText: 'Confirm',
      CancelAction: null,
      ConfirmAction: PlusMinusRedux.PlusMinusRuleEdit(plusMinusRule),
      ShowInputBox: false,
      MessageType: MessageType.Warning,
    };
    this.props.onConfirmWarningCellValidation(confirmation);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any): Partial<PlusMinusPopupProps> {
  return {
    PlusMinusRules: state.PlusMinus.PlusMinusRules,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<PlusMinusPopupProps> {
  return {
    onAddPlusMinusRule: (plusMinusRule: PlusMinusRule) =>
      dispatch(PlusMinusRedux.PlusMinusRuleAdd(plusMinusRule)),
    onEditPlusMinusRule: (plusMinusRule: PlusMinusRule) =>
      dispatch(PlusMinusRedux.PlusMinusRuleEdit(plusMinusRule)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(QueryRedux.SharedQueryAdd(sharedQuery)),
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

export let PlusMinusPopup = connect(mapStateToProps, mapDispatchToProps)(PlusMinusPopupComponent);
