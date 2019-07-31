import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { PlusMinusColumnWizard } from './PlusMinusColumnWizard';
import { PlusMinusSettingsWizard } from './PlusMinusSettingsWizard';
import { PlusMinusExpressionWizard } from './PlusMinusExpressionWizard';
import { PlusMinusSummaryWizard } from './PlusMinusSummaryWizard';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { AdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { DataType } from '../../../PredefinedConfig/Common/Enums';

export interface PlusMinusWizardProps
  extends AdaptableBlotterObjectExpressionAdaptableWizardProps<PlusMinusWizard> {
  SelectedColumnId: string;
}

export class PlusMinusWizard extends React.Component<PlusMinusWizardProps, {}> {
  render() {
    return (
      <div>
        <AdaptableWizard
          FriendlyName={StrategyConstants.PlusMinusStrategyName}
          ModalContainer={this.props.ModalContainer}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Select Column',
              Index: 0,
              Element: (
                <PlusMinusColumnWizard
                  NumericColumns={this.props.Columns.filter(x => x.DataType == DataType.Number)}
                />
              ),
            },
            {
              StepName: 'Settings',
              Index: 1,
              Element: <PlusMinusSettingsWizard />,
            },
            {
              StepName: 'Query Builder',
              Index: 2,
              Element: (
                <PlusMinusExpressionWizard
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                  NamedFilters={this.props.NamedFilters}
                  ColumnCategories={this.props.ColumnCategories}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <PlusMinusSummaryWizard UserFilters={this.props.UserFilters} />,
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
