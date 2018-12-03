/// <reference types="react" />
import { IColumn } from '../../../api/Interface/IColumn';
import { IUserFilter, IAdaptableBlotterObject } from '../../../api/Interface/IAdaptableBlotterObjects';
import { IAdaptableBlotter } from '../../../api/Interface/IAdaptableBlotter';
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
    cssClassName: string;
}
export interface ExpressionWizardProps<T> extends AdaptableWizardStepProps<T> {
    Columns: Array<IColumn>;
    UserFilters: IUserFilter[];
    SystemFilters: string[];
    Blotter: IAdaptableBlotter;
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
