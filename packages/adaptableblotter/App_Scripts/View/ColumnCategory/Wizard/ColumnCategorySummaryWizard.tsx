import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IColumnCategory, IKeyValuePair } from "../../../Api/Interface/Interfaces";
import { IColumn } from "../../../Api/Interface/IColumn";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";


export interface ColumnCategorySummaryWizardProps extends AdaptableWizardStepProps<IColumnCategory> {
    Columns: IColumn[]
}

export class ColumnCategorySummaryWizard extends React.Component<ColumnCategorySummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ColumnCategorySummaryWizardProps) {
        super(props)
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.ColumnCategoryId },
            { Key: "Columns", Value: this.getColumnNames() },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.ColumnCategoryStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }
    public canNext(): boolean {
        return true
    }

    private getColumnNames():string{
        return ColumnHelper.getFriendlyNamesFromColumnIds(this.props.Data.ColumnIds, this.props.Columns).join(", ");
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

