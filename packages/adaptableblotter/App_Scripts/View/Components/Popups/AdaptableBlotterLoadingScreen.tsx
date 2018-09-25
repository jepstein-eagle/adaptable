import { IAdaptableBlotter } from '../../../Core/Interface/IAdaptableBlotter';
import * as React from "react";
import { Modal } from 'react-bootstrap';
import { UIHelper } from '../../UIHelper';
import * as StyleConstants from '../../../Core/Constants/StyleConstants';

export interface IAdaptableBlotterLoadingScreenProps extends React.ClassAttributes<AdaptableBlotterLoadingScreen> {
  showLoadingScreen: boolean;
  onClose?: Function;
  AdaptableBlotter: IAdaptableBlotter;
}

export class AdaptableBlotterLoadingScreen extends React.Component<IAdaptableBlotterLoadingScreenProps, {}> {

  render() {
    let cssClassName: string = StyleConstants.AB_STYLE

    let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);

    return (

      <Modal show={this.props.showLoadingScreen} onHide={this.props.onClose} className={cssClassName + StyleConstants.BASE}
        container={modalContainer} >
        <div className={cssClassName + StyleConstants.MODAL_BASE} >
          <Modal.Title>&nbsp;&nbsp;&nbsp;Loading the Grid</Modal.Title>
          <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>
            <div className="ab_loading_screen" >
              <span>Please wait while we initialise your settings...</span>
              <br /><br />
            </div>
          </Modal.Body>
        </div>
      </Modal>
    );
  }
}
