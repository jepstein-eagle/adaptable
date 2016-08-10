/// <reference path="../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Modal, Button } from 'react-bootstrap';
import HelloWorld from './MyReactComponent.tsx'

interface IAdaptableBlotterPopupState {
    showModal: boolean;
}

export default class AdaptableBlotterPopup extends React.Component<{}, IAdaptableBlotterPopupState> {
        constructor() {
            super();
            this.state = {showModal: false};
        }
        open() {
            this.setState({ showModal: true });
        }
        close() {
            this.setState({ showModal: false });
        }
        render() {
            return ( 
                     <div>
        <Button onClick={e=>this.open()}>
          Launch modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>The amazing Adaptable Blotter!!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <HelloWorld name="World from React for the Adaptable Blotter!" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e=>this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
      }
    }

    ReactDOM.render(<AdaptableBlotterPopup  />, document.getElementById('content'));