import * as React from 'react';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import SimpleButton from '../../components/SimpleButton';
import { Box } from 'rebass';

// Keep this simple - it just takes a list of step names and the active step name

export interface WizardLegendProps extends React.ClassAttributes<WizardLegend> {
  StepNames: string[];
  ActiveStepName: string;
  FriendlyName: string;
  CanShowAllSteps: boolean;
  onStepButtonClicked: (stepName: string) => void;
}

export class WizardLegend extends React.Component<WizardLegendProps, {}> {
  render(): any {
    let count: number = this.props.StepNames.length - 1;
    let activeStepIndex: number = this.props.StepNames.findIndex(
      s => s == this.props.ActiveStepName
    );
    let stepButtons: any = this.props.StepNames.map((s, index) => {
      let isActiveStep: boolean = index == activeStepIndex;
      let isDisabled: boolean = this.props.CanShowAllSteps
        ? false
        : isActiveStep || index > activeStepIndex;
      let style: string = isActiveStep ? 'primary' : 'default';

      let lastStep: boolean = index == count;
      return (
        <div key={index} style={{ display: 'inline-block' }}>
          <SimpleButton
            variant={isActiveStep ? 'raised' : 'outlined'}
            tone={isActiveStep ? 'accent' : 'neutral'}
            disabled={isDisabled}
            onClick={() => this.onStepButtonClicked(s)}
          >
            {s}
          </SimpleButton>
          {lastStep == false && (
            <Box mx={2} style={{ display: 'inline-block' }}>
              —
            </Box>
          )}
        </div>
      );
    });

    return <div className={StyleConstants.WIZARD_LEGEND}>{stepButtons}</div>;
  }

  private onStepButtonClicked(stepName: string): void {
    this.props.onStepButtonClicked(stepName);
  }
}
