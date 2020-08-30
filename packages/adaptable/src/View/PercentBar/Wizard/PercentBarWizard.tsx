import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { PercentBarSelectColumnWizard } from '././PercentBarSelectColumnWizard';
import { PercentBarSummaryWizard } from '././PercentBarSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBarSettingsWizard } from './PercentBarSettingsWizard';
import { PercentBarRangesWizard } from './PercentBarRangesWizard';

export interface PercentBarWizardProps
  extends AdaptableObjectAdaptableWizardProps<PercentBarWizard> {}

export class PercentBarWizard extends React.Component<PercentBarWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.PercentBarStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <PercentBarSelectColumnWizard api={this.props.api} />,
            },
            {
              StepName: 'Ranges',
              Index: 1,
              Element: <PercentBarRangesWizard api={this.props.api} />,
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <PercentBarSettingsWizard api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PercentBarSummaryWizard api={this.props.api} />,
            },
          ]}
          data={this.props.editedAdaptableObject}
          stepStartIndex={this.props.wizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
