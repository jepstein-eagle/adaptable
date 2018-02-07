import { IColumn, IRawValueDisplayValuePair } from '../../../Core/Interface/IAdaptableBlotter';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from './../../ExpressionBuilder/ExpressionBuilderPage'
import { IPlusMinusCondition } from '../../../Strategy/Interface/IPlusMinusStrategy';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { DistinctCriteriaPairValue } from '../../../Core/Enums'

export interface PlusMinusExpressionWizardProps extends AdaptableWizardStepProps<IPlusMinusCondition> {
    ColumnList: Array<IColumn>
    UserFilters: IUserFilter[]
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
}

export class PlusMinusExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: PlusMinusExpressionWizardProps) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: ""
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = this.props.StepName
}