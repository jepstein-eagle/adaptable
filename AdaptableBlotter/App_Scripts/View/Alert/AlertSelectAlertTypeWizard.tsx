/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import * as StrategyIds from '../../Core/StrategyIds'
import { ControlLabel, Radio, FormGroup, Button, Form, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { IAlert } from '../../Core/interface/IAlertStrategy';
import { NotificationType } from '../../Core/Enums';


interface AlertSelectAlertTypeWizardProps extends AdaptableWizardStepProps<IAlert> {
    Blotter: IAdaptableBlotter
    Alerts: IAlert[]
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
        let haveUserDataEditedAlert: boolean = (this.props.Alerts.find(a => a.NotificationType == NotificationType.UserDataEdited) != null);
        let haveFunctionExecutedAlert: boolean = (this.props.Alerts.find(a => a.NotificationType == NotificationType.FunctionExecuted) != null);

        return <Panel header="Raise Instant Alert" bsStyle="primary">
            <Radio value={NotificationType.CellEdited.toString()} checked={this.state.NotificationType == NotificationType.CellEdited} onChange={(e) => this.onNotificationTypeChange(e)}>When a cell is edited </Radio>
            <Radio value={NotificationType.CellUpdated.toString()} checked={this.state.NotificationType == NotificationType.CellUpdated} onChange={(e) => this.onNotificationTypeChange(e)}>When a cell is updated (whether its edited or the source changes)</Radio>
            { /* if we already have a UserDataEdited or FunctionExecuted alert then cannot add another one as they are all the same */}
            <Radio value={NotificationType.UserDataEdited.toString()} disabled={haveUserDataEditedAlert} checked={this.state.NotificationType == NotificationType.UserDataEdited} onChange={(e) => this.onNotificationTypeChange(e)}>When any type of user data is edited</Radio>
            <Radio value={NotificationType.FunctionExecuted.toString()} disabled={haveFunctionExecutedAlert} checked={this.state.NotificationType == NotificationType.FunctionExecuted} onChange={(e) => this.onNotificationTypeChange(e)}>When the blotter executes a function</Radio>
        </Panel>
    }

    private onNotificationTypeChange(event: React.FormEvent) {
        let e = event.target as HTMLInputElement;
        this.setState({ NotificationType: Number.parseInt(e.value) } as AlertSelectAlertTypeWizardState, () => this.props.UpdateGoBackState())
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
