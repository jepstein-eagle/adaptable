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

export interface LayoutPivotHeaderColumnWizardProps extends AdaptableWizardStepProps<Layout> {}

export interface LayoutPivotHeaderColumnWizardProps extends AdaptableWizardStepProps<Layout> {
  PivotableColumns: AdaptableBlotterColumn[];
}

export interface LayoutPivotHeaderColumnWizardState {
  SelectedColumns: Array<string>;
}

export class LayoutPivotHeaderColumnWizard
  extends React.Component<LayoutPivotHeaderColumnWizardProps, LayoutPivotHeaderColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutPivotHeaderColumnWizardProps) {
    super(props);
    // is this right?
    if (this.props.Data.PivotDetails == null) {
      this.props.Data.PivotDetails = ObjectFactory.CreateEmptyPivotDetails();
    }
    this.state = {
      SelectedColumns: ColumnHelper.getFriendlyNamesFromColumnIds(
        this.props.Data.PivotDetails.PivotHeaderColumns,
        this.props.Columns
      ),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          2. Choose which columns should form the <b>Pivot Header</b>.
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.props.PivotableColumns.map(x => x.FriendlyName)}
          SelectedValues={this.state.SelectedColumns}
          HeaderAvailable="Available Pivot Header Columns"
          HeaderSelected="Pivot Header Columns in Layout"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </WizardPanel>
    );
  }
  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedColumns: newValues } as LayoutPivotHeaderColumnWizardState, () =>
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
    this.props.Data.PivotDetails.PivotHeaderColumns = ColumnHelper.getColumnIdsFromFriendlyNames(
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
