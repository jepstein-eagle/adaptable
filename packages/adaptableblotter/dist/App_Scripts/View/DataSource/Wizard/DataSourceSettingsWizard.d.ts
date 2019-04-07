import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard';
import { IDataSource } from "../../../Utilities/Interface/BlotterObjects/IDataSource";
export interface DataSourceSettingsWizardProps extends AdaptableWizardStepProps<IDataSource> {
    DataSourceNames: string[];
}
export interface DataSourceSettingsWizardState {
    Name: string;
    Description: any;
    ErrorMessage: string;
}
export declare class DataSourceSettingsWizard extends React.Component<DataSourceSettingsWizardProps, DataSourceSettingsWizardState> implements AdaptableWizardStep {
    constructor(props: DataSourceSettingsWizardProps);
    render(): JSX.Element;
    onDataSourceNameChange(event: React.FormEvent<any>): void;
    onDataSourceDescriptionChange(event: React.FormEvent<any>): void;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
