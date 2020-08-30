import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { FormatColumnScopeWizard } from './FormatColumnScopeWizard';
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard';
import { FormatColumnSummaryWizard } from './FormatColumnSummaryWizard';
import { FormatColumnFormatWizard } from './FormatColumnFormatWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { FormatColumnAlignmentWizard } from './FormatColumnAlignmentWizard';

export interface FormatColumnWizardProps
  extends AdaptableObjectAdaptableWizardProps<FormatColumnWizard> {
  StyleClassNames: string[];
}

export class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.FormatColumnStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Scope',
              Index: 0,
              Element: <FormatColumnScopeWizard api={this.props.api} />,
            },
            {
              StepName: 'Style',
              Index: 1,
              Element: (
                <FormatColumnStyleWizard
                  // api={this.props.api}
                  StyleClassNames={this.props.StyleClassNames}
                  api={this.props.api}
                />
              ),
            },
            {
              StepName: 'Display Format',
              Index: 2,
              Element: <FormatColumnFormatWizard api={this.props.api} />,
            },
            {
              StepName: 'Cell Alignment',
              Index: 3,
              Element: <FormatColumnAlignmentWizard api={this.props.api} />,
            },
            {
              StepName: 'Summary',
              Index: 4,
              Element: <FormatColumnSummaryWizard api={this.props.api} />,
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
