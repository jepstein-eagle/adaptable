import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { ICellValidationRule } from "../../../Utilities/Interface/BlotterObjects/ICellValidationRule";
export declare class CellValidationExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<ICellValidationRule>);
    Next(): void;
    StepName: string;
}
