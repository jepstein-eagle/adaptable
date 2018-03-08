import { IColumn } from '../../../Core/Interface/IColumn';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { IAdaptableBlotterObject } from '../../../Core/Interface/Interfaces';

export interface AdaptableWizardStep {
    StepName: string
    canNext(): boolean
    canBack(): boolean
    Next(): void
    Back(): void
}

export interface AdaptableWizardStepProps<T> {
    Data?: T
    UpdateGoBackState?(finish?: boolean): void
    StepName?: string
}

// props for an Expression Wizard Page
export interface ExpressionWizardProps<T> extends AdaptableWizardStepProps<T> {
    Columns: Array<IColumn>
    UserFilters: IUserFilter[],
    WizardStartIndex: number
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    closeWizard: () => void
    onFinishWizard: () => void
    SelectedColumnId: string // do we need this??
 //   ColumnList: Array<IColumn>
}

// props for a basic wizard
export interface IAdaptableWizardProps<View> extends React.ClassAttributes<View> {
    WizardStartIndex: number
    onCloseWizard: () => void
    onFinishWizard: () => void
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
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
   }