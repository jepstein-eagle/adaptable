import { IRange } from '../../Core/Interface/IRangeStrategy';
import * as React from "react";
import { ListGroup, ListGroupItem, Panel, FormControl } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { SelectionMode } from '../../Core/Enums';
import { SingleListBox } from '../SingleListBox'
import { StringExtensions } from '../../Core/Extensions';
import { ColumnSelector } from '../ColumnSelector';

export interface RangeNameWizardProps extends AdaptableWizardStepProps<IRange> {

}
export interface RangeNameWizardState {
    RangeName: string;
}

export class RangeNameWizard extends React.Component<RangeNameWizardProps, RangeNameWizardState> implements AdaptableWizardStep {
    constructor(props: RangeNameWizardProps) {
        super(props);
        this.state = { RangeName: this.props.Data.Name }
    }
    render(): any {
        return <Panel header="Enter a Name for the Range" bsStyle="primary">
            <FormControl type="text" placeholder="Enter Range Name" value={this.state.RangeName} onChange={(e) => this.onSaveLayoutNameChanged(e)} />
        </Panel>
    }

    private onSaveLayoutNameChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ RangeName: e.value } as RangeNameWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return (StringExtensions.IsNotNullOrEmpty(this.state.RangeName)); }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.Name = this.state.RangeName; }
    public Back(): void { }
    public StepName = "Choose Range Name"
}

let divStyle: React.CSSProperties = {
    'overflowY': 'auto',
    'height': '335px',
    'marginBottom': '0'
}