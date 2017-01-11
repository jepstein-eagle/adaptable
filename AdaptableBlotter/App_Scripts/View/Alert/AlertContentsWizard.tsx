/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Checkbox, Button, Form, Row, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IAlert, ICellChangeRule } from '../../Core/interface/IAlertStrategy';
import { NotificationType, ColumnType, CellChangeType, PopupType } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';


interface AlertContentsWizardProps extends AdaptableWizardStepProps<IAlert> {
    Blotter: IAdaptableBlotter

}
interface AlertContentsWizardState {
    AlertHeader: string
    AlertBody: string

}

export class AlertContentsWizard extends React.Component<AlertContentsWizardProps, AlertContentsWizardState> implements AdaptableWizardStep {
    constructor(props: AlertContentsWizardProps) {
        super(props)
        this.state = {
            AlertHeader: this.props.Data.AlertHeader,
            AlertBody: this.props.Data.AlertBody
        }
    }

    render(): any {

        return <Panel header="Alert Contents" bsStyle="primary">
            <Form horizontal>
                <FormGroup controlId="header">
                    <Col componentClass={ControlLabel} xs={4}>Alert Header: </Col>
                    <Col xs={8}>
                        <FormControl value={this.state.AlertHeader} type="string" placeholder="Enter alert header" onChange={(x) => this.onAlertHeaderTextChanged(x)} />
                    </Col>
                </FormGroup>
                <FormGroup controlId="body">
                    <Col componentClass={ControlLabel} xs={4}>Alert Body: </Col>
                    <Col xs={8}>
                        <FormControl value={this.state.AlertBody} type="string" placeholder="Enter alert body" onChange={(x) => this.onAlertBodyTextChanged(x)} />
                    </Col>
                </FormGroup>

            </Form>
        </Panel>
    }

    private onAlertHeaderTextChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ AlertHeader: e.value } as AlertContentsWizardState, () => this.props.UpdateGoBackState())
    }


    private onAlertBodyTextChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ AlertBody: e.value } as AlertContentsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return StringExtensions.IsNotNullOrEmpty(this.state.AlertHeader) && StringExtensions.IsNotNullOrEmpty(this.state.AlertBody);
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.AlertHeader = this.state.AlertHeader;
        this.props.Data.AlertBody = this.state.AlertBody;
    }

    public Back(): void { }
    public StepName = "Alert Contents"
}

