import { IColumn, IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { ICellValidationRule } from '../../../Strategy/Interface/ICellValidationStrategy';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'

export interface CellValidationExpressionWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    ColumnList: Array<IColumn>
    UserFilters: IUserFilter[]
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    SelectedColumnId: string
}

export class CellValidationExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: CellValidationExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.OtherExpression,
            SelectedColumnId: ""
        }
    }

    public Next(): void {
        this.props2.Data.OtherExpression = this.state.Expression
    }

    public StepName = this.props.StepName
}