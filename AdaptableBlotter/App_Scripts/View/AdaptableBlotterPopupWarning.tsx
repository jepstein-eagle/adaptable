/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { Modal, Alert, Form, Row, Col, Glyphicon, ControlLabel, Button } from 'react-bootstrap';


interface AdaptableBlotterPopupWarningProps extends React.ClassAttributes<AdaptableBlotterPopupWarning> {
    ShowErrorPopup: boolean
    onClose: Function
    ErrorMsg: string
}

export class AdaptableBlotterPopupWarning extends React.Component<AdaptableBlotterPopupWarningProps, {}> {
    render() {
        return <Modal show={this.props.ShowErrorPopup} onHide={this.props.onClose} className="adaptable_blotter_style" >
            <Modal.Body>
                <Alert bsStyle="warning" onDismiss={this.props.onClose}>
                    <h3><Glyphicon glyph="warning-sign" bsSize="large" /><strong> Warning</strong></h3>

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
                        <Button bsStyle="warning" onClick={() => this.props.onClose()}>OK</Button>
                    </p>
                </Alert>
            </Modal.Body>
        </Modal>
    }

}