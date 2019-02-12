import * as React from "react";
import { IAdaptableBlotter } from "../../Utilities/Interface/IAdaptableBlotter";
import { IColumn } from "../../Utilities/Interface/IColumn";
export interface IWizardStepInfo {
    StepName: string;
    Element: JSX.Element;
    Index: number;
}
export interface AdaptableWizardProps extends React.ClassAttributes<AdaptableWizard> {
    Steps: IWizardStepInfo[];
    Data: any;
    onHide: Function;
    onFinish?: Function;
    StepStartIndex?: number;
    FriendlyName?: string;
    ModalContainer: HTMLElement;
    cssClassName: string;
    canFinishWizard: Function;
    Blotter: IAdaptableBlotter;
    Columns: Array<IColumn>;
}
export interface AdaptableWizardState extends React.ClassAttributes<AdaptableWizard> {
    ActiveState: any;
    IndexState: number;
}
export declare class AdaptableWizard extends React.Component<AdaptableWizardProps, AdaptableWizardState> {
    private ActiveStep;
    private stepName;
    constructor(props: AdaptableWizardProps);
    render(): JSX.Element;
    private onStepButtonClicked;
    ForceUpdateGoBackState(): void;
    isLastStep(): boolean;
    isFirstStep(): boolean;
    canFinishWizard(): boolean;
    handleClickBack(): void;
    handleClickNext(): void;
    handleClickFinish(): void;
    private cloneWizardStep;
}
