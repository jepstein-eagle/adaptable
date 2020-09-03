import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { DualListBoxEditor, DisplaySize } from '../Components/ListBox/DualListBoxEditor';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import Checkbox from '../../components/CheckBox';
import Radio from '../../components/Radio';

import { Entitlement } from '../../PredefinedConfig/EntitlementState';
import { Box, Flex, Text } from 'rebass';
import { GridState } from '../../PredefinedConfig/GridState';
import HelpBlock from '../../components/HelpBlock';
import { DashboardState, CustomToolbar, DashboardTab } from '../../PredefinedConfig/DashboardState';
import {
  AdaptableFunctionButtons,
  AdaptableDashboardToolbars,
  AdaptableFunctionName,
} from '../../PredefinedConfig/Common/Types';
import DashboardManagerUI from '../../components/Dashboard/DashboardManager';
import { DashboardProps } from '../../components/Dashboard';

interface DashboardPopupComponentProps extends StrategyViewPopupProps<DashboardPopupComponent> {
  DashboardState: DashboardState;
  GridState: GridState;
  Entitlements: Entitlement[];

  onDashboardSetFunctionButtons: (
    StrategyConstants: string[]
  ) => DashboardRedux.DashboardSetFunctionButtonsAction;

  onDashboardSetTabs: (Tabs: DashboardTab[]) => DashboardRedux.DashboardSetTabsAction;
}

export enum DashboardConfigView {
  Toolbars = 'Toolbars',
  Buttons = 'Buttons',
}

export interface DashboardPopupState {
  DashboardConfigView: DashboardConfigView;
}

class DashboardPopupComponent extends React.Component<
  DashboardPopupComponentProps,
  DashboardPopupState
> {
  constructor(props: DashboardPopupComponentProps) {
    super(props);
    this.state = {
      DashboardConfigView: DashboardConfigView.Toolbars,
    };
  }

  render() {
    // this should be elswhere but we shouldnt use state as the property is deprecated but still could be used.
    const availableToolbars: any[] = [
      'Query',
      'Alert',
      'BulkUpdate',
      'CellSummary',
      'Chart',
      'Filter',
      'DataSource',
      'Export',
      'Glue42',
      'IPushPull',
      'Layout',
      'SmartEdit',
      'QuickSearch',
      'SystemStatus',
      'Theme',
    ];

    let selectedValues: string[] = [];
    this.props.DashboardState.VisibleButtons.forEach(x => {
      let menuItem = this.props.GridState.FunctionDropdownMenuItems.find(m => m.FunctionName == x);
      if (menuItem != null && menuItem.IsVisible) {
        selectedValues.push(StrategyConstants.getFriendlyNameForStrategyId(x));
      }
    });

    let systemToolbars = availableToolbars
      .filter(at => this.props.api.internalApi.getStrategyService().isStrategyAvailable(at))
      .map(at => ({
        Id: at,
        Title: StrategyConstants.getFriendlyNameForStrategyId(at),
      }));

    let customToolbars = this.props.DashboardState.CustomToolbars.map(ct => ({
      Id: ct.Name,
      Title: ct.Title ? ct.Title : ct.Name,
    }));

    const tabs = this.props.DashboardState.Tabs.map(tab => {
      const Toolbars = tab.Toolbars.filter(vt => {
        let customToolbar: CustomToolbar = this.props.DashboardState.CustomToolbars.find(
          ct => ct.Name === vt
        );
        return customToolbar
          ? true
          : this.props.api.internalApi
              .getStrategyService()
              .isStrategyAvailable(vt as AdaptableFunctionName);
      });

      return { ...tab, Toolbars };
    });

    let availableValues = this.props.GridState.FunctionDropdownMenuItems.filter(
      x => x.IsVisible && selectedValues.indexOf(x.Label) == -1
    ).map(x => x.Label);

    return (
      <PanelWithButton
        headerText="Dashboard Configuration"
        bodyProps={{ padding: 0, style: { display: 'flex', flexDirection: 'column' } }}
        glyphicon={StrategyConstants.DashboardGlyph}
      >
        <Flex
          flexDirection="row"
          padding={2}
          data-name="dashboard-configuration-select"
          style={{ borderBottom: '1px solid var(--ab-color-primary)' }}
        >
          <Radio
            marginLeft={3}
            value={DashboardConfigView.Toolbars}
            checked={this.state.DashboardConfigView == DashboardConfigView.Toolbars}
            onChange={(_, e) => this.onDashboardConfigViewChanged(e)}
          >
            Function Toolbars
          </Radio>
          <Radio
            marginLeft={3}
            value={DashboardConfigView.Buttons}
            checked={this.state.DashboardConfigView == DashboardConfigView.Buttons}
            onChange={(_, e) => this.onDashboardConfigViewChanged(e)}
          >
            Function Buttons
          </Radio>
        </Flex>

        <Box style={{ overflow: 'auto', flex: 1 }} padding={2}>
          {this.state.DashboardConfigView == DashboardConfigView.Toolbars && (
            <DashboardManagerUI
              availableToolbars={[...systemToolbars, ...customToolbars]}
              tabs={tabs}
              onTabsChange={this.props.onDashboardSetTabs}
            />
          )}
          {this.state.DashboardConfigView == DashboardConfigView.Buttons && (
            <DualListBoxEditor
              AvailableValues={availableValues}
              SelectedValues={selectedValues}
              HeaderAvailable="Hidden Function Buttons"
              HeaderSelected="Visible Function Buttons"
              onChange={SelectedValues => this.onDashboardButtonsChanged(SelectedValues)}
              DisplaySize={DisplaySize.Large}
            />
          )}
        </Box>
      </PanelWithButton>
    );
  }

  onDashboardConfigViewChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let dashboardConfigView: DashboardConfigView = e.value as DashboardConfigView;
    this.setState({ DashboardConfigView: dashboardConfigView } as DashboardPopupState);
  }

  onDashboardButtonsChanged(selectedValues: string[]) {
    let selectedFunctions = selectedValues.map(sv =>
      StrategyConstants.getIdForStrategyFriendlyName(sv)
    );
    this.props.onDashboardSetFunctionButtons(selectedFunctions);
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<DashboardPopupComponentProps> {
  return {
    DashboardState: state.Dashboard,
    GridState: state.Grid,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<DashboardPopupComponentProps> {
  return {
    onDashboardSetFunctionButtons: (functionButtons: AdaptableFunctionButtons) =>
      dispatch(DashboardRedux.DashboardSetFunctionButtons(functionButtons)),
    onDashboardSetTabs: (Tabs: DashboardTab[]) => dispatch(DashboardRedux.DashboardSetTabs(Tabs)),
  };
}

export let DashboardPopup = connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);
