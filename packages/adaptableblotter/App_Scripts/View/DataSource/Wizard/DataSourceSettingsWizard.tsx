import * as React from 'react';
import { Panel, ControlLabel, FormControl, Col, FormGroup, HelpBlock } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { IDataSource } from '../../../PredefinedConfig/IUserState/DataSourceState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';

export interface DataSourceSettingsWizardProps extends AdaptableWizardStepProps<IDataSource> {
  DataSourceNames: string[];
}
export interface DataSourceSettingsWizardState {
  Name: string;
  Description: any;
  ErrorMessage: string;
}

export class DataSourceSettingsWizard
  extends React.Component<DataSourceSettingsWizardProps, DataSourceSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: DataSourceSettingsWizardProps) {
    super(props);

    this.state = {
      Name: this.props.Data.Name,
      Description: this.props.Data.Description,
      ErrorMessage: null,
    };
  }

  render() {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';

    let cssClassName: string = this.props.cssClassName + '-settings';

    return (
      <div className={cssClassName}>
        <Panel header="DataSource Definition Settings" bsStyle="primary">
          <AdaptableBlotterForm horizontal>
            <FormGroup controlId="DataSourceName">
              <Col xs={3} componentClass={ControlLabel}>
                Name:
              </Col>
              <Col xs={7}>
                <FormGroup controlId="formInlineName" validationState={validationState}>
                  <FormControl
                    value={this.state.Name}
                    type="string"
                    placeholder="Enter DataSource name"
                    onChange={e => this.onDataSourceNameChange(e)}
                  />
                  <FormControl.Feedback />
                  <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup controlId="DataSourceDescription">
              <Col xs={3} componentClass={ControlLabel}>
                Description:
              </Col>
              <Col xs={7}>
                <FormGroup controlId="formInlineDescription" validationState={validationState}>
                  <FormControl
                    value={this.state.Description}
                    type="string"
                    placeholder="Enter description"
                    onChange={e => this.onDataSourceDescriptionChange(e)}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  onDataSourceNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        Name: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(this.props.DataSourceNames, e.value)
          ? 'A data source already exists with that name'
          : null,
      } as DataSourceSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  onDataSourceDescriptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Description: e.value } as DataSourceSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.Name) &&
      StringExtensions.IsNotNullOrEmpty(this.state.Description)
    );
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Name = this.state.Name;
    this.props.Data.Description = this.state.Description;
  }
  public Back(): void {
    /* no implementation required   */
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
