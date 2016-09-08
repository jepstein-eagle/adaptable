import {ICustomSort} from '../Core/Interface/ICustomSortStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {   ListGroup, ListGroupItem} from 'react-bootstrap';

import {AdaptableWizardStep, AdaptableWizardStepProps} from './Wizard/Interface/IAdaptableWizard'
import {AdaptableWizard} from './Wizard/AdaptableWizard'
import {IColumn} from '../Core/Interface/IAdaptableBlotter';


interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>

}
interface CustomSortColumnWizardState {
    SelectedColumn: IColumn
}

export class CustomSortColumnWizard extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortColumnWizardProps) {
        super(props);
        if (this.props.Data.ColumnId != "") {
            this.state = { SelectedColumn: this.props.Columns.find(x => x.ColumnId == this.props.Data.ColumnId) }
        }
        else {
            this.state = { SelectedColumn: null }
        }
    }
    render(): any {
        var columnsItems = this.props.Columns.map((Column: IColumn) => {
            return <ListGroupItem key={Column.ColumnId}
                onClick={() => this.onClickColum(Column) }
                active={this.state.SelectedColumn == null ? false : Column.ColumnId == this.state.SelectedColumn.ColumnId}>{Column.ColumnFriendlyName}</ListGroupItem>
        })
        return <ListGroup style={listGroupStyle}>
            {columnsItems}
        </ListGroup>
    }
    onClickColum(column: IColumn) {
        this.setState({ SelectedColumn: column }, () => this.props.UpdateGoBackState())
    }
    public canNext(): boolean { return this.state.SelectedColumn != null; }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ColumnId = this.state.SelectedColumn.ColumnId }
    public Back(): void { }
    public StepName = "Pick a Column"
}
var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};