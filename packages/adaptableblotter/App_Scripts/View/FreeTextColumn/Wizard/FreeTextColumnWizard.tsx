import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { FreeTextColumnSettingsWizard } from './FreeTextColumnSettingsWizard'
import { FreeTextColumnSummaryWizard } from './FreeTextColumnSummaryWizard'
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface FreeTextColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<FreeTextColumnWizard> {
}

export class FreeTextColumnWizard extends React.Component<FreeTextColumnWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Settings", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.FreeTextColumnStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={
                    [
                        <FreeTextColumnSettingsWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                        <FreeTextColumnSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} Columns={this.props.Columns} />
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
