import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import { Radio, Panel, Form, ControlLabel, FormControl, Col, FormGroup } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { DataType, PopoverType, ShortcutAction } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { AdaptablePopover } from '../AdaptablePopover';


interface ShortcutSettingsWizardProps extends AdaptableWizardStepProps<IShortcut> {
    NumericKeysAvailable: Array<string>
    DateKeysAvailable: Array<string>

}
interface ShortcutSettingsWizardState {
    DataType: DataType;
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
        this.state = { DataType: this.props.Data.DataType, ShortcutKey: this.props.Data.ShortcutKey, ShortcutResult: this.props.Data.ShortcutResult == null ? "" : this.props.Data.ShortcutResult, ShortcutAction: this.props.Data.ShortcutAction }
        if (this.state.DataType == DataType.Date) {
            this.state.ShortcutAction = ShortcutAction.Replace;
        }

    }

    onClickShortcutAction(shortcutAction: ShortcutAction) {
        this.setState({ ShortcutAction: shortcutAction, ShortcutResult: this.state.ShortcutResult } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    render() {

        // sort out keys
        var keyList: Array<string>
        if (this.state.DataType == DataType.Number) {
            keyList = this.props.NumericKeysAvailable
        }
        else if (this.state.DataType == DataType.Date) {
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
        let currentKeyValue = !this.state.ShortcutKey ? "select" : this.state.ShortcutKey;

        return <Panel header="Shortcut Settings" bsStyle="primary">
            <AdaptableBlotterForm horizontal>
                <FormGroup controlId="formInlineColumnType">
                    <Col xs={3}>
                        <ControlLabel>Column Type:</ControlLabel>
                    </Col>
                    <Col xs={9}>
                        <AdaptableBlotterForm inline >
                            <Radio inline value="Number" checked={this.state.DataType == DataType.Number} onChange={(e) => this.onColumTypeChanged(e)}>Number</Radio>
                            <Radio inline value="Date" checked={this.state.DataType == DataType.Date} onChange={(e) => this.onColumTypeChanged(e)}>Date</Radio>
                        </AdaptableBlotterForm  >
                    </Col>
                </FormGroup>

                <FormGroup controlId="formInlineKey">
                    <Col xs={3}>
                        <ControlLabel>Key:</ControlLabel>
                    </Col>
                    <Col xs={9}>
                        <AdaptableBlotterForm inline >
                            <FormControl componentClass="select" placeholder="select" value={currentKeyValue} onChange={(x) => this.onShortcutKeyChanged(x)} >
                                <option value="select" key="select">Select key</option>
                                {optionKeys}
                            </FormControl>
                            {' '}<AdaptablePopover headerText={"Shortcut: Key"} bodyText={["The keyboard key that triggers the shortcut when pressed."]} popoverType={PopoverType.Info} />
                        </AdaptableBlotterForm>
                    </Col>
                </FormGroup>

                {this.state.DataType == DataType.Number ?
                    <span>
                        <FormGroup controlId="formInlineAction">
                            <Col xs={3}>
                                <ControlLabel>Action:</ControlLabel>
                            </Col>
                            <Col xs={9}>
                                <AdaptableBlotterForm inline >
                                    <FormControl componentClass="select" placeholder="select" value={currentActionValue} onChange={(x) => this.onShortcutActionChanged(x)} >
                                        {optionActions}
                                    </FormControl>
                                    {' '}<AdaptablePopover headerText={"Shortcut: Action"} 
                                    bodyText={["Determines how cell contents change when a shortcut is triggered.", <br/>,<i>Replace</i>, " replaces the entire cell contents with the Shortcut Result", <br/>, "All other actions update the cell value."]} popoverType={PopoverType.Info} />
                                </AdaptableBlotterForm>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formInlineNumberResult">
                            <Col xs={3}>
                                <ControlLabel>Result:</ControlLabel>
                            </Col>
                            <Col xs={9}>
                                <AdaptableBlotterForm inline >
                                    <FormControl
                                        type="number"
                                        placeholder="Enter Number"
                                        onChange={this.changeContent}
                                        value={this.state.ShortcutResult}
                                    />
                                    {' '}<AdaptablePopover headerText={"Shortcut: Result"} bodyText={["Used to calculate cell's new contents when a shortcut is triggered. If Action is ", <i>Replace</i>, " it becomes the new value; for other Actions it is used in conjunction with cell's initial value."]} popoverType={PopoverType.Info} />
                                </AdaptableBlotterForm>
                            </Col>
                        </FormGroup>
                    </span>
                    :
                    <FormGroup controlId="formInlineDateResult">
                        <Col xs={3}>
                            <ControlLabel>Result:</ControlLabel>
                        </Col>
                        <Col xs={9}>
                            <AdaptableBlotterForm inline >
                                <FormControl
                                    type="date"
                                    placeholder="Shortcut Result"
                                    onChange={this.changeContent}
                                    value={this.state.ShortcutResult}
                                />
                                {' '}<AdaptablePopover headerText={"Shortcut: Result"} bodyText={["The date that becomes the cell's new value when the shortcut is triggered."]} popoverType={PopoverType.Info} />
                            </AdaptableBlotterForm>
                        </Col>
                    </FormGroup>
                }
            </AdaptableBlotterForm >
        </Panel>
    }

    private onColumTypeChanged(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Number") {
            this.setState({ DataType: DataType.Number, ShortcutKey: "select" } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
        } else {
            this.setState({ DataType: DataType.Date, ShortcutKey: "select", ShortcutAction: ShortcutAction.Replace } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
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
        return this.state.DataType != null &&
            StringExtensions.IsNotNullOrEmpty(this.state.ShortcutResult) &&
            StringExtensions.IsNotNullOrEmpty(this.state.ShortcutKey) &&
            this.state.ShortcutKey != "select"
    }
    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.DataType = this.state.DataType;
        this.props.Data.ShortcutResult = this.state.ShortcutResult;
        this.props.Data.ShortcutAction = this.state.ShortcutAction;
        this.props.Data.ShortcutKey = this.state.ShortcutKey;
    }
    public Back(): void { }
    public StepName = "Create Shortcut"
}


