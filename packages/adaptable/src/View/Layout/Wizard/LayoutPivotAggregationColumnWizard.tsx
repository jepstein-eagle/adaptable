import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { Layout } from '../../../PredefinedConfig/LayoutState';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import ObjectFactory from '../../../Utilities/ObjectFactory';

export interface LayoutAggregationColumnWizardProps extends AdaptableWizardStepProps<Layout> {
  AggregetableColumns: AdaptableColumn[];
}

export interface LayoutAggregationColumnWizardState {
  SelectedColumns: Array<string>;
}

export class LayoutAggregationColumnWizard
  extends React.Component<LayoutAggregationColumnWizardProps, LayoutAggregationColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutAggregationColumnWizardProps) {
    super(props);
    // is this right?
    if (this.props.Data.PivotDetails == null) {
      this.props.Data.PivotDetails = ObjectFactory.CreateEmptyPivotDetails();
    }
    this.state = {
      SelectedColumns: this.props.Adaptable.api.gridApi.getFriendlyNamesFromColumnIds(
        this.props.Data.PivotDetails.AggregationColumns
      ),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          2. Select the <b>Aggregation Columns</b> (which are 'summed' in the pivot).
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.props.AggregetableColumns.map(x => x.FriendlyName)}
          SelectedValues={this.state.SelectedColumns}
          HeaderAvailable="Available Aggregation Columns"
          HeaderSelected="Aggregation Columns in Layout"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </WizardPanel>
    );
  }
  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedColumns: newValues } as LayoutAggregationColumnWizardState, () =>
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
    this.props.Data.PivotDetails.AggregationColumns = this.props.Adaptable.api.gridApi.getColumnIdsFromFriendlyNames(
      this.state.SelectedColumns
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
