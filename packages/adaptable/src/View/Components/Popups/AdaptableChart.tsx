import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import { UIHelper } from '../../UIHelper';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../../Utilities/Constants/ScreenPopups';
import { ChartDisplayPopupPropsBase } from '../SharedProps/ChartDisplayPopupPropsBase';
import { AdaptablePopup } from './AdaptablePopup';
import AdaptableHelper from '../../../Utilities/Helpers/AdaptableHelper';
import { AccessLevel } from '../../../PredefinedConfig/EntitlementState';

/*
The Chart popup or Div.
If ShowModal prop is true (set via Predefined Config then we show the chart modally - the same we do for all popups)
Otherwise we show it in a Div.
If the user has set the name of a div in adaptableOptions / ContainerOptions / ChartContainer, then we use that;
Otherwise we use the default.

TODO:  put the stuff n state if we redraw every time?
*/

export interface IAdaptableChartProps extends React.ClassAttributes<AdaptableChart> {
  showChart: boolean;
  onClose?: () => void;
  Adaptable: IAdaptable;
  showModal: boolean;
}

export interface AdaptableChartState {
  chartContainer: HTMLElement;
  accessLevel: AccessLevel;
  isValidUserChartContainer: boolean;
}

export class AdaptableChart extends React.Component<IAdaptableChartProps, AdaptableChartState> {
  constructor(props: IAdaptableChartProps) {
    super(props);
    this.state = {
      chartContainer: UIHelper.getChartContainer(
        this.props.Adaptable.adaptableOptions,
        document,
        this.props.showModal
      ),
      accessLevel: this.props.Adaptable.api.entitlementsApi.getEntitlementAccessLevelByAdaptableFunctionName(
        StrategyConstants.ChartStrategyId
      ),

      isValidUserChartContainer: UIHelper.isValidUserChartContainer(
        this.props.Adaptable.adaptableOptions,
        document
      ),
    };
  }

  render() {
    let commonProps: ChartDisplayPopupPropsBase<this> = {
      ModalContainer: this.state.chartContainer,
      onClose: this.props.onClose,
      ShowModal: this.props.showModal,
      AccessLevel: this.state.accessLevel,
      Api: this.props.Adaptable.api,
    };

    let ChartCmp: any = AdaptableViewFactory[ScreenPopups.ChartDisplayPopup];

    const body = <ChartCmp {...commonProps} />;
    // var body: any = React.createElement(bodyElement, commonProps);

    return this.props.showModal ? (
      <AdaptablePopup
        Adaptable={this.props.Adaptable}
        onHide={this.props.onClose}
        showModal
        PopupParams={null}
        ComponentName={ScreenPopups.ChartDisplayPopup}
        ComponentStrategy={StrategyConstants.ChartStrategyId}
      >
        {body}
      </AdaptablePopup>
    ) : this.state.isValidUserChartContainer ? (
      ReactDOM.createPortal(body, this.state.chartContainer)
    ) : (
      body
    );
  }
}
