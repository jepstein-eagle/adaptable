/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Form, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IUserFilterExpression } from '../../Core/Interface/IExpression';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';


interface UserFilterExpressionSettingsWizardProps extends AdaptableWizardStepProps<IUserFilterExpression> {
    Blotter: IAdaptableBlotter,
    Columns: Array<IColumn>
}
interface UserFilterExpressionSettingsWizardState {
    FilterName: string
}

export class UserFilterSettingsWizard extends React.Component<UserFilterExpressionSettingsWizardProps, UserFilterExpressionSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: UserFilterExpressionSettingsWizardProps) {
        super(props)
        this.state = {
            FilterName: this.props.Data.FriendlyName,
        }
    }
    render(): any {

        return <Panel header="Filter Settings" bsStyle="primary">
            <Form horizontal>
                <FormGroup controlId="filterName">
                    <Col xs={3} componentClass={ControlLabel}>Filter Name: </Col>
                    <Col xs={9}>
                        <FormControl value={this.state.FilterName} type="string" placeholder="Enter filter name"
                            onChange={(e: React.FormEvent) => this.onFilterNameChange(e)} />
                    </Col>
                </FormGroup>

            </Form>
        </Panel>

    }


    onFilterNameChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ FilterName: e.value } as UserFilterExpressionSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return this.state.FilterName != "";
    }


    public canBack(): boolean { return true; }

    public Next(): void {
        this.props.Data.FriendlyName = this.state.FilterName
        this.props.Data.ColumnType = ExpressionHelper.GetColumnTypeForUserFilterExpression(this.props.Data, this.props.Columns)
        this.props.Data.Description = ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns, this.props.Blotter)
    }
    public Back(): void { }
    public StepName = "Filter Settings"
}