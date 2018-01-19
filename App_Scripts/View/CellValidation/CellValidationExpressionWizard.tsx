import * as React from "react";
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';

import { IColumn, IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage, ExpressionBuilderPageState } from './../ExpressionBuilder/ExpressionBuilderPage'
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { Expression } from '../../Core/Expression/Expression';
import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import { IUserFilter } from '../../Core/Interface/IExpression'
import { DistinctCriteriaPairValue } from '../../Core/Enums'

export interface CellValidationExpressionWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    ColumnList: Array<IColumn>
    UserFilters: IUserFilter[]
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    SelectedColumnId: string
}

export class CellValidationExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: CellValidationExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.OtherExpression,
            SelectedColumnId: ""
        }
    }

    public Next(): void {
        this.props2.Data.OtherExpression = this.state.Expression
    }

    public StepName = "Cell Validation: Create Query"
}