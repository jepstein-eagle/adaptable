import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IStyle } from "../../../Utilities/Interface/IStyle";
import { IFormatColumn } from "../../../Utilities/Interface/BlotterObjects/IFormatColumn";
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
}
