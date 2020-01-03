import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DistinctCriteriaPairValue } from '../../../PredefinedConfig/Common/Enums';

import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { CustomSort } from '../../../PredefinedConfig/CustomSortState';

import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import HelpBlock from '../../../components/HelpBlock';

import WizardPanel from '../../../components/WizardPanel';

export interface CustomSortValuesWizardProps extends AdaptableWizardStepProps<CustomSort> {}
export interface CustomSortValuesWizardState {
  ColumnValues: any[];
  SelectedValues: Array<string>;
  IsEdit: boolean;
}

export class CustomSortValuesWizard
  extends React.Component<CustomSortValuesWizardProps, CustomSortValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: CustomSortValuesWizardProps) {
    super(props);
    this.state = {
      ColumnValues: this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(
        this.props.Data.ColumnId,
        DistinctCriteriaPairValue.DisplayValue,
        false
      ),
      SelectedValues: this.props.Data.SortedValues,
      IsEdit: this.props.Data.SortedValues.length > 0,
    };
  }

  render(): any {
    let friendlyName = ColumnHelper.getFriendlyNameFromColumnId(
      this.props.Data.ColumnId,
      this.props.Columns
    );

    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          Create a Custom Sort by moving items into the 'Custom Sort Order' listbox. The new sort
          for the column will consist first of the items in the 'Custom Sort Order' listbox; all
          other column values will then sort alphabetically.
        </HelpBlock>
        <DualListBoxEditor
          style={{ flex: 1, overflow: 'hidden' }}
          AvailableValues={this.state.ColumnValues}
          SelectedValues={this.state.SelectedValues}
          HeaderAvailable="Column Values"
          HeaderSelected="Custom Sort Order"
          DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
          SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
          ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
        <HelpBlock marginTop={2}>
          Press ctrl/cmd key while clicking to select multiple items.
        </HelpBlock>
      </WizardPanel>
    );
  }
  OnSelectedValuesChange(newValues: Array<string>) {
    this.setState({ SelectedValues: newValues } as CustomSortValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return this.state.SelectedValues.length > 0;
  }
  public canBack(): boolean {
    return !this.state.IsEdit;
  }
  public Next(): void {
    this.props.Data.SortedValues = this.state.SelectedValues;
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
