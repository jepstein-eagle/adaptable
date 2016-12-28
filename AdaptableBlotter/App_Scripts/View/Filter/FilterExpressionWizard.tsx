/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';

import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage, ExpressionBuilderPageState } from './../ExpressionBuilder/ExpressionBuilderPage'
import { INamedExpression } from '../../Core/Interface/IExpression';
import { Expression } from '../../Core/Expression/Expression';


interface FilterExpressionWizardProps extends AdaptableWizardStepProps<INamedExpression> {
    ColumnList: Array<IColumn>
    Blotter: IAdaptableBlotter
    SelectedColumnId: string
}

export class FilterExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: FilterExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: "select"
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = "Filter Create Expression"
}