import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { CalculatedColumnExpressionWizard } from './CalculatedColumnExpressionWizard';
import { CalculatedColumnSettingsWizard } from './CalculatedColumnSettingsWizard';
import { CalculatedColumnSummaryWizard } from './CalculatedColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface CalculatedColumnWizardProps
  extends AdaptableObjectAdaptableWizardProps<CalculatedColumnWizard> {
  IsExpressionValid: (expression: string) => void;
  GetErrorMessage: () => string;
}

export class CalculatedColumnWizard extends React.Component<CalculatedColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.CalculatedColumnStrategyFriendlyName}
          ModalContainer={this.props.modalContainer}
          Api={this.props.api}
          Steps={[
            {
              StepName: 'Expression',
              Index: 0,
              Element: (
                <CalculatedColumnExpressionWizard
                  GetErrorMessage={this.props.GetErrorMessage}
                  IsExpressionValid={this.props.IsExpressionValid}
                  calculatedColumnExpressionService={this.props.api.internalApi.getCalculatedColumnExpressionService()}
                  api={this.props.api}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: <CalculatedColumnSettingsWizard api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <CalculatedColumnSummaryWizard api={this.props.api} />,
            },
          ]}
          Data={this.props.editedAdaptableObject}
          StepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
