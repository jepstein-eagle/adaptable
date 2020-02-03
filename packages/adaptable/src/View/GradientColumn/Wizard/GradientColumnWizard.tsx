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
  extends AdaptableObjectExpressionAdaptableWizardProps<GradientColumnWizard> {
  ColorPalette: Array<string>;
}

export class GradientColumnWizard extends React.Component<GradientColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.GradientColumnStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <GradientColumnSelectColumnWizard />,
            },
            {
              StepName: 'Base Value',
              Index: 1,
              Element: <GradientColumnBaseValuesWizard />,
            },
            {
              StepName: 'Positive Value',
              Index: 2,
              Element: (
                <GradientColumnPositiveValuesWizard ColorPalette={this.props.ColorPalette} />
              ),
            },
            {
              StepName: 'Negative Value',
              Index: 3,
              Element: (
                <GradientColumnNegativeValuesWizard ColorPalette={this.props.ColorPalette} />
              ),
            },

            {
              StepName: 'Summary',
              Index: 4,
              Element: <GradientColumnSummaryWizard />,
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
