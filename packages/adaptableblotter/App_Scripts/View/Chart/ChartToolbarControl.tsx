import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { ButtonEdit } from '../Components/Buttons/ButtonEdit';

import { PanelDashboard } from '../Components/Panels/PanelDashboard';
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
import { AdaptableBlotterDashboardToolbar } from '../../PredefinedConfig/DashboardState';

const AddIcon = icons.add as ReactComponentLike;

interface ChartToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ChartToolbarControlComponent> {
  ChartDefinitions: ChartDefinition[];
  CurrentChartDefinition: ChartDefinition;

  onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction;
  onNewChartDefinition: (popupParams: StrategyParams) => PopupRedux.PopupShowScreenAction;
  onEditChartDefinition: (popupParams: StrategyParams) => PopupRedux.PopupShowScreenAction;
  onShowChart: () => SystemRedux.ChartSetChartVisibiityAction;
}

class ChartToolbarControlComponent extends React.Component<ChartToolbarControlComponentProps, {}> {
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
      <Flex alignItems="stretch" className="ab-DashboardToolbar__Chart__wrap">
        <Dropdown
          className="ab-DashboardToolbar__Chart__select"
          disabled={availablechartDefinitions.length == 0}
          style={{ minWidth: 160 }}
          marginRight={2}
          placeholder="Select Chart"
          value={this.props.CurrentChartDefinition ? this.props.CurrentChartDefinition.Name : null}
          options={availablechartDefinitions}
          onChange={(chartDefinitionName: string) =>
            this.onSelectedChartDefinitionChanged(chartDefinitionName)
          }
          showClearButton
        ></Dropdown>

        <Flex
          alignItems="stretch"
          className={
            this.props.AccessLevel == AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : ''
          }
        >
          <ButtonShowChart
            className="ab-DashboardToolbar__Chart__show"
            onClick={() => this.onShowChart()}
            tooltip="Show Chart"
            disabled={currentChartDefinitionName == selectChartString}
            AccessLevel={this.props.AccessLevel}
          />
          <DropdownButton
            columns={['label']}
            className="ab-DashboardToolbar__Chart__select-type"
            mx={2}
            variant="text"
            items={[categoryChartMenuItem, pieChartMenuItem, sparkLineMenuItem]}
          >
            <AddIcon />
          </DropdownButton>

          <ButtonEdit
            className="ab-DashboardToolbar__Chart__edit"
            onClick={() =>
              this.props.onEditChartDefinition({
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
            className="ab-DashboardToolbar__Chart__delete"
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
      <PanelDashboard
        className="ab-DashboardToolbar__Chart"
        headerText={StrategyConstants.ChartStrategyName}
        glyphicon={StrategyConstants.ChartGlyph}
        onClose={() => this.props.onClose(StrategyConstants.ChartStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
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
    onClose: (toolbar: AdaptableBlotterDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardHideToolbar(toolbar)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup)
      ),
  };
}

export let ChartToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartToolbarControlComponent);
