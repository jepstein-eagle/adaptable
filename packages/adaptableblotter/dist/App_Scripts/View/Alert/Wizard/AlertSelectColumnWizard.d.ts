import * as React from "react";
import { IColumn } from '../../../api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IAlertDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface AlertSelectColumnWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
    Columns: Array<IColumn>;
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
    StepName: string;
}
