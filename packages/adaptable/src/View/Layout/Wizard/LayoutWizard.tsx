import * as React from 'react';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';

import { LayoutEditorWizard } from './LayoutEditorWizard';

export interface LayoutWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<LayoutWizard> {
  ColumnSorts: ColumnSort[];
}

export class LayoutWizard extends React.Component<LayoutWizardProps, {}> {
  render() {
    let layouts: Layout[] = this.props.ConfigEntities as Layout[];
    return (
      <AdaptableWizard
        style={{ maxWidth: '' }}
        FriendlyName={StrategyConstants.LayoutStrategyFriendlyName}
        ModalContainer={this.props.ModalContainer}
        Api={this.props.Api}
        showStepsLegend={false}
        Steps={[
          {
            StepName: 'Layout Editor',
            Index: 0,
            Element: <LayoutEditorWizard Api={this.props.Api} Layouts={layouts} />,
          },
        ]}
        Data={this.props.EditedAdaptableObject}
        StepStartIndex={this.props.WizardStartIndex}
        onHide={() => this.props.onCloseWizard()}
        onFinish={() => this.props.onFinishWizard()}
        canFinishWizard={() => this.props.canFinishWizard()}
      />
    );
  }
}
