import { IAdaptableBlotter } from '../../../Core/Interface/IAdaptableBlotter';
import * as React from "react";
import { Modal, Button } from 'react-bootstrap';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { AdaptableViewFactory } from './../../AdaptableViewFactory';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps'
import { UIHelper } from '../../UIHelper';
import * as StyleConstants from '../../../Core/Constants/StyleConstants';
import * as GeneralConstants from '../../../Core/Constants/GeneralConstants'

export interface IAdaptableBlotterPopupProps extends React.ClassAttributes<AdaptableBlotterPopup> {
  showModal: boolean;
  ComponentName: string;
  IsReadOnly: boolean
  onHide?: Function;
  AdaptableBlotter: IAdaptableBlotter;
  PopupParams: string
  onClearPopupParams: () => PopupRedux.PopupClearParamAction;
}

export class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
  render() {

    let cssClassName: string = StyleConstants.AB_STYLE

    let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
    if (this.props.ComponentName) {
      let bodyElement: any = AdaptableViewFactory[this.props.ComponentName];
      //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
      let commonProps: StrategyViewPopupProps<this> = {
        getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => this.props.AdaptableBlotter ? this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) : null,
        PopupParams: this.props.PopupParams,
        onClearPopupParams: () => this.props.onClearPopupParams(),
        TeamSharingActivated: this.props.AdaptableBlotter.BlotterOptions.enableRemoteConfigServer,
        Columns: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
        UserFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Filter.UserFilters,
        SystemFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Filter.SystemFilters,
        ModalContainer: modalContainer,
        ColorPalette: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
        GridSorts: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.GridSorts,
        cssClassName: cssClassName + StyleConstants.MODAL_BODY,
        BlotterOptions: this.props.AdaptableBlotter.BlotterOptions,
        BlotterApi: this.props.AdaptableBlotter.api
      }

      var body: any = React.createElement(bodyElement, commonProps);
    }


    return (

      <Modal show={this.props.showModal} onHide={this.props.onHide} className={cssClassName + StyleConstants.BASE}
        container={modalContainer} >
        <div className={cssClassName + StyleConstants.MODAL_BASE}>
          <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>
            <div className="ab_main_popup">
              <div className={this.props.IsReadOnly ? GeneralConstants.READ_ONLY_STYLE : ""}>
                {body}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className={cssClassName + StyleConstants.MODAL_FOOTER}>
            <Button className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON} onClick={() => this.props.onHide()}>Close</Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}
