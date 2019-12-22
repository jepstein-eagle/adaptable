import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import {
  DashboardState,
  AdaptableFunctionButtons,
  AdaptableDashboardToolbars,
} from '../../PredefinedConfig/DashboardState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { DualListBoxEditor, DisplaySize } from '../Components/ListBox/DualListBoxEditor';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import Checkbox from '../../components/CheckBox';
import Radio from '../../components/Radio';
import Input from '../../components/Input';

import { Entitlement } from '../../PredefinedConfig/EntitlementsState';
import { Box, Flex, Text } from 'rebass';
import { StateChangedTrigger } from '../../PredefinedConfig/Common/Enums';
import { GridState } from '../../PredefinedConfig/GridState';
import HelpBlock from '../../components/HelpBlock';

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
  onDashboardShowSystemStatusButton: () => DashboardRedux.DashboardShowSystemStatusButtonAction;
  onDashboardHideSystemStatusButton: () => DashboardRedux.DashboardHideSystemStatusButtonAction;
  onDashboardShowGridInfoButton: () => DashboardRedux.DashboardShowGridInfoButtonAction;
  onDashboardHideGridInfoButton: () => DashboardRedux.DashboardHideGridInfoButtonAction;

  onDashboardSetToolbars: (
    StrategyConstants: string[]
  ) => DashboardRedux.DashboardSetToolbarsAction;
}

export enum DashboardConfigView {
  General = 'General',
  Buttons = 'Buttons',
  Toolbars = 'Toolbars',
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
      DashboardConfigView: DashboardConfigView.General,
    };
  }

  render() {
    let selectedValues: string[] = [];
    this.props.DashboardState.VisibleButtons.forEach(x => {
      let menuItem = this.props.GridState.MainMenuItems.find(m => m.StrategyId == x);
      if (menuItem != null && menuItem.IsVisible) {
        selectedValues.push(StrategyConstants.getNameForStrategyId(x));
      }
    });

    let availableToolbarNames: string[] = this.props.DashboardState.AvailableToolbars.filter(at =>
      this.isVisibleStrategy(at)
    ).map(at => {
      return StrategyConstants.getNameForStrategyId(at);
    });

    let visibleToolbarNames: string[] = this.props.DashboardState.VisibleToolbars.filter(at =>
      this.isVisibleStrategy(at)
    ).map(vt => {
      return StrategyConstants.getNameForStrategyId(vt);
    });

    let availableValues = this.props.GridState.MainMenuItems.filter(
      x => x.IsVisible && selectedValues.indexOf(x.Label) == -1
    ).map(x => x.Label);

    let individualHomeToolbarOptions = (
      <Flex margin={2} flexDirection="column">
        <HelpBlock>{'Select which items should be visible in the Home Toolbar.'}</HelpBlock>
        <Checkbox
          onChange={checked => this.onShowFunctionsDropdownChanged(checked)}
          checked={this.props.DashboardState.ShowFunctionsDropdown}
        >
          Functions Dropdown
        </Checkbox>
        <Checkbox
          onChange={checked => this.onShowColumnsDropdownChanged(checked)}
          checked={this.props.DashboardState.ShowColumnsDropdown}
        >
          Columns Dropdown
        </Checkbox>
        <Checkbox
          onChange={checked => this.onShowToolbarsDropdownChanged(checked)}
          checked={this.props.DashboardState.ShowToolbarsDropdown}
        >
          Toolbars Dropdown
        </Checkbox>

        <Checkbox
          onChange={checked => this.onShowSystemStatusButtonChanged(checked)}
          checked={this.props.DashboardState.ShowSystemStatusButton}
        >
          System Status Button
        </Checkbox>

        <Checkbox
          onChange={checked => this.onShowGridInfoButtonChanged(checked)}
          checked={this.props.DashboardState.ShowGridInfoButton}
        >
          About (Grid) Button
        </Checkbox>
      </Flex>
    );

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
            value={DashboardConfigView.General}
            checked={this.state.DashboardConfigView == DashboardConfigView.General}
            onChange={(_, e) => this.onShowGridPropertiesChanged(e)}
          >
            General Options
          </Radio>
          <Radio
            marginLeft={3}
            value={DashboardConfigView.Buttons}
            checked={this.state.DashboardConfigView == DashboardConfigView.Buttons}
            onChange={(_, e) => this.onShowGridPropertiesChanged(e)}
          >
            Function Buttons
          </Radio>
          <Radio
            marginLeft={3}
            value={DashboardConfigView.Toolbars}
            checked={this.state.DashboardConfigView == DashboardConfigView.Toolbars}
            onChange={(_, e) => this.onShowGridPropertiesChanged(e)}
          >
            Function Toolbars
          </Radio>
        </Flex>

        <Box style={{ overflow: 'auto', flex: 1, display: 'flex' }} padding={2}>
          {this.state.DashboardConfigView == DashboardConfigView.General &&
            individualHomeToolbarOptions}
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
          {this.state.DashboardConfigView == DashboardConfigView.Toolbars && (
            <DualListBoxEditor
              AvailableValues={availableToolbarNames}
              SelectedValues={visibleToolbarNames}
              HeaderAvailable="Available Toolbars"
              HeaderSelected="Visible Toolbars"
              onChange={SelectedValues => this.onDashboardToolbarsChanged(SelectedValues)}
              DisplaySize={DisplaySize.Small}
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

  onShowSystemStatusButtonChanged(checked: boolean): void {
    if (checked) {
      this.props.onDashboardShowSystemStatusButton();
    } else {
      this.props.onDashboardHideSystemStatusButton();
    }
  }

  onShowGridInfoButtonChanged(checked: boolean): void {
    if (checked) {
      this.props.onDashboardShowGridInfoButton();
    } else {
      this.props.onDashboardHideGridInfoButton();
    }
  }

  onDashboardButtonsChanged(selectedValues: string[]) {
    let selectedFunctions = selectedValues.map(sv => StrategyConstants.getIdForStrategyName(sv));
    this.props.onDashboardSetFunctionButtons(selectedFunctions);
  }

  onDashboardToolbarsChanged(selectedValues: string[]) {
    let selectedToolbars: string[] = selectedValues.map(sv => {
      return StrategyConstants.getIdForStrategyName(sv);
    });
    this.props.onDashboardSetToolbars(selectedToolbars);
  }

  isVisibleStrategy(strategyId: string): boolean {
    let entitlement: Entitlement = this.props.Entitlements.find(x => x.FunctionName == strategyId);
    if (entitlement) {
      return entitlement.AccessLevel != 'Hidden';
    }
    return true;
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    DashboardState: state.Dashboard,
    GridState: state.Grid,
    Entitlements: state.Entitlements.FunctionEntitlements,
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
    onDashboardShowSystemStatusButton: () =>
      dispatch(DashboardRedux.DashboardShowSystemStatusButton()),
    onDashboardHideSystemStatusButton: () =>
      dispatch(DashboardRedux.DashboardHideSystemStatusButton()),
    onDashboardShowGridInfoButton: () => dispatch(DashboardRedux.DashboardShowGridInfoButton()),
    onDashboardHideGridInfoButton: () => dispatch(DashboardRedux.DashboardHideGridInfoButton()),
    onDashboardSetToolbars: (toolbars: AdaptableDashboardToolbars) =>
      dispatch(DashboardRedux.DashboardSetToolbars(toolbars)),
  };
}

export let DashboardPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPopupComponent);
