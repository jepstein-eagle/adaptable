/// <reference path="../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Modal, Button } from 'react-bootstrap';
import HelloWorld from './MyReactComponent.tsx'

interface PopupProps {
    name: number;
}

export default class AdaptableBlotterPopup extends React.Component<{}, {}> {
        constructor() {
            super();
            this.state = {show: false};
        }
        render() {
            return (<div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>The Magic Adaptable Blotter!!!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <HelloWorld name="World From React" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button>Close</Button>
                        <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>);
        }
    }

    ReactDOM.render(<AdaptableBlotterPopup  />, document.getElementById('content'));