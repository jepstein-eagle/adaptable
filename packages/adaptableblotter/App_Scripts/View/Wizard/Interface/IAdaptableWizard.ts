import { IColumn } from '../../../Utilities/Interface/IColumn';
import { IAdaptableBlotterObject } from '../../../Utilities/Interface/BlotterObjects/IAdaptableBlotterObject';
import { IUserFilter } from "../../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';

export interface AdaptableWizardStep {
    canNext(): boolean
    canBack(): boolean
    Next(): void
    Back(): void
    GetIndexStepIncrement(): number
    GetIndexStepDecrement(): number
}

export interface AdaptableWizardStepProps<T> {
    Data?: T
    UpdateGoBackState?(): void
    cssClassName?: string
    Blotter?: IAdaptableBlotter
    Columns?: IColumn[]
}

// props for an Expression Wizard Page
export interface ExpressionWizardProps<T> extends AdaptableWizardStepProps<T> {
    UserFilters: IUserFilter[],
    SystemFilters: string[],
}

// props for a wizard that wraps a config entity that contans an Expression
export interface IAdaptableBlotterObjectExpressionAdaptableWizardProps<View> extends IAdaptableBlotterObjectAdaptableWizardProps<View> {
    Columns: Array<IColumn>
    UserFilters: IUserFilter[]
    SystemFilters: string[]
    Blotter: IAdaptableBlotter
}

// props for a basic wizard
export interface IAdaptableWizardProps<View> extends React.ClassAttributes<View> {
    WizardStartIndex: number
    onCloseWizard: () => void
    onFinishWizard: () => void
    ModalContainer: HTMLElement
    cssClassName: string
    canFinishWizard: Function
}

// props for a wizard that wraps a config entity (without an expression)
export interface IAdaptableBlotterObjectAdaptableWizardProps<View> extends IAdaptableWizardProps<View> {
    ConfigEntities: IAdaptableBlotterObject[]
    EditedAdaptableBlotterObject: IAdaptableBlotterObject
}

