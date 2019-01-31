import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ReportColumnChooserWizard } from './ReportColumnChooserWizard'
import { ReportColumnTypeWizard } from './ReportColumnTypeWizard'
import { ReportExpressionWizard } from './ReportExpressionWizard'
import { ReportSettingsWizard } from './ReportSettingsWizard'
import { ReportSummaryWizard } from './ReportSummaryWizard'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IReport } from "../../../Utilities/Interface/BlotterObjects/IReport";
import { ReportRowTypeWizard } from "./ReportRowTypeWizard";

export class ReportWizard extends React.Component<IAdaptableBlotterObjectExpressionAdaptableWizardProps<ReportWizard>, {}> {

    render() {
        let stepNames: string[] = ["Columns", "Rows", "Settings", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ExportStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    <ReportColumnTypeWizard StepName={stepNames[0]} />,
                    <ReportColumnChooserWizard StepName={stepNames[0]} />,
                    <ReportRowTypeWizard StepName={stepNames[1]} />,
                    <ReportExpressionWizard StepName={stepNames[1]} 
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                    />,
                    <ReportSettingsWizard StepName={stepNames[2]} Reports={this.props.ConfigEntities as IReport[]} />,
                    <ReportSummaryWizard StepName={stepNames[3]} UserFilters={this.props.UserFilters} />
                ]}
                Data={this.props.EditedAdaptableBlotterObject as IReport}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()}
            />

        </div>
    }

}

