import { AdaptableWizardStep, ExpressionWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionBuilderPage } from '../../ExpressionBuilder/ExpressionBuilderPage';
import { IAlertDefinition } from "../../../Utilities/Interface/BlotterObjects/IAlertDefinition";
export declare class AlertExpressionWizard extends ExpressionBuilderPage implements AdaptableWizardStep {
    private props2;
    constructor(props2: ExpressionWizardProps<IAlertDefinition>);
    Next(): void;
}
