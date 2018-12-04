import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IColumn } from '../../../Api/Interface/IColumn';
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IChartDefinition } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import * as GeneralConstants from '../../../Utilities/Constants/GeneralConstants';
import { IKeyValuePair } from "../../../Api/Interface/Interfaces";


export interface ChartSummaryWizardProps extends AdaptableWizardStepProps<IChartDefinition> {
    Columns: IColumn[]
}

export class ChartSummaryWizard extends React.Component<ChartSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ChartSummaryWizardProps) {
        super(props);
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"
        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Type", Value: this.props.Data.Type },
            { Key: "Y Axis Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.YAxisColumnId, this.props.Columns) },
            { Key: "X Axis Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.XAxisColumnId, this.props.Columns) },
            { Key: "X Axis Values", Value: this.getColumnValuesList( this.props.Data.XAxisColumnValues) },
            {
                Key: "Additional Column", Value: (this.props.Data.AdditionalColumnId) ?
                    ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.AdditionalColumnId, this.props.Columns) :
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