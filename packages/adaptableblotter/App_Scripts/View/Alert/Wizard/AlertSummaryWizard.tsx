import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { ExpressionHelper } from "../../../Utilities/Helpers/ExpressionHelper";
import { IAlertDefinition, IUserFilter } from "../../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { AlertHelper } from "../../../Utilities/Helpers/AlertHelper";
import { IKeyValuePair } from "../../../Core/Interface/Interfaces";


export interface AlertSummaryWizardProps extends AdaptableWizardStepProps<IAlertDefinition> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}


export class AlertSummaryWizard extends React.Component<AlertSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: AlertSummaryWizardProps) {
        super(props)
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Rule", Value: AlertHelper.createAlertDescription(this.props.Data, this.props.Columns) },
            { Key: "Alert Type", Value: this.props.Data.MessageType },
            {
                Key: "Query", Value: ExpressionHelper.IsNotEmptyExpression(this.props.Data.Expression) ?
                    ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns) :
                    "None"
            }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.AlertStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>

    }

    public canNext(): boolean {
        return true;
    }

    public canBack(): boolean { return true; }
    public Next(): void { /* no implementation */ }

    public Back(): void { /* no implementation */ }

    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return ExpressionHelper.IsEmptyExpression(this.props.Data.Expression) ? 2 : 1;
    }
    public StepName = this.props.StepName
}

