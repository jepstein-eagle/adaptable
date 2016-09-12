import {IAdaptableBlotter} from '../Core/Interface/IAdaptableBlotter';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { Modal, Button } from 'react-bootstrap';

import {AdaptableViewFactory} from './AdaptableViewFactory';

interface IAdaptableBlotterPopupProps {
  showModal: boolean;
  ComponentClassName: string;
  onHide?: Function;
  AdaptableBlotter: IAdaptableBlotter;
}

export class AdaptableBlotterPopup extends React.Component<IAdaptableBlotterPopupProps, {}> {
  render() {
    if (this.props.ComponentClassName) {
      var bodyElement:any = AdaptableViewFactory[this.props.ComponentClassName];
      var body = React.createElement(bodyElement,{AdaptableBlotter: this.props.AdaptableBlotter});
    }
    //TODO: There is a CSS style in our App that makes the popup to autosize. Need to check how to do it directly from code
    return (
        <Modal show={this.props.showModal} onHide={this.props.onHide}  >
          {/*<Modal.Header closeButton>
            <Modal.Title>{}</Modal.Title>
          </Modal.Header>*/}
          <Modal.Body style={divStyle}>
            {body}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

var divStyle = {
    maxHeight: '600px',
    minWidth: '800px'
};