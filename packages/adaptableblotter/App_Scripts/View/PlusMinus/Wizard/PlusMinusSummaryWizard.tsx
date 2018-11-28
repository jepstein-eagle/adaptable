import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IColumn } from "../../../Core/Interface/IColumn";
import { IUserFilter, IPlusMinusRule } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { IKeyValuePair } from "../../../Core/Interface/Interfaces";

export interface PlusMinusSummaryWizardProps extends AdaptableWizardStepProps<IPlusMinusRule> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}

export class PlusMinusSummaryWizard extends React.Component<PlusMinusSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PlusMinusSummaryWizardProps) {
        super(props)
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId,  this.props.Columns)},
            { Key: "Nudge Value", Value: this.props.Data.NudgeValue },
            { Key: "Is Column Default", Value: this.props.Data.IsDefaultNudge ? "True" : "False" },
            {
                Key: "Custom Rule", Value: this.props.Data.IsDefaultNudge ?
                    "None" : ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns)
            },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.PlusMinusStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }


    public canNext(): boolean {
        return true
    }
    public canBack(): boolean { return true; }
    public Next(): void { /* No implementation */ }
    public Back(): void { /* No implementation */ }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return this.props.Data.IsDefaultNudge ? 2 : 1;
    }
    public StepName = this.props.StepName
}