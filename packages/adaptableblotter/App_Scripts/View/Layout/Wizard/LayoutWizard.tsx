import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { LayoutSelectionWizard } from './LayoutSelectionWizard';
import { LayoutColumnWizard } from './LayoutColumnWizard';
import { LayoutSettingsWizard } from './LayoutSettingsWizard';
import { LayoutGridSortWizard } from './LayoutGridSortWizard';
import { LayoutSummaryWizard } from './LayoutSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ILayout, IColumnSort } from '../../../PredefinedConfig/IUserState Interfaces/LayoutState';

export interface LayoutWizardProps
  extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<LayoutWizard> {
  ColumnSorts: IColumnSort[];
}

export class LayoutWizard extends React.Component<LayoutWizardProps, {}> {
  render() {
    let layouts: ILayout[] = this.props.ConfigEntities as ILayout[];
    return (
      <div className={this.props.cssClassName}>
        <AdaptableWizard
          FriendlyName={StrategyConstants.LayoutStrategyName}
          ModalContainer={this.props.ModalContainer}
          cssClassName={this.props.cssClassName}
          Blotter={this.props.Blotter}
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
              StepName: 'Sort',
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
