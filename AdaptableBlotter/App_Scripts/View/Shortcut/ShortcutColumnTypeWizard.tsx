import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {   ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

import {AdaptableWizardStep, AdaptableWizardStepProps} from './../Wizard/Interface/IAdaptableWizard'
import {AdaptableWizard} from './../Wizard/AdaptableWizard'
import {IColumn} from '../../Core/Interface/IAdaptableBlotter';
import {ColumnType} from '../../Core/Enums';


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

        var columnTypeList: Array<ColumnType> = [ColumnType.Number, ColumnType.Date];

        var columnTypes = columnTypeList.map((columnType: ColumnType) => {
            return <ListGroupItem key={columnType}
                onClick={() => this.onClickColum(columnType) }
                active={this.state.ColumnType == null ? false : columnType == this.state.ColumnType}>{ColumnType[columnType]}
            </ListGroupItem>
        })

        return <Panel header="Select the Type of Column for the Shortcut">
            <ListGroup style={listGroupStyle}>
                {columnTypes}
            </ListGroup>
        </Panel>
    }

    onClickColum(columnType: ColumnType) {
        this.setState({ ColumnType: columnType }, () => this.props.UpdateGoBackState())
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