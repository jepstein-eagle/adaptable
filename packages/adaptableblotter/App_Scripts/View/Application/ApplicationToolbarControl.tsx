import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ApplicationToolbarButton } from '../../PredefinedConfig/ApplicationState';
import SimpleButton from '../../components/SimpleButton';
import { APPLICATION_TOOLBAR_BUTTON_CLICKED_EVENT } from '../../Utilities/Constants/GeneralConstants';
import {
  ApplicationToolbarButtonClickedEventArgs,
  ApplicationToolbarButtonClickedInfo,
} from '../../Api/Events/BlotterEvents';
import BlotterHelper from '../../Utilities/Helpers/BlotterHelper';

interface ApplicationToolbarControlComponentProps
  extends ToolbarStrategyViewPopupProps<ApplicationToolbarControlComponent> {
  ApplicationToolbarTitle: string | undefined;
  ApplicationToolbarButtons: ApplicationToolbarButton[] | undefined;
}
class ApplicationToolbarControlComponent extends React.Component<
  ApplicationToolbarControlComponentProps,
  {}
> {
  render(): any {
    const headerText = StringExtensions.IsNotNullOrEmpty(this.props.ApplicationToolbarTitle)
      ? this.props.ApplicationToolbarTitle
      : StrategyConstants.ApplicationStrategyName;

    return (
      <PanelDashboard
        className="ab-ApplicationToolbar ab-DashboardToolbar__Application"
        headerText={headerText}
        glyphicon={StrategyConstants.ApplicationGlyph}
        onClose={() => this.props.onClose(StrategyConstants.ApplicationStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        <div
          id="ab-ApplicationToolbar__contents"
          className="ApplicationToolBarContents ab-ApplicationToolbar__contents ab-ApplicationToolbar__contents--render"
          style={{ minHeight: 22 }}
        />
        <div
          id="ab-ApplicationToolbar__buttons"
          className="ab-ApplicationToolbar__buttons"
          style={{ minHeight: 22 }}
        >
          {this.props.ApplicationToolbarButtons &&
            this.props.ApplicationToolbarButtons.map(
              (button: ApplicationToolbarButton, index: number) => {
                let applicationToolbarButtonClickedInfo: ApplicationToolbarButtonClickedInfo = {
                  applicationToolbarButton: button,
                };
                const applicationToolbarButtonClickedEventArgs: ApplicationToolbarButtonClickedEventArgs = BlotterHelper.createFDC3Message(
                  'Application Toolbar Button Clicked Args',
                  applicationToolbarButtonClickedInfo
                );

                return (
                  <SimpleButton
                    style={{ marginLeft: index ? 'var(--ab-space-1)' : 0 }}
                    key={button.Name}
                    onClick={() => {
                      this.props.Blotter.api.eventApi.emit(
                        'ApplicationToolbarButtonClicked',
                        applicationToolbarButtonClickedEventArgs
                      );
                    }}
                  >
                    {button.Caption}
                  </SimpleButton>
                );
              }
            )}
        </div>
      </PanelDashboard>
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    ApplicationToolbarTitle: state.Dashboard.ApplicationToolbarTitle,
    ApplicationToolbarButtons: state.Application.ApplicationToolbarButtons,
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
