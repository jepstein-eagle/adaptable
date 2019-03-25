import * as React from "react";
import * as StrategyConstants from '../../../../Utilities/Constants/StrategyConstants'
import { AdaptableWizardStepProps, AdaptableWizardStep } from "../../../Wizard/Interface/IAdaptableWizard";
import { IPieChartDefinition } from "../../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ColumnHelper } from "../../../../Utilities/Helpers/ColumnHelper";
import { IKeyValuePair } from "../../../../Utilities/Interface/IKeyValuePair";
import { WizardSummaryPage } from "../../../Components/WizardSummaryPage";
import { Expression } from "../../../../Utilities/Expression";
import { ExpressionHelper } from "../../../../Utilities/Helpers/ExpressionHelper";


export interface PieChartSummaryWizardProps extends AdaptableWizardStepProps<IPieChartDefinition> {
}

export class PieChartSummaryWizard extends React.Component<PieChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PieChartSummaryWizardProps) {
        super(props);
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"
      
        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Description", Value: this.props.Data.Description },
          ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.ChartStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

    private getExpressionString(expression: Expression): string {
        if (ExpressionHelper.IsEmptyExpression(expression)) {
            return "[All Column Values]"
        } else {
            return ExpressionHelper.ConvertExpressionToString(expression, this.props.Columns, false)
        }
    }

    public canNext(): boolean { return true }
    public canBack(): boolean { return true; }
    public Next(): void {
        //
    }
    public Back(): void {
        //
    }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }

}