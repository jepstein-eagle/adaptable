/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Button, Form, Col, Panel, ListGroup, Row, ButtonGroup, Jumbotron, ListGroupItem } from 'react-bootstrap';
import { IColumn, IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { ICustomSort } from '../../Core/Interface/ICustomSortStrategy';
import { DataType, DistinctCriteriaPairValue } from '../../Core/Enums';
import { PanelWithInfo } from '../Components/Panels/PanelWithInfo';


interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}
interface CustomSortValuesWizardState {
    ColumnValues: any[],
    SelectedValues: Array<string>
    IsEdit: boolean
}

export class CustomSortValuesWizard extends React.Component<CustomSortValuesWizardProps, CustomSortValuesWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortValuesWizardProps) {
        super(props)
        this.state = {
            ColumnValues: this.props.getColumnValueDisplayValuePairDistinctList(this.props.Data.ColumnId, DistinctCriteriaPairValue.DisplayValue),
            SelectedValues: this.props.Data.CustomSortItems,
            IsEdit: this.props.Data.CustomSortItems.length > 0
        }
        this.StepName = this.StepName + this.props.Columns.find(x => x.ColumnId == this.props.Data.ColumnId).FriendlyName
    }

    render(): any {
      
        let infoBody: any[] = ["Create a custom sort for '" +  this.props.Columns.find(x => x.ColumnId == this.props.Data.ColumnId).FriendlyName + "' column by moving items to the 'Custom Sort Order' listbox and then using the buttons on the right to order them as required.\n\n" + 
            "The new sort will consist first of the items in the custom sort order; any other values will then sort alphabetically."]

        return <PanelWithInfo header="Create Sort Order" bsStyle="primary" infoBody={infoBody}>
            <DualListBoxEditor AvailableValues={this.state.ColumnValues}
                SelectedValues={this.state.SelectedValues}
                HeaderAvailable="Column Values"
                HeaderSelected="Custom Sort Order"
                DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
                ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
                onChange={(SelectedValues) => this.OnSelectedValuesChange(SelectedValues)}></DualListBoxEditor>
        </PanelWithInfo>
    }
    OnSelectedValuesChange(newValues: Array<string>) {
        this.setState({ SelectedValues: newValues } as CustomSortValuesWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.SelectedValues.length > 0; }
    public canBack(): boolean { return !this.state.IsEdit; }
    public Next(): void { this.props.Data.CustomSortItems = this.state.SelectedValues }
    public Back(): void { }
    public StepName = "Create Sort Order for Column: "
}