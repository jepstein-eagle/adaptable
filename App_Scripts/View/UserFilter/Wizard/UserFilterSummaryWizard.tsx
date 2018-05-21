import * as React from "react";
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock, Well } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IUserFilter } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper';
import { StringExtensions } from '../../../Core/Extensions/StringExtensions'
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";

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

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Query", Value: ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns, this.props.UserFilters) }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.UserFilterStrategyName} />
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