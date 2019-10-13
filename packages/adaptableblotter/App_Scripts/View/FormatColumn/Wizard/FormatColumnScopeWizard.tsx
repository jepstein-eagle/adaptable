import * as React from 'react';

import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { FormatColumn } from '../../../PredefinedConfig/RunTimeState/FormatColumnState';
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
      ColumnId: this.props.Data.ColumnId,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.ColumnId]}
          ColumnList={this.props.Columns}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableBlotterColumn[]) {
    this.setState(
      { ColumnId: columns.length > 0 ? columns[0].ColumnId : '' } as FormatColumnScopeWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.ColumnId);
  }

  public canBack(): boolean {
    return false;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;
  }

  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
