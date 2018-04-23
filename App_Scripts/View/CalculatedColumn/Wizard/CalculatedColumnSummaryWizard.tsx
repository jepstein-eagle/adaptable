import * as React from "react";
import { Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '.././../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { ICalculatedColumn } from "../../../Strategy/Interface/ICalculatedColumnStrategy";
import { IColumn } from "../../../Core/Interface/IColumn";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'


export interface CalculatedColumnSummaryWizardProps extends AdaptableWizardStepProps<ICalculatedColumn> {
}

export class CalculatedColumnSummaryWizard extends React.Component<CalculatedColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CalculatedColumnSummaryWizardProps) {
        super(props);
        this.state = { ColumnName: this.props.Data.ColumnId, ErrorMessage: null }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.ColumnId },
            { Key: "Expression", Value: this.props.Data.GetValueFunc }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.CalculatedColumnStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

      public canNext(): boolean { return true; }
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
