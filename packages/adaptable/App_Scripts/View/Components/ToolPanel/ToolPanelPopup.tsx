import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as DashboardRedux from '../../../Redux/ActionsReducers/DashboardRedux';
import * as ToolPanelRedux from '../../../Redux/ActionsReducers/ToolPanelRedux';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { GridState } from '../../../PredefinedConfig/GridState';
import { Entitlement } from '../../../PredefinedConfig/EntitlementState';
import { AdaptableFunctionButtons } from '../../../PredefinedConfig/Common/Types';
import { PanelWithButton } from '../Panels/PanelWithButton';
import { DualListBoxEditor, DisplaySize } from '../ListBox/DualListBoxEditor';
import { AdaptableState } from '../../../PredefinedConfig/AdaptableState';

interface ToolPanelPopupComponentProps extends StrategyViewPopupProps<ToolPanelPopupComponent> {
  VisibleButtons: AdaptableFunctionButtons;
  GridState: GridState;
  Entitlements: Entitlement[];

  onToolPanelSetFunctionButtons: (
    StrategyConstants: string[]
  ) => ToolPanelRedux.ToolPanelSetFunctionButtonsAction;
}

class ToolPanelPopupComponent extends React.Component<ToolPanelPopupComponentProps, {}> {
  constructor(props: ToolPanelPopupComponentProps) {
    super(props);
  }

  render() {
    let selectedValues: string[] = [];
    this.props.VisibleButtons.forEach(x => {
      let menuItem = this.props.GridState.MainMenuItems.find(m => m.FunctionName == x);
      if (menuItem != null && menuItem.IsVisible) {
        selectedValues.push(StrategyConstants.getFriendlyNameForStrategyId(x));
      }
    });

    let availableValues = this.props.GridState.MainMenuItems.filter(
      x => x.IsVisible && selectedValues.indexOf(x.Label) == -1
    ).map(x => x.Label);

    return (
      <PanelWithButton
        headerText="ToolPanel Configuration"
        bodyProps={{ padding: 0, style: { display: 'flex', flexDirection: 'column' } }}
        glyphicon={StrategyConstants.DashboardGlyph}
      >
        <DualListBoxEditor
          AvailableValues={availableValues}
          SelectedValues={selectedValues}
          HeaderAvailable="Hidden Function Buttons"
          HeaderSelected="Visible Function Buttons"
          onChange={SelectedValues => this.onToolPanelButtonsChanged(SelectedValues)}
          DisplaySize={DisplaySize.Large}
        />
      </PanelWithButton>
    );
  }

  onToolPanelButtonsChanged(selectedValues: string[]) {
    let selectedFunctions = selectedValues.map(sv =>
      StrategyConstants.getIdForStrategyFriendlyName(sv)
    );
    this.props.onToolPanelSetFunctionButtons(selectedFunctions);
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    VisibleButtons: state.ToolPanel.VisibleButtons,
    GridState: state.Grid,
    Entitlements: state.Entitlements.FunctionEntitlements,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onToolPanelSetFunctionButtons: (functionButtons: AdaptableFunctionButtons) =>
      dispatch(ToolPanelRedux.ToolPanelSetFunctionButtons(functionButtons)),
  };
}

export let ToolPanelPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolPanelPopupComponent);
