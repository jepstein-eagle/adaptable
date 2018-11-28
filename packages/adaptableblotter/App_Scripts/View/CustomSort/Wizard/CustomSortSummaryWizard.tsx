import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IColumn } from '../../../Core/Interface/IColumn';
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { ICustomSort } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { IKeyValuePair } from "../../../Core/Interface/Interfaces";


export interface CustomSortSummaryWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: IColumn[]
}

export class CustomSortSummaryWizard extends React.Component<CustomSortSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CustomSortSummaryWizardProps) {
        super(props);
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"
        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Values", Value: this.props.Data.SortedValues.join(', ') }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.CustomSortStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

    public canNext(): boolean { return true }
    public canBack(): boolean { return true; }
    public Next():  void { 
       // todo
    }
    public Back():  void { 
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