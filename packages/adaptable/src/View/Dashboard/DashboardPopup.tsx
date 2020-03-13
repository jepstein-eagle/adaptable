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

export const SystemToolbars: AdaptableFunctionName[] = [
  'AdvancedSearch',
  'Alert',
  'BulkUpdate',
  'CellSummary',
  'Chart',
  'ColumnFilter',
  'Dashboard',
  'DataSource',
  'Export',
  'Glue42',
  'IPushPull',
  'Layout',
  'QuickSearch',
  'SmartEdit',
  'SystemStatus',
  'Theme',
];

interface DashboardPopupComponentProps extends StrategyViewPopupProps<DashboardPopupComponent> {
  DashboardState: DashboardState;
  GridState: GridState;
  Entitlements: Entitlement[];

  onDashboardSetFunctionButtons: (
    StrategyConstants: string[]
  ) => DashboardRedux.DashboardSetFunctionButtonsAction;
  onDashboardShowFunctionsDropdown: () => DashboardRedux.DashboardShowFunctionsDropdownAction;
  onDashboardHideFunctionsDropdown: () => DashboardRedux.DashboardHideFunctionsDropdownAction;
  onDashboardShowColumnsDropdown: () => DashboardRedux.DashboardShowColumnsDropdownAction;
  onDashboardHideColumnsDropdown: () => DashboardRedux.DashboardHideColumnsDropdownAction;
  onDashboardShowToolbarsDropdown: () => DashboardRedux.DashboardShowToolbarsDropdownAction;
  onDashboardHideToolbarsDropdown: () => DashboardRedux.DashboardHideToolbarsDropdownAction;

  onDashboardSetToolbars: (
    StrategyConstants: string[]
  ) => DashboardRedux.DashboardSetToolbarsAction;

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
    let selectedValues: string[] = [];
    this.props.DashboardState.VisibleButtons.forEach(x => {
      let menuItem = this.props.GridState.MainMenuItems.find(m => m.FunctionName == x);
      if (menuItem != null && menuItem.IsVisible) {
        selectedValues.push(StrategyConstants.getFriendlyNameForStrategyId(x));
      }
    });

    let systemToolbars = SystemToolbars.filter(at => this.isNotHiddenStrategy(at)).map(at => ({
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
        return customToolbar ? true : this.isNotHiddenStrategy(vt as AdaptableFunctionName);
      });

      return { ...tab, Toolbars };
    });

    let availableValues = this.props.GridState.MainMenuItems.filter(
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
          style={{ borderBottom: '1px solid var(--ab-color-primary)' }}
        >
          <Radio
            marginLeft={3}
            value={DashboardConfigView.Toolbars}
            checked={this.state.DashboardConfigView == DashboardConfigView.Toolbars}
            onChange={(_, e) => this.onShowGridPropertiesChanged(e)}
          >
            Function Toolbars
          </Radio>
          <Radio
            marginLeft={3}
            value={DashboardConfigView.Buttons}
            checked={this.state.DashboardConfigView == DashboardConfigView.Buttons}
            onChange={(_, e) => this.onShowGridPropertiesChanged(e)}
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

  onShowGridPropertiesChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let dashboardConfigView: DashboardConfigView = e.value as DashboardConfigView;
    this.setState({ DashboardConfigView: dashboardConfigView } as DashboardPopupState);
  }

  onShowFunctionsDropdownChanged(checked: boolean): void {
    if (checked) {
      this.props.onDashboardShowFunctionsDropdown();
    } else {
      this.props.onDashboardHideFunctionsDropdown();
    }
  }

  onShowColumnsDropdownChanged(checked: boolean): void {
    if (checked) {
      this.props.onDashboardShowColumnsDropdown();
    } else {
      this.props.onDashboardHideColumnsDropdown();
    }
  }

  onShowToolbarsDropdownChanged(checked: boolean): void {
    if (checked) {
      this.props.onDashboardShowToolbarsDropdown();
    } else {
      this.props.onDashboardHideToolbarsDropdown();
    }
  }

  onDashboardButtonsChanged(selectedValues: string[]) {
    let selectedFunctions = selectedValues.map(sv =>
      StrategyConstants.getIdForStrategyFriendlyName(sv)
    );
    this.props.onDashboardSetFunctionButtons(selectedFunctions);
  }

  onDashboardToolbarsChanged(selectedValues: string[]) {
    let selectedToolbars: string[] = selectedValues.map(sv => {
      let customToolbar: CustomToolbar = this.props.DashboardState.CustomToolbars.find(
        ct => ct.Name == sv
      );
      return customToolbar ? sv : StrategyConstants.getIdForStrategyFriendlyName(sv);
    });
    this.props.onDashboardSetToolbars(selectedToolbars);
  }

  isVisibleStrategy(functionName: AdaptableFunctionName): boolean {
    return this.props.Adaptable.api.entitlementsApi.isFunctionFullEntitlement(functionName);
  }

  isNotHiddenStrategy(functionName: AdaptableFunctionName): boolean {
    return !this.props.Adaptable.api.entitlementsApi.isFunctionHiddenEntitlement(functionName);
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    DashboardState: state.Dashboard,
    GridState: state.Grid,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onDashboardSetFunctionButtons: (functionButtons: AdaptableFunctionButtons) =>
      dispatch(DashboardRedux.DashboardSetFunctionButtons(functionButtons)),
    onDashboardShowFunctionsDropdown: () =>
      dispatch(DashboardRedux.DashboardShowFunctionsDropdown()),
    onDashboardHideFunctionsDropdown: () =>
      dispatch(DashboardRedux.DashboardHideFunctionsDropdown()),
    onDashboardShowColumnsDropdown: () => dispatch(DashboardRedux.DashboardShowColumnsDropdown()),
    onDashboardHideColumnsDropdown: () => dispatch(DashboardRedux.DashboardHideColumnsDropdown()),
    onDashboardShowToolbarsDropdown: () => dispatch(DashboardRedux.DashboardShowToolbarsDropdown()),
    onDashboardHideToolbarsDropdown: () => dispatch(DashboardRedux.DashboardHideToolbarsDropdown()),
    onDashboardSetToolbars: (toolbars: AdaptableDashboardToolbars) =>
      dispatch(DashboardRedux.DashboardSetToolbars(toolbars)),
    onDashboardSetTabs: (Tabs: DashboardTab[]) => dispatch(DashboardRedux.DashboardSetTabs(Tabs)),
  };
}

export let DashboardPopup = connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);
