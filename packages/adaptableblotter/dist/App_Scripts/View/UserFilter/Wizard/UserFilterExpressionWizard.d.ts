import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IUserFilter } from '../../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare class UserFilterExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<IUserFilter>);
    Next(): void;
    StepName: string;
}
