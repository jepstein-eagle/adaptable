/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Checkbox, Button, Form, Row, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { IAlert, ICellChangeRule } from '../../Core/interface/IAlertStrategy';
import { NotificationType, ColumnType, CellChangeType, PopupType } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';


interface AlertBodyWizardProps extends AdaptableWizardStepProps<IAlert> {
    Blotter: IAdaptableBlotter

}
interface AlertBodyWizardState {
    AlertHeader: string
    AlertBody: string

}

export class AlertBodyWizard extends React.Component<AlertBodyWizardProps, AlertBodyWizardState> implements AdaptableWizardStep {
    constructor(props: AlertBodyWizardProps) {
        super(props)
        this.state = {
            AlertHeader: this.props.Data.AlertHeader,
            AlertBody: this.props.Data.AlertBody
        }
    }

    render(): any {

        return <Panel header="Alert Text" bsStyle="primary">
            <Form horizontal>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={4}>Alert Header: </Col>
                            <Col xs={8}>
                                <FormControl value={this.state.AlertHeader} type="string" placeholder="Enter alert text" onChange={(x) => this.onAlertHeaderTextChanged(x)} />
                            </Col>
                        </Row>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={4}>Alert Body: </Col>
                            <Col xs={8}>
                                <FormControl value={this.state.AlertBody} type="string" placeholder="Enter alert text" onChange={(x) => this.onAlertBodyTextChanged(x)} />
                            </Col>
                        </Row>
              
            </Form>
        </Panel>
    }

    private onAlertHeaderTextChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ AlertHeader: e.value } as AlertBodyWizardState, () => this.props.UpdateGoBackState())
    }


    private onAlertBodyTextChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ AlertBody: e.value } as AlertBodyWizardState, () => this.props.UpdateGoBackState())
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
    public StepName = "Alert Text"
}


let smallMarginStyle = {
    margin: '5px'
}