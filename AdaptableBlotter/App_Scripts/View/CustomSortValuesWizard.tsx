/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, Row, Modal, MenuItem, SplitButton, ButtonGroup, Jumbotron, ListGroupItem} from 'react-bootstrap';

import {IColumn, IAdaptableBlotter} from '../Core/Interface/IAdaptableBlotter';
import {AdaptableWizardStep, AdaptableWizardStepProps} from './Wizard/Interface/IAdaptableWizard'
import {DualListBoxEditor} from './DualListBoxEditor'
import {ICustomSort} from '../Core/Interface/ICustomSortStrategy';


interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Blotter: IAdaptableBlotter
}
interface CustomSortValuesWizardState {
    ColumnValues: any[],
    SelectedValues: Array<string>
    IsEdit:boolean
}

export class CustomSortValuesWizard extends React.Component<CustomSortValuesWizardProps, CustomSortValuesWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortValuesWizardProps) {
        super(props)
        this.state = {
            ColumnValues: Array.from(new Set(this.props.Blotter.getColumnValueString(this.props.Data.ColumnId))),
            SelectedValues: this.props.Data.CustomSortItems,
            IsEdit: this.props.Data.CustomSortItems.length > 0
        }
    }
    render(): any {
        return <DualListBoxEditor AvailableValues={this.state.ColumnValues}
            SelectedValues={this.state.SelectedValues}
            HeaderAvailable="Column Values"
            HeaderSelected="Custom Sort Values"
            onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues) }></DualListBoxEditor>
    }
    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedValues: newValues } as CustomSortValuesWizardState, () =>this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.SelectedValues.length>0; }
    public canBack(): boolean { return !this.state.IsEdit; }
    public Next(): void { this.props.Data.CustomSortItems = this.state.SelectedValues }
    public Back(): void { }
    public StepName = "Select Custom Sort Values"
}