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
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptablePopupPrompt } from './Components/Popups/AdaptablePopupPrompt';
import { Dashboard } from './Dashboard/Dashboard';
import { AdaptablePopupConfirmation } from './Components/Popups/AdaptablePopupConfirmation';
import { AdaptablePopupAlert } from './Components/Popups/AdaptablePopupAlert';
import { AdaptableChart } from './Components/Popups/AdaptableChart';
import { ChartVisibility } from '../PredefinedConfig/Common/ChartEnums';
import { AdaptableState } from '../PredefinedConfig/AdaptableState';
import { AdaptableGridInfo } from './Components/Popups/AdaptableGridInfo';
import { AdaptableLoadingScreen } from './Components/Popups/AdaptableLoadingScreen';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';

interface AdaptableViewProps extends React.ClassAttributes<AdaptableView> {
  PopupState: PopupState;
  SystemState: SystemState;
  ChartState: ChartState;
  Adaptable: IAdaptable;
  showPopup: (
    ComponentStrategy: AdaptableFunctionName,
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
        <Dashboard Adaptable={this.props.Adaptable} />

        {/* The chart widget - it will decide where it will display
                Either modally (if we set ShowModal in our Predefiend Config for Chart State)
                Or in a div otherwise (if a div then the Chart screen will work out WHICH div...) */}
        {this.props.SystemState.ChartVisibility != ChartVisibility.Hidden && (
          <AdaptableChart
            Adaptable={this.props.Adaptable}
            onClose={this.props.onCloseChartPopup}
            showChart={this.props.SystemState.ChartVisibility == ChartVisibility.Maximised}
            showModal={this.props.Adaptable.adaptableOptions.chartOptions!.showModal!}
          />
        )}

        {/*  These are all popups that we show at different times */}
        <AdaptableGridInfo
          Adaptable={this.props.Adaptable}
          onClose={this.props.onCloseGridInfoPopup}
          showAbout={this.props.PopupState.GridInfoPopup.ShowGridInfoPopup}
        />

        <AdaptableLoadingScreen
          Adaptable={this.props.Adaptable}
          onClose={this.props.onCloseLoadingPopup}
          showLoadingScreen={this.props.PopupState.LoadingPopup.ShowLoadingPopup}
        />

        <AdaptablePopupAlert
          Header={this.props.PopupState.AlertPopup.Header}
          Msg={this.props.PopupState.AlertPopup.Msg}
          onClose={this.props.onCloseAlertPopup}
          ShowPopup={this.props.PopupState.AlertPopup.ShowAlertPopup}
          MessageType={this.props.PopupState.AlertPopup.MessageType}
          Adaptable={this.props.Adaptable}
        />

        <AdaptablePopupPrompt
          Msg={this.props.PopupState.PromptPopup.Msg}
          Header={this.props.PopupState.PromptPopup.Header}
          onClose={this.props.onClosePromptPopup}
          onConfirm={this.props.onConfirmPromptPopup}
          ShowPopup={this.props.PopupState.PromptPopup.ShowPromptPopup}
          Adaptable={this.props.Adaptable}
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
          Adaptable={this.props.Adaptable}
        />

        {/*  The main model window where function screens are 'hosted' */}
        <AdaptablePopup
          showModal={this.props.PopupState.ScreenPopup.ShowScreenPopup}
          ComponentName={this.props.PopupState.ScreenPopup.ComponentName}
          ComponentStrategy={this.props.PopupState.ScreenPopup.ComponentStrategy}
          onHide={this.props.onCloseScreenPopup}
          Adaptable={this.props.Adaptable}
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
    Adaptable: ownProps.Adaptable,
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
    showPopup: (componentStrategy: AdaptableFunctionName, componentName: string, params?: any) =>
      dispatch(PopupRedux.PopupShowScreen(componentStrategy, componentName, params)),
    onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
  };
}

let AdaptableWrapper: ConnectedComponent<typeof AdaptableView, any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdaptableView);

export const AdaptableApp = ({ Adaptable }: { Adaptable: IAdaptable }) => (
  <Provider store={Adaptable.AdaptableStore.TheStore}>
    <ThemeProvider theme={theme}>
      <AdaptableWrapper Adaptable={Adaptable} />
    </ThemeProvider>
  </Provider>
);
