/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { IConditionalStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { ConditionalStyleScope, ColumnType } from '../../Core/Enums';


interface ConditionalStyleSettingsWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}

interface ConditionalStyleSettingsWizardState {
    ColumnId: string,
    StyleName: string,
    ConditionalStyleScope: ConditionalStyleScope
}

export class ConditionalStyleSettingsWizard extends React.Component<ConditionalStyleSettingsWizardProps, ConditionalStyleSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            StyleName: this.props.Data.StyleName,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope,
        }
    }

    render(): any {
        let optionColumns = this.props.Columns.filter(x => x.ColumnType == ColumnType.Number).map(x => {
            return <option value={x.ColumnId} key={x.ColumnId}>{x.ColumnFriendlyName}</option>
        })

        let availableStyleOptions: string[] = ["Red", "Blue", "Green", "Yellow"];
        let availableStyleOptionValues = availableStyleOptions.map(x => {
            return <option value={x} key={x}>{x}</option>
        })

        let availableStyleScopes: Array<ConditionalStyleScope> = [ConditionalStyleScope.Row, ConditionalStyleScope.Column];

        return <Panel header="Conditional Style Settings" bsStyle="primary">
            <Form horizontal>

                <FormGroup controlId="styleName">
                    <Col xs={3} componentClass={ControlLabel}>Select Style: </Col>
                    <Col xs={9}>
                        <FormControl componentClass="select" placeholder="select" value={this.state.StyleName} onChange={(x) => this.onStyleSelectChange(x)} >
                            <option value="select" key="select">Select a style</option>
                            {availableStyleOptionValues}
                        </FormControl>
                    </Col>
                </FormGroup>

                <FormGroup controlId="whereApplied">
                    <Col xs={3} componentClass={ControlLabel}>Apply To: </Col>
                    <Col xs={9}>
                        <FormControl componentClass="select" placeholder="select" value={this.state.ConditionalStyleScope.toString()} onChange={(x) => this.onWhereAppliedSelectChange(x)} >
                            {
                                availableStyleScopes.map((conditionalStyleScope: ConditionalStyleScope) => {
                                    return <option key={ConditionalStyleScope[conditionalStyleScope]} value={conditionalStyleScope.toString()}>{ConditionalStyleScope[conditionalStyleScope]}</option>
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

    private onStyleSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ StyleName: e.value } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onWhereAppliedSelectChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ConditionalStyleScope: Number.parseInt(e.value) } as ConditionalStyleSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        if (this.state.StyleName == "select") {
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
        this.props.Data.StyleName = this.state.StyleName;
        this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
    }
    public Back(): void { }
    public StepName = "Conditional Style Settings"
}