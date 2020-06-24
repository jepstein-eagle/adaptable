import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { CalculatedColumn } from '../../../PredefinedConfig/CalculatedColumnState';
import Input from '../../../components/Input';
import WizardPanel from '../../../components/WizardPanel';
import ErrorBox from '../../../components/ErrorBox';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import Dropdown from '../../../components/Dropdown';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import CheckBox from '../../../components/CheckBox';

export interface CalculatedColumnSettingsWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {}
export interface CalculatedColumnSettingsWizardState {
  ErrorMessage: string;
  ColumnId: string;
  DataType: 'String' | 'Number' | 'Boolean' | 'Date';
  Width: number;
  Filterable?: boolean;
  Resizable?: boolean;
  Groupable?: boolean;
  Sortable?: boolean;
  Pivotable?: boolean;
  Aggregatable?: boolean;
}

export class CalculatedColumnSettingsWizard
  extends React.Component<CalculatedColumnSettingsWizardProps, CalculatedColumnSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnSettingsWizardProps) {
    super(props);
    this.state = {
      ErrorMessage: null,
      ColumnId: this.props.Data.ColumnId,
      DataType: this.props.Data.CalculatedColumnSettings.DataType,
      Width: this.props.Data.CalculatedColumnSettings.Width,
      Filterable: this.props.Data.CalculatedColumnSettings.Filterable,
      Resizable: this.props.Data.CalculatedColumnSettings.Resizable,
      Groupable: this.props.Data.CalculatedColumnSettings.Groupable,
      Sortable: this.props.Data.CalculatedColumnSettings.Sortable,
      Pivotable: this.props.Data.CalculatedColumnSettings.Pivotable,
      Aggregatable: this.props.Data.CalculatedColumnSettings.Aggregatable,
    };
  }
  render(): any {
    return (
      <WizardPanel>
        <FormLayout>
          <FormRow label="Column Name">
            <Input
              value={this.state.ColumnId}
              autoFocus
              width={300}
              type="text"
              placeholder="Enter column name"
              onChange={(e: React.SyntheticEvent) => this.handleColumnNameChange(e)}
            />
          </FormRow>
          <FormRow label="Column Type">
            <Dropdown
              value={this.state.DataType}
              onChange={DataType => this.setState({ DataType })}
              options={[
                { value: DataType.Number, label: DataType.Number },
                { value: DataType.String, label: DataType.String },
                { value: DataType.Date, label: DataType.Date },
                { value: DataType.Boolean, label: DataType.Boolean },
              ]}
            />
          </FormRow>
          <FormRow label="Width">
            <Input
              type="number"
              width={300}
              value={this.state.Width}
              onChange={(e: React.SyntheticEvent) =>
                this.setState({ Width: Number((e.target as HTMLInputElement).value) })
              }
            />
          </FormRow>
          <FormRow label="Filterable">
            <CheckBox
              checked={this.state.Filterable}
              onChange={Filterable => this.setState({ Filterable })}
            />
          </FormRow>
          <FormRow label="Resizable">
            <CheckBox
              checked={this.state.Resizable}
              onChange={Resizable => this.setState({ Resizable })}
            />
          </FormRow>
          <FormRow label="Groupable">
            <CheckBox
              checked={this.state.Groupable}
              onChange={Groupable => this.setState({ Groupable })}
            />
          </FormRow>
          <FormRow label="Sortable">
            <CheckBox
              checked={this.state.Sortable}
              onChange={Sortable => this.setState({ Sortable })}
            />
          </FormRow>
          <FormRow label="Pivotable">
            <CheckBox
              checked={this.state.Pivotable}
              onChange={Pivotable => this.setState({ Pivotable })}
            />
          </FormRow>
          <FormRow label="Aggregatable">
            <CheckBox
              checked={this.state.Aggregatable}
              onChange={Aggregatable => this.setState({ Aggregatable })}
            />
          </FormRow>
        </FormLayout>
        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={2}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}
      </WizardPanel>
    );
  }

  handleColumnNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnId: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(
          this.props.Api.gridApi.getColumns().map(c => c.ColumnId),
          e.value
        )
          ? 'A Column already exists with that name'
          : null,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ColumnId) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnId = this.state.ColumnId;

    this.props.Data.CalculatedColumnSettings.DataType = this.state.DataType;
    this.props.Data.CalculatedColumnSettings.Width = this.state.Width;
    this.props.Data.CalculatedColumnSettings.Filterable = this.state.Filterable;
    this.props.Data.CalculatedColumnSettings.Resizable = this.state.Resizable;
    this.props.Data.CalculatedColumnSettings.Groupable = this.state.Groupable;
    this.props.Data.CalculatedColumnSettings.Sortable = this.state.Sortable;
    this.props.Data.CalculatedColumnSettings.Pivotable = this.state.Pivotable;
    this.props.Data.CalculatedColumnSettings.Aggregatable = this.state.Aggregatable;
  }
  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
