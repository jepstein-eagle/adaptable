import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as ToolPanelRedux from '../../../Redux/ActionsReducers/ToolPanelRedux';
import { StrategyViewPopupProps } from '../../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { PanelWithButton } from '../../Components/Panels/PanelWithButton';
import Checkbox from '../../../components/CheckBox';
import Radio from '../../../components/Radio';

import { Entitlement } from '../../../PredefinedConfig/EntitlementState';
import { Box, Flex } from 'rebass';
import { GridState } from '../../../PredefinedConfig/GridState';
import HelpBlock from '../../../components/HelpBlock';
import { ToolPanelState } from '../../../PredefinedConfig/ToolPanelState';
import {
  AdaptableFunctionButtons,
  AdaptableFunctionName,
  AdaptableToolPanels,
  AdaptableToolPanel,
  AdaptableFunctionButton,
} from '../../../PredefinedConfig/Common/Types';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';

interface ToolPanelPopupComponentProps extends StrategyViewPopupProps<ToolPanelPopupComponent> {
  ToolPanelState: ToolPanelState;
  GridState: GridState;
  Entitlements: Entitlement[] | undefined;

  onToolPanelSetFunctionButtons: (
    functionButtons: AdaptableFunctionButtons
  ) => ToolPanelRedux.ToolPanelSetFunctionButtonsAction;
  onToolPanelSetToolPanels: (
    toolPanels: AdaptableToolPanels
  ) => ToolPanelRedux.ToolPanelSetToolPanelsAction;
  onToolPanelShowFunctionsDropdown: () => ToolPanelRedux.ToolPanelShowFunctionsDropdownAction;
  onToolPanelHideFunctionsDropdown: () => ToolPanelRedux.ToolPanelHideFunctionsDropdownAction;
  onToolPanelShowColumnsDropdown: () => ToolPanelRedux.ToolPanelShowColumnsDropdownAction;
  onToolPanelHideColumnsDropdown: () => ToolPanelRedux.ToolPanelHideColumnsDropdownAction;
  onToolPanelShowToolPanelsDropdown: () => ToolPanelRedux.ToolPanelShowToolPanelsDropdownAction;
  onToolPanelHideToolPanelsDropdown: () => ToolPanelRedux.ToolPanelHideToolPanelsDropdownAction;
  onToolPanelShowGridInfoButton: () => ToolPanelRedux.ToolPanelShowGridInfoButtonAction;
  onToolPanelHideGridInfoButton: () => ToolPanelRedux.ToolPanelHideGridInfoButtonAction;
}

export enum ToolPanelConfigView {
  General = 'General',
  Buttons = 'Buttons',
  ToolPanels = 'ToolPanels',
}

export interface ToolPanelPopupState {
  ToolPanelConfigView: ToolPanelConfigView;
}

class ToolPanelPopupComponent extends React.Component<
  ToolPanelPopupComponentProps,
  ToolPanelPopupState
