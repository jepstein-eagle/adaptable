import * as React from 'react';
import * as Redux from 'redux';
import { StrategySummaryProps } from '../Components/SharedProps/StrategySummaryProps';
import {
  EditableConfigEntityState,
  WizardStatus,
} from '../Components/SharedProps/EditableConfigEntityState';
import { connect } from 'react-redux';
import { Helper } from '../../Utilities/Helpers/Helper';
import { PercentBarWizard } from './Wizard/PercentBarWizard';
import * as PercentBarRedux from '../../Redux/ActionsReducers/PercentBarRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StrategyProfile } from '../Components/StrategyProfile';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface PercentBarSummaryProps extends StrategySummaryProps<PercentBarSummaryComponent> {
  PercentBars: PercentBar[];
  ColorPalette: string[];
  StyleClassNames: string[];
  onAddPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarAddAction;
  onEditPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarEditAction;
  onShare: (entity: AdaptableObject) => TeamSharingRedux.TeamSharingShareAction;
}

export class PercentBarSummaryComponent extends React.Component<
  PercentBarSummaryProps,
  EditableConfigEntityState
> {
  constructor(props: PercentBarSummaryProps) {
    super(props);
    this.state = UIHelper.getEmptyConfigState();
  }

  render(): any {
    let percentBar: PercentBar = this.props.PercentBars.find(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let noPercentBar: boolean = percentBar == null;

    let percentBarRow: any;

    if (noPercentBar) {
      percentBarRow = (
        <StrategyHeader
          key={StrategyConstants.PercentBarStrategyFriendlyName}
          FunctionName={StrategyConstants.PercentBarStrategyId}
          StrategySummary={'No Percent Bar'}
          onNew={() => this.onNew()}
          NewButtonTooltip={StrategyConstants.PercentBarStrategyFriendlyName}
          AccessLevel={this.props.AccessLevel}
        />
      );
    } else {
      percentBarRow = (
        <StrategyDetail
          key={StrategyConstants.PercentBarStrategyFriendlyName}
          Item1={<StrategyProfile FunctionName={StrategyConstants.PercentBarStrategyId} />}
          Item2={'Percent Bar set'}
          ConfigEnity={percentBar}
          showShare={this.props.TeamSharingActivated}
          EntityType={StrategyConstants.PercentBarStrategyFriendlyName}
          onEdit={() => this.onEdit(percentBar)}
          onShare={() => this.props.onShare(percentBar)}
          onDelete={PercentBarRedux.PercentBarDelete(percentBar)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {percentBarRow}

        {this.state.EditedAdaptableObject && (
          <PercentBarWizard
            EditedAdaptableObject={this.state.EditedAdaptableObject as PercentBar}
            ModalContainer={this.props.ModalContainer}
            Columns={this.props.Columns}
            ConfigEntities={this.props.PercentBars}
            UserFilters={this.props.UserFilters}
            SystemFilters={this.props.SystemFilters}
            NamedFilters={this.props.NamedFilters}
            ColumnCategories={this.props.ColumnCategories}
            ColorPalette={this.props.ColorPalette}
            WizardStartIndex={this.state.WizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
            Adaptable={this.props.Adaptable}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: PercentBar = ObjectFactory.CreateEmptyPercentBar();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;

    let distinctColumnsValues: number[] = this.props.Adaptable.StrategyService.getDistinctColumnValues(
      this.props.SummarisedColumn.ColumnId
    );

    configEntity.MinValue = Math.min(...distinctColumnsValues);
    configEntity.MaxValue = Math.max(...distinctColumnsValues);

    this.setState({
      EditedAdaptableObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(renderedColumn: PercentBar) {
    let clonedObject: PercentBar = Helper.cloneObject(renderedColumn);
    this.setState({
      EditedAdaptableObject: clonedObject,
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
    let percentBar: PercentBar = this.state.EditedAdaptableObject as PercentBar;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditPercentBar(percentBar);
    } else {
      this.props.onAddPercentBar(percentBar);
    }
    this.setState({
      EditedAdaptableObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let percentBar = this.state.EditedAdaptableObject as PercentBar;
    return StringExtensions.IsNotNullOrEmpty(percentBar.ColumnId);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    PercentBars: state.PercentBar.PercentBars,
    ColorPalette: state.UserInterface.ColorPalette,
    Entitlements: state.Entitlements.FunctionEntitlements,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarAdd(percentBar)),
    onEditPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarEdit(percentBar)),
    onShare: (entity: AdaptableObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId)),
  };
}

export let PercentBarSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(PercentBarSummaryComponent);
