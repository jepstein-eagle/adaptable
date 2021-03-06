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
import Panel from '../../../components/Panel';
import { Flex } from 'rebass';

export interface CalculatedColumnSettingsWizardProps
  extends AdaptableWizardStepProps<CalculatedColumn> {}
export interface CalculatedColumnSettingsWizardState {
  ErrorMessage: string;
  ColumnId: string;
  ColumnName: string;
  DataType: 'String' | 'Number' | 'Boolean' | 'Date';
  Width: number;
  Filterable?: boolean;
  Resizable?: boolean;
  Groupable?: boolean;
  Sortable?: boolean;
  Pivotable?: boolean;
  Aggregatable?: boolean;
  ColumnNameFocused: boolean;
  ShowTooltip: boolean;
}

export class CalculatedColumnSettingsWizard
  extends React.Component<CalculatedColumnSettingsWizardProps, CalculatedColumnSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: CalculatedColumnSettingsWizardProps) {
    super(props);
    this.state = {
      ErrorMessage: null,
      ColumnId: this.props.data.ColumnId,
      ColumnName: this.props.data.FriendlyName ?? this.props.data.ColumnId,
      ColumnNameFocused: false,
      DataType: this.props.data.CalculatedColumnSettings.DataType,
      Width: this.props.data.CalculatedColumnSettings.Width,
      Filterable: this.props.data.CalculatedColumnSettings.Filterable,
      Resizable: this.props.data.CalculatedColumnSettings.Resizable,
      Groupable: this.props.data.CalculatedColumnSettings.Groupable,
      Sortable: this.props.data.CalculatedColumnSettings.Sortable,
      Pivotable: this.props.data.CalculatedColumnSettings.Pivotable,
      Aggregatable: this.props.data.CalculatedColumnSettings.Aggregatable,
      ShowTooltip: this.props.data.CalculatedColumnSettings.ShowToolTip,
    };
  }
  render(): any {
    const inEdit = !!this.props.data.ColumnId;
    return (
      <WizardPanel>
        <Panel header="Column Details" margin={2}>
          <Flex flexDirection="row">
            <FormLayout>
              <FormRow label="Id">
                <Input
                  value={this.state.ColumnId || ''}
                  width={300}
                  autoFocus={!inEdit}
                  disabled={inEdit}
                  type="text"
                  placeholder="Enter an Id for the column"
                  onChange={(e: React.SyntheticEvent) => this.handleColumnIdChange(e)}
                />
              </FormRow>
              <FormRow label="Name">
                <Input
                  autoFocus={inEdit}
                  onFocus={() => {
                    this.setState({
                      ColumnNameFocused: true,
                    });
                  }}
                  onBlur={() => {
                    this.setState({
                      ColumnNameFocused: false,
                    });
                  }}
                  value={
                    this.state.ColumnNameFocused
                      ? this.state.ColumnName || ''
                      : this.state.ColumnName || this.state.ColumnId || ''
                  }
                  width={300}
                  type="text"
                  placeholder="Enter column name"
                  onChange={(e: React.SyntheticEvent) => this.handleColumnNameChange(e)}
                />
              </FormRow>
              <FormRow label="Type">
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
              <FormRow label="">
                <CheckBox
                  onChange={(checked: boolean) => this.setState({ ShowTooltip: checked })}
                  checked={this.state.ShowTooltip}
                >
                  Show Expression as Tooltip
                </CheckBox>
              </FormRow>
            </FormLayout>
          </Flex>
        </Panel>
        <Panel header="Column Properties" margin={2}>
          <Flex flexDirection="row">
            <FormLayout
              style={{ width: '100%' }}
              columns={[{ name: 'first', size: '30%' }, { name: 'second' }]}
            >
              <FormRow>
                <CheckBox
                  checked={this.state.Filterable}
                  onChange={Filterable => this.setState({ Filterable })}
                >
                  Filterable
                </CheckBox>
                <CheckBox
                  checked={this.state.Resizable}
                  onChange={Resizable => this.setState({ Resizable })}
                >
                  Resizable
                </CheckBox>
              </FormRow>
              <FormRow>
                <CheckBox
                  checked={this.state.Groupable}
                  onChange={Groupable => this.setState({ Groupable })}
                >
                  Groupable
                </CheckBox>
                <CheckBox
                  checked={this.state.Sortable}
                  onChange={Sortable => this.setState({ Sortable })}
                >
                  Sortable
                </CheckBox>
              </FormRow>
              <FormRow>
                <CheckBox
                  checked={this.state.Pivotable}
                  onChange={Pivotable => this.setState({ Pivotable })}
                >
                  Pivotable
                </CheckBox>
                <CheckBox
                  checked={this.state.Aggregatable}
                  onChange={Aggregatable => this.setState({ Aggregatable })}
                >
                  Aggregatable
                </CheckBox>
              </FormRow>
            </FormLayout>
          </Flex>
        </Panel>
        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={2}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}
      </WizardPanel>
    );
  }

  handleColumnIdChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnId: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(
          this.props.api.columnApi.getColumns().map(c => c.ColumnId),
          e.value
        )
          ? 'A Column already exists with that id'
          : null,
      },
      () => this.props.updateGoBackState()
    );
  }

  handleColumnNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnName: e.value,
      },
      () => this.props.updateGoBackState()
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
  public next(): void {
    this.props.data.ColumnId = this.state.ColumnId;
    this.props.data.FriendlyName = this.state.ColumnName || this.state.ColumnId;

    this.props.data.CalculatedColumnSettings.DataType = this.state.DataType;
    this.props.data.CalculatedColumnSettings.Width = this.state.Width;
    this.props.data.CalculatedColumnSettings.Filterable = this.state.Filterable;
    this.props.data.CalculatedColumnSettings.Resizable = this.state.Resizable;
    this.props.data.CalculatedColumnSettings.Groupable = this.state.Groupable;
    this.props.data.CalculatedColumnSettings.Sortable = this.state.Sortable;
    this.props.data.CalculatedColumnSettings.Pivotable = this.state.Pivotable;
    this.props.data.CalculatedColumnSettings.Aggregatable = this.state.Aggregatable;
    this.props.data.CalculatedColumnSettings.ShowToolTip = this.state.ShowTooltip;
  }
  public back(): void {
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
