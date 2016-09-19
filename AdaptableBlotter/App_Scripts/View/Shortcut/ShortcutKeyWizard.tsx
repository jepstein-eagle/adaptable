import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {   ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

import {AdaptableWizardStep, AdaptableWizardStepProps} from './../Wizard/Interface/IAdaptableWizard'
import {AdaptableWizard} from './../Wizard/AdaptableWizard'
import {IColumn} from '../../Core/Interface/IAdaptableBlotter';
import {ColumnType} from '../../Core/Enums';


interface ShortcutKeyWizardProps extends AdaptableWizardStepProps<IShortcut> {
    NumericKeysAvailable: Array<string>
    DateKeysAvailable: Array<string>
}
interface ShortcutKeyWizardState {
    ShortcutKey: string;
}

export class ShortcutKeyWizard extends React.Component<ShortcutKeyWizardProps, ShortcutKeyWizardState> implements AdaptableWizardStep {
    constructor(props: ShortcutKeyWizardProps) {
        super(props);
        this.state = { ShortcutKey: this.props.Data.ShortcutKey }
    }
    render(): any {

        var keyList: Array<string>
        if (this.props.Data.ColumnType == ColumnType.Number) {
            keyList = this.props.NumericKeysAvailable
        }
        else if (this.props.Data.ColumnType == ColumnType.Date) {
            keyList = this.props.DateKeysAvailable
        }

        var keys = keyList.map((key: string) => {
            return <ListGroupItem key={key}
                onClick={() => this.onClickColum(key) }
                active={this.state.ShortcutKey == null ? false : key == this.state.ShortcutKey}>{key}</ListGroupItem>
        })

        return <Panel header="Select a Key for the Shortcut">
            <ListGroup style={listGroupStyle}>
                {keys}
            </ListGroup>
        </Panel>
    }

    onClickColum(key: string) {
        this.setState({ ShortcutKey: key }, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.ShortcutKey != null }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ShortcutKey = this.state.ShortcutKey; }
    public Back(): void { }
    public StepName = "Shortcut Key"
}
var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};