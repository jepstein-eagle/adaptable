import * as React from "react";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { MessageType } from "../../../Utilities/Enums";
import { Modal, Button, Row, Col, ControlLabel } from "react-bootstrap";
import { PanelWithImage } from "../Panels/PanelWithImage";
import { UIHelper } from "../../UIHelper";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";

export interface AdaptableBlotterPopupAlertProps extends React.ClassAttributes<AdaptableBlotterPopupAlert> {
    ShowPopup: boolean
    onClose: Function
    Msg: string
    Header: string
    MessageType: MessageType
    AdaptableBlotter: IAdaptableBlotter;
}

export class AdaptableBlotterPopupAlert extends React.Component<AdaptableBlotterPopupAlertProps, {}> {

    render() {


        let style: string = UIHelper.getStyleNameByMessageType(this.props.MessageType);
        let header: string = this.props.MessageType.toUpperCase();
        let glyph: string = UIHelper.getGlyphByMessageType(this.props.MessageType);



        let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        let cssClassName: string = StyleConstants.POPUP_ALERT

        return this.props.ShowPopup &&
            <div className={StyleConstants.POPUP_ALERT}>

                <Modal show={this.props.ShowPopup}
                    onHide={this.props.onClose}
                    className={cssClassName}
                    container={modalContainer}
                    bsSize={"small"}>
                    <div className={cssClassName + StyleConstants.MODAL_BASE} >
                        <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>

                            <div className={cssClassName}>
                                <PanelWithImage
                                    cssClassName={cssClassName}
                                    header={header}
                                    bsStyle={style} glyphicon={glyph}
                                    bsSize={"small"}
                                >
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <ControlLabel>
                                                {this.props.Header}
                                            </ControlLabel>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {this.props.Msg.split("\n").map(function (item, index) {
                                                return (
                                                    <span key={index}>
                                                        {item}
                                                        <br />
                                                    </span>
                                                )
                                            })}
                                        </div>
                                        <div style={{ marginTop: '20px' }}>
                                            <Row >
                                                <Col xs={4}></Col>
                                                <Col xs={7} >
                                                    <Button
                                                        bsStyle={style} className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON}
                                                        onClick={() => this.props.onClose()}>OK</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </PanelWithImage>
                            </div>
                        </Modal.Body>
                    </div>
                </Modal>
            </div>
    }

}