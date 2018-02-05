import * as React from "react";
import {  Col, Panel } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IFormatColumn } from '../../../Strategy/Interface/IFormatColumnStrategy';
import {  SelectionMode } from '../../../Core/Enums';
import { ColumnSelector } from '../../ColumnSelector';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';

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

    public Back(): void { 
        //todo
    }
    public StepName = this.props.StepName
}



let radioMarginStyle = {
    margin: '5px'
}
