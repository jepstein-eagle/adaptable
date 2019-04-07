import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ReminderSummaryWizard } from "./ReminderSummaryWizard";
import { ReminderAlertWizard } from "./RemindeAlertWizard";
import { ReminderScheduleWizard } from "./ReminderScheduleWizard";

export interface ReminderWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ReminderWizard> {
}

export class ReminderWizard extends React.Component<ReminderWizardProps, {}> {

    render() {
         return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ReminderStrategyName}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                      {
                        StepName: "Alert",
                        Index: 0,
                        Element: < ReminderAlertWizard />
                    },
                      {
                        StepName: "Schedule",
                        Index: 1,
                        Element: < ReminderScheduleWizard />
                    },
                      {
                        StepName: "Summary",
                        Index: 2,
                        Element: < ReminderSummaryWizard   />
                    },
                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()}
                canFinishWizard={() => this.props.canFinishWizard()}
            />

        </div>
    }

}
