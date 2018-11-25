import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { ILinkedColumn } from "../../../Core/Interface/Interfaces";
import { IColumn } from "../../../Core/Interface/IColumn";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";


export interface LinkedColumnSummaryWizardProps extends AdaptableWizardStepProps<ILinkedColumn> {
    Columns: IColumn[]
}

export class LinkedColumnSummaryWizard extends React.Component<LinkedColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: LinkedColumnSummaryWizardProps) {
        super(props)
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.LinkedColumnId },
            { Key: "Columns", Value: this.getColumnNames() },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.LinkedColumnStrategyName} />
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

