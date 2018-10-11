import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard'
import { CalculatedColumnExpressionWizard } from './CalculatedColumnExpressionWizard'
import { CalculatedColumnSettingsWizard } from './CalculatedColumnSettingsWizard'
import { CalculatedColumnSummaryWizard } from './CalculatedColumnSummaryWizard'
import * as StrategyConstants from '../../../Core/Constants/StrategyConstants'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CalculatedColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CalculatedColumnWizard> {
    IsExpressionValid: (expression: string) => void
    GetErrorMessage: () => string
  }

export class CalculatedColumnWizard extends React.Component<CalculatedColumnWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Create Column", "Write Expression", "Summary"]
        
        return <div className={this.props.cssClassName}>
        <AdaptableWizard
                FriendlyName={StrategyIds.CalculatedColumnStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                cssClassName={this.props.cssClassName}
                Steps={[
                    <CalculatedColumnSettingsWizard  cssClassName={this.props.cssClassName} StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <CalculatedColumnExpressionWizard  cssClassName={this.props.cssClassName} StepName={stepNames[1]}
                        GetErrorMessage={this.props.GetErrorMessage}
                        IsExpressionValid={this.props.IsExpressionValid} />,
                        < CalculatedColumnSummaryWizard cssClassName={this.props.cssClassName} StepName={stepNames[2]}/>

                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} 
                canFinishWizard={() => this.props.canFinishWizard()}/>
        </div>
    }

}

