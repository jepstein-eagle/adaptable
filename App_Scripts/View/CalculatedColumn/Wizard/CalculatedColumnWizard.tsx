import { ICalculatedColumn } from '../../../Strategy/Interface/ICalculatedColumnStrategy';
import * as React from "react";
import { IColumn } from '../../../Core/Interface/IColumn';
import { AdaptableWizard } from './../../Wizard/AdaptableWizard'
import { CalculatedColumnExpressionWizard } from './CalculatedColumnExpressionWizard'
import { CalculatedColumnSettingsWizard } from './CalculatedColumnSettingsWizard'
import * as StrategyNames from '../../../Core/Constants/StrategyNames'
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CalculatedColumnWizardProps extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<CalculatedColumnWizard> {
    IsExpressionValid: (expression: string) => void
    GetErrorMessage: () => string
  }

export class CalculatedColumnWizard extends React.Component<CalculatedColumnWizardProps, {}> {

    render() {
        let stepNames: string[] = ["Create Column", "Write Expression"]
        return <div className="adaptable_blotter_style_wizard_calculatedcolumn">
            <AdaptableWizard
                FriendlyName={StrategyNames.CalculatedColumnStrategyName}
                StepNames={stepNames}
                ModalContainer={this.props.ModalContainer}
                Steps={[
                    <CalculatedColumnSettingsWizard StepName={stepNames[0]} Columns={this.props.Columns} />,
                    <CalculatedColumnExpressionWizard StepName={stepNames[1]}
                        GetErrorMessage={this.props.GetErrorMessage}
                        IsExpressionValid={this.props.IsExpressionValid} />,
                ]}
                Data={this.props.EditedAdaptableBlotterObject}
                StepStartIndex={this.props.WizardStartIndex}
                onHide={() => this.props.onCloseWizard()}
                onFinish={() => this.props.onFinishWizard()} />
        </div>
    }

}

