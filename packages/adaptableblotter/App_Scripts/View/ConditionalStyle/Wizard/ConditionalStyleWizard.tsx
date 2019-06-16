import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { AdaptableWizard } from '../../Wizard/AdaptableWizard';
import { ConditionalStyleStyleWizard } from './ConditionalStyleStyleWizard';
import { ConditionalStyleScopeWizard } from './ConditionalStyleScopeWizard';
import { ConditionalStyleExpressionWizard } from './ConditionalStyleExpressionWizard';
import { ConditionalStyleSummaryWizard } from './ConditionalStyleSummaryWizard';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IAdaptableBlotterObjectExpressionAdaptableWizardProps } from '../../Wizard/Interface/IAdaptableWizard';
import { ColumnCategory } from '../../../PredefinedConfig/IUserState/ColumnCategoryState';

export interface ConditionalStyleWizardProps
  extends IAdaptableBlotterObjectExpressionAdaptableWizardProps<ConditionalStyleWizard> {
  ColorPalette: string[];
  StyleClassNames: string[];
  ColumnCategories: ColumnCategory[];
}

export class ConditionalStyleWizard extends React.Component<ConditionalStyleWizardProps, {}> {
  render() {
    return (
      <div className={this.props.cssClassName}>
        <AdaptableWizard
          FriendlyName={StrategyConstants.ConditionalStyleStrategyName}
          ModalContainer={this.props.ModalContainer}
          cssClassName={this.props.cssClassName}
          Blotter={this.props.Blotter}
          Columns={this.props.Columns}
          Steps={[
            {
              StepName: 'Scope',
              Index: 0,
              Element: (
                <ConditionalStyleScopeWizard ColumnCategories={this.props.ColumnCategories} />
              ),
            },
            {
              StepName: 'Style',
              Index: 1,
              Element: (
                <ConditionalStyleStyleWizard
                  ColorPalette={this.props.ColorPalette}
                  StyleClassNames={this.props.StyleClassNames}
                />
              ),
            },
            {
              StepName: 'Query',
              Index: 2,
              Element: (
                <ConditionalStyleExpressionWizard
                  UserFilters={this.props.UserFilters}
                  SystemFilters={this.props.SystemFilters}
                />
              ),
            },
            {
              StepName: 'Summary',
              Index: 3,
              Element: <ConditionalStyleSummaryWizard UserFilters={this.props.UserFilters} />,
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
