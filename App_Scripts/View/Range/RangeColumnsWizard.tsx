import { IRange } from '../../Core/Interface/IRangeStrategy';
import * as React from "react";
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../Core/Enums';
import { SingleListBox } from '../SingleListBox'
import { StringExtensions } from '../../Core/Extensions';
import { ColumnSelector } from '../ColumnSelector';

export interface RangeColumnsWizardProps extends AdaptableWizardStepProps<IRange> {
    Columns: Array<IColumn>

}
export interface RangeColumnsWizardState {
 
    SelectedColumnValues: string[];
}

export class RangeColumnsWizard extends React.Component<RangeColumnsWizardProps, RangeColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: RangeColumnsWizardProps) {
        super(props);
        this.state = { 
            SelectedColumnValues: this.props.Data.Columns.map(c=>
                this.props.Columns.find(col => col.ColumnId == c).FriendlyName
            )
        }
    }
    render(): any {
        return <Panel header="Select Columns for the Range" bsStyle="primary">
            <SingleListBox style={divStyle} Values={this.props.Columns.map(c=>c.FriendlyName)}
                UiSelectedValues={this.state.SelectedColumnValues}
                onSelectedChange={(list) => this.onSelectedColumnsChanged(list)}
                SelectionMode={SelectionMode.Multi}>
            </SingleListBox>
        </Panel>
    }

    onSelectedColumnsChanged(selectedColumnValues: Array<string>) {
          this.setState({ SelectedColumnValues: selectedColumnValues } as RangeColumnsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { 
        return     this.state.SelectedColumnValues.length > 0;    
        //(StringExtensions.IsNotNullOrEmpty(this.state.FriendlyName)); 
    }
    public canBack(): boolean { return true; }
    public Next(): void { 
    this.props.Data.Columns = this.state.SelectedColumnValues.map(c=>
        this.props.Columns.find(col => col.FriendlyName == c).ColumnId    )
    }
    public Back(): void { }
    public StepName = "Choose Range Columns"
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '335px',
    'marginBottom': '0'
}