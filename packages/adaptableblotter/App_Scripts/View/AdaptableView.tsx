import * as React from 'react';
import * as Redux from 'redux';
import { Provider, connect, ConnectedComponent } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { AdaptablePopup } from './Components/Popups/AdaptablePopup';
import { ChartState } from '../PredefinedConfig/ChartState';
import { PopupState } from '../PredefinedConfig/PopupState';
import { SystemState } from '../PredefinedConfig/SystemState';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptablePopupPrompt } from './Components/Popups/AdaptablePopupPrompt';
import { Dashboard } from './Dashboard/Dashboard';
import { AdaptablePopupConfirmation } from './Components/Popups/AdaptablePopupConfirmation';
import { AdaptablePopupAlert } from './Components/Popups/AdaptablePopupAlert';
import { AdaptableChart } from './Components/Popups/AdaptableChart';
import { ChartVisibility } from '../PredefinedConfig/Common/ChartEnums';
import { AdaptableState } from '../PredefinedConfig/AdaptableState';
import { AdaptableGridInfo } from './Components/Popups/AdaptableGridInfo';
import { AdaptableLoadingScreen } from './Components/Popups/AdaptableLoadingScreen';

interface AdaptableViewProps extends React.ClassAttributes<AdaptableView> {
  PopupState: PopupState;
  SystemState: SystemState;
  ChartState: ChartState;
  Blotter: IAdaptableBlotter;
  showPopup: (
    ComponentStrategy: string,
    ComponentName: string,
    IsReadOnly: boolean
  ) => PopupRedux.PopupShowScreenAction;
  onCloseScreenPopup: () => PopupRedux.PopupHideScreenAction;
  onCloseAlertPopup: () => PopupRedux.PopupHideAlertAction;
  onConfirmPromptPopup: (input: string) => PopupRedux.PopupConfirmPromptAction;
  onClosePromptPopup: () => PopupRedux.PopupHidePromptAction;
  onConfirmConfirmationPopup: (comment: string) => PopupRedux.PopupConfirmConfirmationAction;
  onCancelConfirmationPopup: () => PopupRedux.PopupCancelConfirmationAction;
  onClearPopupParams: () => PopupRedux.PopupClearParamAction;
  onCloseChartPopup: () => SystemRedux.ChartSetChartVisibiityAction;
  onCloseLoadingPopup: () => PopupRedux.PopupHideLoadingAction;
  onCloseGridInfoPopup: () => PopupRedux.PopupHideGridInfoAction;
}

