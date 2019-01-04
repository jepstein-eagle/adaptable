import * as React from "react";
import { IColumn } from '../../../Api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IColumnCategory } from "../../../Api/Interface/IAdaptableBlotterObjects";
export interface ColumnCategoryColumnsWizardProps extends AdaptableWizardStepProps<IColumnCategory> {
    Columns: Array<IColumn>;
    ColumnCategorys: IColumnCategory[];
}
export interface ColumnCategoryColumnsWizardState {
    AvailableColumns: string[];
    SelectedColumns: string[];
    IsEdit: boolean;
}
export declare class ColumnCategoryColumnsWizard extends React.Component<ColumnCategoryColumnsWizardProps, ColumnCategoryColumnsWizardState> implements AdaptableWizardStep {
    constructor(props: ColumnCategoryColumnsWizardProps);
    render(): any;
    OnSelectedValuesChange(newValues: Array<string>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
    StepName: string;
}
