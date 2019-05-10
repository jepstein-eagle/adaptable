import * as React from 'react';
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { IAdvancedSearch } from '../../../Utilities/Interface/BlotterObjects/IAdvancedSearch';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { PRIMARY_BSSTYLE } from '../../../Utilities/Constants/StyleConstants';

export interface AdvancedSearchSettingsWizardProps
  extends AdaptableWizardStepProps<IAdvancedSearch> {
  AdvancedSearches: IAdvancedSearch[];
}

export interface AdvancedSearchSettingsWizardState {
  AdvancedSearchName: string;
  ErrorMessage: string;
}

export class AdvancedSearchSettingsWizard
  extends React.Component<AdvancedSearchSettingsWizardProps, AdvancedSearchSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: AdvancedSearchSettingsWizardProps) {
    super(props);
    this.state = {
      AdvancedSearchName: props.Data.Name,
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
        <Panel header="Advanced Search Settings" bsStyle={PRIMARY_BSSTYLE}>
          <AdaptableBlotterForm horizontal>
            <FormGroup controlId="searchName">
              <Col xs={3} componentClass={ControlLabel}>
                Search Name:{' '}
              </Col>
              <Col xs={8}>
                <FormGroup controlId="formInlineName" validationState={validationState}>
                  <FormControl
                    value={this.state.AdvancedSearchName}
                    type="string"
                    placeholder="Enter search name"
                    onChange={e => this.onAdvancedSearchNameChange(e)}
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

  onAdvancedSearchNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        AdvancedSearchName: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(
          this.props.AdvancedSearches.map(s => s.Name),
          e.value
        )
          ? 'A Search already exists with that name'
          : null,
      } as AdvancedSearchSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.AdvancedSearchName) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.Name = this.state.AdvancedSearchName;
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
