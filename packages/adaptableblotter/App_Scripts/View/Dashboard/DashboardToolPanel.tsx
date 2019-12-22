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
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import EnumExtensions from '../../Utilities/Extensions/EnumExtensions';
import Dropdown from '../../components/Dropdown';
import { AdaptableToolPanel } from '../../PredefinedConfig/ToolPanelState';

interface DashboardToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<DashboardToolPanelComponentProps> {
  DashboardVisibility: Visibility;
  onSetDashboardVisibility: (visibility: Visibility) => DashboardRedux.DashboardSetVisibilityAction;
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
    let visibilityOptions = EnumExtensions.getNames(Visibility).map(type => {
      return {
        value: type,
        label: type,
      };
    });

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Dashboard"
        headerText={StrategyConstants.DashboardStrategyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Dashboard')}
      >
        {!this.state.IsMinimised && (
          <Dropdown
            key={'dashboardvisibility'}
            style={{ minWidth: 170 }}
            placeholder="select"
            showEmptyItem={false}
            showClearButton={false}
            value={this.props.DashboardVisibility}
            onChange={(value: any) => this.props.onSetDashboardVisibility(value)}
            options={visibilityOptions}
          ></Dropdown>
        )}
      </PanelToolPanel>
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    DashboardVisibility: state.Dashboard.DashboardVisibility,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onSetDashboardVisibility: (visibility: Visibility) =>
      dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
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
