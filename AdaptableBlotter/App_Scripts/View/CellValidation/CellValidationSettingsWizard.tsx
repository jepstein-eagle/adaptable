/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { Radio, FormGroup, FormControl, Button, Form, Row, Col, Panel, Well, Checkbox, HelpBlock, ListGroup, ListGroupItem } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';
import { IRangeExpression } from '../../Core/Interface/IExpression';
import { ColumnType, CellValidationAction, LeafExpressionOperator } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';

interface CellValidationSettingsWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Blotter: IAdaptableBlotter
    Columns: Array<IColumn>
}
interface CellValidationSettingsWizardState {
    ColumnId: string
}

export class CellValidationSettingsWizard extends React.Component<CellValidationSettingsWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSettingsWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
        }
    }

    render(): any {

        var columnsItems = this.props.Columns.map((Column: IColumn) => {
            return <ListGroupItem key={Column.ColumnId}
                onClick={() => this.onClickColum(Column)}
                active={this.state.ColumnId == null ? false : Column.ColumnId == this.state.ColumnId}>{Column.FriendlyName}</ListGroupItem>
        })

        return <div>
            <Panel header="Cell Validation Settings" bsStyle="primary">

                    <Panel header="Select a Column" bsStyle="info" >
                    <FormGroup controlId="formColumn">
                        <Col xs={12}>
                            <ListGroup style={listGroupStyle}>
                                {columnsItems}
                            </ListGroup>
                        </Col>
                    </FormGroup>
                </Panel>

            </Panel>
        </div>
    }

    private onClickColum(column: IColumn) {
        this.setState({ ColumnId: column.ColumnId } as CellValidationSettingsWizardState, () => this.props.UpdateGoBackState())
    }


    public canNext(): boolean {
        return (this.state.ColumnId != 'select');
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
    }

    public Back(): void { }
    public StepName = "Cell Validation Column "
}

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '400px',
    'height': '400px'
};