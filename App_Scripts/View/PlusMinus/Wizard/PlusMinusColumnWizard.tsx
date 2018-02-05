import { IPlusMinusCondition } from '../../../Strategy/Interface/IPlusMinusStrategy';
import * as React from "react";
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../../Core/Enums';
import { SingleListBox } from '../../SingleListBox'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { ColumnSelector } from '../../ColumnSelector';

export interface PlusMinusColumnWizardProps extends AdaptableWizardStepProps<IPlusMinusCondition> {
    Columns: Array<IColumn>
}

export interface PlusMinusColumnWizardState {
    SelectedColumnId: string
}

export class PlusMinusColumnWizard extends React.Component<PlusMinusColumnWizardProps, PlusMinusColumnWizardState> implements AdaptableWizardStep {
    constructor(props: PlusMinusColumnWizardProps) {
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
    public StepName = this.props.StepName
}