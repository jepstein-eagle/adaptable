import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ConditionalStyleEntityRow } from './ConditionalStyleEntityRow';
import { ConditionalStyleWizard } from './Wizard/ConditionalStyleWizard';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ButtonNew } from '../Components/Buttons/ButtonNew';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObjectCollection } from '../Components/AdaptableObjectCollection';
import {
  WizardStatus,
  EditableExpressionConfigEntityState,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';
import * as parser from '../../parser/src';
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import { createUuid } from '../../PredefinedConfig/Uuid';
import { EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';

interface ConditionalStylePopupProps
  extends StrategyViewPopupProps<ConditionalStylePopupComponent> {
  ConditionalStyles: ConditionalStyle[];
  StyleClassNames: string[];
  onAddConditionalStyle: (
    condiditionalStyleCondition: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleAddAction;
  onEditConditionalStyle: (
    condiditionalStyleCondition: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleEditAction;
  onAddSharedQuery: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryAddAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class ConditionalStylePopupComponent extends React.Component<
  ConditionalStylePopupProps,
  EditableExpressionConfigEntityState
> {
  constructor(props: ConditionalStylePopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.popupParams) {
      if (this.props.popupParams.action && this.props.popupParams.column) {
        let column: AdaptableColumn = this.props.popupParams.column;
        if (this.props.popupParams.action == 'New') {
          let _editedConditionalStyle: ConditionalStyle = ObjectFactory.CreateEmptyConditionalStyle();
          _editedConditionalStyle.Scope = {
            ColumnIds: [column.ColumnId],
          };

          this.setState({
            editedAdaptableObject: _editedConditionalStyle,
            wizardStartIndex: 0,
            wizardStatus: WizardStatus.New,
          });
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.popupParams.source && this.props.popupParams.source == 'ColumnMenu';
    }
  }

  render() {
    let infoBody: any[] = [
      'Conditional Styles enable columns and rows to be given distinct styles according to user rules.',
      <br />,
      <br />,
      'Styles include selection of fore and back colours, and font properties.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Scope', Size: 4 },
      { Content: 'Style', Size: 2 },
      { Content: 'Query', Size: 4 },
      { Content: '', Size: 2 },
    ];
    let conditionalStyles = this.props.ConditionalStyles.map(
      (conditionalStyle: ConditionalStyle, index) => {
        return (
          <ConditionalStyleEntityRow
            adaptableObject={conditionalStyle}
            colItems={colItems}
            api={this.props.api}
            key={'CS' + (conditionalStyle.Uuid || index)}
            onShare={description => this.props.onShare(conditionalStyle, description)}
            teamSharingActivated={this.props.teamSharingActivated}
            onEdit={() => this.onEdit(conditionalStyle)}
            onDeleteConfirm={ConditionalStyleRedux.ConditionalStyleDelete(conditionalStyle)}
            accessLevel={this.props.accessLevel}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Conditional Style"
        accessLevel={this.props.accessLevel}
        style={{
          color: 'var(--ab-color-text-on-add)',
          fill: 'var(--ab-color-text-on-add',
          background: 'var(--ab-color-action-add)',
        }}
      />
    );

    return (
      <Flex flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.ConditionalStyleStrategyFriendlyName}
          button={newButton}
          bodyProps={{ padding: 0 }}
          glyphicon={StrategyConstants.ConditionalStyleGlyph}
          infoBody={infoBody}
        >
          {this.props.ConditionalStyles.length == 0 ? (
            <EmptyContent>
              Click 'New' to create a new conditional style to be applied at row or column level
              when a rule set by you is met.
            </EmptyContent>
          ) : (
            <AdaptableObjectCollection colItems={colItems} items={conditionalStyles} />
          )}

          {this.state.editedAdaptableObject != null && (
            <ConditionalStyleWizard
              editedAdaptableObject={this.state.editedAdaptableObject as ConditionalStyle}
              configEntities={null}
              modalContainer={this.props.modalContainer}
              api={this.props.api}
              StyleClassNames={this.props.StyleClassNames}
              wizardStartIndex={this.state.wizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
              onSetNewSharedQueryName={newSharedQueryName =>
                this.setState({
                  newSharedQueryName: newSharedQueryName,
                })
              }
              onSetUseSharedQuery={useSharedQuery =>
                this.setState({
                  useSharedQuery: useSharedQuery,
                })
              }
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onNew() {
    this.setState({
      editedAdaptableObject: ObjectFactory.CreateEmptyConditionalStyle(),
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(condition: ConditionalStyle) {
    let clonedObject: ConditionalStyle = Helper.cloneObject(condition);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.Edit,
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
    const conditionalStyle = this.state.editedAdaptableObject as ConditionalStyle;

    if (StringExtensions.IsNotNullOrEmpty(this.state.newSharedQueryName)) {
      const SharedQueryId = createUuid();
      this.props.onAddSharedQuery({
        Uuid: SharedQueryId,
        Name: this.state.newSharedQueryName,
        Expression: conditionalStyle.Expression,
      });

      conditionalStyle.Expression = undefined;
      conditionalStyle.SharedQueryId = SharedQueryId;
    }

    if (this.state.wizardStatus == WizardStatus.New) {
      this.props.onAddConditionalStyle(conditionalStyle);
    } else if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditConditionalStyle(conditionalStyle);
    }

    this.resetState();
  }

  canFinishWizard() {
    let conditionalStyle = this.state.editedAdaptableObject as ConditionalStyle;

    if (
      this.state.useSharedQuery &&
      StringExtensions.IsNullOrEmpty(conditionalStyle.SharedQueryId)
    ) {
      return false;
    }

    if (
      !this.state.useSharedQuery &&
      StringExtensions.IsNullOrEmpty(conditionalStyle.Expression) &&
      conditionalStyle.Predicate == null
    ) {
      return false;
    }

    if (
      !this.state.useSharedQuery &&
      StringExtensions.IsNotNullOrEmpty(conditionalStyle.Expression) &&
      !parser.validateBoolean(conditionalStyle.Expression)
    ) {
      return false;
    }

    return UIHelper.IsNotEmptyStyle(conditionalStyle.Style);
  }

  resetState() {
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
      newSharedQueryName: EMPTY_STRING,
      useSharedQuery: false,
    });
  }
}

function mapStateToProps(state: AdaptableState): Partial<ConditionalStylePopupProps> {
  return {
    ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ConditionalStylePopupProps> {
  return {
    onAddConditionalStyle: (conditionalStyle: ConditionalStyle) =>
      dispatch(ConditionalStyleRedux.ConditionalStyleAdd(conditionalStyle)),
    onEditConditionalStyle: (conditionalStyle: ConditionalStyle) =>
      dispatch(ConditionalStyleRedux.ConditionalStyleEdit(conditionalStyle)),
    onAddSharedQuery: (sharedQuery: SharedQuery) =>
      dispatch(QueryRedux.SharedQueryAdd(sharedQuery)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.ConditionalStyleStrategyId,
          description
        )
      ),
  };
}

export let ConditionalStylePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionalStylePopupComponent);
