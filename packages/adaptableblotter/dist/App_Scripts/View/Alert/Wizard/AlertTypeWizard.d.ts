import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType } from '../../../Utilities/Enums';
import { IAlertDefinition } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
export interface AlertTypeWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
}
export interface AlertTypeWizardState {
    MessageType: MessageType;
    ShowAsPopup: boolean;
}
export declare class AlertTypeWizard extends React.Component<AlertTypeWizardProps, AlertTypeWizardState> implements AdaptableWizardStep {
    constructor(props: AlertTypeWizardProps);
    render(): any;
    private onMessageTypeSelectChanged;
    private onShowAsPopupChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
