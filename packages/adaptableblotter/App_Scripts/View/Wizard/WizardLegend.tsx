import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { Glyphicon, Label, Button } from 'react-bootstrap';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';

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
        <span key={index}>
          <Button
            bsStyle={style}
            bsSize={'small'}
            disabled={isDisabled}
            onClick={() => this.onStepButtonClicked(s)}
          >
            {s}
          </Button>
          {lastStep == false && (
            <Glyphicon
              style={{ verticalAlign: 'middle', margin: '5px', padding: '5px' }}
              glyph="resize-horizontal"
            />
          )}
        </span>
      );
    });

    return (
      <div className={StyleConstants.WIZARD_LEGEND}>
        {this.props.FriendlyName}: {stepButtons}
      </div>
    );
  }

  private onStepButtonClicked(stepName: string): void {
    this.props.onStepButtonClicked(stepName);
  }
}
