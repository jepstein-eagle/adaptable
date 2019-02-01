import * as React from "react";
import { IAdaptableBlotter } from "../../Utilities/Interface/IAdaptableBlotter";
import { IColumn } from "../../Utilities/Interface/IColumn";
export interface AdaptableWizardProps extends React.ClassAttributes<AdaptableWizard> {
    Steps: JSX.Element[];
    Data: any;
    onHide: Function;
    onFinish?: Function;
    StepStartIndex?: number;
    StepNames?: string[];
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
    StepName: string;
    constructor(props: AdaptableWizardProps);
    private handleKeyDown;
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
