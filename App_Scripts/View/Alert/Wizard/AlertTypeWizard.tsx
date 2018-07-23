import * as React from "react";
import { Radio, Col, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { AlertType, PopoverType } from '../../../Core/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { IAlertDefinition } from "../../../Core/Api/Interface/AdaptableBlotterObjects";

export interface AlertTypeWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
  }

export interface AlertTypeWizardState {
    AlertType: AlertType,
}

export class AlertTypeWizard extends React.Component<AlertTypeWizardProps, AlertTypeWizardState> implements AdaptableWizardStep {

    constructor(props: AlertTypeWizardProps) {
        super(props)
        this.state = {
            AlertType: this.props.Data.AlertType as AlertType,
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-scope"

        return <div className={cssClassName}>
            <Panel header="Select The Type of the Alert" bsStyle="primary">
                <AdaptableBlotterForm inline>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Info" checked={this.state.AlertType == AlertType.Info} onChange={(e) => this.onAlertTypeSelectChanged(e)}>Info</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Alert Type: Info"} bodyText={["Sends the alert as a message."]} popoverType={PopoverType.Info} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Warning" checked={this.state.AlertType == AlertType.Warning} onChange={(e) => this.onAlertTypeSelectChanged(e)}>Warning</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Alert Type: Warning"} bodyText={["Sends the alert as a warning."]} popoverType={PopoverType.Info} />
                    </Col>
                    <Col xs={12} className="ab_large_margin">
                        <Radio className={cssClassName + "__radiobutton"} inline value="Error" checked={this.state.AlertType == AlertType.Error} onChange={(e) => this.onAlertTypeSelectChanged(e)}>Error</Radio>
                        {' '} {' '}
                        <AdaptablePopover cssClassName={cssClassName} headerText={"Alert Type: Error"} bodyText={["Sends the alert as an error."]} popoverType={PopoverType.Info} />
                    </Col>
                   
                </AdaptableBlotterForm>
               
            </Panel>
        </div>
    }


    private onAlertTypeSelectChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.value == "Info") {
            this.setState({ AlertType: AlertType.Info } as AlertTypeWizardState, () => this.props.UpdateGoBackState())
        } else    if (e.value == "Warning") {
            this.setState({ AlertType: AlertType.Warning} as AlertTypeWizardState, () => this.props.UpdateGoBackState())
          } else {
            this.setState({ AlertType: AlertType.Error} as AlertTypeWizardState, () => this.props.UpdateGoBackState())
        }
    }

    public canNext(): boolean {
        return this.state.AlertType != null
    }

    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.AlertType = this.state.AlertType;
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


