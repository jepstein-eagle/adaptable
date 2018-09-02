import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IColumn } from '../../../Core/Interface/IColumn';
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IChartDefinition } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { StringExtensions } from "../../../Core/Extensions/StringExtensions";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";


export interface ChartSummaryWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    Columns: IColumn[]
}

export class ChartSummaryWizard extends React.Component<ChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ChartSummaryWizardProps) {
        super(props);
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"
        let keyValuePairs: KeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Type", Value: this.props.Data.Type },
            { Key: "Y Axis Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.YAxisColumn, this.props.Columns) },
            { Key: "X Axis Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.XAxisColumn, this.props.Columns) },
            { Key: "X Axis Values", Value: this.props.Data.XAxisColumnValues.join(', ')},
            {
                Key: "Additional Column", Value: (this.props.Data.AdditionalColumn) ?
                    ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.AdditionalColumn, this.props.Columns) :
                    "None"
            },
            { Key: "Additional Column Values", Value: (this.props.Data.AdditionalColumnValues) ? this.props.Data.AdditionalColumnValues.join(', ') : "n/a" },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.ChartStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
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
    public StepName = this.props.StepName
}