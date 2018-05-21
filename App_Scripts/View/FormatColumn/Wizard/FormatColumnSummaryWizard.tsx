import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { FontWeight, FontStyle, FontSize } from '../../../Core/Enums';
import { StyleComponent } from '../../Components/StyleComponent';
import { StringExtensions } from "../../../Core/Extensions/StringExtensions";
import { StyleVisualItem } from '../../Components/StyleVisualItem'
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IColumn } from "../../../Core/Interface/IColumn";
import { IFormatColumn } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";


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
       
        let keyValuePairs: KeyValuePair[] = [
            { Key: "Scope", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId,  this.props.Columns)},
            { Key: "Style", Value: <StyleVisualItem Style={this.props.Data.Style} /> },
         ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.FormatColumnStrategyName} />
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


