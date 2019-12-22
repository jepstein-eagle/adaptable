import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { CustomSort } from '../../../PredefinedConfig/CustomSortState';
import WizardPanel from '../../../components/WizardPanel';

export interface CustomSortColumnWizardProps extends AdaptableWizardStepProps<CustomSort> {
  SortedColumns: AdaptableColumn[];
}

export interface CustomSortColumnWizardState {
  SelectedColumnId: string;
}

export class CustomSortColumnWizard
  extends React.Component<CustomSortColumnWizardProps, CustomSortColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: CustomSortColumnWizardProps) {
    super(props);
    this.state = { SelectedColumnId: this.props.Data.ColumnId };
  }
  render(): any {
    let sortableCols = ColumnHelper.getSortableColumns(this.props.Columns);
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
      this.props.UpdateGoBackState()
    );
  }
  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId);
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.SelectedColumnId;
  }
  // tslint:disable-next-line:no-empty
  public Back(): void {}
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
