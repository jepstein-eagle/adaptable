import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ConditionalStyleWizard } from './Wizard/ConditionalStyleWizard';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ConditionalStyleScope, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface ConditionalStyleSummaryProps
  extends StrategySummaryProps<ConditionalStyleSummaryComponent> {
  ConditionalStyles: ConditionalStyle[];
  ColorPalette: string[];
  ColumnCategories: ColumnCategory[];
  StyleClassNames: string[];
  onAddConditionalStyle: (
    conditionalStyle: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleAddAction;
  onEditConditionalStyle: (
    conditionalStyle: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleEditAction;
}

export class ConditionalStyleSummaryComponent extends React.Component<
  ConditionalStyleSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: ConditionalStyleSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }
  render(): any {
    let strategySummaries: any = [];

    // title row
    let titleRow = (
      <StrategyHeader
        key={StrategyConstants.ConditionalStyleStrategyFriendlyName}
        FunctionName={StrategyConstants.ConditionalStyleStrategyId}
        StrategySummary={Helper.ReturnItemCount(
          this.props.ConditionalStyles.filter(
            item =>
              item.ColumnId == this.props.SummarisedColumn.ColumnId &&
              item.ConditionalStyleScope == ConditionalStyleScope.Column
          ),
          StrategyConstants.ConditionalStyleStrategyFriendlyName
        )}
        onNew={() => this.onNew()}
        NewButtonTooltip={StrategyConstants.ConditionalStyleStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    this.props.ConditionalStyles.map((item, index) => {
      if (
        item.ColumnId == this.props.SummarisedColumn.ColumnId &&
        item.ConditionalStyleScope == ConditionalStyleScope.Column
      ) {
        let detailRow = (
          <StrategyDetail
            key={'CS' + index}
            Item1={<StyleVisualItem Style={item.Style} />}
            Item2={ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns)}
            ConfigEnity={item}
            EntityType={StrategyConstants.ConditionalStyleStrategyFriendlyName}
            showShare={this.props.TeamSharingActivated}
            onEdit={() => this.onEdit(item)}
            onShare={() => this.props.onShare(item)}
            onDelete={ConditionalStyleRedux.ConditionalStyleDelete(item)}
          />
        );
        strategySummaries.push(detailRow);
      }
    });

    return (
      <div>
        {strategySummaries}

        {this.state.EditedAdaptableObject && (
          <ConditionalStyleWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as ConditionalStyle}
            ConfigEntities={null}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            ColorPalette={this.props.ColorPalette}
            StyleClassNames={this.props.StyleClassNames}
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
    let configEntity: ConditionalStyle = ObjectFactory.CreateEmptyConditionalStyle();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
    configEntity.ConditionalStyleScope = ConditionalStyleScope.Column;
    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(ConditionalStyle: ConditionalStyle) {
    this.setState({
      EditedAdaptableObject: Helper.cloneObject(ConditionalStyle),
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
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditConditionalStyle(this.state.EditedAdaptableObject as ConditionalStyle);
    } else {
      this.props.onAddConditionalStyle(this.state.EditedAdaptableObject as ConditionalStyle);
    }

    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let conditionalStyle = this.state.EditedAdaptableObject as ConditionalStyle;
    return (
      (conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Row ||
        StringExtensions.IsNotNullOrEmpty(conditionalStyle.ColumnId)) &&
      ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) &&
      UIHelper.IsNotEmptyStyle(conditionalStyle.Style)
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
    UserFilters: state.UserFilter.UserFilters,
    SystemFilters: state.SystemFilter.SystemFilters,
    NamedFilters: state.NamedFilter.NamedFilters,
    Entitlements: state.Entitlements.FunctionEntitlements,
    ColorPalette: state.UserInterface.ColorPalette,
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
        TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId)
      ),
  };
}

export let ConditionalStyleSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionalStyleSummaryComponent);
