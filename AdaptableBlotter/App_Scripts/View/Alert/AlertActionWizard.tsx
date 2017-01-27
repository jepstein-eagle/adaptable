/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Checkbox, Button, Form, Row, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IAlert, } from '../../Core/interface/IAlertStrategy';
import { ICellChangeRule } from '../../Core/Interface/ICellValidationStrategy';
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
            SendEmail: this.props.Data.AlertCommunicationInfo.SendEmail,
            EmailRecipients: this.props.Data.AlertCommunicationInfo.EmailRecipients,
            ShowPopup: this.props.Data.AlertCommunicationInfo.ShowPopup,
            PopupType: this.props.Data.AlertCommunicationInfo.PopupType
        }
    }

    render(): any {

        let optionPopupTypes = EnumExtensions.getNamesAndValues(PopupType).map((enumNameAndValue: any) => {
            return <option key={enumNameAndValue.value} value={enumNameAndValue.value}>{StringExtensions.PlaceSpaceBetweenCapitalisedWords(enumNameAndValue.name)}</option>
        })
        let selectedPopup = this.state.PopupType.toString();

        return <Panel header="Alert Action" bsStyle="primary">
            <Form horizontal>

                <FormGroup controlId="email">
                    <Col componentClass={ControlLabel} xs={4}>Send Email: </Col>
                    <Col xs={8}>
                        <Checkbox onChange={(e) => this.onSendEmailChanged(e)} checked={this.state.SendEmail}></Checkbox>
                    </Col>
                </FormGroup>

                { /* show recipients if showing email */}
                {this.state.SendEmail &&
                    <FormGroup controlId="recipients">
                        <Col componentClass={ControlLabel} xs={4}>Email Recipients: </Col>
                        <Col xs={8}>
                            <FormControl value={this.state.EmailRecipients} type="string" placeholder="Enter recipient names" onChange={(x) => this.onEmailRecipientsChanged(x)} />
                        </Col>
                    </FormGroup>
                }

                <FormGroup controlId="popup">
                    <Col componentClass={ControlLabel} xs={4}>Show Popup: </Col>
                    <Col xs={8}>
                        <Checkbox onChange={(e) => this.onShowPopupChanged(e)} checked={this.state.ShowPopup}></Checkbox>
                    </Col>
                </FormGroup>

                { /* select popuptype if showing popup */}
                {this.state.ShowPopup &&
                    <FormGroup controlId="popuptype">
                        <Col componentClass={ControlLabel} xs={4}>Popup Type: </Col>
                        <Col xs={8}>
                            <FormControl componentClass="select" placeholder="select" value={selectedPopup} onChange={(x) => this.onPopupTypeChanged(x)} >
                                {optionPopupTypes}
                            </FormControl>
                        </Col>
                    </FormGroup>
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
        this.props.Data.AlertCommunicationInfo.SendEmail = this.state.SendEmail;
        this.props.Data.AlertCommunicationInfo.EmailRecipients = this.state.EmailRecipients;
        this.props.Data.AlertCommunicationInfo.ShowPopup = this.state.ShowPopup;
        this.props.Data.AlertCommunicationInfo.PopupType = this.state.PopupType;
    }
    public Back(): void { }
    public StepName = "Alert Action"
}
