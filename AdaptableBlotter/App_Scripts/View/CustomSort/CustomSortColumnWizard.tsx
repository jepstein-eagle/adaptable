import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import * as React from "react";
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../Core/Enums';
import { SingleListBox } from '../SingleListBox'
import { StringExtensions } from '../../Core/Extensions';


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
        let selectedColumnValues: string[] = StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId) ? [] : [this.state.SelectedColumnId];

        return <Panel header="Select a Column" bsStyle="primary">
            <SingleListBox style={divStyle}
                Values={this.props.Columns}
                UiSelectedValues={selectedColumnValues}
                DisplayMember="FriendlyName"
                ValueMember="ColumnId"
                SortMember="FriendlyName"
                onSelectedChange={(list) => this.onColumnSelectedChanged(list)}
                SelectionMode={SelectionMode.Single}>
            </SingleListBox>
        </Panel>
    }

    private onColumnSelectedChanged(selectedColumnValues: Array<any>) {
        this.setState({ SelectedColumnId: selectedColumnValues[0] }, () => this.props.UpdateGoBackState())
    }
    public canNext(): boolean { return (StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnId = this.state.SelectedColumnId }
    public Back(): void { }
    public StepName = "Choose Custom Sort Column"
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '400px',
    'marginBottom': '0'
}