import * as React from 'react';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { LayoutSelectionWizard } from './LayoutSelectionWizard';
import { LayoutColumnWizard } from './LayoutColumnWizard';
import { LayoutSettingsWizard } from './LayoutSettingsWizard';
import { LayoutGridSortWizard } from './LayoutGridSortWizard';
import { LayoutSummaryWizard } from './LayoutSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout, ColumnSort } from '../../../PredefinedConfig/LayoutState';

export interface LayoutWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<LayoutWizard> {
  ColumnSorts: ColumnSort[];
}

export class LayoutWizard extends React.Component<LayoutWizardProps, {}> {
  render() {
    let layouts: Layout[] = this.props.ConfigEntities as Layout[];
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.LayoutStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Layout Source',
              Index: 0,
              Element: (
                <LayoutSelectionWizard Layouts={layouts} ColumnSorts={this.props.ColumnSorts} />
              ),
            },
            {
              StepName: 'Select Columns',
              Index: 1,
              Element: <LayoutColumnWizard />,
            },
            {
              StepName: 'Set Column Sorts',
              Index: 2,
              Element: <LayoutGridSortWizard />,
            },
            {
              StepName: 'Settings',
              Index: 3,
              Element: <LayoutSettingsWizard Layouts={layouts} />,
            },
            {
              StepName: 'Summary',
              Index: 4,
              Element: <LayoutSummaryWizard />,
            },
          ]}
          Data={this.props.EditedAdaptableBlotterObject}
          StepStartIndex={this.props.WizardStartIndex}
          onHide={() => this.props.onCloseWizard()}
          onFinish={() => this.props.onFinishWizard()}
          canFinishWizard={() => this.props.canFinishWizard()}
        />
        >
      </div>
    );
  }
}
