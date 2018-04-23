import * as React from "react";
import { ControlLabel, Radio, FormGroup, FormControl, Col, Panel } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { IPlusMinusRule } from '../../../Strategy/Interface/IPlusMinusStrategy';
import { PopoverType } from '../../../Core/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper'
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IColumn } from "../../../Core/Interface/IColumn";
import { LayoutHelper } from "../../../Core/Helpers/LayoutHelper";
import { IUserFilter } from "../../../Strategy/Interface/IUserFilterStrategy";


export interface PlusMinusSummaryWizardProps extends AdaptableWizardStepProps<IPlusMinusRule> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}

export class PlusMinusSummaryWizard extends React.Component<PlusMinusSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: PlusMinusSummaryWizardProps) {
        super(props)
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Name", Value: this.props.Columns.find(c => c.ColumnId == this.props.Data.ColumnId).FriendlyName },
            { Key: "Nudge Value", Value: this.props.Data.NudgeValue },
            { Key: "Is Column Default", Value: this.props.Data.IsDefaultNudge ? "True" : "False" },
            {
                Key: "Custom Rule", Value: this.props.Data.IsDefaultNudge ?
                    "None" : ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns, this.props.UserFilters)
            },
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.PlusMinusStrategyName} />
        return <div className={cssClassName}>
            {summaryPage}
        </div>
    }


    public canNext(): boolean {
        return true
    }
    public canBack(): boolean { return true; }
    public Next(): void { /* No implementation */ }
    public Back(): void { /* No implementation */ }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return this.props.Data.IsDefaultNudge ? 2 : 1;
    }
    public StepName = this.props.StepName
}