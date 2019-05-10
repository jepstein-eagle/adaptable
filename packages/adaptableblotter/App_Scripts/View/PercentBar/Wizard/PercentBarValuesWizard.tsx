import * as React from 'react';
import {
  FormGroup,
  FormControl,
  Col,
  Panel,
  ControlLabel,
  Row,
  Checkbox,
  Radio,
} from 'react-bootstrap';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType, SelectionMode } from '../../../Utilities/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { IPercentBar } from '../../../Utilities/Interface/BlotterObjects/IPercentBar';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

export interface PercentBarValuesWizardProps extends AdaptableWizardStepProps<IPercentBar> {}

export interface PercentBarValuesWizardState {
  MinValue: number;
  MaxValue: number;
  MinValueColumnId: string;
  MaxValueColumnId: string;
  UseMinColumn: boolean;
  UseMaxColumn: boolean;
}

export class PercentBarValuesWizard
  extends React.Component<PercentBarValuesWizardProps, PercentBarValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarValuesWizardProps) {
    super(props);
    this.state = {
      MinValue: this.props.Data.MinValue,
      MaxValue: this.props.Data.MaxValue,
      MinValueColumnId: this.props.Data.MinValueColumnId,
      MaxValueColumnId: this.props.Data.MaxValueColumnId,
      UseMinColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MinValueColumnId),
      UseMaxColumn: StringExtensions.IsNotNullOrEmpty(this.props.Data.MaxValueColumnId),
    };
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-s';

    return (
      <div className={cssClassName}>
        <Panel header={'Minimum Value'} bsStyle="primary">
          <AdaptableBlotterForm>
            <FormGroup controlId="formMinimumValueSelect">
              <Row>
                <Col xs={3}>
                  <ControlLabel>Use:</ControlLabel>
                </Col>
                <Col xs={6}>
                  <Radio
                    inline
                    value="value"
                    checked={this.state.UseMinColumn == false}
                    onChange={e => this.onUseMinColumnSelectChanged(e)}
                  >
                    Static Value
                  </Radio>{' '}
                  <Radio
                    inline
                    value="column"
                    checked={this.state.UseMinColumn == true}
                    onChange={e => this.onUseMinColumnSelectChanged(e)}
                  >
                    Another Column Value
                  </Radio>
                  <span style={{ marginLeft: '10px' }}>
                    <AdaptablePopover
                      cssClassName={cssClassName}
                      headerText={'Percent Bar: Minimum Value'}
                      bodyText={[
                        'The minimum value of the column (can be minus).  Defaults to the currenty smallest value in the column.  If the column only contains positive numbers use 0.  Additionally, you can set the value to be that in another column.',
                      ]}
                    />
                  </span>
                </Col>
              </Row>

              <Row style={{ marginTop: '10px' }}>
                <Col xs={3}>
                  <ControlLabel>
                    {this.state.UseMinColumn == false ? 'Value' : 'Column'}
                  </ControlLabel>
                </Col>
                <Col xs={5}>
                  {this.state.UseMinColumn == false ? (
                    <FormControl
                      type="number"
                      placeholder="Enter Number"
                      onChange={this.onMinValueChanged}
                      value={this.state.MinValue}
                    />
                  ) : (
                    <ColumnSelector
                      cssClassName={cssClassName}
                      SelectedColumnIds={[this.state.MinValueColumnId]}
                      ColumnList={this.props.Columns}
                      onColumnChange={columns => this.onColumnMinValueSelectedChanged(columns)}
                      SelectionMode={SelectionMode.Single}
                    />
                  )}
                </Col>
              </Row>
            </FormGroup>
          </AdaptableBlotterForm>
        </Panel>

        <Panel header={'Maximum Value'} bsStyle="primary">
          <AdaptableBlotterForm>
            <FormGroup controlId="formMaximumValueSelect">
              <Row>
                <Col xs={3}>
                  <ControlLabel>Use:</ControlLabel>
                </Col>
                <Col xs={6}>
                  <Radio
                    inline
                    value="value"
                    checked={this.state.UseMaxColumn == false}
                    onChange={e => this.onUseMaxColumnSelectChanged(e)}
                  >
                    Static Value
                  </Radio>{' '}
                  <Radio
                    inline
                    value="column"
                    checked={this.state.UseMaxColumn == true}
                    onChange={e => this.onUseMaxColumnSelectChanged(e)}
                  >
                    Another Column Value
                  </Radio>
                  <span style={{ marginLeft: '10px' }}>
                    <AdaptablePopover
                      cssClassName={cssClassName}
                      headerText={'Percent Bar: Maximum Value'}
                      bodyText={[
                        'The maximum value of the bar.  Defaults to the currently largest value in the column.  Additionally, you can set the value to be that in another column.',
                      ]}
                    />
                  </span>
                </Col>
              </Row>

              <Row style={{ marginTop: '10px' }}>
                <Col xs={3}>
                  <ControlLabel>
                    {this.state.UseMaxColumn == false ? 'Value' : 'Column'}
                  </ControlLabel>
                </Col>
                <Col xs={5}>
                  {this.state.UseMaxColumn == false ? (
                    <FormControl
                      type="number"
                      placeholder="Enter Number"
                      onChange={this.onMaxValueChanged}
                      value={this.state.MaxValue}
                    />
                  ) : (
                    <ColumnSelector
                      cssClassName={cssClassName}
                      SelectedColumnIds={[this.state.MaxValueColumnId]}
                      ColumnList={this.props.Columns}
                      onColumnChange={columns => this.onColumnMaxValueSelectedChanged(columns)}
                      SelectionMode={SelectionMode.Single}
                    />
                  )}
                </Col>
              </Row>
            </FormGroup>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  private onUseMinColumnSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ UseMinColumn: e.value == 'column' } as PercentBarValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMinValueChanged = (e: any) => {
    this.setState({ MinValue: e.target.value } as PercentBarValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMinValueSelectedChanged(columns: IColumn[]) {
    this.setState(
      {
        MinValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as PercentBarValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onUseMaxColumnSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ UseMaxColumn: e.value == 'column' } as PercentBarValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMaxValueChanged = (e: any) => {
    this.setState({ MaxValue: e.target.value } as PercentBarValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onColumnMaxValueSelectedChanged(columns: IColumn[]) {
    this.setState(
      {
        MaxValueColumnId: columns.length > 0 ? columns[0].ColumnId : '',
      } as PercentBarValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
      return false;
    }
    if (this.state.UseMinColumn && StringExtensions.IsNullOrEmpty(this.state.MinValueColumnId)) {
      return false;
    }
    if (this.state.UseMaxColumn && StringExtensions.IsNullOrEmpty(this.state.MaxValueColumnId)) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.MinValue = this.state.UseMinColumn ? 0 : this.state.MinValue;
    this.props.Data.MaxValue = this.state.UseMaxColumn ? 100 : this.state.MaxValue;
    this.props.Data.MinValueColumnId = this.state.UseMinColumn ? this.state.MinValueColumnId : null;
    this.props.Data.MaxValueColumnId = this.state.UseMaxColumn ? this.state.MaxValueColumnId : null;
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
