import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
  EditableExpressionConfigEntityState,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ConditionalStyleWizard } from './Wizard/ConditionalStyleWizard';
import * as ConditionalStyleRedux from '../../Redux/ActionsReducers/ConditionalStyleRedux';
import * as QueryRedux from '../../Redux/ActionsReducers/QueryRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import * as parser from '../../parser/src';

export interface ConditionalStyleSummaryProps
  extends StrategySummaryProps<ConditionalStyleSummaryComponent> {
  ConditionalStyles: ConditionalStyle[];
  ColorPalette: string[];
  StyleClassNames: string[];
  SharedQueries: SharedQuery[];
  onAddConditionalStyle: (
    conditionalStyle: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleAddAction;
  onEditConditionalStyle: (
    conditionalStyle: ConditionalStyle
  ) => ConditionalStyleRedux.ConditionalStyleEditAction;
  onAddSharedQuery?: (sharedQuery: SharedQuery) => QueryRedux.SharedQueryAddAction;
}

export class ConditionalStyleSummaryComponent extends React.Component<
  ConditionalStyleSummaryProps,
  EditableExpressionConfigEntityState
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
        functionName={StrategyConstants.ConditionalStyleStrategyId}
        strategySummary={Helper.ReturnItemCount(
          this.props.ConditionalStyles.filter(item =>
            this.props.api.scopeApi.isColumnInScopeColumns(this.props.summarisedColumn, item.Scope)
          ),
          StrategyConstants.ConditionalStyleStrategyFriendlyName
        )}
        onNew={() => this.onNew()}
        newButtonTooltip={StrategyConstants.ConditionalStyleStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    strategySummaries.push(titleRow);

    // existing items
    this.props.ConditionalStyles.map((item, index) => {
      if (this.props.api.scopeApi.isColumnInScopeColumns(this.props.summarisedColumn, item.Scope)) {
        let detailRow = (
          <StrategyDetail
            key={'CS' + index}
            Item1={<StyleVisualItem Style={item.Style} />}
            Item2={item.Expression}
            ConfigEnity={item}
            EntityType={StrategyConstants.ConditionalStyleStrategyFriendlyName}
            showShare={this.props.teamSharingActivated}
            onEdit={() => this.onEdit(item)}
            onShare={description => this.props.onShare(item, description)}
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
            editedAdaptableObject={this.state.EditedAdaptableObject as ConditionalStyle}
            configEntities={null}
            modalContainer={this.props.modalContainer}
            StyleClassNames={this.props.StyleClassNames}
            api={this.props.api}
            wizardStartIndex={this.state.WizardStartIndex}
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
    let configEntity: ConditionalStyle = ObjectFactory.CreateEmptyConditionalStyle();
    configEntity.Scope = {
      ColumnIds: [this.props.summarisedColumn.ColumnId],
    };
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

    if (StringExtensions.IsNullOrEmpty(conditionalStyle.Expression)) {
      return false;
    }

    // Not sure about when we do this...
    if (
      !conditionalStyle.Expression.startsWith('SHARED') &&
      !parser.validateBoolean(conditionalStyle.Expression)
    ) {
      return false;
    }

    return UIHelper.IsNotEmptyStyle(conditionalStyle.Style);
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<ConditionalStyleSummaryProps> {
  return {
    ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
    StyleClassNames: state.UserInterface.StyleClassNames,
    SharedQueries: state.Query.SharedQueries,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ConditionalStyleSummaryProps> {
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

export let ConditionalStyleSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionalStyleSummaryComponent);
