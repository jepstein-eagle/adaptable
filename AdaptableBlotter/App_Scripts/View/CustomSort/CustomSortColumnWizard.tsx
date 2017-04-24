import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import * as React from "react";
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../Core/Enums';
import { SingleListBox } from '../SingleListBox'
import { StringExtensions } from '../../Core/Extensions';
import { ColumnSelector } from '../ColumnSelector';

interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>

}
interface CustomSortColumnWizardState {
    SelectedColumnId: string
}

export class CustomSortColumnWizard extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortColumnWizardProps) {
        super(props);
        this.state = { SelectedColumnId: this.props.Data.ColumnId }
    }
    render(): any {
        return <Panel header="Select a Column" bsStyle="primary">
            <ColumnSelector SelectedColumnId={this.state.SelectedColumnId}
                ColumnList={this.props.Columns}
                onColumnChange={colum => this.onColumnSelectedChanged(colum)}></ColumnSelector>
        </Panel>
    }

    private onColumnSelectedChanged(column: IColumn) {
        this.setState({ SelectedColumnId: column ? column.ColumnId : "" }, () => this.props.UpdateGoBackState())
    }
    public canNext(): boolean { return (StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnId = this.state.SelectedColumnId }
    public Back(): void { }
    public StepName = "Choose Custom Sort Column"
}