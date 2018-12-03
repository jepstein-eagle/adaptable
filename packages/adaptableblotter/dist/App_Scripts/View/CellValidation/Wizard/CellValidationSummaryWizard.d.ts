import * as React from "react";
import { IColumn } from '../../../api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ICellValidationRule, IUserFilter } from "../../../api/Interface/IAdaptableBlotterObjects";
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
