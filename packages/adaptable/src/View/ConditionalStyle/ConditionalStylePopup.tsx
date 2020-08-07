import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import * as SharedExpressionRedux from '../../Redux/ActionsReducers/SharedExpressionRedux';
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
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { IColItem } from '../UIInterfaces';
import { UIHelper } from '../UIHelper';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';
import * as parser from '../../parser/src';
import { SharedExpression } from '../../PredefinedConfig/SharedExpressionState';

interface ConditionalStylePopupProps
  extends StrategyViewPopupProps<ConditionalStylePopupComponent> {
  ConditionalStyles: ConditionalStyle[];
  StyleClassNames: string[];
  ColumnCategories: ColumnCategory[];
  SharedExpressions: SharedExpression[];
  onAddConditionalStyle: (
    condiditionalStyleCondition: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleAddAction;
  onEditConditionalStyle: (
    condiditionalStyleCondition: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleEditAction;
  onAddSharedExpression?: (
    sharedExpression: SharedExpression
  ) => SharedExpressionRedux.SharedExpressionAddAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
}

class ConditionalStylePopupComponent extends React.Component<
  ConditionalStylePopupProps,
  EditableConfigEntityState
> {
  constructor(props: ConditionalStylePopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  shouldClosePopupOnFinishWizard: boolean = false;
  componentDidMount() {
    if (this.props.PopupParams) {
      if (this.props.PopupParams.action && this.props.PopupParams.columnId) {
        let columnId: string = this.props.PopupParams.columnId;
        if (this.props.PopupParams.action == 'New') {
          let _editedConditionalStyle: ConditionalStyle = ObjectFactory.CreateEmptyConditionalStyle();
          _editedConditionalStyle.ColumnId = columnId;
          _editedConditionalStyle.ConditionalStyleScope = 'Column';
          this.setState({
            EditedAdaptableObject: _editedConditionalStyle,
            WizardStartIndex: 1,
            WizardStatus: WizardStatus.New,
          });
        }
      }
      this.shouldClosePopupOnFinishWizard =
        this.props.PopupParams.source && this.props.PopupParams.source == 'ColumnMenu';
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
      { Content: 'Scope', Size: 2 },
      { Content: 'Style', Size: 2 },
      { Content: 'Query', Size: 6 },
      { Content: '', Size: 2 },
    ];
    let conditionalStyles = this.props.ConditionalStyles.map(
      (conditionalStyle: ConditionalStyle, index) => {
        return (
          <ConditionalStyleEntityRow
            AdaptableObject={conditionalStyle}
            colItems={colItems}
            api={this.props.Api}
            key={'CS' + (conditionalStyle.Uuid || index)}
            onShare={description => this.props.onShare(conditionalStyle, description)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            onEdit={() => this.onEdit(conditionalStyle)}
            onDeleteConfirm={ConditionalStyleRedux.ConditionalStyleDelete(conditionalStyle)}
            AccessLevel={this.props.AccessLevel}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        onClick={() => this.onNew()}
        tooltip="Create Conditional Style"
        AccessLevel={this.props.AccessLevel}
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

          {this.state.EditedAdaptableObject != null && (
            <ConditionalStyleWizard
              EditedAdaptableObject={this.state.EditedAdaptableObject as ConditionalStyle}
              ConfigEntities={null}
              ModalContainer={this.props.ModalContainer}
              Api={this.props.Api}
              StyleClassNames={this.props.StyleClassNames}
              WizardStartIndex={this.state.WizardStartIndex}
              onCloseWizard={() => this.onCloseWizard()}
              onFinishWizard={() => this.onFinishWizard()}
              canFinishWizard={() => this.canFinishWizard()}
              SharedExpressions={this.props.SharedExpressions}
              onAddSharedExpression={this.props.onAddSharedExpression}
            />
          )}
        </PanelWithButton>
      </Flex>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableObject: ObjectFactory.CreateEmptyConditionalStyle(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(condition: ConditionalStyle) {
    let clonedObject: ConditionalStyle = Helper.cloneObject(condition);
    this.setState({
      EditedAdaptableObject: clonedObject,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    if (this.shouldClosePopupOnFinishWizard) {
      this.props.onClosePopup();
    }
  }

  onFinishWizard() {
    const conditionalStyle = this.state.EditedAdaptableObject as ConditionalStyle;
    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddConditionalStyle(conditionalStyle);
    } else if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditConditionalStyle(conditionalStyle);
    }

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
    this.shouldClosePopupOnFinishWizard = false;
  }

  canFinishWizard() {
    let conditionalStyle = this.state.EditedAdaptableObject as ConditionalStyle;
    if (
      conditionalStyle.ConditionalStyleScope == 'Column' &&
      StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnId)
    ) {
      return false;
    }
    if (
      conditionalStyle.ConditionalStyleScope == 'ColumnCategory' &&
      StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnCategoryId)
    ) {
      return false;
    }

    if (
      conditionalStyle.Expression.Type === 'Shared' &&
      StringExtensions.IsNullOrEmpty(conditionalStyle.Expression.SharedExpressionId)
    ) {
      return false;
    }

    if (
      conditionalStyle.Expression.Type === 'Custom' &&
      !parser.validateBoolean(conditionalStyle.Expression.CustomExpression)
    ) {
      return false;
    }

    return UIHelper.IsNotEmptyStyle(conditionalStyle.Style);
  }
}

function mapStateToProps(state: AdaptableState): Partial<ConditionalStylePopupProps> {
  return {
    ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
    StyleClassNames: state.UserInterface.StyleClassNames,
    ColumnCategories: state.ColumnCategory.ColumnCategories,
    SharedExpressions: state.SharedExpression.SharedExpressions,
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
    onAddSharedExpression: (sharedExpression: SharedExpression) =>
      dispatch(SharedExpressionRedux.SharedExpressionAdd(sharedExpression)),
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
