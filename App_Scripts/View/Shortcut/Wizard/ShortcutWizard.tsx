import { IShortcut } from '../../../Strategy/Interface/IShortcutStrategy';
import * as React from "react";
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { ShortcutSettingsWizard } from './ShortcutSettingsWizard'
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

        return <div className="adaptable_blotter_style_wizard_shortcut">
            <AdaptableWizard
                FriendlyName={StrategyNames.ShortcutStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                Steps={[
                    <ShortcutTypeWizard StepName={stepNames[0]} />,
                    <ShortcutSettingsWizard StepName={stepNames[1]} NumericKeysAvailable={this.props.NumericKeysAvailable} DateKeysAvailable={this.props.DateKeysAvailable} />,
                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}
