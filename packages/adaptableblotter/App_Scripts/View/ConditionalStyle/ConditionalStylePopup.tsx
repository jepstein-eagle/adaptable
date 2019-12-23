import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import { ConditionalStyleScope } from '../../PredefinedConfig/Common/Enums';
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

interface ConditionalStylePopupProps
  extends StrategyViewPopupProps<ConditionalStylePopupComponent> {
  ConditionalStyles: ConditionalStyle[];
  StyleClassNames: string[];
  ColumnCategories: ColumnCategory[];
  onAddConditionalStyle: (
    condiditionalStyleCondition: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleAddAction;
  onEditConditionalStyle: (
    condiditionalStyleCondition: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleEditAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
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
          _editedConditionalStyle.ConditionalStyleScope = ConditionalStyleScope.Column;
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
            key={'CS' + (conditionalStyle.Uuid || index)}
            onShare={() => this.props.onShare(conditionalStyle)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            UserFilters={this.props.UserFilters}
            Columns={this.props.Columns}
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
          headerText={StrategyConstants.ConditionalStyleStrategyName}
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
              ColorPalette={this.props.ColorPalette}
              StyleClassNames={this.props.StyleClassNames}
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
      conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column &&
      StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnId)
    ) {
      return false;
    }
    if (
      conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory &&
      StringExtensions.IsNullOrEmpty(conditionalStyle.ColumnCategoryId)
    ) {
      return false;
    }
    return (
      ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) &&
      UIHelper.IsNotEmptyStyle(conditionalStyle.Style)
    );
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
    StyleClassNames: state.UserInterface.StyleClassNames,
    ColumnCategories: state.ColumnCategory.ColumnCategories,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddConditionalStyle: (conditionalStyle: ConditionalStyle) =>
      dispatch(ConditionalStyleRedux.ConditionalStyleAdd(conditionalStyle)),
    onEditConditionalStyle: (conditionalStyle: ConditionalStyle) =>
      dispatch(ConditionalStyleRedux.ConditionalStyleEdit(conditionalStyle)),
    onShare: (entity: AdaptableObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.ConditionalStyleStrategyId as AdaptableFunctionName
        )
      ),
  };
}

export let ConditionalStylePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionalStylePopupComponent);
