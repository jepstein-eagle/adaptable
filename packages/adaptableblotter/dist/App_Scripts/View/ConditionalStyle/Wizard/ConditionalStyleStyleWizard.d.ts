import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IConditionalStyle, IStyle } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
export interface ConditionalStyleStyleWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    ColorPalette: string[];
    StyleClassNames: string[];
}
export interface ConditionalStyleStyleWizardState {
    Style: IStyle;
}
export declare class ConditionalStyleStyleWizard extends React.Component<ConditionalStyleStyleWizardProps, ConditionalStyleStyleWizardState> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleStyleWizardProps);
    render(): JSX.Element;
    private onUpdateStyle;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
