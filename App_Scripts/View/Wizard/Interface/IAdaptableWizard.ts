import { IConfigEntity } from "../../../Core/Interface/IAdaptableBlotter";
import { IColumn } from '../../../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../../../Core/Interface/IExpression'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';

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

// props for a basic wizard
export interface IAdaptableWizardProps<View> extends React.ClassAttributes<View> {
    WizardStartIndex: number
    onCloseWizard: () => void
    onFinishWizard: () => void
}

// props for a wizard that wraps a config entity (without an expression)
export interface IConfigEntityAdaptableWizardProps<View> extends IAdaptableWizardProps<View> {
    ConfigEntities: IConfigEntity[]
    EditedConfigEntity: IConfigEntity
}

// props for a wizard that wraps a config entity that contans an Expression
export interface IConfigEntityExpressionAdaptableWizardProps<View> extends IConfigEntityAdaptableWizardProps<View> {
    Columns: Array<IColumn>
    UserFilters: IUserFilter[]
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
   }