import * as React from "react";
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn, IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage, ExpressionBuilderPageState } from '../../ExpressionBuilder/ExpressionBuilderPage'
import { IConditionalStyleCondition } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import { Expression } from '../../../Core/Expression';
import { IUserFilter } from '../../../Core/Interface/IExpression'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { StringExtensions } from '../../../Core/Extensions';

export interface ConditionalStyleExpressionWizardProps extends AdaptableWizardStepProps<IConditionalStyleCondition> {
    ColumnList: Array<IColumn>
    UserFilters: IUserFilter[]
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}

export class ConditionalStyleExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ConditionalStyleExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: StringExtensions.IsNotNullOrEmpty(props2.Data.ColumnId) ? props2.Data.ColumnId : ""
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = this.props.StepName
}