import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { LayoutSelectionWizard } from './LayoutSelectionWizard';
import { LayoutColumnWizard } from './LayoutColumnWizard';
import { LayoutSettingsWizard } from './LayoutSettingsWizard';
import { LayoutGridSortWizard } from './LayoutGridSortWizard';
import { LayoutSummaryWizard } from './LayoutSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { LayoutGroupedColumnWizard } from './LayoutGroupedColumnWizard';
import { LayoutSetPivotingWizard } from './LayoutSetPivotingWizard';
import { LayoutPivotColumnWizard } from './LayoutPivotColumnWizard';
import { LayoutAggregationColumnWizard } from './LayoutPivotAggregationColumnWizard';
import { ColumnSort } from '../../../PredefinedConfig/Common/ColumnSort';

export interface LayoutWizardProps
  extends AdaptableObjectExpressionAdaptableWizardProps<LayoutWizard> {
  ColumnSorts: ColumnSort[];
}

export class LayoutWizard extends React.Component<LayoutWizardProps, {}> {
  render() {
    let layouts: Layout[] = this.props.ConfigEntities as Layout[];
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.LayoutStrategyFriendlyName}
          ModalContainer={this.props.ModalContainer}
          Api={this.props.Api}
          Steps={[
            {
              StepName: 'Source',
              Index: 0,
              Element: (
                <LayoutSelectionWizard
                  Layouts={layouts}
                  ColumnSorts={this.props.ColumnSorts}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Columns',
              Index: 1,
              Element: <LayoutColumnWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Sorting',
              Index: 2,
              Element: (
                <LayoutGridSortWizard
                  SortableColumns={this.props.Api.gridApi.getSortableColumns()}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Grouping',
              Index: 3,
              Element: (
                <LayoutGroupedColumnWizard
                  GroupableColumns={this.props.Api.gridApi.getGroupableColumns()}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Pivoting',
              Index: 4,
              Element: <LayoutSetPivotingWizard Api={this.props.Api} />,
            },
            {
              StepName: 'Pivoting',
              Index: 5,
              Element: (
                <LayoutPivotColumnWizard
                  PivotableColumns={this.props.Api.gridApi.getPivotableColumns()}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Pivoting',
              Index: 6,
              Element: (
                <LayoutAggregationColumnWizard
                  AggregetableColumns={this.props.Api.gridApi.getAggregetableColumns()}
                  Api={this.props.Api}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 7,
              Element: <LayoutSettingsWizard Layouts={layouts} Api={this.props.Api} />,
            },
            {
              StepName: 'Summary',
              Index: 8,
              Element: <LayoutSummaryWizard Api={this.props.Api} />,
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
