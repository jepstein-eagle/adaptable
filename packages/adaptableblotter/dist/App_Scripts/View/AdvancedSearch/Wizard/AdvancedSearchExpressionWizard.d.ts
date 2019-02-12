import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IAdvancedSearch } from "../../../Utilities/Interface/BlotterObjects/IAdvancedSearch";
export declare class AdvancedSearchExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    props2: ExpressionWizardProps<IAdvancedSearch>;
    constructor(props2: ExpressionWizardProps<IAdvancedSearch>);
    Next(): void;
    Back(): void;
}
