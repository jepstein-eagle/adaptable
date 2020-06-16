import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { PercentBarSelectColumnWizard } from '././PercentBarSelectColumnWizard';
import { PercentBarSummaryWizard } from '././PercentBarSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBarSettingsWizard } from './PercentBarSettingsWizard';
import { PercentBarRangesWizard } from './PercentBarRangesWizard';

export interface PercentBarWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<PercentBarWizard> {}

export class PercentBarWizard extends React.Component<PercentBarWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.PercentBarStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <PercentBarSelectColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Ranges',
              Index: 1,
              Element: <PercentBarRangesWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <PercentBarSettingsWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PercentBarSummaryWizard Api={this.props.Api} />,
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
