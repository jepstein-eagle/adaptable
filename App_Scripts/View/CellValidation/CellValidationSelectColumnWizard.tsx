import * as React from "react";
import { Col, Panel } from 'react-bootstrap';
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import { StringExtensions } from '../../Core/Extensions';
import { SelectionMode } from '../../Core/Enums';
import { ColumnSelector } from '../ColumnSelector';

export interface CellValidationSelectColumnWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: Array<IColumn>
}
export interface CellValidationSelectColumnWizardState {
    ColumnId: string
}

export class CellValidationSelectColumnWizard extends React.Component<CellValidationSelectColumnWizardProps, CellValidationSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationSelectColumnWizardProps) {
        super(props)
        this.state = {
            ColumnId: this.props.Data.ColumnId,
        }
    }

    render(): any {

        let selectedColumnValues: string[] = StringExtensions.IsNullOrEmpty(this.state.ColumnId) ? [] : [this.state.ColumnId];

        return <Panel header="Select a Column" bsStyle="primary">
            <ColumnSelector SelectedColumnId={this.state.ColumnId}
                ColumnList={this.props.Columns}
                onColumnChange={colum => this.onColumnSelectedChanged(colum)}></ColumnSelector>
        </Panel>
    }

    private onColumnSelectedChanged(column: IColumn) {
        this.setState({ ColumnId: column ? column.ColumnId : "" } as CellValidationSelectColumnWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return (StringExtensions.IsNotNullOrEmpty(this.state.ColumnId));
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ColumnId = this.state.ColumnId;
    }

    public Back(): void { }
    public StepName = "Cell Validation Column "
}
