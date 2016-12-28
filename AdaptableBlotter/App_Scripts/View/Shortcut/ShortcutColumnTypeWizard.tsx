import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { ListGroup, ListGroupItem, Panel, Radio } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ColumnType } from '../../Core/Enums';


interface ShortcutColumnTypeWizardProps extends AdaptableWizardStepProps<IShortcut> {
}

interface ShortcutColumnTypeWizardState {
    ColumnType: ColumnType
}

export class ShortcutColumnTypeWizard extends React.Component<ShortcutColumnTypeWizardProps, ShortcutColumnTypeWizardState> implements AdaptableWizardStep {
    constructor(props: ShortcutColumnTypeWizardProps) {
        super(props);
        this.state = { ColumnType: this.props.Data.ColumnType }
    }
    render(): any {

        return <Panel header="Select the Type of Column for the Shortcut" bsStyle="primary">
            <Radio style={divStyle} value="Number" checked={this.state.ColumnType == ColumnType.Number} onChange={(e) => this.onColumTypeChanged(e)}>Number</Radio>
            <Radio style={divStyle} value="Date" checked={this.state.ColumnType == ColumnType.Date} onChange={(e) => this.onColumTypeChanged(e)}>Date</Radio>
        </Panel>
    }

    private onColumTypeChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Number") {
            this.setState({ ColumnType: ColumnType.Number }, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ColumnType: ColumnType.Date }, () => this.props.UpdateGoBackState())
        }
    }

    public canNext(): boolean { return this.state.ColumnType != null; }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnType = this.state.ColumnType }
    public Back(): void { }
    public StepName = "Column Type"
}

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};

let divStyle = {
    margin: '15px'
}