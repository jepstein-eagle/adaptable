import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Modal, Button } from 'react-bootstrap';
import { AccessLevel } from '../../../Utilities/Enums'
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import { UIHelper } from '../../UIHelper';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../../Utilities/Constants/ScreenPopups';
import { ChartDisplayPopupPropsBase } from '../SharedProps/ChartDisplayPopupPropsBase';
import { StrategyHelper } from '../../../Utilities/Helpers/StrategyHelper';

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
  onClose?: Function;
  AdaptableBlotter: IAdaptableBlotter;
  showModal: boolean;
}

export class AdaptableBlotterChart extends React.Component<IAdaptableBlotterChartProps, {}> {
  render() {
    let cssClassName: string = StyleConstants.AB_STYLE
   
    let chartContainer: HTMLElement = UIHelper.getChartContainer(this.props.AdaptableBlotter.BlotterOptions, document, this.props.showModal);
    let accessLevel: AccessLevel = StrategyHelper.getEntitlementAccessLevelForStrategy(this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements, StrategyConstants.ChartStrategyId);
    let isValidUserChartContainer: boolean = UIHelper.isValidUserChartContainer(this.props.AdaptableBlotter.BlotterOptions, document);

    let commonProps: ChartDisplayPopupPropsBase<this> = {
      Columns: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
      ModalContainer: chartContainer,
      cssClassName: cssClassName + StyleConstants.MODAL_BODY,
      onClose: this.props.onClose,
      ShowModal: this.props.showModal,
      Blotter: this.props.AdaptableBlotter,
      UserFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
      SystemFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters,
      ColumnFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().ColumnFilter.ColumnFilters,
      ColorPalette: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
      AccessLevel: accessLevel
    }

    let bodyElement: any = AdaptableViewFactory[ScreenPopups.ChartDisplayPopup];

    var body: any = React.createElement(bodyElement, commonProps);

     return (
      <span>
        {this.props.showModal ?
          <Modal show={this.props.showChart} onHide={this.props.onClose} className={cssClassName + StyleConstants.BASE}
            container={chartContainer} >
            <div className={cssClassName + StyleConstants.MODAL_BASE}>
              <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>
                <div className="ab_main_chart">
                  {body}
                </div>
              </Modal.Body>
              <Modal.Footer className={cssClassName + StyleConstants.MODAL_FOOTER}>
                <Button className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON} onClick={() => this.props.onClose()}>Close</Button>
              </Modal.Footer>
            </div>
          </Modal>
          :
          <span>
            {isValidUserChartContainer ?
              ReactDOM.createPortal(
                (<div id="ad" style={{ marginLeft: '25px', marginBottom: '25px' }}>
                  {body}
                </div>),
                chartContainer)
              :
              <div style={{ marginLeft: '25px', marginBottom: '25px' }}>
                {body}
              </div>
            }
          </span>
        }
      </span>
    );
  }
}
