import * as React from "react";
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { FormatColumnScopeWizard } from './FormatColumnScopeWizard'
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard'
import { FormatColumnSummaryWizard } from './FormatColumnSummaryWizard'
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface FormatColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<FormatColumnWizard> {
    ColorPalette: string[],
    StyleClassNames: string[]
}

export class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Select Column", "Create Style", "Summary"]
        return <div className={this.props.cssClassName}>
            <AdaptableWizard
                FriendlyName={StrategyConstants.FormatColumnStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={
                    [
                        <FormatColumnScopeWizard cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                        <FormatColumnStyleWizard cssClassName={this.props.cssClassName} StepName={stepNames[1]} ColorPalette={this.props.ColorPalette} StyleClassNames={this.props.StyleClassNames} />,
                        < FormatColumnSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]} Columns={this.props.Columns} />
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

