import * as React from "react";
import { Radio, Panel, ControlLabel, FormControl, Col, FormGroup } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { DataType, MessageType, MathOperation } from '../../../Utilities/Enums';
import { EnumExtensions } from '../../../Utilities/Extensions/EnumExtensions';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import * as CalendarConstants from '../../../Utilities/Constants/CalendarConstants';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { IShortcut } from "../../../Utilities/Interface/BlotterObjects/IShortcut";


export interface ShortcutSettingsWizardProps extends AdaptableWizardStepProps<IShortcut> {
    NumericKeysAvailable: Array<string>
    DateKeysAvailable: Array<string>

}
export interface ShortcutSettingsWizardState {
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutOperation: MathOperation;
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
            ShortcutOperation: this.props.Data.ShortcutOperation as MathOperation,
            IsDynamic: this.props.Data.IsDynamic
        }
    }

    onClickShortcutOperation(shortcutOperation: MathOperation) {
        this.setState({ ShortcutOperation: shortcutOperation, ShortcutResult: this.state.ShortcutResult } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }

    render() {

        // sort out keys
        let keyList: string[] = (this.props.Data.ColumnType == DataType.Number) ? this.props.NumericKeysAvailable : this.props.DateKeysAvailable

        let optionKeys = keyList.map(x => {
            return <option value={x} key={x}>{x}</option>
        })

        // sort out actions
        let optionActions = EnumExtensions.getNames(MathOperation).filter
            (name => name != MathOperation.Replace).map((enumName) => {
                return <option key={enumName} value={enumName}>{enumName}</option>
            })

        let currentActionValue = this.state.ShortcutOperation;
        let currentKeyValue = !this.state.ShortcutKey ? "select" : this.state.ShortcutKey;
        let currentDynamicResult = this.state.ShortcutResult != "" ? this.state.ShortcutResult : "select"
        let cssClassName: string = this.props.cssClassName + "-settings"
       
        return <div className={cssClassName}>
        <Panel header="Shortcut Settings" bsStyle="primary">
                <AdaptableBlotterForm horizontal>

                    <FormGroup controlId="formInlineKey">
                        <Col xs={3}>
                            <ControlLabel>Key:</ControlLabel>
                        </Col>
                        <Col xs={6}>
                            <FormControl componentClass="select" placeholder="select" value={currentKeyValue} onChange={(x) => this.onShortcutKeyChanged(x)} >
                                <option value="select" key="select">Select Key</option>
                                {optionKeys}
                            </FormControl>
                        </Col>
                        <Col xs={1}><AdaptablePopover  cssClassName={cssClassName} headerText={"Shortcut: Key"} bodyText={["The keyboard key that, when pressed, triggers the shortcut."]} />
                        </Col>
                    </FormGroup>

                    {this.props.Data.ColumnType == DataType.Number ?
                        <span>
                            <FormGroup controlId="formInlineAction">
                                <Col xs={3}>
                                    <ControlLabel>Operation:</ControlLabel>
                                </Col>
                                <Col xs={6}>
                                    <FormControl componentClass="select" placeholder="select" value={currentActionValue} onChange={(x) => this.onShortcutOperationChanged(x)} >
                                        {optionActions}
                                    </FormControl>
                                </Col>
                                <Col xs={1}><AdaptablePopover  cssClassName={cssClassName} headerText={"Shortcut: Operation"}
                                    bodyText={["The mathematical operation that is peformed on the cell's current value - using the shortcut's 'value' - in order to calculate the new total for the cell."]} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formInlineNumberResult">
                                <Col xs={3}>
                                    <ControlLabel>Value:</ControlLabel>
                                </Col>
                                <Col xs={6}>
                                    <FormControl
                                        type="number"
                                        placeholder="Enter Number"
                                        onChange={this.changeContent}
                                        value={this.state.ShortcutResult}
                                    />
                                </Col>
                                <Col xs={1}><AdaptablePopover  cssClassName={cssClassName} headerText={"Shortcut: Value"}
                                    bodyText={["The number that is used - together with the shortcut's mathmetical 'operation' and the current cell value - in order to calculate the new total for the cell."]} />
                                </Col>
                            </FormGroup>
                        </span>
                        :
                        <span>
                            <FormGroup controlId="formInlineDateType">

                                <Col xs={3}>
                                    <ControlLabel>Date Type:</ControlLabel>
                                </Col>
                                <Col xs={6} >
                                    <Radio inline value="custom" checked={this.state.IsDynamic == false} onChange={(e) => this.onDynamicSelectChanged(e)}>Custom</Radio>
                                    <Radio inline value="dynamic" checked={this.state.IsDynamic == true} onChange={(e) => this.onDynamicSelectChanged(e)}>Dynamic</Radio>
                                </Col>
                                <Col xs={1}><AdaptablePopover  cssClassName={cssClassName} headerText={"Shortcut: Date Type"} bodyText={[<b>Custom dates</b>, " are 'real' dates chosen by the user.", <br />, <br />, <b>Dynamic dates</b>, " are predefined dates that come with the Blotter and are re-evaluated each day (e.g. 'Today').", <br />, <br />, "Dynamic dates that use working days are based on the current holiday calendar."]} />
                                </Col>
                            </FormGroup>

                            {this.state.IsDynamic == true ?
                                <FormGroup controlId="formInlineDateResultPredefined">
                                    <Col xs={3}>
                                        <ControlLabel>Dynamic Date:</ControlLabel>
                                    </Col>
                                    <Col xs={6}>
                                        <FormControl componentClass="select" placeholder="select" value={currentDynamicResult} onChange={(x) => this.onDynamicResultChanged(x)} >
                                            <option value="select" key="select">Select Dynamic Date</option>
                                            <option value={CalendarConstants.TODAY} key={CalendarConstants.TODAY}>Today</option>
                                            <option value={CalendarConstants.YESTERDAY} key={CalendarConstants.YESTERDAY}>Yesterday</option>
                                            <option value={CalendarConstants.TOMORROW} key={CalendarConstants.TOMORROW}>Tomorrow</option>
                                            <option value={CalendarConstants.PREVIOUS_WORK_DAY} key={CalendarConstants.PREVIOUS_WORK_DAY}>Previous Work Day</option>
                                            <option value={CalendarConstants.NEXT_WORK_DAY} key={CalendarConstants.NEXT_WORK_DAY}>Next Work Day</option>
                                        </FormControl>
                                    </Col>
                                    <Col xs={1}><AdaptablePopover  cssClassName={cssClassName} headerText={"Shortcut: Dynamic Date"} bodyText={["The dynamic date that becomes the cell's new value when the shortcut is triggered."]} />
                                    </Col>
                                </FormGroup>
                                :
                                <FormGroup controlId="formInlineDateResultCustom">
                                    <Col xs={3}>
                                        <ControlLabel>Custom Date:</ControlLabel>
                                    </Col>
                                    <Col xs={6}>
                                        <FormControl
                                            type="date"
                                            placeholder="Shortcut Result"
                                            onChange={this.changeContent}
                                            value={this.state.ShortcutResult}
                                        />
                                    </Col>
                                    <Col xs={1}>
                                        <AdaptablePopover  cssClassName={cssClassName} headerText={"Shortcut: Custom Date"} bodyText={["The date that becomes the cell's new value when the shortcut is triggered."]} />
                                    </Col>
                                </FormGroup>
                            }
                        </span>
                    }
                </AdaptableBlotterForm >
            </Panel>
        </div>
    }


    private onShortcutKeyChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShortcutKey: e.value } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
    }


    private onShortcutOperationChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShortcutOperation: e.value } as ShortcutSettingsWizardState, () => this.props.UpdateGoBackState())
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
        this.props.Data.ShortcutOperation = this.state.ShortcutOperation;
        this.props.Data.ShortcutKey = this.state.ShortcutKey;
        this.props.Data.IsDynamic = this.state.IsDynamic;
    }
    public Back(): void { /* no implementation required   */ }
    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }
   
}




