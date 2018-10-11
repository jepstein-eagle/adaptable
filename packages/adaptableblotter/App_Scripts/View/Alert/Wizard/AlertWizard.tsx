import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { AlertSelectColumnWizard } from './AlertSelectColumnWizard'
import { AlertExpressionWizard } from './AlertExpressionWizard'
import { AlertRulesWizard } from './AlertRulesWizard'
import { AlertSummaryWizard } from './AlertSummaryWizard'
import { AlertSelectQueryWizard } from './AlertSelectQueryWizard'
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { AlertTypeWizard } from "./AlertTypeWizard";

export interface AlertWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<AlertWizard> {
}

export class AlertWizard extends React.Component<AlertWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Alert Rules",  "Type","Add Query", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.AlertStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <AlertSelectColumnWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <AlertRulesWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns} />,
                    <AlertTypeWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} />,
                    <AlertSelectQueryWizard cssClassName={this.props.cssClassName} StepName={stepNames[3]} Columns={this.props.Columns} />,
                    <AlertExpressionWizard cssClassName={this.props.cssClassName} StepName={stepNames[4]} Columns={this.props.Columns}
                        UserFilters={this.props.UserFilters}
                        SystemFilters={this.props.SystemFilters}
                        Blotter={this.props.Blotter}
                        />,
                    < AlertSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[4]} Columns={this.props.Columns} UserFilters={this.props.UserFilters} />

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