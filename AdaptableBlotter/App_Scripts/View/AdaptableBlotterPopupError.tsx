/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { Modal, Alert, Form, Row, Col, Glyphicon, Label, Button } from 'react-bootstrap';


interface AdaptableBlotterPopupErrorProps extends React.ClassAttributes<AdaptableBlotterPopupError> {
    ShowErrorPopup: boolean
    onClose: Function
    ErrorMsg: string
}

export class AdaptableBlotterPopupError extends React.Component<AdaptableBlotterPopupErrorProps, {}> {
    render() {
        return <Modal show={this.props.ShowErrorPopup} onHide={this.props.onClose} className="adaptable_blotter_style" >
            <Modal.Body>
                <Alert bsStyle="danger" onDismiss={this.props.onClose}>
                    
                    <h3><Glyphicon glyph="exclamation-sign" bsSize="large" /><strong> Error</strong></h3>

                    <p>
                        {this.props.ErrorMsg.split("\n").map(function (item, index) {
                            return (
                                <span key={index}>
                                    {item}
                                    <br />
                                </span>
                            )
                        })}
                    </p>
                    <p>
                        <Button bsStyle="danger" onClick={() => this.props.onClose()}>OK</Button>
                    </p>
                </Alert>
            </Modal.Body>
        </Modal>
    }

}