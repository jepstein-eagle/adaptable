import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { FormatColumnScopeWizard } from './FormatColumnScopeWizard';
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard';
import { FormatColumnSummaryWizard } from './FormatColumnSummaryWizard';
import { FormatColumnFormatWizard } from './FormatColumnFormatWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { FormatColumnAlignmentWizard } from './FormatColumnAlignmentWizard';

export interface FormatColumnWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<FormatColumnWizard> {
  ColorPalette: string[];
  StyleClassNames: string[];
}

export class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.FormatColumnStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: <FormatColumnScopeWizard />,
            },
            {
              StepName: 'Style',
              Index: 1,
              Element: (
                <FormatColumnStyleWizard
                  ColorPalette={this.props.ColorPalette}
                  StyleClassNames={this.props.StyleClassNames}
                />
              ),
            },
            {
              StepName: 'Display Format',
              Index: 2,
              Element: <FormatColumnFormatWizard />,
            },
            {
              StepName: 'Cell Alignment',
              Index: 3,
              Element: <FormatColumnAlignmentWizard />,
            },
            {
              StepName: 'Summary',
              Index: 4,
              Element: <FormatColumnSummaryWizard />,
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
