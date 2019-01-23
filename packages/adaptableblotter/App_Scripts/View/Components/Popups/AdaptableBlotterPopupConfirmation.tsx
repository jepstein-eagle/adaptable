import * as React from "react";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { UIHelper } from "../../UIHelper";
import { Modal, ControlLabel, FormControl, Row, Col, Button } from "react-bootstrap";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
import { PanelWithImage } from "../Panels/PanelWithImage";
import { MessageType } from "../../../Utilities/Enums";
//import PropTypes from 'prop-types';

export interface AdaptableBlotterPopupConfirmationProps extends React.ClassAttributes<AdaptableBlotterPopupConfirmation> {
    ShowPopup: boolean
    onConfirm: (comment: string) => void
    onCancel: Function
    Header: string
    Msg: string
    ConfirmButtonText: string
    CancelButtonText: string
    ShowCommentBox: boolean
    MessageType: MessageType
    AdaptableBlotter: IAdaptableBlotter;
}

export interface AdaptableBlotterPopupConfirmationState {
    PromptText: string
}

export class AdaptableBlotterPopupConfirmation extends React.Component<AdaptableBlotterPopupConfirmationProps, AdaptableBlotterPopupConfirmationState> {

    constructor(props: AdaptableBlotterPopupConfirmationProps) {
        super(props);
        this.state = { PromptText: "" }
    }

    render() {

        let style: string = UIHelper.getStyleNameByMessageType(this.props.MessageType);
        let header: string = this.props.Header;
        let glyph: string = UIHelper.getGlyphByMessageType(this.props.MessageType);

        let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        let cssClassName: string = StyleConstants.POPUP_PROMPT


        return this.props.ShowPopup && <div className={StyleConstants.POPUP_PROMPT}>
            <Modal show={this.props.ShowPopup}
                onHide={this.props.onCancel}
                className={cssClassName}
                container={modalContainer}
                bsSize={"small"}>
                <div className={cssClassName + StyleConstants.MODAL_BASE} >
                    <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>

                        <div className={cssClassName}>
                        <PanelWithImage
                                    cssClassName={cssClassName}
                                    header={header}
                                    bsStyle={style} 
                                    glyphicon={glyph}
                                    bsSize={"small"}
                                >
                            <div>
                                 <div style={{ display: "flex", alignItems: "center" }}>
                                    {this.props.Msg.split("\n").map(function (item, index) {
                                        return (
                                            <ControlLabel key={index}>
                                                {item}
                                                <br />
                                            </ControlLabel>
                                        )
                                    })}
                                </div>
                                {this.props.ShowCommentBox &&
                                    <div style={{ marginTop: '20px' }}>
                                       <span>Please enter a comment to confirm</span>
                                       <br/>
                                        <FormControl style={{ marginTop: '20px' }}
                                            value={this.state.PromptText}
                                            type="string"
                                            placeholder="Enter text"
                                            onChange={(e) => this.changeContent(e)} />
                                    </div>
                                }
                                <div style={{ marginTop: '20px' }}>
                                    <Row >
                                        <Col xs={5} >
                                            <Button
                                                bsStyle={StyleConstants.PRIMARY_BSSTYLE} className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CONFIRM_BUTTON}
                                                disabled={!this.canConfirm()}
                                                onClick={() => this.onConfirmmForm()}>{this.props.ConfirmButtonText}</Button>
                                        </Col>
                                        <Col xs={2}></Col>
                                        <Col xs={5} >
                                            <Button
                                                bsStyle={StyleConstants.DEFAULT_BSSTYLE} className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CANCEL_BUTTON}
                                                onClick={() => this.onCancelForm()}>{this.props.CancelButtonText}</Button>
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

    onCancelForm(): void {
        this.setState({ PromptText: "" } as AdaptableBlotterPopupConfirmationState)
        this.props.onCancel();
    }

    onConfirmmForm(): void {
        let promptText = this.state.PromptText;
        this.setState({ PromptText: "" } as AdaptableBlotterPopupConfirmationState)
        this.props.onConfirm(promptText)
    }


    changeContent = (e: any) => {
        this.setState({ PromptText: e.target.value } as AdaptableBlotterPopupConfirmationState)
    }

    canConfirm(): boolean {
        if (this.props.ShowCommentBox) {
            return StringExtensions.IsNotNullOrEmpty(this.state.PromptText)
        }
        return true;
    }


}