import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
export declare class ChartXAxisExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<IChartDefinition>);
    Next(): void;
    canBack(): boolean;
}
