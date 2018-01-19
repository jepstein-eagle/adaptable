import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IFormatColumn } from '../../Core/Interface/IFormatColumnStrategy';
import { LeafExpressionOperator, SortOrder, SelectionMode, PopoverType } from '../../Core/Enums';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ColorPicker } from '../ColorPicker';
import { Helper } from '../../Core/Helper'
import { ColumnSelector } from '../ColumnSelector';
import { StringExtensions } from '../../Core/Extensions';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { AdaptablePopover } from '../AdaptablePopover';

export interface FormatColumnColumnWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
    Columns: Array<IColumn>
}

export interface FormatColumnColumnWizardState {
    ColumnId: string
}

export class FormatColumnColumnWizard extends React.Component<FormatColumnColumnWizardProps, FormatColumnColumnWizardState> implements AdaptableWizardStep {

    constructor(props: FormatColumnColumnWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId
        }
    }

    render(): any {

        return <Panel header="Choose a column to format" bsStyle="primary">

            <Col xs={12} style={radioMarginStyle}>
                <ColumnSelector SelectedColumnIds={[this.state.ColumnId]}
                    ColumnList={this.props.Columns}
                    onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                    SelectionMode={SelectionMode.Single} />
            </Col>
        </Panel>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" } as FormatColumnColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.ColumnId));
    }

    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
    }

    public Back(): void { }
    public StepName = "Select Format Column"
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '300px',
    'marginBottom': '0',
    'marginLeft': '0px'
}


let radioMarginStyle = {
    margin: '5px'
}


let noMarginStyle = {
    margin: '0px'
}

let helpButtonStyle = {
    'marginLeft': '3px'
}