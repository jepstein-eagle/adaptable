import * as React from "react";
import { Radio, Col, Panel, Checkbox } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { MessageType } from '../../../Utilities/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IAlertDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";

export interface AlertTypeWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
}

export interface AlertTypeWizardState {
    MessageType: MessageType,
    ShowAsPopup: boolean,
}

export class AlertTypeWizard extends React.Component<AlertTypeWizardProps, AlertTypeWizardState> implements AdaptableWizardStep {

    constructor(props: AlertTypeWizardProps) {
        super(props)
        this.state = {
            MessageType: this.props.Data.MessageType as MessageType,
            ShowAsPopup: this.props.Data.ShowAsPopup,
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-scope"

        return <div className={cssClassName}>
            <Panel header="Select The Type of the Alert" bsStyle="primary">
                <AdaptableBlotterForm inline>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Info" checked={this.state.MessageType == MessageType.Info} onChange={(e) => this.onMessageTypeSelectChanged(e)}>Info</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Alert Type: Info"} bodyText={["Sends the alert as a message."]} MessageType={MessageType.Info} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Warning" checked={this.state.MessageType == MessageType.Warning} onChange={(e) => this.onMessageTypeSelectChanged(e)}>Warning</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Alert Type: Warning"} bodyText={["Sends the alert as a warning."]} MessageType={MessageType.Info} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Error" checked={this.state.MessageType == MessageType.Error} onChange={(e) => this.onMessageTypeSelectChanged(e)}>Error</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Alert Type: Error"} bodyText={["Sends the alert as an error."]} MessageType={MessageType.Info} />
                    </Col>

                </AdaptableBlotterForm>

            </Panel>
            <Panel header="Alert Details" bsStyle="primary">
                <AdaptableBlotterForm inline>
                    <Col xs={12} className="ab_large_margin">
                        <Checkbox className={cssClassName + "__checkbox"} inline checked={this.state.ShowAsPopup == true} onChange={(e) => this.onShowAsPopupChanged(e)}>Show as Popup</Checkbox>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Alert Details"} bodyText={["Shows a popup in centre of screen when Alert is triggered."]} MessageType={MessageType.Info} />
                    </Col>

                </AdaptableBlotterForm>

            </Panel>
        </div>
    }


    private onMessageTypeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Info") {
            this.setState({ MessageType: MessageType.Info } as AlertTypeWizardState, () => this.props.UpdateGoBackState())
        } else if (e.value == 'Warning') {
            this.setState({ MessageType: MessageType.Warning } as AlertTypeWizardState, () => this.props.UpdateGoBackState())
        } else if (e.value == 'Error') {
            this.setState({ MessageType: MessageType.Error } as AlertTypeWizardState, () => this.props.UpdateGoBackState())
        }
    }

    private onShowAsPopupChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShowAsPopup: e.checked } as AlertTypeWizardState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return this.state.MessageType != null
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        this.props.Data.MessageType = this.state.MessageType;
        this.props.Data.ShowAsPopup = this.state.ShowAsPopup;
    }

    public Back(): void { // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}
