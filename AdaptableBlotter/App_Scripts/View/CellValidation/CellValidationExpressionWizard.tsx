/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';

import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage, ExpressionBuilderPageState } from './../ExpressionBuilder/ExpressionBuilderPage'
import { IConditionalStyleCondition } from '../../Core/interface/IConditionalStyleStrategy';
import { Expression } from '../../Core/Expression/Expression';
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';


interface CellValidationExpressionWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    ColumnList: Array<IColumn>
    Blotter: IAdaptableBlotter
    SelectedColumnId: string
}

export class CellValidationExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: CellValidationExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.OtherExpression,
             SelectedColumnId: "select"
        }
    }

    public Next(): void {
        this.props2.Data.OtherExpression = this.state.Expression
    }
    public Back(): void { }
    public StepName = "Cell Validation Create Expression"
}