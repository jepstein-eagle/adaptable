import * as React from "react";
import { IColumn } from '../../../api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ILayout } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface LayoutColumnWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: Array<IColumn>;
}
export interface LayoutColumnWizardState {
    SelectedColumns: Array<string>;
}
export declare class LayoutColumnWizard extends React.Component<LayoutColumnWizardProps, LayoutColumnWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutColumnWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
