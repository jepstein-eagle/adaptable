import * as React from "react";
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IKeyValuePair } from "../../../Utilities/Interface/IKeyValuePair";
import { IAutoExport } from "../../../Utilities/Interface/BlotterObjects/IReport";

export interface AutoExportSummaryWizardProps extends AdaptableWizardStepProps<IAutoExport> {
    
}

export class AutoExportSummaryWizard extends React.Component<AutoExportSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: AutoExportSummaryWizardProps) {
        super(props);
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Destination", Value: this.props.Data.ExportDestination }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.ExportStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }

    public canNext(): boolean { return true }
    public canBack(): boolean { return true; }
    public Next(): void { //
    }
    public Back(): void {
        //todo
    }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
   
}

