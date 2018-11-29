
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage'
import {  ReportColumnScope } from '../../../Utilities/Enums'
import { IReport } from '../../../Api/Interface/IAdaptableBlotterObjects';
import { UIHelper } from '../../UIHelper';

export class ReportExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    constructor(private props2: ExpressionWizardProps<IReport>) {
        super(props2)
        this.state = UIHelper.getExpressionBuilderState(this.props2.Data.Expression)
    }

    public Next(): void {
        this.props2.Data.Expression = this.state.Expression
    }
    public Back(): void { 
        //todo
    }

    public GetIndexStepDecrement(){
        return (this.props2.Data.ReportColumnScope== ReportColumnScope.BespokeColumns)? 1: 2;
    }
    public StepName = this.props.StepName
}