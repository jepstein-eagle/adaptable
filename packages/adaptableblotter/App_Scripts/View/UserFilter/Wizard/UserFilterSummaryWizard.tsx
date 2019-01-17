import * as React from "react";
import { IColumn } from '../../../Api/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../../Wizard/Interface/IAdaptableWizard'
import { IUserFilter } from '../../../Api/Interface/IAdaptableBlotterObjects';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { ColumnHelper } from "../../../Utilities/Helpers/ColumnHelper";
import { IKeyValuePair } from "../../../Utilities/Interface/IKeyValuePair";

export interface UserFilterSummaryWizardProps extends AdaptableWizardStepProps<IUserFilter> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}



export class UserFilterSummaryWizard extends React.Component<UserFilterSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: UserFilterSummaryWizardProps) {
        super(props)

    }
    render() {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: IKeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Query", Value: ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns) }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyConstants.UserFilterStrategyName} />
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