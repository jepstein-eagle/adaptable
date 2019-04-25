import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { ICalculatedColumn } from "../../../Utilities/Interface/BlotterObjects/ICalculatedColumn";
import { IKeyValuePair } from "../../../Utilities/Interface/IKeyValuePair";
import { CalculatedColumnHelper } from "../../../Utilities/Helpers/CalculatedColumnHelper";

export interface CalculatedColumnSummaryWizardProps extends AdaptableWizardStepProps<ICalculatedColumn> {
}

export class CalculatedColumnSummaryWizard extends React.Component<CalculatedColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CalculatedColumnSummaryWizardProps) {
        super(props);
        this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.ColumnId },
            { Key: "Expression", Value: CalculatedColumnHelper.getExpressionString(this.props.Data.ColumnExpression, this.props.Columns) }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.CalculatedColumnStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

    public canNext(): boolean { return true; }
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
