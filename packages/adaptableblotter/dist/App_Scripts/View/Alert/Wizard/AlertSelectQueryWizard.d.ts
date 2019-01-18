import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IAlertDefinition } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
export interface AlertSelectQueryWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
    Columns: Array<IColumn>;
}
export interface AlertSelectQueryWizardState {
    HasExpression: boolean;
}
export declare class AlertSelectQueryWizard extends React.Component<AlertSelectQueryWizardProps, AlertSelectQueryWizardState> implements AdaptableWizardStep {
    constructor(props: AlertSelectQueryWizardProps);
    render(): any;
    private onOtherExpressionOptionChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 2;
    GetIndexStepDecrement(): number;
    StepName: string;
}
