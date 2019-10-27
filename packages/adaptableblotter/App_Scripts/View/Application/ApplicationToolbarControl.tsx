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
import { buttonStyle } from 'styled-system';
import { ApplicationToolbarButton } from '../../PredefinedConfig/DesignTimeState/ApplicationState';
import SimpleButton from '../../components/SimpleButton';
import {
  TOOLBAR_VISIBLE_EVENT,
  DASHBOARD_BUTTON_CLICKED_EVENT,
} from '../../Utilities/Constants/GeneralConstants';
import { IDashboardStrategy } from '../../Strategy/Interface/IDashboardStrategy';

interface ApplicationToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ApplicationToolbarControlComponent> {
  ApplicationToolbarTitle: string;
}
class ApplicationToolbarControlComponent extends React.Component<
  ApplicationToolbarControlComponentProps,
  {}
> {
  render(): any {
    const headerText = StringExtensions.IsNotNullOrEmpty(this.props.ApplicationToolbarTitle)
      ? this.props.ApplicationToolbarTitle
      : StrategyConstants.ApplicationStrategyName;

    const buttons = this.props.Blotter.api.applicationApi.getApplicationToolbarButtons();

    const dashboardStrategy: IDashboardStrategy = this.props.Blotter.strategies.get(
      StrategyConstants.ConditionalStyleStrategyId
    ) as IDashboardStrategy;

    return (
      <PanelDashboard
        className="ab-ApplicationToolbar"
        headerText={headerText}
        glyphicon={StrategyConstants.ApplicationGlyph}
        onClose={() => this.props.onClose(StrategyConstants.ApplicationStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        <div
          className="ApplicationToolBarContents ab-ApplicationToolbar__contents ab-ApplicationToolbar__contents--render"
          style={{ minHeight: 22 }}
        />
        <div
          id="ab-ApplicationToolbar__buttons"
          className="ab-ApplicationToolbar__buttons"
          style={{ minHeight: 22 }}
        >
          {buttons.map((button: ApplicationToolbarButton, index: number) => {
            return (
              <SimpleButton
                style={{ marginLeft: index ? 'var(--ab-space-1)' : 0 }}
                key={button.ButtonText}
                onClick={() => {
                  this.props.Blotter.emit(DASHBOARD_BUTTON_CLICKED_EVENT, button.ButtonText);
                }}
              >
                {button.ButtonText}
              </SimpleButton>
            );
          })}
        </div>
      </PanelDashboard>
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    ApplicationToolbarTitle: state.Dashboard.ApplicationToolbarTitle,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
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

export const ApplicationToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationToolbarControlComponent);
