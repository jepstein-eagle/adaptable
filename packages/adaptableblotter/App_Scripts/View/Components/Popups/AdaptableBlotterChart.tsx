import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AccessLevel } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import { UIHelper } from '../../UIHelper';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../../Utilities/Constants/ScreenPopups';
import { ChartDisplayPopupPropsBase } from '../SharedProps/ChartDisplayPopupPropsBase';
import { StrategyHelper } from '../../../Utilities/Helpers/StrategyHelper';
import Dialog from '../../../components/Dialog';
import { AdaptableBlotterPopup } from './AdaptableBlotterPopup';
import { PopupClearParamAction } from '../../../Redux/ActionsReducers/PopupRedux';

/*
The Chart popup or Div.
If ShowModal prop is true (set via Predefined Config then we show the chart modally - the same we do for all popups)
Otherwise we show it in a Div.
If the user has set the name of a div in BlotterOptions / ContainerOptions / ChartContainer, then we use that;
Otherwise we use the default.

TODO:  put the stuff n state if we redraw every time?
*/

export interface IAdaptableBlotterChartProps extends React.ClassAttributes<AdaptableBlotterChart> {
  showChart: boolean;
  onClose?: () => void;
  AdaptableBlotter: IAdaptableBlotter;
  showModal: boolean;
}

export interface AdaptableBlotterChartState {
  chartContainer: HTMLElement;
  accessLevel: AccessLevel;
  isValidUserChartContainer: boolean;
}

export class AdaptableBlotterChart extends React.Component<
  IAdaptableBlotterChartProps,
  AdaptableBlotterChartState
> {
  constructor(props: IAdaptableBlotterChartProps) {
    super(props);
    this.state = {
      chartContainer: UIHelper.getChartContainer(
        this.props.AdaptableBlotter.blotterOptions,
        document,
        this.props.showModal
      ),
      accessLevel: StrategyHelper.getEntitlementAccessLevelForStrategy(
        this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState().Entitlements
          .FunctionEntitlements,
        StrategyConstants.ChartStrategyId
      ),
      isValidUserChartContainer: UIHelper.isValidUserChartContainer(
        this.props.AdaptableBlotter.blotterOptions,
        document
      ),
    };
  }

  render() {
    let commonProps: ChartDisplayPopupPropsBase<this> = {
      Columns: this.props.AdaptableBlotter.api.gridApi.getColumns(),
      ModalContainer: this.state.chartContainer,
      onClose: this.props.onClose,
      ShowModal: this.props.showModal,
      Blotter: this.props.AdaptableBlotter,
      UserFilters: this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState().UserFilter
        .UserFilters,
      SystemFilters: this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState()
        .SystemFilter.SystemFilters,
      NamedFilters: this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState()
        .NamedFilter.NamedFilters,
      ColumnFilters: this.props.AdaptableBlotter.api.columnFilterApi.getAllColumnFilter(),
      ColorPalette: this.props.AdaptableBlotter.adaptableBlotterStore.TheStore.getState()
        .UserInterface.ColorPalette,
      AccessLevel: this.state.accessLevel,
    };

    let ChartCmp: any = AdaptableViewFactory[ScreenPopups.ChartDisplayPopup];

    const body = <ChartCmp {...commonProps} />;
    // var body: any = React.createElement(bodyElement, commonProps);

    return this.props.showModal ? (
      <AdaptableBlotterPopup
        Blotter={this.props.AdaptableBlotter}
        onHide={this.props.onClose}
        showModal
        PopupParams=""
        ComponentName={ScreenPopups.ChartDisplayPopup}
        ComponentStrategy={StrategyConstants.ChartStrategyId}
      >
        {body}
      </AdaptableBlotterPopup>
    ) : this.state.isValidUserChartContainer ? (
      ReactDOM.createPortal(body, this.state.chartContainer)
    ) : (
      body
    );
  }
}
