import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IReport } from '../../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare class ReportExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<IReport>);
    Next(): void;
    Back(): void;
    GetIndexStepDecrement(): 1 | 2;
    StepName: string;
}
