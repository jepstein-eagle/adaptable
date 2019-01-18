import { IShortcut } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
export interface ShortcutTypeWizardProps extends AdaptableWizardStepProps<IShortcut> {
}
export interface ShortcutTypeWizardState {
    ColumnType: 'Number' | 'Date';
}
export declare class ShortcutTypeWizard extends React.Component<ShortcutTypeWizardProps, ShortcutTypeWizardState> implements AdaptableWizardStep {
    constructor(props: ShortcutTypeWizardProps);
    render(): JSX.Element;
    private onColumTypeChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
