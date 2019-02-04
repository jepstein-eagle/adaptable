import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ConditionalStyleScope } from '../../../Utilities/Enums';
import { IColumnCategory } from "../../../Utilities/Interface/BlotterObjects/IColumnCategory";
import { IConditionalStyle } from "../../../Utilities/Interface/BlotterObjects/IConditionalStyle";
export interface ConditionalStyleScopeWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    ColumnCategories: Array<IColumnCategory>;
}
export interface ConditionalStyleScopeWizardState {
    ColumnId: string;
    ColumnCategoryId: string;
    ConditionalStyleScope: ConditionalStyleScope;
}
export declare class ConditionalStyleScopeWizard extends React.Component<ConditionalStyleScopeWizardProps, ConditionalStyleScopeWizardState> implements AdaptableWizardStep {
    constructor(props: ConditionalStyleScopeWizardProps);
    render(): any;
    private onColumnSelectedChanged;
    private onColumnCategorySelectedChanged;
    private onScopeSelectChanged;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
