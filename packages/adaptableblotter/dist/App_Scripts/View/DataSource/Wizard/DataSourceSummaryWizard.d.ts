import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IDataSource } from "../../../Utilities/Interface/BlotterObjects/IDataSource";
export interface DataSourceSummaryWizardProps extends AdaptableWizardStepProps<IDataSource> {
}
export declare class DataSourceSummaryWizard extends React.Component<DataSourceSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: DataSourceSummaryWizardProps);
    render(): JSX.Element;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
