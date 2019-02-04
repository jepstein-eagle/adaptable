import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { AlertSelectColumnWizard } from './AlertSelectColumnWizard'
import { AlertExpressionWizard } from './AlertExpressionWizard'
import { AlertRulesWizard } from './AlertRulesWizard'
import { AlertSummaryWizard } from './AlertSummaryWizard'
import { AlertSelectQueryWizard } from './AlertSelectQueryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AlertTypeWizard } from "./AlertTypeWizard";

export interface AlertWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<AlertWizard> {
}

export class AlertWizard extends React.Component<AlertWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Column", "Rules", "Type", "Query", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.AlertStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={[
                    <AlertSelectColumnWizard StepName={stepNames[0]} />,
                    <AlertRulesWizard StepName={stepNames[1]} />,
                    <AlertTypeWizard StepName={stepNames[2]} />,
                    <AlertSelectQueryWizard StepName={stepNames[3]} />,
                    <AlertExpressionWizard StepName={stepNames[4]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                    />,
                    < AlertSummaryWizard StepName={stepNames[4]} UserFilters={this.props.UserFilters} />

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