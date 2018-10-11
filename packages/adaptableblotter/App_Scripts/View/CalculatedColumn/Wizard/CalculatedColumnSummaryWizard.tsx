import * as React from "react";
import { Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { IColumn } from "../../../Core/Interface/IColumn";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { ICalculatedColumn } from "../../../Core/Api/Interface/IAdaptableBlotterObjects";


export interface CalculatedColumnSummaryWizardProps extends AdaptableWizardStepProps<ICalculatedColumn> {
}

export class CalculatedColumnSummaryWizard extends React.Component<CalculatedColumnSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CalculatedColumnSummaryWizardProps) {
        super(props);
        this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null }
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.ColumnId },
            { Key: "Expression", Value: this.props.Data.ColumnExpression }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyIds.CalculatedColumnStrategyName} />
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
