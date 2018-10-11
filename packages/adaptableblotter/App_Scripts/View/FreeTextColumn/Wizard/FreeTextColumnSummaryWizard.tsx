import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { FontWeight, FontStyle, FontSize } from '../../../Core/Enums';
import { StyleComponent } from '../../Components/StyleComponent';
import { StringExtensions } from "../../../Core/Extensions/StringExtensions";
import { StyleVisualItem } from '../../Components/StyleVisualItem'
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IColumn } from "../../../Core/Interface/IColumn";
import { IFreeTextColumn } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";


export interface FreeTextColumnSummaryWizardProps extends AdaptableWizardStepProps<IFreeTextColumn> {
    Columns: IColumn[]
}
export class FreeTextColumnSummaryWizard extends React.Component<FreeTextColumnSummaryWizardProps, {}> implements AdaptableWizardStep {

    constructor(props: FreeTextColumnSummaryWizardProps) {
        super(props)
        this.state = { ColumnId: this.props.Data.ColumnId }
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "-summary"
       
        let keyValuePairs: KeyValuePair[] = [
            { Key: "ColumnId", Value: this.props.Data.ColumnId },
            { Key: "Default Value", Value: this.props.Data.DefaultValue },
            { Key: "No. Stored Values", Value: ArrayExtensions.IsNullOrEmpty(this.props.Data.StoredValues) ? 0 : this.props.Data.StoredValues.length },
         ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.FreeTextColumnStrategyName} />
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


