import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { GradientColumnSelectColumnWizard } from './GradientColumnSelectColumnWizard';
import { GradientColumnSummaryWizard } from './GradientColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumnSettingsWizard } from './GradientColumnSettingsWizard';

export interface GradientColumnWizardProps
  extends AdaptableObjectAdaptableWizardProps<GradientColumnWizard> {}

export class GradientColumnWizard extends React.Component<GradientColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.GradientColumnStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <GradientColumnSelectColumnWizard api={this.props.api} />,
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: <GradientColumnSettingsWizard api={this.props.api} />,
            },

            {
              StepName: 'Summary',
              Index: 2,
              Element: <GradientColumnSummaryWizard api={this.props.api} />,
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
