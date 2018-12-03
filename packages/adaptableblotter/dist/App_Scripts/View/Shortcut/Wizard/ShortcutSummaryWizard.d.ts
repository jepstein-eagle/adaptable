import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IShortcut } from "../../../api/Interface/IAdaptableBlotterObjects";
export interface ShortcutSummaryWizardProps extends AdaptableWizardStepProps<IShortcut> {
}
export declare class ShortcutSummaryWizard extends React.Component<ShortcutSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ShortcutSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
