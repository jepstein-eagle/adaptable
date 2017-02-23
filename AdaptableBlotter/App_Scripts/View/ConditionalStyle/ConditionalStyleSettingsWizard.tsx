/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IConditionalStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, ColumnType, LeafExpressionOperator, SortOrder } from '../../Core/Enums';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { UserFilterState } from '../../Redux/ActionsReducers/Interface/IState';
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
            BackColor: this.props.Data.BackColor,
            ForeColor: this.props.Data.ForeColor,
        }
    }

    render(): any {


        return <Panel header="Style Colours" bsStyle="primary">
            <AdaptableBlotterForm horizontal>

                <div>
                    <FormGroup controlId="colorBackStyle">
                        <Col xs={4} componentClass={ControlLabel}>Back Colour: </Col>
                        <Col xs={8}>
                            <ColorPicker value={this.state.BackColor} onChange={(x) => this.onBackColourSelectChange(x)} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="colorForeStyle">
                        <Col xs={4} componentClass={ControlLabel}>Fore Colour: </Col>
                        <Col xs={8}>
                            <ColorPicker value={this.state.ForeColor} onChange={(x) => this.onForeColourSelectChange(x)} />
                        </Col>
                    </FormGroup>
                </div>


            </AdaptableBlotterForm>
        </Panel>
    }


    private onBackColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ BackColor: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onForeColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ForeColor: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }



    public canNext(): boolean { return true; }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.BackColor = this.state.BackColor;
        this.props.Data.ForeColor = this.state.ForeColor;
    }
    public Back(): void { }
    public StepName = "Conditional Style Settings"
}