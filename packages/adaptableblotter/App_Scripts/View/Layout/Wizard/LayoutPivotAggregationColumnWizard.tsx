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
import ObjectFactory from '../../../Utilities/ObjectFactory';

export interface LayoutPivotAggregationColumnWizardProps extends AdaptableWizardStepProps<Layout> {}

export interface LayoutPivotAggregationColumnWizardProps extends AdaptableWizardStepProps<Layout> {
  AggregetableColumns: AdaptableBlotterColumn[];
}

export interface LayoutPivotAggregationColumnWizardState {
  SelectedColumns: Array<string>;
}

export class LayoutPivotAggregationColumnWizard
  extends React.Component<
    LayoutPivotAggregationColumnWizardProps,
    LayoutPivotAggregationColumnWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: LayoutPivotAggregationColumnWizardProps) {
    super(props);
    // is this right?
    if (this.props.Data.PivotDetails == null) {
      this.props.Data.PivotDetails = ObjectFactory.CreateEmptyPivotDetails();
    }
    this.state = {
      SelectedColumns: ColumnHelper.getFriendlyNamesFromColumnIds(
        this.props.Data.PivotDetails.PivotAggregationColumns,
        this.props.Columns
      ),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          3. Choose which columns should be <b>Aggregated</b> in the Pivot.
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.props.AggregetableColumns.map(x => x.FriendlyName)}
          SelectedValues={this.state.SelectedColumns}
          HeaderAvailable="Available Pivot Aggregation Columns"
          HeaderSelected="Pivot Aggregation Columns in Layout"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </WizardPanel>
    );
  }
  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedColumns: newValues } as LayoutPivotAggregationColumnWizardState, () =>
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
    this.props.Data.PivotDetails.PivotAggregationColumns = ColumnHelper.getColumnIdsFromFriendlyNames(
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
