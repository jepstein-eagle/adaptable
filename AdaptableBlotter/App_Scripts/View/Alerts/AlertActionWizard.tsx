/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Checkbox, Button, Form, Row, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { IAlert, ICellChangeRule } from '../../Core/interface/IAlertStrategy';
import { NotificationType, ColumnType, CellChangeType, PopupType } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';


interface AlertActionWizardProps extends AdaptableWizardStepProps<IAlert> {
    Blotter: IAdaptableBlotter

}
interface AlertActionWizardState {
    SendEmail: boolean
    EmailRecipients: string
    ShowPopup: boolean
    PopupType: PopupType

}

export class AlertActionWizard extends React.Component<AlertActionWizardProps, AlertActionWizardState> implements AdaptableWizardStep {
    constructor(props: AlertActionWizardProps) {
        super(props)
        this.state = {
            SendEmail: this.props.Data.AlertEmailInfo.SendEmail,
            EmailRecipients: this.props.Data.AlertEmailInfo.EmailRecipients,
            ShowPopup: this.props.Data.AlertPopupInfo.ShowPopup,
            PopupType: this.props.Data.AlertPopupInfo.PopupType
        }
    }

    render(): any {

        let optionPopupTypes = EnumExtensions.getNamesAndValues(PopupType).map((popupTypeNameAndValue: any) => {
            return <option key={popupTypeNameAndValue.value} value={popupTypeNameAndValue.value}>{popupTypeNameAndValue.name}</option>
        })


        return <Panel header="Alert Action" bsStyle="primary">
            <Form horizontal>
                <Row style={smallMarginStyle}>
                    <Col componentClass={ControlLabel} xs={4}>Send Email: </Col>
                    <Col xs={8}>
                        <Checkbox onChange={(e) => this.onSendEmailChanged(e)} checked={this.state.SendEmail}></Checkbox>
                    </Col>
                </Row>

                { /* show recipients if showing email */}
                {this.state.SendEmail &&
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={4}>Email Recipients: </Col>
                            <Col xs={8}>
                                <FormControl value={this.state.EmailRecipients} type="string" placeholder="Enter recipient names" onChange={(x) => this.onEmailRecipientsChanged(x)} />
                            </Col>
                        </Row>
                }

                <Row style={smallMarginStyle}>
                    <Col componentClass={ControlLabel} xs={4}>Show Popup: </Col>
                    <Col xs={8}>
                        <Checkbox onChange={(e) => this.onShowPopupChanged(e)} checked={this.state.ShowPopup}></Checkbox>
                    </Col>
                </Row>


                { /* select popuptype if showing popup */}
                {this.state.ShowPopup &&
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={4}>Popup Type: </Col>
                            <Col xs={8}>
                                <FormControl componentClass="select" placeholder="select" value={PopupType[this.state.PopupType]} onChange={(x) => this.onPopupTypeChanged(x)} >
                                    {optionPopupTypes}
                                </FormControl>
                            </Col>
                        </Row>
                }

            </Form>
        </Panel>
    }

    onSendEmailChanged(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.setState({ SendEmail: e.checked } as AlertActionWizardState, () => this.props.UpdateGoBackState())
    }

    private onEmailRecipientsChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ EmailRecipients: e.value } as AlertActionWizardState, () => this.props.UpdateGoBackState())
    }

    onShowPopupChanged(event: React.FormEvent) {
        const e = event.target as HTMLInputElement;
        this.setState({ ShowPopup: e.checked } as AlertActionWizardState, () => this.props.UpdateGoBackState())
    }

    private onPopupTypeChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ PopupType: Number.parseInt(e.value) } as AlertActionWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        // need recipients if there is email
        if (this.state.SendEmail && StringExtensions.IsNullOrEmpty(this.state.EmailRecipients)) {
            return false;
        }

        // must select at least one of email or popup
        if (!this.state.SendEmail && !this.state.ShowPopup) {
            return false;
        }
        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.AlertEmailInfo.SendEmail = this.state.SendEmail;
        this.props.Data.AlertEmailInfo.EmailRecipients = this.state.EmailRecipients;
        this.props.Data.AlertPopupInfo.ShowPopup = this.state.ShowPopup;
        this.props.Data.AlertPopupInfo.PopupType = this.state.PopupType;
    }
    public Back(): void { }
    public StepName = "Alert Action"
}


let smallMarginStyle = {
    margin: '5px'
}