import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IColumn } from "../../../Core/Interface/IColumn";
import { LayoutHelper } from "../../../Core/Helpers/LayoutHelper";
import { ILayout } from "../../../Core/Api/Interface/AdaptableBlotterObjects";

export interface LayoutSummaryWizardProps extends AdaptableWizardStepProps<ILayout> {
    Columns: IColumn[]
}

export class LayoutSummaryWizard extends React.Component<LayoutSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: LayoutSummaryWizardProps) {
        super(props)
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Columns", Value: this.getColumnNames()},
            { Key: "Grid Sorts", Value: LayoutHelper.getGridSort(this.props.Data.GridSorts, this.props.Columns) },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.LayoutStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }
    public canNext(): boolean {
        return true
    }

    private getColumnNames():string{
        let returnValue: string = ""
        this.props.Data.Columns.forEach(c=> { 
            returnValue = returnValue + this.props.Columns.find(col => col.ColumnId == c).FriendlyName + ", "
        })
        return returnValue;
    }

    public canBack(): boolean { return true; }

    public Next(): void {
        //
    }
    public Back(): void {
        // todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

