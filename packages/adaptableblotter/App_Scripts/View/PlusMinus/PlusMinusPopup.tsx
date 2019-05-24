import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Col, HelpBlock } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as PlusMinusRedux from '../../Redux/ActionsReducers/PlusMinusRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PlusMinusWizard } from './Wizard/PlusMinusWizard';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { EditableConfigEntityState } from '../Components/SharedProps/EditableConfigEntityState';
import { PlusMinusEntityRow } from './PlusMinusEntityRow';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IAdaptableBlotterObject } from '../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';
import { IPlusMinusRule } from '../../Utilities/Interface/BlotterObjects/IPlusMinusRule';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { MessageType } from '../../Utilities/Enums';
import EmptyContent from '../../components/EmptyContent';
import { Flex } from 'rebass';

interface PlusMinusPopupProps extends StrategyViewPopupProps<PlusMinusPopupComponent> {
  DefaultNudgeValue: number;
  PlusMinusRules: IPlusMinusRule[];
  onAddPlusMinusRule: (PlusMinus: IPlusMinusRule) => PlusMinusRedux.PlusMinusRuleAddAction;
  onEditPlusMinusRule: (
    Index: number,
    PlusMinus: IPlusMinusRule
  ) => PlusMinusRedux.PlusMinusRuleEditAction;
  onConfirmWarningCellValidation: (
    confirmation: IUIConfirmation
  ) => PopupRedux.PopupShowConfirmationAction;
  onShare: (entity: IAdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class PlusMinusPopupComponent extends React.Component<
  PlusMinusPopupProps,
  EditableConfigEntityState
> {
  constructor(props: PlusMinusPopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
      let arrayParams = this.props.PopupParams.split('|');
      if (arrayParams.length == 2 && arrayParams[0] == 'New') {
        let plusMinus = ObjectFactory.CreateEmptyPlusMinusRule();
        plusMinus.ColumnId = arrayParams[1];
        this.setState({
          EditedAdaptableBlotterObject: plusMinus,
          EditedAdaptableBlotterObjectIndex: -1,
          WizardStartIndex: 1,
        });
      }
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__plusminus';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__plusminus';

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
      let column = ColumnHelper.getColumnFromId(x.ColumnId, this.props.Columns);

      return (
        <PlusMinusEntityRow
          cssClassName={cssClassName}
          colItems={colItems}
          AdaptableBlotterObject={x}
          key={index}
          Index={index}
          UserFilters={this.props.UserFilters}
          Columns={this.props.Columns}
          onEdit={(index, customSort) => this.onEdit(index, x as IPlusMinusRule)}
          TeamSharingActivated={this.props.TeamSharingActivated}
          onShare={() => this.props.onShare(x)}
          onDeleteConfirm={PlusMinusRedux.PlusMinusRuleDelete(index, x)}
          Column={column}
          onColumnDefaultNudgeValueChange={(index, event) =>
            this.onColumnDefaultNudgeValueChange(index, event)
          }
        />
      );
    });

    let newButton = (
      <ButtonNew
        cssClassName={cssClassName}
        onClick={() => this.createColumnNudgeValue()}
        overrideTooltip="Create Plus / Minus Rule"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex className={cssClassName} flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.PlusMinusStrategyName}
          bsStyle="primary"
          cssClassName={cssClassName}
          button={newButton}
          glyphicon={StrategyConstants.PlusMinusGlyph}
          infoBody={infoBody}
        >
          {PlusMinusRules.length > 0 ? (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={PlusMinusRules}
            />
          ) : (
            <EmptyContent>
              Click 'New' to create new Nudge Value rules for when the '+' or '-' keys are clicked
              while in a numeric cell.
            </EmptyContent>
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <PlusMinusWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={
                this.state.EditedAdaptableBlotterObject as IPlusMinusRule
              }
              ConfigEntities={null}
              ModalContainer={this.props.ModalContainer}
              Columns={this.props.Columns}
              UserFilters={this.props.UserFilters}
              SystemFilters={this.props.SystemFilters}
              WizardStartIndex={this.state.WizardStartIndex}
              SelectedColumnId={null}
              Blotter={this.props.Blotter}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  createColumnNudgeValue() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyPlusMinusRule(),
      EditedAdaptableBlotterObjectIndex: -1,
      WizardStartIndex: 0,
    });
  }
  onEdit(index: number, condition: IPlusMinusRule) {
    let clonedObject: IPlusMinusRule = Helper.cloneObject(condition);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      EditedAdaptableBlotterObjectIndex: index,
      WizardStartIndex: 1,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      EditedAdaptableBlotterObjectIndex: -1,
    });
  }

  onFinishWizard() {
    let plusMinus = this.state.EditedAdaptableBlotterObject as IPlusMinusRule;
    if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
      this.props.onEditPlusMinusRule(this.state.EditedAdaptableBlotterObjectIndex, plusMinus);
    } else {
      this.props.onAddPlusMinusRule(plusMinus);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      EditedAdaptableBlotterObjectIndex: -1,
    });
  }

  canFinishWizard() {
    let plusMinus = this.state.EditedAdaptableBlotterObject as IPlusMinusRule;
    return (
      StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
      StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
      (plusMinus.IsDefaultNudge ||
        ExpressionHelper.IsNotEmptyOrInvalidExpression(plusMinus.Expression))
    );
  }

  onColumnDefaultNudgeValueChange(index: number, event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let plusMinusRule: IPlusMinusRule = {
      ColumnId: this.props.PlusMinusRules[index].ColumnId,
      NudgeValue: parseFloat(e.value),
      IsDefaultNudge: true,
      Expression: this.props.PlusMinusRules[index].Expression,
    };
    this.props.onEditPlusMinusRule(index, plusMinusRule);
  }

  onAddPlusMinusRule(index: number, plusMinusRule: IPlusMinusRule) {
    // check if its a default nudge value that there is not one already set for that column
    if (plusMinusRule.IsDefaultNudge) {
      let existingIndex: number = this.props.PlusMinusRules.findIndex(
        p => p.ColumnId == plusMinusRule.ColumnId && p.IsDefaultNudge
      );
      if (existingIndex > -1) {
        if (existingIndex == index) {
          // editing the existing default nudge so just do an edit
          this.props.onEditPlusMinusRule(index, plusMinusRule);
        } else {
          // its a new one so need warning that will update
          this.onConfirmWarningCellValidation(existingIndex, plusMinusRule);
        }
      } else {
        this.props.onAddPlusMinusRule(plusMinusRule);
      }
    } else {
      // not quite sure that this is right... need to test:
      if (this.state.EditedAdaptableBlotterObjectIndex != -1) {
        this.props.onEditPlusMinusRule(this.state.EditedAdaptableBlotterObjectIndex, plusMinusRule);
      } else {
        this.props.onAddPlusMinusRule(plusMinusRule);
      }
    }
  }

  private onConfirmWarningCellValidation(index: number, plusMinusRule: IPlusMinusRule) {
    let confirmation: IUIConfirmation = {
      CancelButtonText: 'Cancel',
      Header: 'Existing Default Column Nudge Value for: ' + plusMinusRule.ColumnId,
      Msg: 'Do you want to override it with new value: ?',
      ConfirmButtonText: 'Confirm',
      CancelAction: null,
      ConfirmAction: PlusMinusRedux.PlusMinusRuleEdit(index, plusMinusRule),
      ShowInputBox: false,
      MessageType: MessageType.Warning,
    };
    this.props.onConfirmWarningCellValidation(confirmation);
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    PlusMinusRules: state.PlusMinus.PlusMinusRules,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddPlusMinusRule: (PlusMinusRule: IPlusMinusRule) =>
      dispatch(PlusMinusRedux.PlusMinusRuleAdd(PlusMinusRule)),
    onEditPlusMinusRule: (Index: number, PlusMinusRule: IPlusMinusRule) =>
      dispatch(PlusMinusRedux.PlusMinusRuleEdit(Index, PlusMinusRule)),
    onConfirmWarningCellValidation: (confirmation: IUIConfirmation) =>
      dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    onShare: (entity: IAdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PlusMinusStrategyId)),
  };
}

export let PlusMinusPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlusMinusPopupComponent);
