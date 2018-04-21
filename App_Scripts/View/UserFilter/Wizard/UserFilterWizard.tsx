import { IUserFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { ExpressionMode } from '../../../Core/Enums'
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { UserFilterSettingsWizard } from './UserFilterSettingsWizard'
import { UserFilterExpressionWizard } from './UserFilterExpressionWizard'
import { UserFilterSelectColumnWizard } from './UserFilterSelectColumnWizard'
import { DistinctCriteriaPairValue } from '../../../Core/Enums'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';


export interface UserFilterWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<UserFilterWizard> {
      SelectedColumnId: string
  }

export class UserFilterWizard extends React.Component<UserFilterWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Build Query", "Settings"]

        return <div className="adaptable_blotter_style_wizard_userfilter">
            <AdaptableWizard
                FriendlyName={StrategyNames.UserFilterStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                Steps={
                    [
                        <UserFilterSelectColumnWizard Columns={this.props.Columns} StepName={stepNames[0]} />,
                        <UserFilterExpressionWizard
                            StepName={stepNames[1]}
                            Columns={this.props.Columns}
                            UserFilters={this.props.UserFilters}
                            SystemFilters={this.props.SystemFilters}
                            ExpressionMode={ExpressionMode.SingleColumn}
                            SelectedColumnId={this.props.SelectedColumnId}
                            getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList} />,
                        <UserFilterSettingsWizard
                            StepName={stepNames[2]}
                            UserFilters={this.props.UserFilters}
                            Columns={this.props.Columns} />,
                    ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }
}

