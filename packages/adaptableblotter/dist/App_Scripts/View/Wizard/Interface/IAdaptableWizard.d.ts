/// <reference types="react" />
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { IAdaptableBlotterObject } from '../../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
export interface AdaptableWizardStep {
    StepName: string;
    canNext(): boolean;
    canBack(): boolean;
    Next(): void;
    Back(): void;
    GetIndexStepIncrement(): number;
    GetIndexStepDecrement(): number;
}
export interface AdaptableWizardStepProps<T> {
    Data?: T;
    UpdateGoBackState?(): void;
    StepName?: string;
    cssClassName?: string;
    Blotter?: IAdaptableBlotter;
    Columns?: IColumn[];
}
export interface ExpressionWizardProps<T> extends AdaptableWizardStepProps<T> {
    UserFilters: IUserFilter[];
    SystemFilters: string[];
}
export interface IAdaptableBlotterObjectExpressionAdaptableWizardProps<View> extends IAdaptableBlotterObjectAdaptableWizardProps<View> {
    Columns: Array<IColumn>;
    UserFilters: IUserFilter[];
    SystemFilters: string[];
    Blotter: IAdaptableBlotter;
}
export interface IAdaptableWizardProps<View> extends React.ClassAttributes<View> {
    WizardStartIndex: number;
    onCloseWizard: () => void;
    onFinishWizard: () => void;
    ModalContainer: HTMLElement;
    cssClassName: string;
    canFinishWizard: Function;
}
export interface IAdaptableBlotterObjectAdaptableWizardProps<View> extends IAdaptableWizardProps<View> {
    ConfigEntities: IAdaptableBlotterObject[];
    EditedAdaptableBlotterObject: IAdaptableBlotterObject;
}
