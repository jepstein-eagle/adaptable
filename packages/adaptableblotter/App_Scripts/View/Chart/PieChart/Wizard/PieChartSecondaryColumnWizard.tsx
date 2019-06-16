import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '../../../../PredefinedConfig/IUserState/ChartState';
import { Panel, FormGroup, Row, Col, HelpBlock, ControlLabel, Radio } from 'react-bootstrap';
import { AdaptableBlotterForm } from '../../../Components/Forms/AdaptableBlotterForm';
import { ColumnSelector } from '../../../Components/Selectors/ColumnSelector';
import { SelectionMode, DataType } from '../../../../PredefinedConfig/Common/Enums';
import { IColumn } from '../../../../Utilities/Interface/IColumn';
import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';
import { SecondaryColumnOperation } from '../../../../PredefinedConfig/Common/ChartEnums';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';
import { ColumnHelper } from '../../../../Utilities/Helpers/ColumnHelper';

export interface PieChartSecondaryColumnWizardProps
  extends AdaptableWizardStepProps<PieChartDefinition> {}

export interface PieChartSecondaryColumnWizardState {
  SecondaryColumnId?: string;
  SecondaryColumnOperation: SecondaryColumnOperation;
}

export class PieChartSecondaryColumnWizard
  extends React.Component<PieChartSecondaryColumnWizardProps, PieChartSecondaryColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: PieChartSecondaryColumnWizardProps) {
    super(props);
    this.state = {
      SecondaryColumnId: props.Data!.SecondaryColumnId,
      SecondaryColumnOperation: props.Data!.SecondaryColumnOperation as SecondaryColumnOperation,
    };
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-settings';
    let secondaryColumnDataType: DataType = StringExtensions.IsNotNullOrEmpty(
      this.state.SecondaryColumnId
    )
      ? ColumnHelper.getColumnDataTypeFromColumnId(this.state.SecondaryColumnId, this.props.Columns)
      : DataType.Unknown;

    return (
      <div className={cssClassName}>
        <Panel header="Secondary Column" bsStyle="primary">
          <AdaptableBlotterForm horizontal>
            <FormGroup controlId="secondaryColumn">
              <Row>
                <Col xs={1} />
                <Col xs={10}>
                  <HelpBlock>
                    Select a Secondary Column for the Pie Chart (Note: this is optional).
                  </HelpBlock>
                </Col>
                <Col xs={1} />
              </Row>
              <Row>
                <Col xs={4} componentClass={ControlLabel}>
                  Secondary Column:{' '}
                </Col>
                <Col xs={6}>
                  <ColumnSelector
                    cssClassName={cssClassName}
                    placeHolder={'Choose a column (optional)'}
                    SelectedColumnIds={[this.state.SecondaryColumnId]}
                    ColumnList={this.props.Columns}
                    onColumnChange={columns => this.onSecondaryColumnChanged(columns)}
                    SelectionMode={SelectionMode.Single}
                  />
                </Col>
              </Row>
              {StringExtensions.IsNotNullOrEmpty(this.state.SecondaryColumnId) &&
                secondaryColumnDataType == DataType.Number && (
                  <div>
                    <br />
                    <Row>
                      <Col xs={1} />
                      <Col xs={10}>
                        <HelpBlock>
                          Choose whether to show a count for these values or to sum them
                        </HelpBlock>
                      </Col>
                      <Col xs={1} />
                    </Row>
                    <Row>
                      <Col xs={4} componentClass={ControlLabel}>
                        Summary Type:
                      </Col>
                      <Col xs={6}>
                        <Radio
                          inline
                          value="Count"
                          checked={
                            this.state.SecondaryColumnOperation == SecondaryColumnOperation.Count
                          }
                          onChange={e => this.onSecondaryColumnOperationChanged(e)}
                        >
                          Count
                        </Radio>
                        <Radio
                          inline
                          value="Sum"
                          checked={
                            this.state.SecondaryColumnOperation == SecondaryColumnOperation.Sum
                          }
                          onChange={e => this.onSecondaryColumnOperationChanged(e)}
                        >
                          Sum
                        </Radio>
                      </Col>
                    </Row>
                  </div>
                )}
            </FormGroup>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  private onSecondaryColumnOperationChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        SecondaryColumnOperation: e.value as SecondaryColumnOperation,
      } as PieChartSecondaryColumnWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onSecondaryColumnChanged(columns: IColumn[]) {
    let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns);
    let secondaryColumnOperation: SecondaryColumnOperation = SecondaryColumnOperation.Count;
    if (isColumn) {
      if (columns[0].DataType == DataType.Number) {
        secondaryColumnOperation = SecondaryColumnOperation.Sum;
      }
    }
    this.setState(
      {
        SecondaryColumnId: isColumn ? columns[0].ColumnId : '',
        SecondaryColumnOperation: secondaryColumnOperation,
      } as PieChartSecondaryColumnWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.SecondaryColumnId = this.state.SecondaryColumnId;
    this.props.Data.SecondaryColumnOperation = this.state.SecondaryColumnOperation;
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
