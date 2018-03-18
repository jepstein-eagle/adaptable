import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ReportColumnsWizard } from './ReportColumnsWizard'
import { ReportExpressionWizard } from './ReportExpressionWizard'
import { ReportNameWizard } from './ReportNameWizard'
import { IReport } from '../../../Strategy/Interface/IExportStrategy';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'

export class ReportWizard extends React.Component<IAdaptableBlotterObjectExpressionAdaptableWizardProps<ReportWizard>, {}> {

    render() {
        let stepNames: string[] = ["Select Columns", "Build Query", "Choose Name"]
        return <div className="adaptable_blotter_style_wizard_export">
            <AdaptableWizard
                FriendlyName={StrategyNames.ExportStrategyName}
                StepNames={stepNames}
                Steps={[
                    <ReportColumnsWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <ReportExpressionWizard StepName={stepNames[1]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    <ReportNameWizard StepName={stepNames[2]} Reports={this.props.ConfigEntities as IReport[]} />,
                ]}
                Data={this.props.EditedAdaptableBlotterObject as IReport}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}

