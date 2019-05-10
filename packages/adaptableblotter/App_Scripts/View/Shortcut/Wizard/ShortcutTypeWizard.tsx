import { IShortcut } from '../../../Utilities/Interface/BlotterObjects/IShortcut';
/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { Radio, Panel, Col, HelpBlock } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { DataType, MathOperation } from '../../../Utilities/Enums';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';

export interface ShortcutTypeWizardProps extends AdaptableWizardStepProps<IShortcut> {}
export interface ShortcutTypeWizardState {
  ColumnType: 'Number' | 'Date';
}

export class ShortcutTypeWizard
  extends React.Component<ShortcutTypeWizardProps, ShortcutTypeWizardState>
  implements AdaptableWizardStep {
  constructor(props: ShortcutTypeWizardProps) {
    super(props);
    this.state = {
      ColumnType: this.props.Data.ColumnType,
    };
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '-type';

    return (
      <div className={cssClassName}>
        <Panel header="Select Where Shortcut is Applied" bsStyle="primary">
          <AdaptableBlotterForm inline>
            <Col xs={12}>
              <HelpBlock>
                Numeric column shortuts perform a mathematical operation on the current contents of
                the cell.
              </HelpBlock>
            </Col>
            <Col xs={12}>
              <HelpBlock>Date shortcuts replace the cell contents with a new Date value.</HelpBlock>
            </Col>
            <Col xs={12} className="ab_medium_margin">
              <Radio
                inline
                value="Number"
                checked={this.state.ColumnType == DataType.Number}
                onChange={e => this.onColumTypeChanged(e)}
              >
                Numeric Columns
              </Radio>
            </Col>
            <Col xs={12} className="ab_medium_margin">
              <Radio
                inline
                value="Date"
                checked={this.state.ColumnType == DataType.Date}
                onChange={e => this.onColumTypeChanged(e)}
              >
                Date Columns
              </Radio>
            </Col>
            <Col xs={12} className="ab_medium_margin" />
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  private onColumTypeChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Number') {
      this.setState({ ColumnType: DataType.Number } as ShortcutTypeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState({ ColumnType: DataType.Date } as ShortcutTypeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return this.state.ColumnType != null;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.ColumnType = this.state.ColumnType;
    if (this.state.ColumnType == DataType.Date) {
      this.props.Data.ShortcutOperation = MathOperation.Replace;
    }
  }
  public Back(): void {
    /* no implementation */
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
