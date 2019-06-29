import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '../../../../PredefinedConfig/RunTimeState/ChartState';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';
import {
  Panel,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  HelpBlock,
  Radio,
} from 'react-bootstrap';
import { AdaptableBlotterForm } from '../../../Components/Forms/AdaptableBlotterForm';
import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';

export interface PieChartSettingsWizardProps extends AdaptableWizardStepProps<PieChartDefinition> {
  ChartNames: string[];
}

export interface PieChartSettingsWizardState {
  Name: string;
  Description: string;
  VisibleRowsOnly: boolean;
  ErrorMessage: string;
}

export class PieChartSettingsWizard
  extends React.Component<PieChartSettingsWizardProps, PieChartSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: PieChartSettingsWizardProps) {
    super(props);
    this.state = {
      Name: props.Data.Name,
      Description: props.Data.Description,
      VisibleRowsOnly: props.Data.VisibleRowsOnly,
      ErrorMessage: null,
    };
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-settings';

    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';

    return (
      <div className={cssClassName}>
        <Panel header="Chart Definition Settings" bsStyle="primary">
          <AdaptableBlotterForm horizontal>
            <FormGroup controlId="chartName">
              <Col xs={3} componentClass={ControlLabel}>
                Name:
              </Col>
              <Col xs={7}>
                <FormGroup controlId="formInlineName" validationState={validationState}>
                  <FormControl
                    value={this.state.Name}
                    type="string"
                    placeholder="Enter chart name"
                    onChange={e => this.onChartNameChange(e)}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="chartDescription">
              <Col xs={3} componentClass={ControlLabel}>
                Description:
              </Col>
              <Col xs={7}>
                <FormGroup controlId="formInlineDescription" validationState={validationState}>
                  <FormControl
                    value={this.state.Description}
                    type="string"
                    placeholder="Enter description (optional)"
                    onChange={e => this.onChartDescriptionChange(e)}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="chartDataVisible">
              <Col xs={3} componentClass={ControlLabel}>
                Rows In Chart:
              </Col>
              <Col xs={7}>
                <Radio
                  inline
                  value="Visible"
                  checked={this.state.VisibleRowsOnly == true}
                  onChange={e => this.onVisibleRowsChanged(e)}
                >
                  Visible Rows Only
                </Radio>
                <Radio
                  inline
                  value="All"
                  checked={this.state.VisibleRowsOnly == false}
                  onChange={e => this.onVisibleRowsChanged(e)}
                >
                  All Rows In Grid
                </Radio>
              </Col>
            </FormGroup>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  onChartNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        Name: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(this.props.ChartNames, e.value)
          ? 'A Chart Definition already exists with that name'
          : null,
      } as PieChartSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  onChartDescriptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Description: e.value } as PieChartSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onVisibleRowsChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ VisibleRowsOnly: e.value == 'Visible' } as PieChartSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.Name) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.Name = this.state.Name;
    this.props.Data.Description = this.state.Description;
    this.props.Data.VisibleRowsOnly = this.state.VisibleRowsOnly;
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
