import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StyleComponent } from '../../Components/StyleComponent';
import { UIHelper } from '../../UIHelper';
import { AdaptableStyle } from '../../../PredefinedConfig/Common/AdaptableStyle';
import { ConditionalStyle } from '../../../PredefinedConfig/ConditionalStyleState';
import { Box } from 'rebass';
import HelpBlock from '../../../components/HelpBlock';
import CheckBox from '../../../components/CheckBox';
import { ConditionalStyleScopeWizardState } from './ConditionalStyleScopeWizard';

export interface ConditionalStyleStyleWizardProps
  extends AdaptableWizardStepProps<ConditionalStyle> {
  StyleClassNames: string[];
}

export interface ConditionalStyleStyleWizardState {
  Style: AdaptableStyle;
  ExcludeGroupedRows: boolean;
}

export class ConditionalStyleStyleWizard
  extends React.Component<ConditionalStyleStyleWizardProps, ConditionalStyleStyleWizardState>
  implements AdaptableWizardStep {
  constructor(props: ConditionalStyleStyleWizardProps) {
    super(props);
    this.state = {
      Style: this.props.data.Style,
      ExcludeGroupedRows: this.props.data.ExcludeGroupedRows,
    };
  }

  render() {
    let canUseClassName = true; // get from somewhere...
    return (
      <div style={{ height: '100%' }}>
        <StyleComponent
          style={{ height: '100%' }}
          api={this.props.api}
          StyleClassNames={this.props.StyleClassNames}
          Style={this.props.data.Style}
          UpdateStyle={(style: AdaptableStyle) => this.onUpdateStyle(style)}
          CanUseClassName={canUseClassName}
        />
        <Box>
          <HelpBlock marginBottom={2}>
            Exclude any cells in a Grouped Row from applying the Style
          </HelpBlock>

          <CheckBox
            marginLeft={3}
            onChange={(checked: boolean) => this.onExludeGroupedRowsChanged(checked)}
            checked={this.state.ExcludeGroupedRows}
          >
            Exclude Grouped Rows
          </CheckBox>
        </Box>
      </div>
    );
  }

  private onExludeGroupedRowsChanged(checked: boolean) {
    this.setState({ ExcludeGroupedRows: checked } as ConditionalStyleStyleWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  private onUpdateStyle(style: AdaptableStyle) {
    this.setState({ Style: style } as ConditionalStyleStyleWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return UIHelper.IsNotEmptyStyle(this.state.Style);
  }
  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.Style = this.state.Style;
    this.props.data.ExcludeGroupedRows = this.state.ExcludeGroupedRows;
  }
  public back(): void {
    // todod
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
