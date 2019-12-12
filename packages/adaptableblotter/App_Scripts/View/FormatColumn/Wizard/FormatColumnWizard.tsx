import * as React from 'react';
import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { FormatColumnScopeWizard } from './FormatColumnScopeWizard';
import { FormatColumnStyleWizard } from './FormatColumnStyleWizard';
import { FormatColumnSummaryWizard } from './FormatColumnSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface FormatColumnWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<FormatColumnWizard> {
  ColorPalette: string[];
  StyleClassNames: string[];
}

export class FormatColumnWizard extends React.Component<FormatColumnWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.FormatColumnStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
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
              StepName: 'Summary',
              Index: 2,
              Element: <FormatColumnSummaryWizard />,
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
