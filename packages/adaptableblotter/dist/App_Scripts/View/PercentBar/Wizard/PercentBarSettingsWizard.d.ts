import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentBar } from "../../../Utilities/Interface/BlotterObjects/IPercentBar";
export interface PercentBarSettingsWizardProps extends AdaptableWizardStepProps<IPercentBar> {
    ColorPalette: Array<string>;
}
export interface PercentBarSettingsWizardState {
    PositiveColor: string;
    NegativeColor: string;
    ShowValue: boolean;
}
export declare class PercentBarSettingsWizard extends React.Component<PercentBarSettingsWizardProps, PercentBarSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarSettingsWizardProps);
    render(): any;
    private onPositiveColorSelectChanged;
    private onNegativeColorSelectChanged;
    private onShowValueChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
