import * as React from 'react';
import * as Redux from 'redux';
import { Provider, connect, ConnectedComponent } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { AdaptableBlotterPopup } from './Components/Popups/AdaptableBlotterPopup';
import { ChartState } from '../PredefinedConfig/RunTimeState/ChartState';
import { PopupState } from '../PredefinedConfig/InternalState/PopupState';
import { SystemState } from '../PredefinedConfig/InternalState/SystemState';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { AdaptableBlotterPopupPrompt } from './Components/Popups/AdaptableBlotterPopupPrompt';
import { Dashboard } from './Dashboard/Dashboard';
import { AdaptableBlotterPopupConfirmation } from './Components/Popups/AdaptableBlotterPopupConfirmation';
import { AdaptableBlotterPopupAlert } from './Components/Popups/AdaptableBlotterPopupAlert';
import { AdaptableBlotterChart } from './Components/Popups/AdaptableBlotterChart';
import { AdaptableBlotterLoadingScreen } from './Components/Popups/AdaptableBlotterLoadingScreen';
import { AdaptableBlotterGridInfo } from './Components/Popups/AdaptableBlotterGridInfo';
import { ChartVisibility } from '../PredefinedConfig/Common/ChartEnums';

interface AdaptableBlotterViewProps extends React.ClassAttributes<AdaptableBlotterView> {
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
class AdaptableBlotterView extends React.Component<AdaptableBlotterViewProps, {}> {
  render() {
    return (
      <div>
        <Dashboard Blotter={this.props.Blotter} />

        {/* The chart widget - it will decide where it will display 
                Either modally (if we set ShowModal in our Predefiend Config for Chart State)
                Or in a div otherwise (if a div then the Chart screen will work out WHICH div...) */}
        {this.props.SystemState.ChartVisibility != ChartVisibility.Hidden && (
          <AdaptableBlotterChart
            AdaptableBlotter={this.props.Blotter}
            onClose={this.props.onCloseChartPopup}
            showChart={this.props.SystemState.ChartVisibility == ChartVisibility.Maximised}
            showModal={this.props.Blotter.blotterOptions.chartOptions!.showModal!}
          />
        )}

        {/*  These are all popups that we show at different times */}
        <AdaptableBlotterGridInfo
          AdaptableBlotter={this.props.Blotter}
          onClose={this.props.onCloseGridInfoPopup}
          showAbout={this.props.PopupState.GridInfoPopup.ShowGridInfoPopup}
        />

        <AdaptableBlotterLoadingScreen
          AdaptableBlotter={this.props.Blotter}
          onClose={this.props.onCloseLoadingPopup}
          showLoadingScreen={this.props.PopupState.LoadingPopup.ShowLoadingPopup}
        />

        <AdaptableBlotterPopupAlert
          Header={this.props.PopupState.AlertPopup.Header}
          Msg={this.props.PopupState.AlertPopup.Msg}
          onClose={this.props.onCloseAlertPopup}
          ShowPopup={this.props.PopupState.AlertPopup.ShowAlertPopup}
          MessageType={this.props.PopupState.AlertPopup.MessageType}
          AdaptableBlotter={this.props.Blotter}
        />

        <AdaptableBlotterPopupPrompt
          Msg={this.props.PopupState.PromptPopup.Msg}
          Header={this.props.PopupState.PromptPopup.Header}
          onClose={this.props.onClosePromptPopup}
          onConfirm={this.props.onConfirmPromptPopup}
          ShowPopup={this.props.PopupState.PromptPopup.ShowPromptPopup}
          AdaptableBlotter={this.props.Blotter}
        />

        <AdaptableBlotterPopupConfirmation
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
        <AdaptableBlotterPopup
          showModal={this.props.PopupState.ScreenPopup.ShowScreenPopup}
          ComponentName={this.props.PopupState.ScreenPopup.ComponentName}
          ComponentStrategy={this.props.PopupState.ScreenPopup.ComponentStrategy}
          onHide={this.props.onCloseScreenPopup}
          Blotter={this.props.Blotter}
          onClearPopupParams={() => this.props.onClearPopupParams()}
          PopupParams={this.props.PopupState.ScreenPopup.Params}
        />
      </div>
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    PopupState: state.Popup,
    SystemState: state.System,
    ChartState: state.Chart,
    AdaptableBlotter: ownProps.Blotter,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
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

let AdaptableBlotterWrapper: ConnectedComponent<typeof AdaptableBlotterView, any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdaptableBlotterView);

export const AdaptableBlotterApp = ({
  AdaptableBlotter,
}: {
  AdaptableBlotter: IAdaptableBlotter;
}) => (
  <Provider store={AdaptableBlotter.adaptableBlotterStore.TheStore}>
    <ThemeProvider theme={theme}>
      <AdaptableBlotterWrapper Blotter={AdaptableBlotter} />
    </ThemeProvider>
  </Provider>
);
