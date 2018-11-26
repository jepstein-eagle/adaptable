import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IPercentCellRenderer } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface CellRenderersWizardProps extends AdaptableWizardStepProps<IPercentCellRenderer> {
    Columns: Array<IColumn>;
    ColorPalette: Array<string>;
}
export interface CellRendererSettingsWizardState {
    MinValue: number;
    MaxValue: number;
    PositiveColor: string;
    NegativeColor: string;
}
export declare class CellRendererSettingsWizard extends React.Component<CellRenderersWizardProps, CellRendererSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: CellRenderersWizardProps);
    render(): any;
    private onMinValueChanged;
    private onMaxValueChanged;
    private onPositiveColorSelectChanged;
    private onNegativeColorSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
