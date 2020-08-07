import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { SharedExpressionExpressionWizard } from './SharedExpressionExpressionWizard';
import { SharedExpressionSettingsWizard } from './SharedExpressionSettingsWizard';
import { SharedExpressionSummaryWizard } from './SharedExpressionSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface SharedExpressionWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<SharedExpressionWizard> {}

export class SharedExpressionWizard extends React.Component<SharedExpressionWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.SharedExpressionStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Expression',
              Index: 0,
              Element: <SharedExpressionExpressionWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: <SharedExpressionSettingsWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <SharedExpressionSummaryWizard Api={this.props.Api} />,
            },
          ]}
          Data={this.props.EditedAdaptableObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
