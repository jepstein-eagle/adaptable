import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IPercentBar, IStyle } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";
import { StyleVisualItem } from "../../Components/StyleVisualItem";
import { ObjectFactory } from "../../../Core/ObjectFactory";
import { IKeyValuePair } from "../../../Core/Interface/Interfaces";

export interface PercentBarSummaryWizardProps extends AdaptableWizardStepProps<IPercentBar> {
    Columns: IColumn[]
}

export class PercentBarSummaryWizard extends React.Component<PercentBarSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PercentBarSummaryWizardProps) {
        super(props)
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let positiveStyle: IStyle = ObjectFactory.CreateEmptyStyle();
        positiveStyle.BackColor = this.props.Data.PositiveColor;
        positiveStyle.ForeColor = this.props.Data.PositiveColor;
        let negativeStyle: IStyle = ObjectFactory.CreateEmptyStyle();
        negativeStyle.BackColor = this.props.Data.NegativeColor;
        negativeStyle.ForeColor = this.props.Data.NegativeColor;

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Minimum Value", Value: this.props.Data.MinValue },
            { Key: "Maximum Value", Value: this.props.Data.MaxValue },
            { Key: "Positive Colour", Value: <StyleVisualItem Style={positiveStyle} /> },
            { Key: "Negative Colour", Value: <StyleVisualItem Style={negativeStyle} /> },
            { Key: "Show Value", Value: this.props.Data.ShowValue? "Yes": "No" },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.PercentBarStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>

    }

    public canNext(): boolean { return true; }

    public canBack(): boolean { return true; }

    public Next(): void { /* no implementation */ }

    public Back(): void { /* no implementation */ }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}

