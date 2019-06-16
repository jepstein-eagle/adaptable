import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { AccessLevel, DashboardSize } from '../../PredefinedConfig/Common/Enums';

interface ApplicationToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ApplicationToolbarControlComponent> {
  ApplicationToolbarTitle: string;
}
class ApplicationToolbarControlComponent extends React.Component<
  ApplicationToolbarControlComponentProps,
  {}
> {
  render(): any {
    let cssClassName: string = this.props.cssClassName + '__Application';
    let headerText = StringExtensions.IsNotNullOrEmpty(this.props.ApplicationToolbarTitle)
      ? this.props.ApplicationToolbarTitle
      : StrategyConstants.ApplicationStrategyName;
    let minHeight = this.props.DashboardSize == DashboardSize.XSmall ? '22px' : '30px';

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
        headerText={headerText}
        glyphicon={StrategyConstants.ApplicationGlyph}
        onClose={() => this.props.onClose(StrategyConstants.ApplicationStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        <div className="ApplicationToolBarContents" style={{ minHeight: minHeight }} />
      </PanelDashboard>
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ApplicationToolbarTitle: state.Dashboard.ApplicationToolbarTitle,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.ApplicationStrategyId,
          ScreenPopups.ApplicationPopup
        )
      ),
  };
}

export let ApplicationToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationToolbarControlComponent);
