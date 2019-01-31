import * as React from "react";
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { ShortcutSettingsWizard } from './ShortcutSettingsWizard'
import { ShortcutSummaryWizard } from './ShortcutSummaryWizard'
import { ShortcutTypeWizard } from './ShortcutTypeWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface ShortcutWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ShortcutWizard> {
    NumericKeysAvailable: Array<string>
    DateKeysAvailable: Array<string>
}

export class ShortcutWizard extends React.Component<ShortcutWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Column Type", "Settings", "Summary"]

        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.ShortcutStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Blotter={this.props.Blotter}
                Columns={this.props.Columns}
                  Steps={[
                    <ShortcutTypeWizard StepName={stepNames[0]} />,
                    <ShortcutSettingsWizard StepName={stepNames[1]} NumericKeysAvailable={this.props.NumericKeysAvailable} DateKeysAvailable={this.props.DateKeysAvailable} />,
                    <ShortcutSummaryWizard StepName={stepNames[2]} />
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
