import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import {
  ICategoryChartDefinition,
  IPieChartDefinition,
} from '../../../../PredefinedConfig/IUserState/ChartState';
import { Expression } from '../../../../PredefinedConfig/Common/Expression/Expression';
import { ExpressionHelper } from '../../../../Utilities/Helpers/ExpressionHelper';
import { Panel, FormGroup, Row, Col, HelpBlock, ControlLabel, Radio } from 'react-bootstrap';
import { AdaptableBlotterForm } from '../../../Components/Forms/AdaptableBlotterForm';
import { ColumnSelector } from '../../../Components/Selectors/ColumnSelector';
import { SelectionMode } from '../../../../PredefinedConfig/Common/Enums';
import { IColumn } from '../../../../Utilities/Interface/IColumn';
import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';
import { SecondaryColumnOperation } from '../../../../PredefinedConfig/Common/ChartEnums';

export interface PieChartPrimaryColumnWizardProps
  extends AdaptableWizardStepProps<IPieChartDefinition> {
  //  ChartDefinitions: IChartDefinition[]
}

export interface PieChartPrimaryColumnWizardState {
  PrimaryColumnId: string;
}

export class PieChartPrimaryColumnWizard
  extends React.Component<PieChartPrimaryColumnWizardProps, PieChartPrimaryColumnWizardState>
  implements AdaptableWizardStep {
  constructor(props: PieChartPrimaryColumnWizardProps) {
    super(props);
    this.state = {
      PrimaryColumnId: props.Data.PrimaryColumnId,
    };
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-settings';

    return (
      <div className={cssClassName}>
        <Panel header="Primary Column" bsStyle="primary">
          <AdaptableBlotterForm horizontal>
            <FormGroup controlId="primaryColumn">
              <Row>
                <Col xs={1} />
                <Col xs={10}>
                  <HelpBlock>
                    Select a Primary Column for the Pie Chart.
                    <br />
                  </HelpBlock>
                </Col>
                <Col xs={1} />
              </Row>
              <Row>
                <Col xs={4} componentClass={ControlLabel}>
                  Primary Column:{' '}
                </Col>
                <Col xs={6}>
                  <ColumnSelector
                    cssClassName={cssClassName}
                    SelectedColumnIds={[this.state.PrimaryColumnId]}
                    ColumnList={this.props.Columns}
                    onColumnChange={columns => this.onPrimaryColumnChanged(columns)}
                    SelectionMode={SelectionMode.Single}
                  />
                </Col>
              </Row>
            </FormGroup>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  private onPrimaryColumnChanged(columns: IColumn[]) {
    let isColumn: boolean = ArrayExtensions.IsNotNullOrEmpty(columns);
    this.setState(
      {
        PrimaryColumnId: isColumn ? columns[0].ColumnId : '',
      } as PieChartPrimaryColumnWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.PrimaryColumnId);
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.PrimaryColumnId = this.state.PrimaryColumnId;
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