//PLEASE NO LOGIC HERE!!! I keep removing stuf... Search , filter, quick search and now layouts.......
class AdaptableView extends React.Component<AdaptableViewProps, {}> {
  render() {
    return (
      <div>
        <Dashboard Blotter={this.props.Blotter} />

        {/* The chart widget - it will decide where it will display
                Either modally (if we set ShowModal in our Predefiend Config for Chart State)
                Or in a div otherwise (if a div then the Chart screen will work out WHICH div...) */}
        {this.props.SystemState.ChartVisibility != ChartVisibility.Hidden && (
          <AdaptableChart
            AdaptableBlotter={this.props.Blotter}
            onClose={this.props.onCloseChartPopup}
            showChart={this.props.SystemState.ChartVisibility == ChartVisibility.Maximised}
            showModal={this.props.Blotter.blotterOptions.chartOptions!.showModal!}
          />
        )}

        {/*  These are all popups that we show at different times */}
        <AdaptableGridInfo
          AdaptableBlotter={this.props.Blotter}
          onClose={this.props.onCloseGridInfoPopup}
          showAbout={this.props.PopupState.GridInfoPopup.ShowGridInfoPopup}
        />

        <AdaptableLoadingScreen
          AdaptableBlotter={this.props.Blotter}
          onClose={this.props.onCloseLoadingPopup}
          showLoadingScreen={this.props.PopupState.LoadingPopup.ShowLoadingPopup}
        />

        <AdaptablePopupAlert
          Header={this.props.PopupState.AlertPopup.Header}
          Msg={this.props.PopupState.AlertPopup.Msg}
          onClose={this.props.onCloseAlertPopup}
          ShowPopup={this.props.PopupState.AlertPopup.ShowAlertPopup}
          MessageType={this.props.PopupState.AlertPopup.MessageType}
          AdaptableBlotter={this.props.Blotter}
        />

        <AdaptablePopupPrompt
          Msg={this.props.PopupState.PromptPopup.Msg}
          Header={this.props.PopupState.PromptPopup.Header}
          onClose={this.props.onClosePromptPopup}
          onConfirm={this.props.onConfirmPromptPopup}
          ShowPopup={this.props.PopupState.PromptPopup.ShowPromptPopup}
          AdaptableBlotter={this.props.Blotter}
        />

        <AdaptablePopupConfirmation
          Header={this.props.PopupState.ConfirmationPopup.Header}
          Msg={this.props.PopupState.ConfirmationPopup.Msg}
          ShowPopup={this.props.PopupState.ConfirmationPopup.ShowConfirmationPopup}
          CancelButtonText={this.props.PopupState.ConfirmationPopup.CancelButtonText}
          ConfirmButtonText={this.props.PopupState.ConfirmationPopup.ConfirmButtonText}
          onCancel={this.props.onCancelConfirmationPopup}
          onConfirm={this.props.onConfirmConfirmationPopup}
          ShowInputBox={this.props.PopupState.ConfirmationPopup.ShowInputBox}
          MessageType={this.props.PopupState.ConfirmationPopup.MessageType}
          AdaptableBlotter={this.props.Blotter}
        />

        {/*  The main model window where function screens are 'hosted' */}
        <AdaptablePopup
          showModal={this.props.PopupState.ScreenPopup.ShowScreenPopup}
          ComponentName={this.props.PopupState.ScreenPopup.ComponentName}
          ComponentStrategy={this.props.PopupState.ScreenPopup.ComponentStrategy}
          onHide={this.props.onCloseScreenPopup}
          Blotter={this.props.Blotter}
          onClearPopupParams={() => this.props.onClearPopupParams()}
          PopupParams={this.props.PopupState.ScreenPopup.Params}
          PopupProps={this.props.PopupState.ScreenPopup.PopupProps}
        />
      </div>
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    PopupState: state.Popup,
    SystemState: state.System,
    ChartState: state.Chart,
    AdaptableBlotter: ownProps.Blotter,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onCloseScreenPopup: () => dispatch(PopupRedux.PopupHideScreen()),
    onCloseAlertPopup: () => dispatch(PopupRedux.PopupHideAlert()),
    onCloseGridInfoPopup: () => dispatch(PopupRedux.PopupHideGridInfo()),
    onCloseChartPopup: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartVisibility.Hidden)),
    onClosePromptPopup: () => dispatch(PopupRedux.PopupHidePrompt()),
    onConfirmPromptPopup: (inputText: string) => dispatch(PopupRedux.PopupConfirmPrompt(inputText)),
    onConfirmConfirmationPopup: (comment: string) =>
      dispatch(PopupRedux.PopupConfirmConfirmation(comment)),
    onCancelConfirmationPopup: () => dispatch(PopupRedux.PopupCancelConfirmation()),
    showPopup: (componentStrategy: string, componentName: string, params?: any) =>
      dispatch(PopupRedux.PopupShowScreen(componentStrategy, componentName, params)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
  };
}

let AdaptableBlotterWrapper: ConnectedComponent<typeof AdaptableView, any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdaptableView);

export const AdaptableApp = ({ AdaptableBlotter }: { AdaptableBlotter: IAdaptableBlotter }) => (
  <Provider store={AdaptableBlotter.AdaptableStore.TheStore}>
    <ThemeProvider theme={theme}>
      <AdaptableBlotterWrapper Blotter={AdaptableBlotter} />
    </ThemeProvider>
  </Provider>
);
