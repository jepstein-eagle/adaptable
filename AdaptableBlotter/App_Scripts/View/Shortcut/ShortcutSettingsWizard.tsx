import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { ListGroup, Radio, ListGroupItem, Panel, Form, FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { ColumnType } from '../../Core/Enums';
import { ShortcutAction } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';


interface ShortcutSettingsWizardProps extends AdaptableWizardStepProps<IShortcut> {
    NumericKeysAvailable: Array<string>
    DateKeysAvailable: Array<string>

}
interface ShortcutSettingsWizardState {
    ColumnType: ColumnType;
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutAction: ShortcutAction
}

export class ShortcutSettingsWizard extends React.Component<ShortcutSettingsWizardProps, ShortcutSettingsWizardState> implements AdaptableWizardStep {

    changeContent = (e: any) => {
        this.setState({ ShortcutResult: e.target.value } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    constructor(props: ShortcutSettingsWizardProps) {
        super(props);
        this.state = { ColumnType: this.props.Data.ColumnType, ShortcutKey: this.props.Data.ShortcutKey, ShortcutResult: this.props.Data.ShortcutResult == null ? "" : this.props.Data.ShortcutResult, ShortcutAction: this.props.Data.ShortcutAction }
        if (this.state.ColumnType == ColumnType.Date) {
            this.state.ShortcutAction = ShortcutAction.Replace;
        }

    }

    onClickShortcutAction(shortcutAction: ShortcutAction) {
        this.setState({ ShortcutAction: shortcutAction, ShortcutResult: this.state.ShortcutResult } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    render() {

        // sort out keys
        var keyList: Array<string>
        if (this.state.ColumnType == ColumnType.Number) {
            keyList = this.props.NumericKeysAvailable
        }
        else if (this.state.ColumnType == ColumnType.Date) {
            keyList = this.props.DateKeysAvailable
        }

        let optionKeys = keyList.map(x => {
            return <option value={x} key={x}>{x}</option>
        })

        // sort out actions
        let optionActions = EnumExtensions.getNamesAndValues(ShortcutAction).map((enumNameAndValue: any) => {
            return <option key={enumNameAndValue.value} value={enumNameAndValue.value}>{enumNameAndValue.name}</option>
        })

        let currentActionValue = this.state.ShortcutAction.toString();


        return <div>
            <Panel header="Shortcut Settings" bsStyle="primary">

                <Panel header="Shortcut Column Type" bsStyle="info">
                    <Form inline >
                        <Col xs={4}>
                            <Radio value="Number" checked={this.state.ColumnType == ColumnType.Number} onChange={(e) => this.onColumTypeChanged(e)}> Number </Radio>
                        </Col>
                        <Col xs={8}>
                            <Radio value="Date" checked={this.state.ColumnType == ColumnType.Date} onChange={(e) => this.onColumTypeChanged(e)}> Date </Radio>
                        </Col>
                    </Form>
                </Panel>


                <Panel header="Shortcut Key" bsStyle="info">
                    <FormControl componentClass="select" placeholder="select" value={this.state.ShortcutKey} onChange={(x) => this.onShortcutKeyChanged(x)} >
                        <option value="select" key="select">Select a key</option>
                        {optionKeys}
                    </FormControl>
                </Panel>

                {this.state.ColumnType == ColumnType.Number ?
                    <div>
                        <Panel header="Shortcut Action" bsStyle="info">
                            <FormControl componentClass="select" placeholder="select" value={currentActionValue} onChange={(x) => this.onShortcutActionChanged(x)} >
                                {optionActions}
                            </FormControl>
                        </Panel>

                        <Panel header="Shortcut Number Result" bsStyle="info">
                            <FormControl
                                type="number"
                                placeholder="Shortcut Result"
                                onChange={this.changeContent}
                                value={this.state.ShortcutResult}
                                />
                        </Panel>
                    </div>
                    :
                    <Panel header="Shortcut Date Result" bsStyle="info">
                        <FormControl
                            type="date"
                            placeholder="Shortcut Result"
                            onChange={this.changeContent}
                            value={this.state.ShortcutResult}
                            />
                    </Panel>
                }
            </Panel>
        </div>
    }

    private onColumTypeChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Number") {
            this.setState({ ColumnType: ColumnType.Number, ShortcutKey: "select" } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ ColumnType: ColumnType.Date, ShortcutKey: "select", ShortcutAction: ShortcutAction.Replace } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
        }
    }

    private onShortcutKeyChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShortcutKey: e.value } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }


    private onShortcutActionChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShortcutAction: Number.parseInt(e.value) } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return this.state.ColumnType != null &&
            StringExtensions.IsNotNullOrEmpty(this.state.ShortcutResult) &&
            StringExtensions.IsNotNullOrEmpty(this.state.ShortcutKey) &&
            this.state.ShortcutKey != "select"
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ColumnType = this.state.ColumnType;
        this.props.Data.ShortcutResult = this.state.ShortcutResult;
        this.props.Data.ShortcutAction = this.state.ShortcutAction;
        this.props.Data.ShortcutKey = this.state.ShortcutKey;
    }
    public Back(): void { }
    public StepName = "Create Shortcut"
}


