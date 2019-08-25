import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { SparklinesSelectColumnWizard } from './SparklinesSelectColumnWizard';
import { SparklinesSummaryWizard } from './SparklinesSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { SparklinesValuesWizard } from './SparklinesValuesWizard';

export interface SparklineWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<SparklineWizard> {}

export class SparklineWizard extends React.Component<SparklineWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.PercentBarStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <SparklinesSelectColumnWizard />,
            },
            {
              StepName: 'Min / Max Values',
              Index: 1,
              Element: <SparklinesValuesWizard />,
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <SparklinesSummaryWizard />,
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
