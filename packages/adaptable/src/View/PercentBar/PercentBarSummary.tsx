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
import { CellValueType } from '../../PredefinedConfig/Common/Enums';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface PercentBarSummaryProps extends StrategySummaryProps<PercentBarSummaryComponent> {
  PercentBars: PercentBar[];
  ColorPalette: string[];
  StyleClassNames: string[];
  onAddPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarAddAction;
  onEditPercentBar: (percentBar: PercentBar) => PercentBarRedux.PercentBarEditAction;
  onShare: (
    entity: AdaptableObject,
    description: string
  ) => TeamSharingRedux.TeamSharingShareAction;
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
      c => c.ColumnId == this.props.summarisedColumn.ColumnId
    );
    let noPercentBar: boolean = percentBar == null;

    let percentBarRow: any;

    if (noPercentBar) {
      percentBarRow = (
        <StrategyHeader
          key={StrategyConstants.PercentBarStrategyFriendlyName}
          functionName={StrategyConstants.PercentBarStrategyId}
          strategySummary={'No Percent Bar'}
          onNew={() => this.onNew()}
          newButtonTooltip={StrategyConstants.PercentBarStrategyFriendlyName}
          accessLevel={this.props.accessLevel}
        />
      );
    } else {
      percentBarRow = (
        <StrategyDetail
          key={StrategyConstants.PercentBarStrategyFriendlyName}
          item1={<StrategyProfile FunctionName={StrategyConstants.PercentBarStrategyId} />}
          item2={'Percent Bar set'}
          configEnity={percentBar}
          showShare={this.props.teamSharingActivated}
          entityType={StrategyConstants.PercentBarStrategyFriendlyName}
          onEdit={() => this.onEdit(percentBar)}
          onShare={description => this.props.onShare(percentBar, description)}
          onDelete={PercentBarRedux.PercentBarDelete(percentBar)}
          showBold={true}
        />
      );
    }

    return (
      <div>
        {percentBarRow}

        {this.state.editedAdaptableObject && (
          <PercentBarWizard
            editedAdaptableObject={this.state.editedAdaptableObject as PercentBar}
            modalContainer={this.props.modalContainer}
            configEntities={this.props.PercentBars}
            wizardStartIndex={this.state.wizardStartIndex}
            onCloseWizard={() => this.onCloseWizard()}
            onFinishWizard={() => this.onFinishWizard()}
            canFinishWizard={() => this.canFinishWizard()}
            api={this.props.api}
          />
        )}
      </div>
    );
  }

  onNew() {
    let configEntity: PercentBar = ObjectFactory.CreateEmptyPercentBar();
    configEntity.ColumnId = this.props.summarisedColumn.ColumnId;

    let distinctColumnsValues: number[] = this.props.api.columnApi.getDistinctRawValuesForColumn(
      this.props.summarisedColumn.ColumnId
    );

    configEntity.Ranges.push({
      Min: Math.min(...distinctColumnsValues),
      Max: Math.max(...distinctColumnsValues),
      Color: configEntity.PositiveColor, // GREEN - but probably wrong
    });

    this.setState({
      editedAdaptableObject: configEntity,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.New,
    });
  }

  onEdit(renderedColumn: PercentBar) {
    let clonedObject: PercentBar = Helper.cloneObject(renderedColumn);
    this.setState({
      editedAdaptableObject: clonedObject,
      wizardStartIndex: 1,
      wizardStatus: WizardStatus.Edit,
    });
  }

  onCloseWizard() {
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  onFinishWizard() {
    let percentBar: PercentBar = this.state.editedAdaptableObject as PercentBar;
    if (this.state.wizardStatus == WizardStatus.Edit) {
      this.props.onEditPercentBar(percentBar);
    } else {
      this.props.onAddPercentBar(percentBar);
    }
    this.setState({
      editedAdaptableObject: null,
      wizardStartIndex: 0,
      wizardStatus: WizardStatus.None,
    });
  }

  canFinishWizard() {
    let percentBar = this.state.editedAdaptableObject as PercentBar;
    return StringExtensions.IsNotNullOrEmpty(percentBar.ColumnId);
  }
}
function mapStateToProps(state: AdaptableState, ownProps: any): Partial<PercentBarSummaryProps> {
  return {
    PercentBars: state.PercentBar.PercentBars,
    ColorPalette: state.UserInterface.ColorPalette,
    StyleClassNames: state.UserInterface.StyleClassNames,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<PercentBarSummaryProps> {
  return {
    onAddPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarAdd(percentBar)),
    onEditPercentBar: (percentBar: PercentBar) =>
      dispatch(PercentBarRedux.PercentBarEdit(percentBar)),
    onShare: (entity: AdaptableObject, description: string) =>
      dispatch(
        TeamSharingRedux.TeamSharingShare(
          entity,
          StrategyConstants.PercentBarStrategyId,
          description
        )
      ),
  };
}

export let PercentBarSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(PercentBarSummaryComponent);
