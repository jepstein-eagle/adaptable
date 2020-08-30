import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { GradientColumnSelectColumnWizard } from './GradientColumnSelectColumnWizard';
import { GradientColumnSummaryWizard } from './GradientColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumnSettingsWizard } from './GradientColumnSettingsWizard';
import { GradientColumnPositiveValuesWizard } from './GradientColumnPositiveValuesWizard';
import { GradientColumnNegativeValuesWizard } from './GradientColumnNegativeValuesWizard';

export interface GradientColumnWizardProps
  extends AdaptableObjectAdaptableWizardProps<GradientColumnWizard> {}

export class GradientColumnWizard extends React.Component<GradientColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.GradientColumnStrategyFriendlyName}
          ModalContainer={this.props.modalContainer}
          Api={this.props.api}
          Steps={[
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
            /*
            {
              StepName: 'Positive Value',
              Index: 2,
              Element: <GradientColumnPositiveValuesWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Negative Value',
              Index: 3,
              Element: <GradientColumnNegativeValuesWizard Api={this.props.Api} />,
            },
*/
            {
              StepName: 'Summary',
              Index: 2,
              Element: <GradientColumnSummaryWizard api={this.props.api} />,
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
