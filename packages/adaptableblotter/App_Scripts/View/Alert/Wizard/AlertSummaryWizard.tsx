import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { ExpressionHelper } from "../../../Core/Helpers/ExpressionHelper";
import { IAlertDefinition, IUserFilter } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";


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

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Rule", Value: this.props.Data.Description },
            { Key: "Alert Type", Value: this.props.Data.MessageType },
            {
                Key: "Query", Value: ExpressionHelper.IsNotEmptyExpression(this.props.Data.Expression) ?
                    ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns, this.props.UserFilters) :
                    "None"
            }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.AlertStrategyName} />
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

