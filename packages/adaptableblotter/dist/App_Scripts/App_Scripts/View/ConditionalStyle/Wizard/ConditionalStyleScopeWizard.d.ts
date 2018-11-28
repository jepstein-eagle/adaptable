import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ConditionalStyleScope } from '../../../Core/Enums';
import { IConditionalStyle } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IColumnCategory } from "../../../Core/Interface/Interfaces";
export interface ConditionalStyleScopeWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    Columns: Array<IColumn>;
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
