import * as React from "react";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { Modal, ControlLabel, Row, Col, Button, FormControl } from "react-bootstrap";
import { UIHelper } from "../../UIHelper";
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";


export interface AdaptableBlotterPopupPromptProps extends React.ClassAttributes<AdaptableBlotterPopupPrompt> {
    ShowPopup: boolean
    Header: string
    Msg: string
    onClose: Function
    onConfirm: Function
    AdaptableBlotter: IAdaptableBlotter;
}

export interface AdaptableBlotterPopupPromptState {
    PromptText: string
}

export class AdaptableBlotterPopupPrompt extends React.Component<AdaptableBlotterPopupPromptProps, AdaptableBlotterPopupPromptState> {

    constructor(props: AdaptableBlotterPopupPromptProps) {
        super(props);
        this.state = { PromptText: "" }
    }

    render() {
        let modalContainer: HTMLElement = UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        let cssClassName: string = StyleConstants.POPUP_PROMPT


        return this.props.ShowPopup && <div className={StyleConstants.POPUP_PROMPT}>
            <Modal show={this.props.ShowPopup}
                onHide={this.props.onClose}
                className={cssClassName}
                container={modalContainer}
                bsSize={"small"}>
                <div className={cssClassName + StyleConstants.MODAL_BASE} >
                    <Modal.Body className={cssClassName + StyleConstants.MODAL_BODY}>

                        <div className={cssClassName}>

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
                                    <FormControl
                                        value={this.state.PromptText}
                                        type="string"
                                        placeholder="Enter comment"
                                        onChange={(e) => this.changeContent(e)} />
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <Row >
                                        <Col xs={4} >
                                            <Button
                                                bsStyle={StyleConstants.PRIMARY_BSSTYLE} className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CONFIRM_BUTTON}
                                                disabled={StringExtensions.IsNullOrEmpty(this.state.PromptText)}
                                                onClick={() => this.onConfirmmForm()}>OK</Button>
                                        </Col>
                                        <Col xs={4}></Col>
                                        <Col xs={4} >
                                            <Button
                                                bsStyle={StyleConstants.DEFAULT_BSSTYLE} className={cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CANCEL_BUTTON}
                                                onClick={() => this.onCloseForm()}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </div>




    }

    onCloseForm(): void {
        this.setState({ PromptText: "" } as AdaptableBlotterPopupPromptState)
        this.props.onClose();
    }

    onConfirmmForm(): void {
        let promptText = this.state.PromptText;
        this.setState({ PromptText: "" } as AdaptableBlotterPopupPromptState)
        this.props.onConfirm(promptText)
    }


    changeContent = (e: any) => {
        this.setState({ PromptText: e.target.value } as AdaptableBlotterPopupPromptState)
    }
}