import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { CustomSort } from '../../../PredefinedConfig/CustomSortState';
import WizardPanel from '../../../components/WizardPanel';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';

export interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<CustomSort> {
  SortedColumns: AdaptableColumn[];
  CustomSorts: CustomSort[];
}

export interface CustomSortColumnWizardState {
  SelectedColumnId: string;
}

export class CustomSortColumnWizard
  extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: CustomSortColumnWizardProps) {
    super(props);
    this.state = { SelectedColumnId: this.props.data.ColumnId };
  }
  render(): any {
    let existingCols = this.props.CustomSorts.map(cs => cs.ColumnId);
    let sortableCols = this.props.api.columnApi
      .getSortableColumns()
      .filter(c => ArrayExtensions.NotContainsItem(existingCols, c.ColumnId));
    return (
      <WizardPanel>
        <ColumnSelector
          SelectedColumnIds={[this.state.SelectedColumnId]}
          ColumnList={sortableCols}
          onColumnChange={columns => this.onColumnSelectedChanged(columns)}
          SelectionMode={SelectionMode.Single}
        />
      </WizardPanel>
    );
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]) {
    this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : '' }, () =>
      this.props.updateGoBackState()
    );
  }
  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId);
  }
  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.ColumnId = this.state.SelectedColumnId;
  }
  // tslint:disable-next-line:no-empty
  public back(): void {}
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
