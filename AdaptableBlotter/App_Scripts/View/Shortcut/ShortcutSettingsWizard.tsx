import { IShortcut } from '../../Core/Interface/IShortcutStrategy';
import * as React from "react";
import { Radio, Panel, Form, ControlLabel, FormControl, Col, FormGroup, Checkbox } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { AdaptableWizard } from './../Wizard/AdaptableWizard'
import { IColumn } from '../../Core/Interface/IAdaptableBlotter';
import { DataType, PopoverType, ShortcutAction } from '../../Core/Enums';
import { StringExtensions, EnumExtensions } from '../../Core/Extensions';
import { AdaptableBlotterForm } from '../AdaptableBlotterForm'
import { AdaptablePopover } from '../AdaptablePopover';
import * as CalendarStrat from '../../Core/Interface/ICalendarStrategy';


interface ShortcutSettingsWizardProps extends AdaptableWizardStepProps<IShortcut> {
    NumericKeysAvailable: Array<string>
    DateKeysAvailable: Array<string>

}
interface ShortcutSettingsWizardState {
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutAction: ShortcutAction;
    IsDynamic: boolean
}

export class ShortcutSettingsWizard extends React.Component<ShortcutSettingsWizardProps, ShortcutSettingsWizardState> implements AdaptableWizardStep {

