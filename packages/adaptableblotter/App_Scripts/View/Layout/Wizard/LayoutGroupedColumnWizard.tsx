import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';

export interface LayoutGroupedColumnWizardProps extends AdaptableWizardStepProps<Layout> {
  GroupableColumns: AdaptableBlotterColumn[];
}

export interface LayoutGroupedColumnWizardState {
  SelectedColumns: Array<string>;
}

export class LayoutGroupedColumnWizard
  extends React.Component<LayoutGroupedColumnWizardProps, LayoutGroupedColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutGroupedColumnWizardProps) {
    super(props);
    this.state = {
      SelectedColumns: ColumnHelper.getFriendlyNamesFromColumnIds(
        this.props.Data.GroupedColumns,
        this.props.Columns
      ),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          Select which Columns, if any, should be <b>Grouped</b> in the Layout.
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.props.GroupableColumns.map(x => x.FriendlyName)}
          SelectedValues={this.state.SelectedColumns}
          HeaderAvailable="Groupable Columns"
          HeaderSelected="Grouped Columns in Layout"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </WizardPanel>
    );
  }
  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedColumns: newValues } as LayoutGroupedColumnWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.GroupedColumns = ColumnHelper.getColumnIdsFromFriendlyNames(
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
