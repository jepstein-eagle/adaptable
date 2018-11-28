import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IShortcut } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { IKeyValuePair } from "../../../Core/Interface/Interfaces";

export interface ShortcutSummaryWizardProps extends AdaptableWizardStepProps<IShortcut> {
}

export class ShortcutSummaryWizard extends React.Component<ShortcutSummaryWizardProps, {}> implements AdaptableWizardStep {

    constructor(props: ShortcutSummaryWizardProps) {
        super(props);

    }

    render() {

        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Key", Value: this.props.Data.ShortcutKey },
            { Key: "Result", Value: this.props.Data.ShortcutResult },
            { Key: "Operation", Value: this.props.Data.ShortcutOperation },
            { Key: "Columns", Value: this.props.Data.ColumnType },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.ShortcutStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }



    public canNext(): boolean {
        return true
    }

    public canBack(): boolean { return true; }
    public Next(): void {
        //
    }
    public Back(): void { /* no implementation required   */ }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = this.props.StepName
}




