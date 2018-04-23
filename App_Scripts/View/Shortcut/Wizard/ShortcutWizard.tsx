import { IShortcut } from '../../../Strategy/Interface/IShortcutStrategy';
import * as React from "react";
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { ShortcutSettingsWizard } from './ShortcutSettingsWizard'
import { ShortcutSummaryWizard } from './ShortcutSummaryWizard'
import { ShortcutTypeWizard } from './ShortcutTypeWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface ShortcutWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ShortcutWizard> {
    NumericKeysAvailable: Array<string>
    DateKeysAvailable: Array<string>
}

export class ShortcutWizard extends React.Component<ShortcutWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Column Type", "Settings"]

        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyNames.ShortcutStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <ShortcutTypeWizard  cssClassName={this.props.cssClassName} StepName={stepNames[0]} />,
                    <ShortcutSettingsWizard  cssClassName={this.props.cssClassName} StepName={stepNames[1]} NumericKeysAvailable={this.props.NumericKeysAvailable} DateKeysAvailable={this.props.DateKeysAvailable} />,
                    < ShortcutSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} />
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
