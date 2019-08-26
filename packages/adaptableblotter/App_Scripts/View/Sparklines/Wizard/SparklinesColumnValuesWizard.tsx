import * as React from 'react';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';

import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Panel from '../../../components/Panel';
import Radio from '../../../components/Radio';
import { Flex } from 'rebass';
import Input from '../../../components/Input';
import { SparklineColumn } from '../../../PredefinedConfig/DesignTimeState/SparklineColumnState';
import FormLayout, { FormRow } from '../../../components/FormLayout';

export interface SparklinesColumnValuesWizardProps
  extends AdaptableWizardStepProps<SparklineColumn> {}

export interface SparklinesColumnValuesWizardState {
  MinimumValue: number;
  MaximumValue: number;
  MinimumValueColumnId: string;
  MaximumValueColumnId: string;

  UseMinStaticValue: boolean;
  UseMaxStaticValue: boolean;
  UseMinCurrentValue: boolean;
  UseMaxCurrentValue: boolean;
  UseMinColumn: boolean;
  UseMaxColumn: boolean;
}

export class SparklinesColumnValuesWizard
  extends React.Component<SparklinesColumnValuesWizardProps, SparklinesColumnValuesWizardState>
  implements AdaptableWizardStep {
  private _prefix: string;
  constructor(props: SparklinesColumnValuesWizardProps) {
    super(props);
    this._prefix = `${Date.now()}`;
    this.state = {
      MinimumValue: this.props.Data.MinimumValue,
      MaximumValue: this.props.Data.MaximumValue,
      MinimumValueColumnId: this.props.Data.MinimumValueColumnId,
      MaximumValueColumnId: this.props.Data.MaximumValueColumnId,
      UseMinStaticValue:
        this.props.Data.MinimumValue != null && !this.props.Data.MinimumValueColumnId,
      UseMinCurrentValue:
        this.props.Data.MinimumValue == null && !this.props.Data.MinimumValueColumnId,
      UseMaxStaticValue:
        this.props.Data.MaximumValue != null && !this.props.Data.MaximumValueColumnId,
      UseMaxCurrentValue:
        this.props.Data.MaximumValue == null && !this.props.Data.MaximumValueColumnId,
      UseMinColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MinimumValueColumnId),
      UseMaxColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MaximumValueColumnId),
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Panel header={'Minimum Value'} marginTop={2}>
          <FormLayout columns={[1, 2, 3]} sizes={['auto', 'auto', '1fr']}>
            <FormRow>
              <Radio
                id={`${this._prefix}_min_cell_value`}
                marginRight={2}
                value="current"
                checked={this.state.UseMinCurrentValue}
                onChange={(_, e: any) => this.onUseMinChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_min_cell_value`}>Use current cell value</label>
            </FormRow>
            <FormRow>
              <Radio
                id={`${this._prefix}_min_value`}
                marginRight={2}
                value="value"
                checked={this.state.UseMinStaticValue}
                onChange={(_, e: any) => this.onUseMinChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_min_value`}>Use static value</label>
              {this.state.UseMinStaticValue ? (
                <Input
                  type="number"
                  placeholder="Enter Number"
                  disabled={this.state.UseMinCurrentValue}
                  onChange={this.onMinValueChanged}
                  value={this.state.UseMinCurrentValue ? '' : this.state.MinimumValue}
                />
              ) : null}
            </FormRow>
            <FormRow>
              <Radio
                marginRight={2}
                id={`${this._prefix}_min_column_value`}
                value="column"
                checked={this.state.UseMinColumn}
                onChange={(_, e: any) => this.onUseMinChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_min_column_value`}>Use another colum value</label>
              <Flex flexDirection="row">
                <AdaptablePopover
                  headerText={'Sparkline Column: Minimum Value'}
                  bodyText={[
                    'The minimum value of the column (can be minus). Defaults to the currenty smallest value in the cell. If the column only contains positive numbers use 0. Additionally, you can set the value to be that in another column.',
                  ]}
                />
                {this.state.UseMinColumn ? (
                  <ColumnSelector
                    style={{ maxWidth: '12rem', marginLeft: 'var(--ab-space-2)' }}
                    SelectedColumnIds={[this.state.MinimumValueColumnId]}
                    ColumnList={this.props.Columns}
                    onColumnChange={columns => this.onColumnMinValueSelectedChanged(columns)}
                    SelectionMode={SelectionMode.Single}
                  />
                ) : null}
              </Flex>
              />
            </FormRow>
          </FormLayout>
        </Panel>
        <Panel header="Maximum Value" marginTop={2}>
          <FormLayout columns={[1, 2, 3]} sizes={['auto', 'auto', '1fr']}>
            <FormRow>
              <Radio
                id={`${this._prefix}_max_cell_value`}
                marginRight={2}
                value="current"
                checked={this.state.UseMaxCurrentValue}
                onChange={(_, e: any) => this.onUseMaxChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_max_cell_value`}>Use current cell value</label>
            </FormRow>
            <FormRow>
              <Radio
                marginRight={2}
                id={`${this._prefix}_max_value`}
                value="value"
                checked={this.state.UseMaxStaticValue}
                onChange={(_, e: any) => this.onUseMaxChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_max_value`}>Use static value</label>
              {this.state.UseMaxStaticValue ? (
                <Input
                  type="number"
                  placeholder="Enter Number"
                  disabled={this.state.UseMaxCurrentValue}
                  onChange={this.onMaxValueChanged}
                  value={this.state.UseMaxCurrentValue ? '' : this.state.MaximumValue}
                />
              ) : null}
            </FormRow>
            <FormRow>
              <Radio
                marginRight={2}
                id={`${this._prefix}_max_column_value`}
                value="column"
                checked={this.state.UseMaxColumn}
                onChange={(_, e: any) => this.onUseMaxChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_max_column_value`}>Use another colum value</label>
              <Flex flexDirection="row">
                <AdaptablePopover
                  headerText={'Sparkline Column: Maximum Value'}
                  bodyText={[
                    'The maximum value of the column. Defaults to the currently largest value in the cell. Additionally, you can set the value to be that in another column.',
                  ]}
                />
                {this.state.UseMaxColumn ? (
                  <ColumnSelector
                    style={{ maxWidth: '12rem', marginLeft: 'var(--ab-space-2)' }}
                    SelectedColumnIds={[this.state.MaximumValueColumnId]}
                    ColumnList={this.props.Columns}
                    onColumnChange={columns => this.onColumnMaxValueSelectedChanged(columns)}
                    SelectionMode={SelectionMode.Single}
                  />
                ) : null}
              </Flex>
              />
            </FormRow>
          </FormLayout>
        </Panel>
      </WizardPanel>
    );
  }

  private onUseMinChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    const UseMinCurrentValue = e.value == 'current';
    const UseMinColumn = e.value == 'column';
    const UseMinStaticValue = e.value == 'value';

    this.setState(
      {
        UseMinCurrentValue,
        UseMinColumn,
        UseMinStaticValue,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  private onUseMaxChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    const UseMaxCurrentValue = e.value == 'current';
    const UseMaxColumn = e.value == 'column';
    const UseMaxStaticValue = e.value == 'value';

    this.setState(
      {
        UseMaxCurrentValue,
        UseMaxColumn,
        UseMaxStaticValue,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  private onMinValueChanged = (e: any) => {
    let value = e.target.value;
    if (!isNaN(Number(value))) {
      value = Number(value);
    }
    this.setState({ MinimumValue: value } as SparklinesColumnValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMinValueSelectedChanged(columns: IColumn[]) {
    this.setState(
      {
        MinimumValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as SparklinesColumnValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }
  private onMaxValueChanged = (e: any) => {
    let value = e.target.value;
    if (!isNaN(Number(value))) {
      value = Number(value);
    }

    this.setState({ MaximumValue: value } as SparklinesColumnValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMaxValueSelectedChanged(columns: IColumn[]) {
    this.setState(
      {
        MaximumValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as SparklinesColumnValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
      return false;
    }
    if (
      this.state.UseMinColumn &&
      StringExtensions.IsNullOrEmpty(this.state.MinimumValueColumnId)
    ) {
      return false;
    }
    if (
      this.state.UseMaxColumn &&
      StringExtensions.IsNullOrEmpty(this.state.MaximumValueColumnId)
    ) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.MinimumValue = this.state.UseMinCurrentValue
      ? undefined
      : this.state.UseMinColumn
      ? undefined
      : this.state.MinimumValue;

    this.props.Data.MaximumValue = this.state.UseMaxCurrentValue
      ? undefined
      : this.state.UseMaxColumn
      ? undefined
      : this.state.MaximumValue;

    this.props.Data.MinimumValueColumnId = this.state.UseMinColumn
      ? this.state.MinimumValueColumnId
      : null;
    this.props.Data.MaximumValueColumnId = this.state.UseMaxColumn
      ? this.state.MaximumValueColumnId
      : null;
  }

  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
