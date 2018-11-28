import { IReport, IUserFilter } from "../../../Api/Interface/IAdaptableBlotterObjects";
import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IColumn } from '../../../Core/Interface/IColumn';
import { ReportHelper } from '../../../Utilities/Helpers/ReportHelper';
import { IKeyValuePair } from "../../../Core/Interface/Interfaces";

export interface ReportSummaryWizardProps extends AdaptableWizardStepProps<IReport> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}

export class ReportSummaryWizard extends React.Component<ReportSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ReportSummaryWizardProps) {
        super(props);
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Columns", Value: ReportHelper.GetReportColumnsDescription(this.props.Data, this.props.Columns) },
            { Key: "Rows", Value: ReportHelper.GetReportExpressionDescription(this.props.Data, this.props.Columns, this.props.UserFilters) }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.ExportStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

    public canNext(): boolean { return true }
    public canBack(): boolean { return true; }
    public Next(): void { //
    }
    public Back(): void {
        //todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

