import { IAdaptableBlotter } from '../../../Api/Interface/IAdaptableBlotter';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Modal, Button } from 'react-bootstrap';
import { DistinctCriteriaPairValue } from '../../../Utilities/Enums'
import { AdaptableViewFactory } from '../../AdaptableViewFactory';
import { UIHelper } from '../../UIHelper';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import * as ScreenPopups from '../../../Utilities/Constants/ScreenPopups';
import { ChartDisplayPopupPropsBase } from '../SharedProps/ChartDisplayPopupPropsBase';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

export interface IAdaptableBlotterChartProps extends React.ClassAttributes<AdaptableBlotterChart> {
  showChart: boolean;
  onClose?: Function;
  AdaptableBlotter: IAdaptableBlotter;
  showModal: boolean;
}

export class AdaptableBlotterChart extends React.Component<IAdaptableBlotterChartProps, {}> {
  render() {

    let cssClassName: string = StyleConstants.AB_STYLE

    let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);

    let commonProps: ChartDisplayPopupPropsBase<this> = {
      getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => this.props.AdaptableBlotter ? this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) : null,
      Columns: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
      ModalContainer: modalContainer,
      cssClassName: cssClassName + StyleConstants.MODAL_BODY,
      onClose: this.props.onClose,
      showModal: this.props.showModal,
      Blotter: this.props.AdaptableBlotter,
      UserFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
      SystemFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters,
      ColorPalette: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
    }

    // if we have a chart container property in Blotter Options then lets get that and put the chart there
    if (StringExtensions.IsNotNullOrEmpty(this.props.AdaptableBlotter.BlotterOptions.containerOptions.chartContainer)) {
      let chartContainer: HTMLElement = UIHelper.getChartContainer(this.props.AdaptableBlotter.BlotterOptions, document);
      // Want to be able to get show the chart in this DIV  - but no idea how
      // do we do this here?  or in adaptableBlotterView?
      //  console.log(chartContainer);
      //ReactDOM.render(body, chartContainer);

    }
    let bodyElement: any = AdaptableViewFactory[ScreenPopups.ChartDisplayPopup];



    var body: any = React.createElement(bodyElement, commonProps);

    // only do this if its NOT default I guess...



    return (
      <div>
        {this.props.showModal ?
          <Modal show={this.props.showChart} onHide={this.props.onClose} className={cssClassName + StyleConstants.BASE}
            container={modalContainer} >
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
          <div style={{ marginLeft: '25px', marginBottom: '25px' }}>
            {body}
          </div>

        }
      </div>
    );
  }
}
