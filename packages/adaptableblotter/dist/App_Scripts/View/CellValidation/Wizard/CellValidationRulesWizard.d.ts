import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { LeafExpressionOperator } from '../../../Utilities/Enums';
import { ICellValidationRule } from "../../../Utilities/Interface/BlotterObjects/ICellValidationRule";
export interface CellValidationRulesWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
}
export interface CellValidationSettingsWizardState {
    Operator: LeafExpressionOperator;
    Operand1: string;
    Operand2: string;
}
export declare class CellValidationRulesWizard extends React.Component<CellValidationRulesWizardProps, CellValidationSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellValidationRulesWizardProps);
    render(): any;
    private onOperatorChanged;
    private onOperand1ValueChanged;
    private onOperand2ValueChanged;
    private onDisallowEditChanged;
    private checkOperator;
    private isBetweenOperator;
    private getAvailableOperators;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
