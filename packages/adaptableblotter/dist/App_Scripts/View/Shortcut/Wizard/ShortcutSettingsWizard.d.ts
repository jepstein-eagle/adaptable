import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { MathOperation } from '../../../Utilities/Enums';
import { IShortcut } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
export interface ShortcutSettingsWizardProps extends AdaptableWizardStepProps<IShortcut> {
    NumericKeysAvailable: Array<string>;
    DateKeysAvailable: Array<string>;
}
export interface ShortcutSettingsWizardState {
    ShortcutKey: string;
    ShortcutResult: any;
    ShortcutOperation: MathOperation;
    IsDynamic: boolean;
}
export declare class ShortcutSettingsWizard extends React.Component<ShortcutSettingsWizardProps, ShortcutSettingsWizardState> implements AdaptableWizardStep {
    changeContent: (e: any) => void;
    constructor(props: ShortcutSettingsWizardProps);
    onClickShortcutOperation(shortcutOperation: MathOperation): void;
    render(): JSX.Element;
    private onShortcutKeyChanged;
    private onShortcutOperationChanged;
    private onDynamicResultChanged;
    private onDynamicSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
