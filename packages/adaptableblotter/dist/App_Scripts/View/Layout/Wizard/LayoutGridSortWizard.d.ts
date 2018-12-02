import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from "../../../Api/Interface/IColumn";
import { ILayout, IGridSort } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface LayoutGridSortWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: Array<IColumn>;
}
export interface LayoutGridSortWizardState {
    GridSorts: IGridSort[];
}
export declare class LayoutGridSortWizard extends React.Component<LayoutGridSortWizardProps, LayoutGridSortWizardState> implements AdaptableWizardStep {
    onEdit(arg0: any): any;
    constructor(props: LayoutGridSortWizardProps);
    render(): any;
    addSort(): any;
    private onColumnSelectedChanged;
    private onSortOrderChanged;
    private onDeleteGridSort;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
