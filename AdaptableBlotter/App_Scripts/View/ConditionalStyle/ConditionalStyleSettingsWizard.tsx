/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem, Checkbox } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IConditionalStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, LeafExpressionOperator, SortOrder } from '../../Core/Enums';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ColorPicker } from '../ColorPicker';
import { Helper } from '../../Core/Helper'
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'

interface ConditionalStyleSettingsWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
}

interface ConditionalStyleSettingsWizardState {
    BackColor: string,
    ForeColor: string,
}

export class ConditionalStyleSettingsWizard extends React.Component<ConditionalStyleSettingsWizardProps, ConditionalStyleSettingsWizardState> implements AdaptableWizardStep {

    constructor(props: ConditionalStyleSettingsWizardProps) {
        super(props)
        this.state = {
            BackColor: this.props.Data.Style.BackColor,
            ForeColor: this.props.Data.Style.ForeColor,
        }
    }

    render(): any {


        return <Panel header="Style Colours" bsStyle="primary">
            <AdaptableBlotterForm horizontal>

                <div>
                    <FormGroup controlId="colorBackStyle">
                        <Col xs={4} >
                            <Checkbox onChange={(x) => this.onUseBackColourCheckChange(x)}
                                checked={this.state.BackColor != undefined}>Back Colour</Checkbox>
                        </Col>
                        <Col xs={8}>
                            {this.state.BackColor != undefined &&
                                <ColorPicker value={this.state.BackColor} onChange={(x) => this.onBackColourSelectChange(x)} />
                            }
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="colorForeStyle">
                        <Col xs={3} >
                            <Checkbox onChange={(x) => this.onUseForeColourCheckChange(x)}
                                checked={this.state.ForeColor != undefined}>Fore Colour</Checkbox>
                        </Col>
                        <Col xs={9}>
                            {this.state.ForeColor != undefined &&
                                <ColorPicker value={this.state.ForeColor} onChange={(x) => this.onForeColourSelectChange(x)} />
                            }
                        </Col>
                    </FormGroup>
                </div>


            </AdaptableBlotterForm>
        </Panel>
    }

    private onUseBackColourCheckChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ BackColor: "#ffffff" } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ BackColor: undefined } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        }
    }

    private onUseForeColourCheckChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ ForeColor: "#000000" } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ForeColor: undefined } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
        }
    }


    private onBackColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ BackColor: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onForeColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ForeColor: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }



    public canNext(): boolean {
        return this.state.BackColor != undefined || this.state.ForeColor != undefined;
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.Style.BackColor = this.state.BackColor;
        this.props.Data.Style.ForeColor = this.state.ForeColor;
    }
    public Back(): void { }
    public StepName = "Conditional Style Settings"
}
