import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {   ListGroup, ListGroupItem, Panel} from 'react-bootstrap';

import {AdaptableWizardStep, AdaptableWizardStepProps} from './../Wizard/Interface/IAdaptableWizard'
import {AdaptableWizard} from './../Wizard/AdaptableWizard'
import {IColumn} from '../../Core/Interface/IAdaptableBlotter';
import {ColumnType} from '../../Core/Enums';


interface ShortcutKeyWizardProps extends AdaptableWizardStepProps<IShortcut> {
    Shortcuts: Array<IShortcut>

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
        // prevent any keys from appearing in the list which are already taken...
        // (this is causing a bug for Edit as it leaves out the current key!)
        var keyList: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        for (var shortcut of this.props.Shortcuts) {
            if (shortcut.ColumnType == this.props.Data.ColumnType) {
                var index = keyList.indexOf(shortcut.ShortcutKey, 0);
                if (index > -1) {
                    keyList.splice(index, 1);
                }
            }
        }

        var keys = keyList.map((key: string) => {
            return <ListGroupItem key={key}
                onClick={() => this.onClickColum(key) }
                active={this.state.ShortcutKey == null ? false : key == this.state.ShortcutKey}>{key}</ListGroupItem>
        })

        return <ListGroup style={listGroupStyle}>
            {keys}
        </ListGroup>
    }

    onClickColum(key: string) {
        this.setState({ ShortcutKey: key }, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean { return this.state.ShortcutKey != null }
    public canBack(): boolean { return true; }
    public Next(): void { this.props.Data.ShortcutKey = this.state.ShortcutKey; }
    public Back(): void { }
    public StepName = "Choose the Shortcut Key"
}
var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '300px'
};