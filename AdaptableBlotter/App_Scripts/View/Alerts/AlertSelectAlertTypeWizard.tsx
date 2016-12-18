/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Button, Form, Col, Panel } from 'react-bootstrap';
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { DualListBoxEditor } from './../DualListBoxEditor'
import { IAlert, INotification } from '../../Core/interface/IAlertStrategy';
import { ColumnType } from '../../Core/Enums';


interface AlertSelectAlertTypeWizardProps extends AdaptableWizardStepProps<IAlert> {
    Blotter: IAdaptableBlotter
   
}
interface AlertSelectAlertTypeWizardState {
    Notification: INotification,
}

export class AlertSelectAlertTypeWizard extends React.Component<AlertSelectAlertTypeWizardProps, AlertSelectAlertTypeWizardState> implements AdaptableWizardStep {
    constructor(props: AlertSelectAlertTypeWizardProps) {
        super(props)
        this.state = {
            Notification: this.props.Data.Notification
        }
    }
    render(): any {
       
        return <Panel header="Alert Type" bsStyle="primary">
           
            <Radio checked readOnly>
      Radio
    </Radio>
     <Radio checked readOnly>
      Radio
    </Radio>
     <Radio checked readOnly>
      Radio
    </Radio>
        </Panel>
    }

   
   

    public canNext(): boolean {
        return this.state.Notification != null && this.state.Notification.AlertCategory != null;
    }
    public canBack(): boolean { return false; }
    public Next(): void {
        this.props.Data.Notification = this.state.Notification;
    }
    public Back(): void { }
    public StepName = "Alert Type"
}