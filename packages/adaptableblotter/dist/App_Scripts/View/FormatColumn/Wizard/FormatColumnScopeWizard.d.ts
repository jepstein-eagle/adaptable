import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IFormatColumn } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
export interface FormatColumnScopeWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
    Columns: Array<IColumn>;
}
export interface FormatColumnScopeWizardState {
    ColumnId: string;
}
export declare class FormatColumnScopeWizard extends React.Component<FormatColumnScopeWizardProps, FormatColumnScopeWizardState> implements AdaptableWizardStep {
    constructor(props: FormatColumnScopeWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
