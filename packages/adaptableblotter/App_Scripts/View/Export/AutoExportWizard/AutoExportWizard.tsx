import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { AutoExportSummaryWizard } from "./AutoExportSummaryWizard";
import { IAutoExport } from "../../../Utilities/Interface/BlotterObjects/IReport";

export class AutoExportWizard extends React.Component<IAdaptableBlotterObjectExpressionAdaptableWizardProps<AutoExportWizard>, {}> {

    render() {
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ExportStrategyName}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    
                     {
                        StepName: "Summary",
                        Index: 5,
                        Element:  <AutoExportSummaryWizard />
                    }
                ]}
                Data={this.props.EditedAdaptableBlotterObject as IAutoExport}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()}
            />

        </div>
    }

}

