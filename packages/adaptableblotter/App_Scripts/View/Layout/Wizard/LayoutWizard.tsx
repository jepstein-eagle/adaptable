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
import { Layout, ColumnSort } from '../../../PredefinedConfig/LayoutState';
import { LayoutGroupedColumnWizard } from './LayoutGroupedColumnWizard';
import ColumnHelper from '../../../Utilities/Helpers/ColumnHelper';
import { LayoutSetPivotingWizard } from './LayoutSetPivotingWizard';
import { LayoutPivotColumnWizard } from './LayoutPivotColumnWizard';
import { LayoutAggregationColumnWizard } from './LayoutPivotAggregationColumnWizard';

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
          Adaptable={this.props.Adaptable}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Source',
              Index: 0,
              Element: (
                <LayoutSelectionWizard Layouts={layouts} ColumnSorts={this.props.ColumnSorts} />
              ),
            },
            {
              StepName: 'Columns',
              Index: 1,
              Element: <LayoutColumnWizard />,
            },
            {
              StepName: 'Sorting',
              Index: 2,
              Element: (
                <LayoutGridSortWizard
                  SortableColumns={ColumnHelper.getSortableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Grouping',
              Index: 3,
              Element: (
                <LayoutGroupedColumnWizard
                  GroupableColumns={ColumnHelper.getGroupableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Pivoting',
              Index: 4,
              Element: <LayoutSetPivotingWizard />,
            },
            {
              StepName: 'Pivoting',
              Index: 5,
              Element: (
                <LayoutPivotColumnWizard
                  PivotableColumns={ColumnHelper.getPivotableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Pivoting',
              Index: 6,
              Element: (
                <LayoutAggregationColumnWizard
                  AggregetableColumns={ColumnHelper.getAggregetableColumns(this.props.Columns)}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 7,
              Element: <LayoutSettingsWizard Layouts={layouts} />,
            },
            {
              StepName: 'Summary',
              Index: 8,
              Element: <LayoutSummaryWizard />,
            },
          ]}
          Data={this.props.EditedAdaptableObject}
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
