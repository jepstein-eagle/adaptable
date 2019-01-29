import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
import { ICellValidationRule } from "../../../Utilities/Interface/BlotterObjects/ICellValidationRule";
export interface CellValidationSummaryWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: IColumn[];
    UserFilters: IUserFilter[];
}
export declare class CellValidationSummaryWizard extends React.Component<CellValidationSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CellValidationSummaryWizardProps);
    render(): any;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): 1 | 2;
    StepName: string;
}
