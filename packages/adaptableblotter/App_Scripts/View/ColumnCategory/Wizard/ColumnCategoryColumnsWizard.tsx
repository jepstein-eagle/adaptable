import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { ColumnCategory } from '../../../PredefinedConfig/ColumnCategoryState';
import HelpBlock from '../../../components/HelpBlock';
import WizardPanel from '../../../components/WizardPanel';

export interface ColumnCategoryColumnsWizardProps extends AdaptableWizardStepProps<ColumnCategory> {
  ColumnCategorys: ColumnCategory[];
}
export interface ColumnCategoryColumnsWizardState {
  AvailableColumns: string[];
  SelectedColumns: string[];
  IsEdit: boolean;
}

export class ColumnCategoryColumnsWizard
  extends React.Component<ColumnCategoryColumnsWizardProps, ColumnCategoryColumnsWizardState>
  implements AdaptableWizardStep {
  constructor(props: ColumnCategoryColumnsWizardProps) {
    super(props);

    let selectedFriendlyColumns = ColumnHelper.getFriendlyNamesFromColumnIds(
      this.props.Data.ColumnIds,
      this.props.Columns
    );
    let currentlyColumnCategorys: string[] = [];
    this.props.ColumnCategorys.map(lk => {
      currentlyColumnCategorys.push(...lk.ColumnIds);
    });

    let allColumns: string[] = this.props.Columns.map(c => c.ColumnId);
    let availableColumns: string[] = [];
    allColumns.forEach(c => {
      if (ArrayExtensions.NotContainsItem(currentlyColumnCategorys, c)) {
        availableColumns.push(c);
      }
    });

    let availableFriendlyColumns = ColumnHelper.getFriendlyNamesFromColumnIds(
      availableColumns,
      this.props.Columns
    );
    selectedFriendlyColumns.forEach(sc => availableFriendlyColumns.push(sc));

    this.state = {
      AvailableColumns: availableFriendlyColumns,
      SelectedColumns: selectedFriendlyColumns,
      IsEdit: this.props.Data.ColumnIds.length > 0,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          Press ctrl/cmd key while clicking to select multiple items.
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.state.AvailableColumns}
          SelectedValues={this.state.SelectedColumns}
          HeaderAvailable="Available Columns"
          HeaderSelected="Selected Columns"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </WizardPanel>
    );
  }

  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedColumns: newValues } as ColumnCategoryColumnsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return this.state.SelectedColumns.length > 0;
  }
  public canBack(): boolean {
    return !this.state.IsEdit;
  }
  public Next(): void {
    this.props.Data.ColumnIds = ColumnHelper.getColumnIdsFromFriendlyNames(
      this.state.SelectedColumns,
      this.props.Columns
    );
  }
  public Back(): void {
    // todo
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
