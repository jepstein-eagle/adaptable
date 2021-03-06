import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ShortcutSettingsWizard } from './ShortcutSettingsWizard';
import { ShortcutSummaryWizard } from './ShortcutSummaryWizard';
import { ShortcutTypeWizard } from './ShortcutTypeWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';

export interface ShortcutWizardProps extends AdaptableObjectAdaptableWizardProps<ShortcutWizard> {
  NumericKeysAvailable: Array<string>;
  DateKeysAvailable: Array<string>;
}

export class ShortcutWizard extends React.Component<ShortcutWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          friendlyName={StrategyConstants.ShortcutStrategyFriendlyName}
          modalContainer={this.props.modalContainer}
          api={this.props.api}
          steps={[
            {
              StepName: 'Column Data Type',
              Index: 0,
              Element: <ShortcutTypeWizard api={this.props.api} />,
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: (
                <ShortcutSettingsWizard
                  NumericKeysAvailable={this.props.NumericKeysAvailable}
                  DateKeysAvailable={this.props.DateKeysAvailable}
                  api={this.props.api}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 2,
              Element: <ShortcutSummaryWizard api={this.props.api} />,
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
