import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { PercentBarSelectColumnWizard } from '././PercentBarSelectColumnWizard';
import { PercentBarSummaryWizard } from '././PercentBarSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBarSettingsWizard } from './PercentBarSettingsWizard';
import { PercentBarValuesWizard } from './PercentBarValuesWizard';

export interface PercentBarWizardProps
  extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<PercentBarWizard> {
  ColorPalette: Array<string>;
}

export class PercentBarWizard extends React.Component<PercentBarWizardProps, {}> {
  render() {
    return (
      <div className={this.props.cssClassName}>
        <AdaptableWizard
          FriendlyName={StrategyConstants.PercentBarStrategyName}
          ModalContainer={this.props.ModalContainer}
          cssClassName={this.props.cssClassName}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Column',
              Index: 0,
              Element: <PercentBarSelectColumnWizard />,
            },
            {
              StepName: 'Values',
              Index: 1,
              Element: <PercentBarValuesWizard />,
            },
            {
              StepName: 'Settings',
              Index: 2,
              Element: <PercentBarSettingsWizard ColorPalette={this.props.ColorPalette} />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PercentBarSummaryWizard />,
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
