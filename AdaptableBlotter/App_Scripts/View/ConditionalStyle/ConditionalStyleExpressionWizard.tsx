/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';

import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage,ExpressionBuilderPageState } from './../ExpressionBuilder/ExpressionBuilderPage'
import { IConditionalStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { Expression } from '../../Core/Expression/Expression';


interface ConditionalStyleExpressionWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    ColumnList: Array<IColumn>
    Blotter: IAdaptableBlotter
}

export class ConditionalStyleExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ConditionalStyleExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression : props2.Data.Expression,
            SelectedColumnId : "select"
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = "Conditional Style Create Expression"
}