import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IAlertDefinition } from "../../../Utilities/Interface/BlotterObjects/IAlertDefinition";
export interface AlertSelectColumnWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
}
export interface AlertSelectColumnWizardState {
    ColumnId: string;
}
export declare class AlertSelectColumnWizard extends React.Component<AlertSelectColumnWizardProps, AlertSelectColumnWizardState> implements AdaptableWizardStep {
    constructor(props: AlertSelectColumnWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
