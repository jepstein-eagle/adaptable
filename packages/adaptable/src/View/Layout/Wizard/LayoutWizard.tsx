import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';

import { LayoutEditorWizard } from './LayoutEditorWizard';

export interface LayoutWizardProps extends AdaptableObjectAdaptableWizardProps<LayoutWizard> {
  ColumnSorts: ColumnSort[];
}

export class LayoutWizard extends React.Component<LayoutWizardProps, {}> {
  render() {
    let layouts: Layout[] = this.props.configEntities as Layout[];
    return (
      <AdaptableWizard
        style={{ maxWidth: '', height: '80vh' }}
        friendlyName={StrategyConstants.LayoutStrategyFriendlyName}
        modalContainer={this.props.modalContainer}
        api={this.props.api}
        showStepsLegend={false}
        steps={[
          {
            StepName: 'Layout Editor',
            Index: 0,
            Element: <LayoutEditorWizard api={this.props.api} Layouts={layouts} />,
          },
        ]}
        data={this.props.editedAdaptableObject}
        stepStartIndex={this.props.wizardStartIndex}
        onHide={() => this.props.onCloseWizard()}
        onFinish={() => this.props.onFinishWizard()}
        canFinishWizard={() => this.props.canFinishWizard()}
      />
    );
  }
}
