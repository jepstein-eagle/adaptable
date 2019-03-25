import { ExpressionBuilderPage } from "../../../ExpressionBuilder/ExpressionBuilderPage";
import { AdaptableWizardStep, ExpressionWizardProps } from "../../../Wizard/Interface/IAdaptableWizard";
import { ICategoryChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export declare class CategoryChartXAxisExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<ICategoryChartDefinition>);
    Next(): void;
    canBack(): boolean;
}
