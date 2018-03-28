import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ReportColumnChooserWizard } from './ReportColumnChooserWizard'
import { ReportColumnTypeWizard } from './ReportColumnTypeWizard'
import { ReportExpressionWizard } from './ReportExpressionWizard'
import { ReportNameWizard } from './ReportNameWizard'
import { IReport } from '../../../Strategy/Interface/IExportStrategy';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from './../../Wizard/Interface/IAdaptableWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'

export class ReportWizard extends React.Component<IAdaptableBlotterObjectExpressionAdaptableWizardProps<ReportWizard>, {}> {

    render() {
        let stepNames: string[] = ["Select Column Type", "Choose Columns", "Build Query", "Choose Name"]
        return <div className="adaptable_blotter_style_wizard_export">
            <AdaptableWizard
                FriendlyName={StrategyNames.ExportStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                Steps={[
                    <ReportColumnTypeWizard StepName={stepNames[0]}  />,
                    <ReportColumnChooserWizard StepName={stepNames[1]} Columns={this.props.Columns} />,
                    <ReportExpressionWizard StepName={stepNames[2]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        SelectedColumnId={null}
                        getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                    <ReportNameWizard StepName={stepNames[3]} Reports={this.props.ConfigEntities as IReport[]} />,
                ]}
                Data={this.props.EditedAdaptableBlotterObject as IReport}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}

