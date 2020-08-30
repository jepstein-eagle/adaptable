import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';
import CheckBox from '../../components/CheckBox';

interface DashboardToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<DashboardToolPanelComponentProps> {
  IsCollapsed: boolean;
  IsFloating: boolean;
  CanFloat: boolean;
  onSetDashboardCollapsed: (isCollapsed: boolean) => DashboardRedux.DashboardSetIsCollapsedAction;
  onSetDashboardFloating: (isFloating: boolean) => DashboardRedux.DashboardSetIsFloatingAction;
}

interface DashboardToolPanelComponentState {
  IsMinimised: boolean;
}

class DashboardToolPanelComponent extends React.Component<
  DashboardToolPanelComponentProps,
  DashboardToolPanelComponentState
> {
  constructor(props: DashboardToolPanelComponentProps) {
    super(props);
    this.state = { IsMinimised: true };
  }

  render() {
    return (
      <PanelToolPanel
        className="ab-ToolPanel__Dashboard"
        headerText={StrategyConstants.DashboardStrategyFriendlyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Dashboard')}
      >
        {!this.state.IsMinimised && (
          <div>
            {' '}
            <CheckBox
              className="ab-ToolPanel__Dashboard__collapsed-check"
              disabled={this.props.api.internalApi.isGridInPivotMode()}
              marginLeft={1}
              marginTop={0}
              fontSize={2}
              padding={1}
              checked={this.props.IsCollapsed}
              onChange={(checked: boolean) => this.props.onSetDashboardCollapsed(checked)}
            >
              Collapse
            </CheckBox>
            {''}
            {this.props.CanFloat && (
              <CheckBox
                className="ab-ToolPanel__Dashboard__collapsed-check"
                disabled={this.props.api.internalApi.isGridInPivotMode()}
                marginLeft={1}
                marginTop={0}
                fontSize={2}
                padding={1}
                checked={this.props.IsFloating}
                onChange={(checked: boolean) => this.props.onSetDashboardFloating(checked)}
              >
                Float
              </CheckBox>
            )}
          </div>
        )}
      </PanelToolPanel>
    );
  }
}

function mapStateToProps(
  state: AdaptableState,
  ownProps: any
): Partial<DashboardToolPanelComponentProps> {
  return {
    IsCollapsed: state.Dashboard.IsCollapsed,
    IsFloating: state.Dashboard.IsFloating,
    CanFloat: state.Dashboard.CanFloat,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<DashboardToolPanelComponentProps> {
  return {
    onSetDashboardCollapsed: (isCollapsed: boolean) =>
      dispatch(DashboardRedux.DashboardSetIsCollapsed(isCollapsed)),
    onSetDashboardFloating: (isFloating: boolean) =>
      dispatch(DashboardRedux.DashboardSetIsFloating(isFloating)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.DashboardStrategyId,
          ScreenPopups.DashboardPopup
        )
      ),
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
  };
}

export let DashboardToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardToolPanelComponent);
