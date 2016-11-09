/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { IConditionalStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, ColumnType, ConditionalStyleColour } from '../../Core/Enums';
import { Helper, EnumEx } from '../../Core/Helper';


interface ConditionalStyleSettingsWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}

interface ConditionalStyleSettingsWizardState {
    ColumnId: string,
    ConditionalStyleColour: ConditionalStyleColour,
    ConditionalStyleScope: ConditionalStyleScope
}

export class ConditionalStyleSettingsWizard extends React.Component<ConditionalStyleSettingsWizardProps, ConditionalStyleSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            ConditionalStyleColour: this.props.Data.ConditionalStyleColour,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope,
        }
    }


    render(): any {

        let optionColumns = this.props.Columns.map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
        })

        return <Panel header="Conditional Style Settings" bsStyle="primary">
            <Form horizontal>

                <FormGroup controlId="styleName">
                    <Col xs={3} componentClass={ControlLabel}>Select Back Colour: </Col>
                    <Col xs={9}>
                        <FormControl componentClass="select" placeholder="select" value={this.state.ConditionalStyleColour.toString()} onChange={(x) => this.onColourSelectChange(x)} >
                            {
                                EnumEx.getNamesAndValues(ConditionalStyleColour).map((conditionalStyleColourNameAndValue: any) => {
                                    return <option key={conditionalStyleColourNameAndValue.value} value={conditionalStyleColourNameAndValue.value}>{conditionalStyleColourNameAndValue.name}</option>
                                })
                            }
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="whereApplied">
                    <Col xs={3} componentClass={ControlLabel}>Apply To: </Col>
                    <Col xs={9}>
                        <FormControl componentClass="select" placeholder="select" value={this.state.ConditionalStyleScope.toString()} onChange={(x) => this.onWhereAppliedSelectChange(x)} >
                            {
                                EnumEx.getNamesAndValues(ConditionalStyleScope).map((conditionalStyleScopeNameAndValue: any) => {
                                    return <option key={conditionalStyleScopeNameAndValue.value} value={conditionalStyleScopeNameAndValue.value}>{conditionalStyleScopeNameAndValue.name}</option>
                                })
                            })
                            }
                        </FormControl>
                    </Col>
                </FormGroup>

                {this.state.ConditionalStyleScope == ConditionalStyleScope.Column ?

                    <FormGroup controlId="formColumn">
                        <Col componentClass={ControlLabel} xs={3}>Select Column: </Col>
                        <Col xs={9}>
                            <FormControl componentClass="select" placeholder="select" value={this.state.ColumnId} onChange={(x) => this.onColumnSelectChange(x)} >
                                <option value="select" key="select">Select a column</option>
                                {optionColumns}
                            </FormControl>
                        </Col>
                    </FormGroup>
                    : null}


            </Form>
        </Panel>
    }



    private onColumnSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ColumnId: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onColourSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ConditionalStyleColour: Number.parseInt(e.value) } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onWhereAppliedSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ConditionalStyleScope: Number.parseInt(e.value) } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        if (this.state.ConditionalStyleColour == ConditionalStyleColour.None) {
            return false;
        }
        if (this.state.ConditionalStyleScope == null) {
            return false;
        }
        if (this.state.ConditionalStyleScope == ConditionalStyleScope.Column && this.state.ColumnId == "select") {
            return false;
        }
        return true;
    }

    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.ConditionalStyleColour = this.state.ConditionalStyleColour;
        this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
    }
    public Back(): void { }
    public StepName = "Conditional Style Settings"
}