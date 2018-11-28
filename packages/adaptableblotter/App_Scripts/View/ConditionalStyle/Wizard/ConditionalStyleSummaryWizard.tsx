import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StyleVisualItem } from '../../Components/StyleVisualItem'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { ExpressionHelper } from "../../../Utilities/Helpers/ExpressionHelper";
import { ConditionalStyleScope } from "../../../Core/Enums";
import { IConditionalStyle, IUserFilter } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { IKeyValuePair } from "../../../Core/Interface/Interfaces";

export interface ConditionalStyleSummaryWizardProps extends AdaptableWizardStepProps<IConditionalStyle> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}

export class ConditionalStyleSummaryWizard extends React.Component<ConditionalStyleSummaryWizardProps, {}> implements AdaptableWizardStep {

    constructor(props: ConditionalStyleSummaryWizardProps) {
        super(props)
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Scope", Value: this.getScope() },
            { Key: "Style", Value: <StyleVisualItem Style={this.props.Data.Style} /> },
            { Key: "Query", Value: ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns) }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.ConditionalStyleStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

    private getScope(): string {
        switch (this.props.Data.ConditionalStyleScope) {
            case ConditionalStyleScope.Row:
                return "Row";
            case ConditionalStyleScope.Column:
                return ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
            case ConditionalStyleScope.ColumnCategory:
                return "Category: " + this.props.Data.ColumnCategoryId

        }
    }

    public canNext(): boolean { return true; }

    public canBack(): boolean { return true; }
    public Next(): void {
        //
    }

    public Back(): void { // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}


