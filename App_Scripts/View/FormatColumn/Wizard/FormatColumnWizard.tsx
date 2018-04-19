import { IFormatColumn } from '../../../Strategy/Interface/IFormatColumnStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { FormatColumnScopeWizard } from './FormatColumnScopeWizard'
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface FormatColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<FormatColumnWizard> {
    ColorPalette: string[],
    StyleClassNames: string[]
}

export class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Create Style"]
        return <div className="adaptable_blotter_style_wizard_formatcolumn">
            <AdaptableWizard
                FriendlyName={StrategyNames.FormatColumnStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                Steps={
                    [
                        <FormatColumnScopeWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                        <FormatColumnStyleWizard StepName={stepNames[1]} ColorPalette={this.props.ColorPalette} StyleClassNames={this.props.StyleClassNames} />
                    ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }
}

