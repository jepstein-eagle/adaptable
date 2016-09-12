import {IShortcut} from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import {   ListGroup, ListGroupItem, Panel, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import {AdaptableWizardStep, AdaptableWizardStepProps} from './../Wizard/Interface/IAdaptableWizard'
import {AdaptableWizard} from './../Wizard/AdaptableWizard'
import {IColumn} from '../../Core/Interface/IAdaptableBlotter';
import {ColumnType} from '../../Core/Enums';
import {ShortcutAction} from '../../Core/Enums';

interface ShortcutResultWizardProps extends AdaptableWizardStepProps<IShortcut> {
    Shortcuts: Array<IShortcut>
}
interface ShortcutResultWizardState {
    ShortcutResult: any;
    ShortcutAction: ShortcutAction
}

export class ShortcutResultWizard extends React.Component<ShortcutResultWizardProps, ShortcutResultWizardState> implements AdaptableWizardStep {

    changeContent = (e: any) => {
        this.setState({ ShortcutResult: e.target.value } as ShortcutResultWizardState, () => this.props.UpdateGoBackState())
    }

    constructor(props: ShortcutResultWizardProps) {
        super(props);
        if (this.props.Data.ColumnType == ColumnType.Date) {
               this.props.Data.ShortcutAction = ShortcutAction.Replace;
        }
        this.state = { ShortcutResult: this.props.Data.ShortcutResult, ShortcutAction: this.props.Data.ShortcutAction }
    }

    onClickShortcutAction(shortcutAction: ShortcutAction) {
        this.setState({ ShortcutAction: shortcutAction, ShortcutResult: this.state.ShortcutResult } as ShortcutResultWizardState, () => this.props.UpdateGoBackState())
    }

    render(): any {
        var shortcutActionList: Array<ShortcutAction> = [ShortcutAction.Add, ShortcutAction.Subtract, ShortcutAction.Multiply, ShortcutAction.Divide, ShortcutAction.Replace];

        var shortcutActions = shortcutActionList.map((shortcutAction: ShortcutAction) => {
            return <ListGroupItem key={shortcutAction}
                onClick={() => this.onClickShortcutAction(shortcutAction) }
                active={this.state.ShortcutAction == null ? false : shortcutAction == this.state.ShortcutAction}>{ShortcutAction[shortcutAction]}</ListGroupItem>
        })

        return <div>
            {this.props.Data.ColumnType == ColumnType.Number ?
                <div>
                    <Panel header="Select a Shortcut Action">
                        <ListGroup style={listGroupStyle}  >
                            {shortcutActions}
                        </ListGroup>
                    </Panel>

                    <Panel header="Enter Shortcut Number Result">
                        <FormControl
                            type="number"
                            placeholder="Shortcut Result"
                            onChange={this.changeContent}
                            value={this.state.ShortcutResult}
                            />
                    </Panel>
                </div>
                :
                <Panel header="Enter Shortcut Date Result">Going to have a date thing here </Panel>
            }
        </div>
    }

    public canNext(): boolean {
        return this.state.ShortcutResult != null
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ShortcutResult = this.state.ShortcutResult;
        this.props.Data.ShortcutAction = this.state.ShortcutAction
    }
    public Back(): void { }
    public StepName = "Shortcut Result"
}
var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '300px',
    'height': '220px'
};