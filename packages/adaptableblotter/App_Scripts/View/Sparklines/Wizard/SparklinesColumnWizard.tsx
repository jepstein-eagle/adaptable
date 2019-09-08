import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { SparklinesColumnSelectColumnWizard } from './SparklinesColumnSelectColumnWizard';
import { SparklinesColumnSummaryWizard } from './SparklinesColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { SparklinesColumnSettingsWizard } from './SparklinesColumnSettingsWizard';

export interface SparklinesColumnWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<SparklinesColumnWizard> {
  ColorPalette: Array<string>;
}

export class SparklinesColumnWizard extends React.Component<SparklinesColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.SparklinesColumnStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <SparklinesColumnSelectColumnWizard />,
            },
            {
              StepName: 'Sparkline Settings',
              Index: 1,
              Element: <SparklinesColumnSettingsWizard ColorPalette={this.props.ColorPalette} />,
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <SparklinesColumnSummaryWizard />,
            },
          ]}
          Data={this.props.EditedAdaptableBlotterObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
      </div>
    );
  }
}
