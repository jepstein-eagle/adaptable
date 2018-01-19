import { IColumn, IRawValueDisplayValuePair } from '../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../ExpressionBuilder/ExpressionBuilderPage'
import { IUserFilter } from '../../Core/Interface/IExpression';
import { DistinctCriteriaPairValue } from '../../Core/Enums'

export interface UserFilterExpressionWizardProps extends AdaptableWizardStepProps<IUserFilter> {
    ColumnList: Array<IColumn>
    UserFilters: IUserFilter[]
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}

export class UserFilterExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: UserFilterExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: props2.Data.ColumnId
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    
    public StepName = "User Filter: Create Query"
}