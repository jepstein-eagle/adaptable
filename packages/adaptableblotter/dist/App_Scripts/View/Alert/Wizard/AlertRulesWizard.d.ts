import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { LeafExpressionOperator } from '../../../Utilities/Enums';
import { IAlertDefinition } from "../../../Utilities/Interface/BlotterObjects/IAlertDefinition";
export interface AlertRulesWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
}
export interface AlertSettingsWizardState {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}
export declare class AlertRulesWizard extends React.Component<AlertRulesWizardProps, AlertSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: AlertRulesWizardProps);
    render(): any;
    private onOperatorChanged;
    private onOperand1ValueChanged;
    private onOperand2ValueChanged;
    private onDisallowEditChanged;
    private getColumnDataTypeFromState;
    private checkOperator;
    private isBetweenOperator;
    private getAvailableOperators;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
