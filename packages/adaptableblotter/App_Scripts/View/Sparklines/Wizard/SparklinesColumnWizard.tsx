import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { SparklinesColumnSelectColumnWizard } from './SparklinesColumnSelectColumnWizard';
import { SparklinesColumnSummaryWizard } from './SparklinesColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { SparklinesColumnValuesWizard } from './SparklinesColumnValuesWizard';

export interface SparklinesColumnWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<SparklinesColumnWizard> {}

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
              StepName: 'Min / Max Values',
              Index: 1,
              Element: <SparklinesColumnValuesWizard />,
            },
            {
              StepName: 'Summary',
              Index: 3,
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