> {
  constructor(props: ToolPanelPopupComponentProps) {
    super(props);
    this.state = {
      ToolPanelConfigView: ToolPanelConfigView.General,
    };
  }

  render() {
    let visibleButtons: string[] = [];
    if (ArrayExtensions.IsNotNullOrEmpty(this.props.ToolPanelState.VisibleButtons)) {
      this.props.ToolPanelState.VisibleButtons!.forEach(x => {
        let menuItem = this.props.GridState.MainMenuItems.find(m => m.FunctionName == x);
        if (menuItem != null && menuItem.IsVisible) {
          visibleButtons.push(StrategyConstants.getFriendlyNameForStrategyId(x));
        }
      });
    }

    let availableButtons = this.props.GridState.MainMenuItems.filter(
      x => x.IsVisible && visibleButtons.indexOf(x.Label) == -1
    ).map(x => x.Label);

    let availableToolPanelNames: string[] = this.props.ToolPanelState.AvailableToolPanels!.filter(
      at => this.isVisibleStrategy(at)
    ).map(at => {
      return StrategyConstants.getFriendlyNameForStrategyId(at);
    });

    let visibleToolPanels: string[] = this.props.ToolPanelState.VisibleToolPanels!.filter(at =>
      this.isVisibleStrategy(at)
    ).map(at => {
      return StrategyConstants.getFriendlyNameForStrategyId(at);
    });

    let individualHomeToolbarOptions = (
      <Flex margin={2} flexDirection="column">
        <HelpBlock>{'Select which items are visible in the Tool Panel Header.'}</HelpBlock>
        <Checkbox
          onChange={checked => this.onShowFunctionsDropdownChanged(checked)}
          checked={this.props.ToolPanelState.ShowFunctionsDropdown}
        >
          Functions Dropdown
        </Checkbox>
        <Checkbox
          onChange={checked => this.onShowToolPanelsDropdownChanged(checked)}
          checked={this.props.ToolPanelState.ShowToolPanelsDropdown}
        >
          ToolPanels Dropdown
        </Checkbox>
        <Checkbox
          onChange={checked => this.onShowColumnsDropdownChanged(checked)}
          checked={this.props.ToolPanelState.ShowColumnsDropdown}
        >
          Columns Dropdown
        </Checkbox>

        <Checkbox
          onChange={checked => this.onShowGridInfoButtonChanged(checked)}
          checked={this.props.ToolPanelState.ShowGridInfoButton}
        >
          About (Grid) Button
        </Checkbox>
      </Flex>
    );

    return (
      <PanelWithButton
        headerText="ToolPanel Configuration"
        bodyProps={{ padding: 0, style: { display: 'flex', flexDirection: 'column' } }}
        glyphicon={StrategyConstants.ToolPanelStrategyId}
      >
        <Flex
          flexDirection="row"
          padding={2}
          style={{ borderBottom: '1px solid var(--ab-color-primary)' }}
        >
          <Radio
            value={ToolPanelConfigView.General}
            checked={this.state.ToolPanelConfigView == ToolPanelConfigView.General}
            onChange={(_, e) => this.onShowGridPropertiesChanged(e)}
          >
            General Options
          </Radio>
          <Radio
            marginLeft={3}
            value={ToolPanelConfigView.Buttons}
            checked={this.state.ToolPanelConfigView == ToolPanelConfigView.Buttons}
            onChange={(_, e) => this.onShowGridPropertiesChanged(e)}
          >
            Function Buttons
          </Radio>
          <Radio
            marginLeft={3}
            value={ToolPanelConfigView.ToolPanels}
            checked={this.state.ToolPanelConfigView == ToolPanelConfigView.ToolPanels}
            onChange={(_, e) => this.onShowGridPropertiesChanged(e)}
          >
            Tool Panels
          </Radio>
        </Flex>

        <Box style={{ overflow: 'auto', flex: 1, display: 'flex' }} padding={2}>
          {this.state.ToolPanelConfigView == ToolPanelConfigView.General &&
            individualHomeToolbarOptions}
          {this.state.ToolPanelConfigView == ToolPanelConfigView.Buttons && (
            <DualListBoxEditor
              AvailableValues={availableButtons}
              SelectedValues={visibleButtons}
              HeaderAvailable="Hidden Function Buttons"
              HeaderSelected="Visible Function Buttons"
              onChange={SelectedValues => this.onToolPanelButtonsChanged(SelectedValues)}
              DisplaySize={DisplaySize.Large}
            />
          )}
          {this.state.ToolPanelConfigView == ToolPanelConfigView.ToolPanels && (
            <DualListBoxEditor
              AvailableValues={availableToolPanelNames}
              SelectedValues={visibleToolPanels}
              HeaderAvailable="Available ToolPanels"
              HeaderSelected="Visible ToolPanels"
              onChange={SelectedValues => this.onToolPanelToolPanelsChanged(SelectedValues)}
              DisplaySize={DisplaySize.Small}
            />
          )}
        </Box>
      </PanelWithButton>
    );
  }

  onShowGridPropertiesChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let ToolPanelConfigView: ToolPanelConfigView = e.value as ToolPanelConfigView;
    this.setState({ ToolPanelConfigView: ToolPanelConfigView } as ToolPanelPopupState);
  }

  onShowFunctionsDropdownChanged(checked: boolean): void {
    if (checked) {
      this.props.onToolPanelShowFunctionsDropdown();
    } else {
      this.props.onToolPanelHideFunctionsDropdown();
    }
  }

  onShowColumnsDropdownChanged(checked: boolean): void {
    if (checked) {
      this.props.onToolPanelShowColumnsDropdown();
    } else {
      this.props.onToolPanelHideColumnsDropdown();
    }
  }

  onShowToolPanelsDropdownChanged(checked: boolean): void {
    if (checked) {
      this.props.onToolPanelShowToolPanelsDropdown();
    } else {
      this.props.onToolPanelHideToolPanelsDropdown();
    }
  }

  onShowGridInfoButtonChanged(checked: boolean): void {
    if (checked) {
      this.props.onToolPanelShowGridInfoButton();
    } else {
      this.props.onToolPanelHideGridInfoButton();
    }
  }

  onToolPanelButtonsChanged(selectedValues: AdaptableFunctionButtons) {
    let selectedFunctions: AdaptableFunctionButtons = selectedValues.map(
      sv => StrategyConstants.getIdForStrategyFriendlyName(sv) as AdaptableFunctionButton
    );
    this.props.onToolPanelSetFunctionButtons(selectedFunctions);
  }

  onToolPanelToolPanelsChanged(selectedValues: AdaptableToolPanels) {
    let selectedToolPanels: AdaptableToolPanels = selectedValues.map(sv => {
      return StrategyConstants.getIdForStrategyFriendlyName(sv) as AdaptableToolPanel;
    });
    this.props.onToolPanelSetToolPanels(selectedToolPanels);
  }

  isVisibleStrategy(functionName: AdaptableFunctionName): boolean {
    let entitlement: Entitlement | undefined = this.props.Entitlements!.find(
      x => x.FunctionName == functionName
    );
    if (entitlement) {
      return entitlement.AccessLevel != 'Hidden';
    }
    return true;
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    ToolPanelState: state.ToolPanel,
    GridState: state.Grid,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onToolPanelSetFunctionButtons: (functionButtons: AdaptableFunctionButtons) =>
      dispatch(ToolPanelRedux.ToolPanelSetFunctionButtons(functionButtons)),
    onToolPanelShowFunctionsDropdown: () =>
      dispatch(ToolPanelRedux.ToolPanelShowFunctionsDropdown()),
    onToolPanelHideFunctionsDropdown: () =>
      dispatch(ToolPanelRedux.ToolPanelHideFunctionsDropdown()),
    onToolPanelShowColumnsDropdown: () => dispatch(ToolPanelRedux.ToolPanelShowColumnsDropdown()),
    onToolPanelHideColumnsDropdown: () => dispatch(ToolPanelRedux.ToolPanelHideColumnsDropdown()),
    onToolPanelShowToolPanelsDropdown: () =>
      dispatch(ToolPanelRedux.ToolPanelShowToolPanelsDropdown()),
    onToolPanelHideToolPanelsDropdown: () =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanelsDropdown()),
    onToolPanelShowGridInfoButton: () => dispatch(ToolPanelRedux.ToolPanelShowGridInfoButton()),
    onToolPanelHideGridInfoButton: () => dispatch(ToolPanelRedux.ToolPanelHideGridInfoButton()),
    onToolPanelSetToolPanels: (toolPanels: AdaptableToolPanels) =>
      dispatch(ToolPanelRedux.ToolPanelSetToolPanels(toolPanels)),
  };
}

export let ToolPanelPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolPanelPopupComponent);
