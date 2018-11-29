import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IColumn } from "../../../Core/Interface/IColumn";
import { LayoutHelper } from "../../../Utilities/Helpers/LayoutHelper";
import { ILayout } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { IKeyValuePair } from "../../../Core/Interface/Interfaces";

export interface LayoutSummaryWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: IColumn[]
}

export class LayoutSummaryWizard extends React.Component<LayoutSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: LayoutSummaryWizardProps) {
        super(props)
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Columns", Value: this.getColumnNames()},
            { Key: "Grid Sorts", Value: LayoutHelper.getGridSort(this.props.Data.GridSorts, this.props.Columns) },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.LayoutStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }
    public canNext(): boolean {
        return true
    }

    private getColumnNames():string{
        return ColumnHelper.getFriendlyNamesFromColumnIds(this.props.Data.Columns, this.props.Columns).join(", ");
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        //
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

