import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IAdvancedSearch } from '../../../Core/Api/Interface/IAdaptableBlotterObjects';
export declare class AdvancedSearchExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    props2: ExpressionWizardProps<IAdvancedSearch>;
    constructor(props2: ExpressionWizardProps<IAdvancedSearch>);
    Next(): void;
    Back(): void;
    StepName: string;
}
