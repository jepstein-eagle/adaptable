import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IFormatColumn, IStyle } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface FormatColumnStyleWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
    ColorPalette: string[];
    StyleClassNames: string[];
}
export interface FormatColumnStyleWizardState {
    Style: IStyle;
}
export declare class FormatColumnStyleWizard extends React.Component<FormatColumnStyleWizardProps, FormatColumnStyleWizardState> implements AdaptableWizardStep {
    constructor(props: FormatColumnStyleWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    private onUpdateStyle;
    StepName: string;
}
