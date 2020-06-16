import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { GradientColumnSelectColumnWizard } from './GradientColumnSelectColumnWizard';
import { GradientColumnSummaryWizard } from './GradientColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumnBaseValuesWizard } from './GradientColumnBaseValuesWizard';
import { GradientColumnPositiveValuesWizard } from './GradientColumnPositiveValuesWizard';
import { GradientColumnNegativeValuesWizard } from './GradientColumnNegativeValuesWizard';

export interface GradientColumnWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<GradientColumnWizard> {}

export class GradientColumnWizard extends React.Component<GradientColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.GradientColumnStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <GradientColumnSelectColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Base Value',
              Index: 1,
              Element: <GradientColumnBaseValuesWizard Api={this.props.Api} />,
            },
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

            {
              StepName: 'Summary',
              Index: 4,
              Element: <GradientColumnSummaryWizard Api={this.props.Api} />,
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