    changeContent = (e: any) => {
        this.setState({ ShortcutResult: e.target.value } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    constructor(props: ShortcutSettingsWizardProps) {
        super(props);

        this.state = {
            ShortcutKey: this.props.Data.ShortcutKey,
            ShortcutResult: this.props.Data.ShortcutResult == null ? "" : this.props.Data.ShortcutResult,
            ShortcutAction: this.props.Data.ShortcutAction,
            IsDynamic: this.props.Data.IsDynamic
        }
     }

    onClickShortcutAction(shortcutAction: ShortcutAction) {
        this.setState({ ShortcutAction: shortcutAction, ShortcutResult: this.state.ShortcutResult } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    render() {

        // sort out keys
        var keyList: Array<string>
        if (this.props.Data.DataType == DataType.Number) {
            keyList = this.props.NumericKeysAvailable
        }
        else if (this.props.Data.DataType == DataType.Date) {
            keyList = this.props.DateKeysAvailable
        }

        let optionKeys = keyList.map(x => {
            return <option value={x} key={x}>{x}</option>
        })

        // sort out actions
        let optionActions = EnumExtensions.getNamesAndValues(ShortcutAction).filter
            (nv => nv.value != ShortcutAction.Replace).map((enumNameAndValue: any) => {
                return <option key={enumNameAndValue.value} value={enumNameAndValue.value}>{enumNameAndValue.name}</option>
            })

        let currentActionValue = this.state.ShortcutAction.toString();
        let currentKeyValue = !this.state.ShortcutKey ? "select" : this.state.ShortcutKey;
        let currentDynamicResult = this.state.ShortcutResult != "" ? this.state.ShortcutResult : "select"

        return <Panel header="Shortcut Settings" bsStyle="primary">
            <AdaptableBlotterForm horizontal>

                <FormGroup controlId="formInlineKey">
                    <Col xs={3}>
                        <ControlLabel>Key:</ControlLabel>
                    </Col>
                    <Col xs={7}>
                        <AdaptableBlotterForm inline >
                            <FormControl componentClass="select" placeholder="select" value={currentKeyValue} onChange={(x) => this.onShortcutKeyChanged(x)} >
                                <option value="select" key="select">Select Key</option>
                                {optionKeys}
                            </FormControl>
                            {' '}<AdaptablePopover headerText={"Shortcut: Key"} bodyText={["The keyboard key that, when pressed, triggers the shortcut."]} popoverType={PopoverType.Info} />
                        </AdaptableBlotterForm>
                    </Col>
                </FormGroup>

                {this.props.Data.DataType == DataType.Number ?
                    <span>
                        <FormGroup controlId="formInlineAction">
                            <Col xs={3}>
                                <ControlLabel>Operation:</ControlLabel>
                            </Col>
                            <Col xs={7}>
                                <AdaptableBlotterForm inline >
                                    <FormControl componentClass="select" placeholder="select" value={currentActionValue} onChange={(x) => this.onShortcutActionChanged(x)} >
                                        {optionActions}
                                    </FormControl>
                                    {' '}<AdaptablePopover headerText={"Shortcut: Operation"}
                                        bodyText={["The mathematical operation that is peformed on the cell's current value - using the shortcut's 'value' - in order to calculate the new total for the cell."]} popoverType={PopoverType.Info} />
                                </AdaptableBlotterForm>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formInlineNumberResult">
                            <Col xs={3}>
                                <ControlLabel>Value:</ControlLabel>
                            </Col>
                            <Col xs={8}>
                                <AdaptableBlotterForm inline >
                                    <FormControl
                                        type="number"
                                        placeholder="Enter Number"
                                        onChange={this.changeContent}
                                        value={this.state.ShortcutResult}
                                    />
                                    {' '}<AdaptablePopover headerText={"Shortcut: Value"}
                                        bodyText={["The number that is used - together with the shortcut's mathmetical 'operation' and the current cell value - in order to calculate the new total for the cell."]} popoverType={PopoverType.Info} />
                                </AdaptableBlotterForm>
                            </Col>
                        </FormGroup>
                    </span>
                    :
                    <span>
                        <FormGroup controlId="formInlineDateType">
                            <AdaptableBlotterForm inline>
                               
                                <Col xs={3}>
                                    <ControlLabel>Date Type:</ControlLabel>
                                </Col>
                                <Col xs={5} style={radioMarginStyle}>
                                    <Radio inline value="custom" checked={this.state.IsDynamic == false} onChange={(e) => this.onDynamicSelectChanged(e)}>Custom</Radio>
                                     <Radio inline value="dynamic" checked={this.state.IsDynamic == true} onChange={(e) => this.onDynamicSelectChanged(e)}>Dynamic</Radio>
                                       {' '}<AdaptablePopover headerText={"Shortcut: Date Type"} bodyText={[<b>Custom dates</b>, " are 'real' dates chosen by the user.",<br/>,<br/>,<b>Dynamic dates</b>, " are predefined dates that come with the Blotter and are re-evaluated each day (e.g. 'Today').",<br/>,<br/>,"Dynamic dates that use working days are based on the current holiday calendar."]} popoverType={PopoverType.Info} />
                            </Col>
                             </AdaptableBlotterForm>

                            
                        </FormGroup>

                        {this.state.IsDynamic == true ?
                            <FormGroup controlId="formInlineDateResultPredefined">
                                <Col xs={3}>
                                    <ControlLabel>Dynamic Date:</ControlLabel>
                                </Col>
                                <Col xs={7}>
                                    <AdaptableBlotterForm inline >
                                        <FormControl componentClass="select" placeholder="select" value={currentDynamicResult} onChange={(x) => this.onDynamicResultChanged(x)} >
                                            <option value="select" key="select">Select Dynamic Date</option>
                                            <option value={CalendarStrat.TODAY_MAGICSTRING} key={CalendarStrat.TODAY_MAGICSTRING}>Today</option>
                                            <option value={CalendarStrat.PREVIOUS_WORK_DAY_MAGICSTRING} key={CalendarStrat.PREVIOUS_WORK_DAY_MAGICSTRING}>Previous</option>
                                            <option value={CalendarStrat.NEXT_WORK_DAY_MAGICSTRING} key={CalendarStrat.NEXT_WORK_DAY_MAGICSTRING}>Next</option>
                                        </FormControl>

                                        {' '}<AdaptablePopover headerText={"Shortcut: Dynamic Date"} bodyText={["The dynamic date that becomes the cell's new value when the shortcut is triggered."]} popoverType={PopoverType.Info} />
                                    </AdaptableBlotterForm>
                                </Col>
                            </FormGroup>
                            :
                            <FormGroup controlId="formInlineDateResultCustom">
                                <Col xs={3}>
                                    <ControlLabel>Custom Date:</ControlLabel>
                                </Col>
                                <Col xs={7}>
                                    <AdaptableBlotterForm inline >
                                        <FormControl
                                            type="date"
                                            placeholder="Shortcut Result"
                                            onChange={this.changeContent}
                                            value={this.state.ShortcutResult}
                                        />
                                        {' '}<AdaptablePopover headerText={"Shortcut: Custom Date"} bodyText={["The date that becomes the cell's new value when the shortcut is triggered."]} popoverType={PopoverType.Info} />
                                    </AdaptableBlotterForm>
                                </Col>
                            </FormGroup>
                        }
                    </span>
                }
            </AdaptableBlotterForm >
        </Panel>
    }



    private onShortcutKeyChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShortcutKey: e.value } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }


    private onShortcutActionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShortcutAction: Number.parseInt(e.value) } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    private onDynamicResultChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShortcutResult: e.value } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

     private onDynamicSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
            this.setState({ IsDynamic: (e.value == "dynamic") } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
     }

    public canNext(): boolean {
        if (this.state.IsDynamic && this.state.ShortcutResult == "select") {
            return false;
        }

        return StringExtensions.IsNotNullOrEmpty(this.state.ShortcutResult) &&
            StringExtensions.IsNotNullOrEmpty(this.state.ShortcutKey) &&
            this.state.ShortcutKey != "select"
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.ShortcutResult = this.state.ShortcutResult;
        this.props.Data.ShortcutAction = this.state.ShortcutAction;
        this.props.Data.ShortcutKey = this.state.ShortcutKey;
        this.props.Data.IsDynamic = this.state.IsDynamic;
    }
    public Back(): void { }
    public StepName = "Shortcut Settings"
}



let radioMarginStyle = {
    margin: '5px'
}
