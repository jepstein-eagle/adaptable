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
    AlertText: string

}

export class AlertBodyWizard extends React.Component<AlertBodyWizardProps, AlertBodyWizardState> implements AdaptableWizardStep {
    constructor(props: AlertBodyWizardProps) {
        super(props)
        this.state = {
            AlertText: this.props.Data.AlertText
        }
    }

    render(): any {

        return <Panel header="Alert Text" bsStyle="primary">
            <Form horizontal>
                        <Row style={smallMarginStyle}>
                            <Col componentClass={ControlLabel} xs={4}>Alert Body: </Col>
                            <Col xs={8}>
                                <FormControl value={this.state.AlertText} type="string" placeholder="Enter alert text" onChange={(x) => this.onAlertTextChanged(x)} />
                            </Col>
                        </Row>
              
            </Form>
        </Panel>
    }

    private onAlertTextChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ AlertText: e.value } as AlertBodyWizardState, () => this.props.UpdateGoBackState())
    }

  
    public canNext(): boolean {
       return StringExtensions.IsNotNullOrEmpty(this.state.AlertText);
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.AlertText = this.state.AlertText;
    }
  
    public Back(): void { }
    public StepName = "Alert Text"
}


let smallMarginStyle = {
    margin: '5px'
}