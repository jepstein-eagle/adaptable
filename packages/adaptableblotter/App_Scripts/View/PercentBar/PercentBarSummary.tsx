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
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { StrategyHeader } from '../Components/StrategySummary/StrategyHeader';
import { StrategyDetail } from '../Components/StrategySummary/StrategyDetail';
import { StrategyProfile } from '../Components/StrategyProfile';
import * as TeamSharingRedux from '../../Redux/ActionsReducers/TeamSharingRedux';
import { UIHelper } from '../UIHelper';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterObject } from '../../PredefinedConfig/Common/AdaptableBlotterObject';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';

export interface PercentBarSummaryProps extends StrategySummaryProps<PercentBarSummaryComponent> {
  PercentBars: PercentBar[];
  ColorPalette: string[];
  StyleClassNames: string[];
  onAddPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarAddAction;
  onEditPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarEditAction;
  onShare: (entity: AdaptableBlotterObject) => TeamSharingRedux.TeamSharingShareAction;
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
    let percentBarIndex: number = this.props.PercentBars.findIndex(
      c => c.ColumnId == this.props.SummarisedColumn.ColumnId
    );
    let noPercentBar: boolean = percentBar == null;

    let percentBarRow: any;

    if (noPercentBar) {
      percentBarRow = (
        <StrategyHeader
          key={StrategyConstants.PercentBarStrategyName}
          StrategyId={StrategyConstants.PercentBarStrategyId}
          StrategySummary={'No Percent Bar'}
          onNew={() => this.onNew()}
          NewButtonTooltip={StrategyConstants.PercentBarStrategyName}
          AccessLevel={this.props.AccessLevel}
        />
      );
    } else {
      percentBarRow = (
        <StrategyDetail
          key={StrategyConstants.PercentBarStrategyName}
          Item1={<StrategyProfile StrategyId={StrategyConstants.PercentBarStrategyId} />}
          Item2={'Percent Bar set'}
          ConfigEnity={percentBar}
          showShare={this.props.TeamSharingActivated}
          EntityType={StrategyConstants.PercentBarStrategyName}
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

        {this.state.EditedAdaptableBlotterObject && (
          <PercentBarWizard
            EditedAdaptableBlotterObject={this.state.EditedAdaptableBlotterObject as PercentBar}
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
            Blotter={this.props.Blotter}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: PercentBar = ObjectFactory.CreateEmptyPercentBar();
    configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;

    let distinctColumnsValues: number[] = this.props.Blotter.StrategyService.getDistinctColumnValues(
      this.props.SummarisedColumn.ColumnId
    );

    configEntity.MinValue = Math.min(...distinctColumnsValues);
    configEntity.MaxValue = Math.max(...distinctColumnsValues);

    this.setState({
      EditedAdaptableBlotterObject: configEntity,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.New,
    });
  }

  onEdit(renderedColumn: PercentBar) {
    let clonedObject: PercentBar = Helper.cloneObject(renderedColumn);
    this.setState({
      EditedAdaptableBlotterObject: clonedObject,
      WizardStartIndex: 1,
      WizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let percentBar: PercentBar = this.state.EditedAdaptableBlotterObject as PercentBar;
    if (this.state.WizardStatus == WizardStatus.Edit) {
      this.props.onEditPercentBar(percentBar);
    } else {
      this.props.onAddPercentBar(percentBar);
    }
    this.setState({
      EditedAdaptableBlotterObject: null,
      WizardStartIndex: 0,
      WizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let percentBar = this.state.EditedAdaptableBlotterObject as PercentBar;
    return StringExtensions.IsNotNullOrEmpty(percentBar.ColumnId);
  }
}
function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    Columns: state.Grid.Columns,
    PercentBars: state.PercentBar.PercentBars,
    ColorPalette: state.UserInterface.ColorPalette,
    Entitlements: state.Entitlements.FunctionEntitlements,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onAddPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarAdd(percentBar)),
    onEditPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarEdit(percentBar)),
    onShare: (entity: AdaptableBlotterObject) =>
      dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PercentBarStrategyId)),
  };
}

export let PercentBarSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(PercentBarSummaryComponent);
