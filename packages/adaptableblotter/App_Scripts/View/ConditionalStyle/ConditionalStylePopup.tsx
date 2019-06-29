import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { HelpBlock } from 'react-bootstrap';
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
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { ColumnCategory } from '../../PredefinedConfig/RunTimeState/ColumnCategoryState';
import { ConditionalStyle } from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { Flex } from 'rebass';
import EmptyContent from '../../components/EmptyContent';

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
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
}

class ConditionalStylePopupComponent extends React.Component<
  ConditionalStylePopupProps,
  EditableConfigEntityState
> {
  constructor(props: ConditionalStylePopupProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  componentDidMount() {
    if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
      let arrayParams = this.props.PopupParams.split('|');
      if (arrayParams.length == 2 && arrayParams[0] == 'New') {
        let _editedConditionalStyle: ConditionalStyle = ObjectFactory.CreateEmptyConditionalStyle();
        _editedConditionalStyle.ColumnId = arrayParams[1];
        _editedConditionalStyle.ConditionalStyleScope = ConditionalStyleScope.Column;
        this.setState({
          EditedAdaptableBlotterObject: _editedConditionalStyle,
          WizardStartIndex: 1,
          WizardStatus: WizardStatus.New,
        });
      }
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__conditionalstyle';
    let cssWizardClassName: string = StyleConstants.WIZARD_STRATEGY + '__conditionalstyle';

    let infoBody: any[] = [
      'Conditional Styles enable columns and rows to be given distinct styles according to user rules.',
      <br />,
      <br />,
      'Styles include selection of fore and back colours, and font properties.',
    ];

    let colItems: IColItem[] = [
      { Content: 'Target', Size: 2 },
      { Content: 'Style', Size: 2 },
      { Content: 'Query', Size: 6 },
      { Content: '', Size: 2 },
    ];
    let conditionalStyles = this.props.ConditionalStyles.map(
      (conditionalStyle: ConditionalStyle, index) => {
        return (
          <ConditionalStyleEntityRow
            cssClassName={cssClassName}
            AdaptableBlotterObject={conditionalStyle}
            colItems={colItems}
            key={'CS' + (conditionalStyle.Uuid || index)}
            onShare={() => this.props.onShare(conditionalStyle)}
            TeamSharingActivated={this.props.TeamSharingActivated}
            UserFilters={this.props.UserFilters}
            Columns={this.props.Columns}
            onEdit={() => this.onEdit(conditionalStyle)}
            onDeleteConfirm={ConditionalStyleRedux.ConditionalStyleDelete(conditionalStyle)}
          />
        );
      }
    );

    let newButton = (
      <ButtonNew
        cssClassName={cssClassName}
        onClick={() => this.onNew()}
        overrideTooltip="Create Conditional Style"
        DisplayMode="Glyph+Text"
        size={'small'}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return (
      <Flex className={cssClassName} flex={1} flexDirection="column">
        <PanelWithButton
          headerText={StrategyConstants.ConditionalStyleStrategyName}
          button={newButton}
          bsStyle={StyleConstants.PRIMARY_BSSTYLE}
          cssClassName={cssClassName}
          glyphicon={StrategyConstants.ConditionalStyleGlyph}
          infoBody={infoBody}
        >
          {this.props.ConditionalStyles.length == 0 ? (
            <EmptyContent>
              Click 'New' to create a new conditional style to be applied at row or column level
              when a rule set by you is met.
            </EmptyContent>
          ) : (
            <AdaptableObjectCollection
              cssClassName={cssClassName}
              colItems={colItems}
              items={conditionalStyles}
            />
          )}

          {this.state.EditedAdaptableBlotterObject != null && (
            <ConditionalStyleWizard
              cssClassName={cssWizardClassName}
              EditedAdaptableBlotterObject={
                this.state.EditedAdaptableBlotterObject as ConditionalStyle
              }
              ConfigEntities={null}
              ModalContainer={this.props.ModalContainer}
              ColorPalette={this.props.ColorPalette}
              ColumnCategories={this.props.ColumnCategories}
              StyleClassNames={this.props.StyleClassNames}
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
        </PanelWithButton>
      </Flex>
    );
  }

  onNew() {
    this.setState({
      EditedAdaptableBlotterObject: ObjectFactory.CreateEmptyConditionalStyle(),
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(condition: ConditionalStyle) {
    let clonedObject: ConditionalStyle = Helper.cloneObject(condition);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.props.onClearPopupParams();
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    const conditionalStyle = this.state.EditedAdaptableBlotterObject as ConditionalStyle;
    if (this.state.WizardStatus == WizardStatus.New) {
      this.props.onAddConditionalStyle(conditionalStyle);
    } else if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditConditionalStyle(conditionalStyle);
    }

    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let conditionalStyle = this.state.EditedAdaptableBlotterObject as ConditionalStyle;
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

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
    StyleClassNames: state.UserInterface.StyleClassNames,
    ColumnCategories: state.ColumnCategory.ColumnCategories,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onAddConditionalStyle: (conditionalStyle: ConditionalStyle) =>
      dispatch(ConditionalStyleRedux.ConditionalStyleAdd(conditionalStyle)),
    onEditConditionalStyle: (conditionalStyle: ConditionalStyle) =>
      dispatch(ConditionalStyleRedux.ConditionalStyleEdit(conditionalStyle)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId)
      ),
  };
}

export let ConditionalStylePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionalStylePopupComponent);
