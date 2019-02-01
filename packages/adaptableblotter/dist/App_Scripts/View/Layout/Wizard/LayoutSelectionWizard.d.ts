import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { LayoutSource } from '../../../Utilities/Enums';
import { IGridSort } from "../../../Utilities/Interface/IGridSort";
import { ILayout } from "../../../Utilities/Interface/BlotterObjects/ILayout";
export interface LayoutSelectionWizardProps extends AdaptableWizardStepProps<ILayout> {
    Layouts: Array<ILayout>;
    GridSorts: IGridSort[];
}
export interface LayoutSelectionWizardState {
    LayoutSource: LayoutSource;
}
export declare class LayoutSelectionWizard extends React.Component<LayoutSelectionWizardProps, LayoutSelectionWizardState> implements AdaptableWizardStep {
    constructor(props: LayoutSelectionWizardProps);
    render(): any;
    private onScopeSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): 1 | 3;
    GetIndexStepDecrement(): number;
    StepName: string;
}
