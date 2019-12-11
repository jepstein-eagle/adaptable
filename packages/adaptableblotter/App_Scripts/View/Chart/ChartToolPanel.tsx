import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SortOrder, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ChartDefinition } from '../../PredefinedConfig/ChartState';
import { ButtonShowChart } from '../Components/Buttons/ButtonShowChart';
import { ChartVisibility, ChartType } from '../../PredefinedConfig/Common/ChartEnums';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import icons from '../../components/icons';
import { ReactComponentLike } from 'prop-types';
import { Flex } from 'rebass';
import Dropdown from '../../components/Dropdown';
import DropdownButton from '../../components/DropdownButton';
import { StrategyParams } from '../Components/SharedProps/StrategyViewPopupProps';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { AdaptableBlotterToolPanel } from '../../PredefinedConfig/ToolPanelState';

const AddIcon = icons.add as ReactComponentLike;

interface ChartToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<ChartToolPanelComponent> {
  ChartDefinitions: ChartDefinition[];
  CurrentChartDefinition: ChartDefinition;

  onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
  onNewChartDefinition: (popupParams: StrategyParams) => PopupRedux.PopupShowScreenAction;
  onEditChartDefinition: (popupParams: StrategyParams) => PopupRedux.PopupShowScreenAction;
  onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
}

interface ChartToolPanelComponentState {
  IsMinimised: boolean;
}

class ChartToolPanelComponent extends React.Component<
  ChartToolPanelComponentProps,
  ChartToolPanelComponentState
> {
  constructor(props: ChartToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }
  render() {
    const selectChartString: string = 'Select a Chart';

    let currentChartDefinitionName =
      this.props.CurrentChartDefinition == null
        ? selectChartString
        : this.props.CurrentChartDefinition.Name;

    let currentChartDefinitionType =
      this.props.CurrentChartDefinition == null
        ? ChartType.CategoryChart
        : this.props.CurrentChartDefinition.ChartType;

    let sortedChartDefinitions: ChartDefinition[] = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Ascending,
      this.props.ChartDefinitions,
      'Title'
    );

    let availablechartDefinitions: any[] = sortedChartDefinitions
      // .filter(s => s.Name != currentChartDefinitionName)
      .map(chartDefinition => {
        return {
          label: chartDefinition.Name,
          value: chartDefinition.Name,
        };
      });

    let categoryChartMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () =>
        this.props.onNewChartDefinition({
          value: ChartType.CategoryChart,
          action: 'New',
          source: 'Toolbar',
        }),
      label: 'Category Chart',
    };
    let pieChartMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () =>
        this.props.onNewChartDefinition({
          value: ChartType.PieChart,
          action: 'New',
          source: 'Toolbar',
        }),
      label: 'Pie Chart',
    };
    let sparkLineMenuItem = {
      disabled: this.props.AccessLevel == AccessLevel.ReadOnly,
      onClick: () =>
        this.props.onNewChartDefinition({
          value: ChartType.SparklinesChart,
          action: 'New',
          source: 'Toolbar',
        }),
      label: 'Sparkline',
    };

    let content = (
      <Flex flexDirection="column" alignItems="stretch" className="ab-ToolPanel__Chart__wrap">
        <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Chart__wrap">
          <Dropdown
            className="ab-ToolPanel__Chart__select"
            disabled={availablechartDefinitions.length == 0}
            style={{ minWidth: 160 }}
            marginRight={2}
            placeholder="Select Chart"
            value={
              this.props.CurrentChartDefinition ? this.props.CurrentChartDefinition.Name : null
            }
            options={availablechartDefinitions}
            onChange={(chartDefinitionName: string) =>
              this.onSelectedChartDefinitionChanged(chartDefinitionName)
            }
            showClearButton
          ></Dropdown>
        </Flex>
        <Flex
          flexDirection="row"
          alignItems="stretch"
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly
              ? GeneralConstants.READ_ONLY_STYLE
              : 'ab-ToolPanel__Chart_wrap'
          }
        >
          <ButtonShowChart
            className="ab-ToolPanel__Chart__show"
            onClick={() => this.onShowChart()}
            tooltip="Show Chart"
            disabled={currentChartDefinitionName == selectChartString}
            AccessLevel={this.props.AccessLevel}
          />
          <DropdownButton
            columns={['label']}
            className="ab-ToolPanel__Chart__select-type"
            mx={2}
            variant="text"
            items={[categoryChartMenuItem, pieChartMenuItem, sparkLineMenuItem]}
          >
            <AddIcon />
          </DropdownButton>

          <ButtonEdit
            className="ab-ToolPanel__Chart__edit"
            onClick={() =>
              this.props.onNewChartDefinition({
                value: currentChartDefinitionType,
                action: 'Edit',
                source: 'Toolbar',
              })
            }
            tooltip="Edit Chart Definition"
            disabled={currentChartDefinitionName == selectChartString}
            AccessLevel={this.props.AccessLevel}
          />

          <ButtonDelete
            tooltip="Delete Chart"
            className="ab-ToolPanel__Chart__delete"
            disabled={currentChartDefinitionName == selectChartString}
            ConfirmAction={ChartRedux.ChartDefinitionDelete(this.props.CurrentChartDefinition)}
            ConfirmationMsg={
              "Are you sure you want to delete '" + currentChartDefinitionName + "'?"
            }
            ConfirmationTitle={'Delete Chart'}
            AccessLevel={this.props.AccessLevel}
          />
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Chart"
        headerText={StrategyConstants.ChartStrategyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Chart')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }

  onSelectedChartDefinitionChanged(chartDefinitionName: string) {
    this.props.onSelectChartDefinition(chartDefinitionName);
  }

  onShowChart() {
    this.props.onShowChart();
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    CurrentChartDefinition: state.Chart.ChartDefinitions.find(
      c => c.Name == state.Chart.CurrentChartName
    ),
    ChartDefinitions: state.Chart.ChartDefinitions,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onSelectChartDefinition: (chartDefinition: string) =>
      dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
    onNewChartDefinition: (popupParams: StrategyParams) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ChartStrategyId,
          ScreenPopups.ChartPopup,
          popupParams
        )
      ),
    onEditChartDefinition: (popupParams: StrategyParams) =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ChartStrategyId,
          ScreenPopups.ChartPopup,
          popupParams
        )
      ),
    onShowChart: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Maximised)),
    onClose: (toolPanel: AdaptableBlotterToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup)
      ),
  };
}

export let ChartToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartToolPanelComponent);
