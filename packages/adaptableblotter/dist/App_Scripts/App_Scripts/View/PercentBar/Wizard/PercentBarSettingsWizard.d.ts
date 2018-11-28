import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentBar } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface PercentBarsWizardProps extends AdaptableWizardStepProps<IPercentBar> {
    Columns: Array<IColumn>;
    ColorPalette: Array<string>;
}
export interface PercentBarSettingsWizardState {
    MinValue: number;
    MaxValue: number;
    PositiveColor: string;
    NegativeColor: string;
    ShowValue: boolean;
}
export declare class PercentBarSettingsWizard extends React.Component<PercentBarsWizardProps, PercentBarSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: PercentBarsWizardProps);
    render(): any;
    private onMinValueChanged;
    private onMaxValueChanged;
    private onPositiveColorSelectChanged;
    private onNegativeColorSelectChanged;
    private onShowValueChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
