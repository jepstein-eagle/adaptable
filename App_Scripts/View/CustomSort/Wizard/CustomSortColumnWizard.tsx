import { ICustomSort } from '../../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import { Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions';
import { ColumnSelector } from '../../ColumnSelector';

export interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>
}

export interface CustomSortColumnWizardState {
    SelectedColumnId: string
}

export class CustomSortColumnWizard extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortColumnWizardProps) {
        super(props);
        this.state = { SelectedColumnId: this.props.Data.ColumnId }
    }
    render(): any {
   return <Panel header="Select a Column" bsStyle="primary">
            <ColumnSelector SelectedColumnIds={[this.state.SelectedColumnId]}
                ColumnList={this.props.Columns}
                onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                SelectionMode={SelectionMode.Single} />
        </Panel>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {
        this.setState({ SelectedColumnId: columns.length> 0 ? columns[0].ColumnId    : "" }, () => this.props.UpdateGoBackState())
    }
    public canNext(): boolean { return (StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnId = this.state.SelectedColumnId }
    public Back(): void { }
    public StepName = "Choose Custom Sort Column"
}