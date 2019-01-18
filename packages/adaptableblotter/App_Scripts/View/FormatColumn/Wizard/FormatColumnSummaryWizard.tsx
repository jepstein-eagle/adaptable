import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StyleVisualItem } from '../../Components/StyleVisualItem'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IColumn } from "../../../Api/Interface/IColumn";
import { IFormatColumn } from "../../../Utilities/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { IKeyValuePair } from "../../../Utilities/Interface/IKeyValuePair";


export interface FormatColumnSummaryWizardProps extends AdaptableWizardStepProps<IFormatColumn> {
    Columns: IColumn[]
}
export class FormatColumnSummaryWizard extends React.Component<FormatColumnSummaryWizardProps, {}> implements AdaptableWizardStep {

    constructor(props: FormatColumnSummaryWizardProps) {
        super(props)
        this.state = { Style: this.props.Data.Style }
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "-summary"
       
        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Scope", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId,  this.props.Columns)},
            { Key: "Style", Value: <StyleVisualItem Style={this.props.Data.Style} /> },
         ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.FormatColumnStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }


    public canNext(): boolean {
        return true;
    }
    public canBack(): boolean { return true; }
    public Next(): void {
  // todo   
}
    public Back(): void { 
        // todo
    }

    public GetIndexStepIncrement(){
        return 1;
    }
    public GetIndexStepDecrement(){
        return 1;
    }



    public StepName = this.props.StepName

}


