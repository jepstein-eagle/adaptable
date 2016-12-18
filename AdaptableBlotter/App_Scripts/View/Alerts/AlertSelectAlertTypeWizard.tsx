/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
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

            <Radio value="CellEdited" checked={this.state.NotificationType == NotificationType.CellEdited} onChange={(e) => this.onNotificationTypeChange(e) }>
                When a cell is edited
            </Radio>
            <Radio value="CellUpdated" checked={this.state.NotificationType == NotificationType.CellUpdated} onChange={(e) => this.onNotificationTypeChange(e) }>
                When a cell is updated (whether its edited or the source changes)
            </Radio>
            <Radio value="UserDataEdited" checked={this.state.NotificationType == NotificationType.UserDataEdited} onChange={(e) => this.onNotificationTypeChange(e) }>
                When any type of user data is edited
            </Radio>
            <Radio value="FunctionExecuted" checked={this.state.NotificationType == NotificationType.FunctionExecuted} onChange={(e) => this.onNotificationTypeChange(e) }>
                When the blotter executes a function
            </Radio>
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
        this.props.Data.NotificationType = this.state.NotificationType;
    }
    public Back(): void { }
    public StepName = "Alert Type"
}