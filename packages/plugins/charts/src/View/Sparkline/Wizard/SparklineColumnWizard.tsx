import * as React from 'react';
import { AdaptableWizard } from '@adaptabletools/adaptable/src/View/Wizard/AdaptableWizard';
import { SparklineColumnSelectColumnWizard } from './SparklineColumnSelectColumnWizard';
import { SparklineColumnSummaryWizard } from './SparklineColumnSummaryWizard';
import * as StrategyConstants from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklineColumnSettingsWizard } from './SparklineColumnSettingsWizard';

export interface SparklineColumnWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<SparklineColumnWizard> {}

export class SparklineColumnWizard extends React.Component<SparklineColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.SparklineColumnStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <SparklineColumnSelectColumnWizard api={this.props.api} />,
            },
            {
              StepName: 'Sparkline Settings',
              Index: 1,
              Element: (
                <SparklineColumnSettingsWizard
                  ColorPalette={this.props.api.userInterfaceApi.getColorPalette()}
                  api={this.props.api}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <SparklineColumnSummaryWizard api={this.props.api} />,
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
