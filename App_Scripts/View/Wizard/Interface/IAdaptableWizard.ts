import { IColumn } from '../../../Core/Interface/IColumn';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IUserFilter, IAdaptableBlotterObject } from '../../../Core/Api/Interface/AdaptableBlotterObjects';

export interface AdaptableWizardStep {
    StepName: string
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
    StepName?: string
    cssClassName: string
}

// props for an Expression Wizard Page
export interface ExpressionWizardProps<T> extends AdaptableWizardStepProps<T> {
    Columns: Array<IColumn>
    UserFilters: IUserFilter[],
    SystemFilters: string[],
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
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

// props for a wizard that wraps a config entity that contans an Expression
export interface IAdaptableBlotterObjectExpressionAdaptableWizardProps<View> extends IAdaptableBlotterObjectAdaptableWizardProps<View> {
    Columns: Array<IColumn>
    UserFilters: IUserFilter[]
    SystemFilters: string[]
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}