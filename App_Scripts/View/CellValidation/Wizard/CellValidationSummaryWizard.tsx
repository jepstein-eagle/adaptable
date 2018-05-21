import * as React from "react";
import { Radio, Col, Panel, HelpBlock } from 'react-bootstrap';
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { PopoverType } from '../../../Core/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { ExpressionHelper } from "../../../Core/Helpers/ExpressionHelper";
import { ICellValidationRule, IUserFilter } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { ColumnHelper } from "../../../Core/Helpers/ColumnHelper";


export interface CellValidationSummaryWizardProps extends AdaptableWizardStepProps<ICellValidationRule> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}


export class CellValidationSummaryWizard extends React.Component<CellValidationSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: CellValidationSummaryWizardProps) {
        super(props)
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Column", Value: ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Mode", Value: this.props.Data.CellValidationMode },
            { Key: "Rule", Value: this.props.Data.Description },
            {
                Key: "Query", Value: this.props.Data.HasExpression ?
                    ExpressionHelper.ConvertExpressionToString(this.props.Data.OtherExpression, this.props.Columns, this.props.UserFilters) :
                    "None"
            }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.CellValidationStrategyName} />
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
        return this.props.Data.HasExpression ? 1 : 2;
    }
    public StepName = this.props.StepName
}

