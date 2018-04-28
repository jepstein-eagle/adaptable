import { IReport, IUserFilter } from "../../../Core/Api/AdaptableBlotterObjects";
import * as React from "react";
import { Panel, FormGroup, Col, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from './../../Wizard/Interface/IAdaptableWizard'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { KeyValuePair } from "../../UIInterfaces";
import { WizardSummaryPage } from "../../Components/WizardSummaryPage";
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { ReportColumnScope, ReportRowScope } from '../../../Core/Enums';
import { IColumn } from '../../../Core/Interface/IColumn';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper';
import { ReportHelper } from '../../../Core/Helpers/ReportHelper';

export interface ReportSummaryWizardProps extends AdaptableWizardStepProps<IReport> {
    Columns: IColumn[]
    UserFilters: IUserFilter[]
}

export class ReportSummaryWizard extends React.Component<ReportSummaryWizardProps, {}> implements AdaptableWizardStep {
    constructor(props: ReportSummaryWizardProps) {
        super(props);
    }
    render(): any {
        let cssClassName: string = this.props.cssClassName + "-summary"

        let keyValuePairs: KeyValuePair[] = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Columns", Value: ReportHelper.GetReportColumnsDescription(this.props.Data, this.props.Columns) },
            { Key: "Rows", Value: ReportHelper.GetReportExpressionDescription(this.props.Data, this.props.Columns, this.props.UserFilters) }
        ]

        let summaryPage = <WizardSummaryPage cssClassName={cssClassName} KeyValuePairs={keyValuePairs} header={StrategyNames.ExportStrategyName} />
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
    public StepName = this.props.StepName
}

