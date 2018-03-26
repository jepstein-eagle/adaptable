import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage'
import { IConditionalStyle } from '../../../Strategy/Interface/IConditionalStyleStrategy';
import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { IRawValueDisplayValuePair } from '../../UIInterfaces';

export class ConditionalStyleExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IConditionalStyle>) {
        super(props2)
        this.state = {
            Expression: props2.Data.Expression,
            SelectedColumnId: StringExtensions.IsNotNullOrEmpty(props2.Data.ColumnId) ? props2.Data.ColumnId : ""
        }
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { }
    public StepName = this.props.StepName
}