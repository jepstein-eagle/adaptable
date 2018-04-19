import { IAdaptableBlotter } from '../../../Core/Interface/IAdaptableBlotter';
import * as React from "react";
import { Modal, Button } from 'react-bootstrap';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { AdaptableViewFactory } from './../../AdaptableViewFactory';
import * as PopupRedux from '../../../Redux/ActionsReducers/PopupRedux'
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps'
import { UIHelper } from '../../UIHelper';

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

    let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.BlotterOptions, document);
    if (this.props.ComponentName) {
      let bodyElement: any = AdaptableViewFactory[this.props.ComponentName];
      //Warning : FilterForm needs to be changed if we add properties since it uses the same interface
      let commonProps: StrategyViewPopupProps<this> = {
        getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => this.props.AdaptableBlotter ? this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria) : null,
        PopupParams: this.props.PopupParams,
        onClearPopupParams: () => this.props.onClearPopupParams(),
        TeamSharingActivated: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.BlotterOptions.enableRemoteConfigServer,
        Columns: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns,
        UserFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters,
        SystemFilters: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().SystemFilter.SystemFilters,
        ModalContainer: modalContainer ,
        ColorPalette: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().UserInterface.ColorPalette,
        GridSorts: this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState().Grid.GridSorts
      }

      var body: any = React.createElement(bodyElement, commonProps);
    }


    return (
      
      <Modal show={this.props.showModal} onHide={this.props.onHide} className="adaptable_blotter_style_base"
        container={modalContainer} >
        {/*<Modal.Header closeButton>
            <Modal.Title>{}</Modal.Title>
          </Modal.Header>*/}
        <Modal.Body className="adaptable_blotter_style_popup_base">

          <div className="adaptable_blotter_modal_main_popup">
            <div className={this.props.IsReadOnly ? "adaptable_blotter_readonly" : ""}>
              {body}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="adaptable_blotter_style_popup_base">
          <Button onClick={() => this.props.onHide()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
