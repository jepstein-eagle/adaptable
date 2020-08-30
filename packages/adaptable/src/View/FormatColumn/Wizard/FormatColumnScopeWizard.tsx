import * as React from 'react';

import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { FormatColumn } from '../../../PredefinedConfig/FormatColumnState';
import WizardPanel from '../../../components/WizardPanel';

export interface FormatColumnScopeWizardProps extends AdaptableWizardStepProps<FormatColumn> {}

export interface FormatColumnScopeWizardState {
  ColumnId: string;
}

export class FormatColumnScopeWizard
  extends React.Component<FormatColumnScopeWizardProps, FormatColumnScopeWizardState>
  implements AdaptableWizardStep {
  constructor(props: FormatColumnScopeWizardProps) {
    super(props);
    this.state = {
      ColumnId: this.props.data.ColumnId,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={this.props.api.columnApi.getColumns()}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    this.setState(
      { ColumnId: columns.length > 0 ? columns[0].ColumnId : '' } as FormatColumnScopeWizardState,
      () => this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return false;
  }
  public next(): void {
    this.props.data.ColumnId = this.state.ColumnId;
    this.props.data.DisplayFormat = undefined;
  }

  public back(): void {
    //todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
