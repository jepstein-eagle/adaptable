import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IColumn } from '../../../Core/Interface/IColumn';
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IChartDefinition } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { StringExtensions } from "../../../Core/Extensions/StringExtensions";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";
import * as GeneralConstants from '../../../Core/Constants/GeneralConstants';


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
            { Key: "X Axis Values", Value: this.getColumnValuesList( this.props.Data.XAxisColumnValues) },
            {
                Key: "Additional Column", Value: (this.props.Data.AdditionalColumn) ?
                    ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.AdditionalColumn, this.props.Columns) :
                    "None"
            },
            { Key: "Additional Column Values", Value: (this.props.Data.AdditionalColumnValues) ? this.getColumnValuesList( this.props.Data.AdditionalColumnValues) : "n/a" },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.ChartStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

    private getColumnValuesList(columnValueArray: string[]): string {
        if (columnValueArray[0] == GeneralConstants.ALL_COLUMN_VALUES) {
            return "All Column Values"
        } else {
            return columnValueArray.join(', ')
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
    public StepName = this.props.StepName
}