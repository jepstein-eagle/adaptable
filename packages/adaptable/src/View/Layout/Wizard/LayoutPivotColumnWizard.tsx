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
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import ObjectFactory from '../../../Utilities/ObjectFactory';

export interface LayoutPivotColumnWizardProps extends AdaptableWizardStepProps<Layout> {
  PivotableColumns: AdaptableColumn[];
}

export interface LayoutPivotColumnWizardState {
  SelectedColumns: Array<string>;
}

export class LayoutPivotColumnWizard
  extends React.Component<LayoutPivotColumnWizardProps, LayoutPivotColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutPivotColumnWizardProps) {
    super(props);
    // is this right?
    if (this.props.Data.PivotDetails == null) {
      this.props.Data.PivotDetails = ObjectFactory.CreateEmptyPivotDetails();
    }
    this.state = {
      SelectedColumns: ColumnHelper.getFriendlyNamesFromColumnIds(
        this.props.Data.PivotDetails.PivotColumns,
        this.props.Columns
      ),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          1. Select the <b>Pivot Columns</b> (which appear along the top of the pivot).
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.props.PivotableColumns.map(x => x.FriendlyName)}
          SelectedValues={this.state.SelectedColumns}
          HeaderAvailable="Available Pivot Columns"
          HeaderSelected="Pivot Columns in Layout"
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </WizardPanel>
    );
  }
  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedColumns: newValues } as LayoutPivotColumnWizardState, () =>
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
    this.props.Data.PivotDetails.PivotColumns = ColumnHelper.getColumnIdsFromFriendlyNames(
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
