import { ICustomSort } from '../../../Strategy/Interface/ICustomSortStrategy';
import * as React from "react";
import { Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IColumn } from '../../../Core/Interface/IColumn';
import { SelectionMode } from '../../../Core/Enums';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'


export interface CustomSortSummaryWizardProps extends AdaptableWizardStepProps<ICustomSort> {
    Columns: IColumn[]
}

export class CustomSortSummaryWizard extends React.Component<CustomSortSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CustomSortSummaryWizardProps) {
        super(props);
     }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"
        let keyValuePairs: KeyValuePair[] = [
            { Key: "Column", Value: this.props.Columns.find(c => c.ColumnId == this.props.Data.ColumnId).FriendlyName   },
            { Key: "Values", Value: this.props.Data.Values.join(', ')}
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.CustomSortStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

       public canNext(): boolean { return true }
    public canBack(): boolean { return true; }
    public Next(): void {  }
    public Back(): void { }
    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }
    public StepName = this.props.StepName
}