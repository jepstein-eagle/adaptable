/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as StrategyIds from '../../Core/StrategyIds'
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { IAlert } from '../../Core/interface/IAlertStrategy';
import { NotificationType } from '../../Core/Enums';


interface AlertSelectAlertTypeWizardProps extends AdaptableWizardStepProps<IAlert> {
    Blotter: IAdaptableBlotter

}
interface AlertSelectAlertTypeWizardState {
    NotificationType: NotificationType,
}

export class AlertSelectAlertTypeWizard extends React.Component<AlertSelectAlertTypeWizardProps, AlertSelectAlertTypeWizardState> implements AdaptableWizardStep {
    constructor(props: AlertSelectAlertTypeWizardProps) {
        super(props)
        this.state = {
            NotificationType: this.props.Data.NotificationType
        }
    }
    render(): any {

        return <Panel header="Raise Instant Alert" bsStyle="primary">
            <Radio style={divStyle} value="CellEdited" checked={this.state.NotificationType == NotificationType.CellEdited} onChange={(e) => this.onNotificationTypeChange(e)}>When a cell is edited </Radio>
            <Radio style={divStyle} value="CellUpdated" checked={this.state.NotificationType == NotificationType.CellUpdated} onChange={(e) => this.onNotificationTypeChange(e)}>When a cell is updated (whether its edited or the source changes)</Radio>
            <Radio style={divStyle} value="UserDataEdited" checked={this.state.NotificationType == NotificationType.UserDataEdited} onChange={(e) => this.onNotificationTypeChange(e)}>When any type of user data is edited</Radio>
            <Radio style={divStyle} value="FunctionExecuted" checked={this.state.NotificationType == NotificationType.FunctionExecuted} onChange={(e) => this.onNotificationTypeChange(e)}>When the blotter executes a function</Radio>
        </Panel>
    }

    // this is all wrong and needs to use enums but will work out how to do that tomorrow...
    private onNotificationTypeChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        switch (e.value) {
            case "CellEdited":
                this.setState({ NotificationType: NotificationType.CellEdited } as AlertSelectAlertTypeWizardState, () => this.props.UpdateGoBackState())
                break;
            case "CellUpdated":
                this.setState({ NotificationType: NotificationType.CellUpdated } as AlertSelectAlertTypeWizardState, () => this.props.UpdateGoBackState())
                break;
            case "UserDataEdited":
                this.setState({ NotificationType: NotificationType.UserDataEdited } as AlertSelectAlertTypeWizardState, () => this.props.UpdateGoBackState())
                break;
            case "FunctionExecuted":
                this.setState({ NotificationType: NotificationType.FunctionExecuted } as AlertSelectAlertTypeWizardState, () => this.props.UpdateGoBackState())
                break;
        }

    }

    public canNext(): boolean {
        return this.state.NotificationType != null;
    }
    public canBack(): boolean { return false; }
    public Next(): void {
        // if the notification type has changed then reset everything...
        if (this.props.Data.NotificationType != this.state.NotificationType) {
            this.props.Data.NotificationType = this.state.NotificationType;
           
           let alertStrategy: any = this.props.Blotter.Strategies.get(StrategyIds.AlertStrategyId);
            this.props.Data.CellChangeRule = alertStrategy.CreateEmptyCellChangeRule();
        }
    }
    public Back(): void { }
    public StepName = "Alert Type"
}

let divStyle = {
    margin: '15px'
}