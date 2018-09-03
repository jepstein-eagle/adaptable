import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { DistinctCriteriaPairValue } from '../../../Core/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { ICustomSort } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
export interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: Array<IColumn>;
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>;
}
export interface CustomSortValuesWizardState {
    ColumnValues: any[];
    SelectedValues: Array<string>;
    IsEdit: boolean;
}
export declare class CustomSortValuesWizard extends React.Component<CustomSortValuesWizardProps, CustomSortValuesWizardState> implements AdaptableWizardStep {
    constructor(props: CustomSortValuesWizardProps);
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
