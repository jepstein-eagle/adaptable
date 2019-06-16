import * as React from 'react';
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { Layout } from '../../../PredefinedConfig/RunTimeState/LayoutState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';

export interface LayoutSettingsWizardProps extends AdaptableWizardStepProps<Layout> {
  Layouts: Layout[];
}

export interface LayoutSettingsWizardState {
  LayoutName: string;
  ErrorMessage: string;
}

export class LayoutSettingsWizard
  extends React.Component<LayoutSettingsWizardProps, LayoutSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutSettingsWizardProps) {
    super(props);
    this.state = {
      LayoutName: props.Data.Name,
      ErrorMessage: null,
    };
  }
  render(): any {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';
    let cssClassName: string = this.props.cssClassName + '-settings';

    return (
      <div className={cssClassName}>
        <Panel header="Layout Settings" bsStyle="primary">
          <AdaptableBlotterForm horizontal>
            <FormGroup controlId="layouthName">
              <Col xs={3} componentClass={ControlLabel}>
                Layout Name:{' '}
              </Col>
              <Col xs={8}>
                <FormGroup controlId="formInlineName" validationState={validationState}>
                  <FormControl
                    value={this.state.LayoutName}
                    type="string"
                    placeholder="Enter layout name"
                    onChange={e => this.onLayoutNameChange(e)}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                </FormGroup>
              </Col>
            </FormGroup>
            <Col xs={1}> </Col>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  onLayoutNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        LayoutName: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(this.props.Layouts.map(l => l.Name), e.value)
          ? 'A Layout already exists with that name'
          : null,
      } as LayoutSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.LayoutName) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.Name = this.state.LayoutName;
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
