import * as React from "react";
import { ExpressionMode } from '../../../Utilities/Enums'
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard'
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard'
import { UserFilterSelectColumnWizard } from './UserFilterSelectColumnWizard'
import { UserFilterSummaryWizard } from './UserFilterSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface UserFilterWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<UserFilterWizard> {
    SelectedColumnId: string
}

export class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Column", "Query", "Settings", "Summary"]

        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.UserFilterStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                Steps={
                    [
                        <UserFilterSelectColumnWizard
                            StepName={stepNames[0]} />,
                        <UserFilterExpressionWizard
                            StepName={stepNames[1]}
                            UserFilters={this.props.UserFilters}
                            SystemFilters={this.props.SystemFilters}
                            ExpressionMode={ExpressionMode.SingleColumn}
                            />,
                        <UserFilterSettingsWizard
                            StepName={stepNames[2]}
                            UserFilters={this.props.UserFilters}
                        />,
                        < UserFilterSummaryWizard
                            StepName={stepNames[3]}
                            UserFilters={this.props.UserFilters} />
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

