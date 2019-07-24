import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DistinctCriteriaPairValue } from '../../../PredefinedConfig/Common/Enums';
import { PanelWithInfo } from '../../Components/Panels/PanelWithInfo';
import { DualListBoxEditor, DisplaySize } from '../../Components/ListBox/DualListBoxEditor';
import { CustomSort } from '../../../PredefinedConfig/RunTimeState/CustomSortState';
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';

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
      ColumnValues: this.props.Blotter.getColumnValueDisplayValuePairDistinctList(
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
    let infoBody: any[] = [
      "Create a custom sort for the '" +
        friendlyName +
        "' column by moving items to the 'Custom Sort Order' listbox.",
      <br />,
      <br />,
      'Use the buttons on the right of the box to order items in the list as required.',
      <br />,
      <br />,
      "The new sort will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically.",
    ];
    let cssClassName: string = this.props.cssClassName + '-values';

    return (
      <PanelWithInfo header={'Sort Order for: ' + friendlyName} infoBody={infoBody}>
        <DualListBoxEditor
          AvailableValues={this.state.ColumnValues}
          cssClassName={cssClassName}
          SelectedValues={this.state.SelectedValues}
          HeaderAvailable="Column Values"
          HeaderSelected="Custom Sort Order"
          DisplayMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
          SortMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue]}
          ValueMember={DistinctCriteriaPairValue[DistinctCriteriaPairValue.DisplayValue]}
          onChange={SelectedValues => this.OnSelectedValuesChange(SelectedValues)}
          DisplaySize={DisplaySize.Small}
        />
      </PanelWithInfo>
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
