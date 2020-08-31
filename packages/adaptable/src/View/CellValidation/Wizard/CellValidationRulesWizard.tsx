import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import {
  DataType,
  LeafExpressionOperator,
  RangeOperandType,
} from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptablePopover } from '../../AdaptablePopover';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { CellValidationRule } from '../../../PredefinedConfig/CellValidationState';
import { Flex } from 'rebass';
import Dropdown from '../../../components/Dropdown';

import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import Radio from '../../../components/Radio';
import Input from '../../../components/Input';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression';
import { Scope } from '../../../PredefinedConfig/Common/Scope';

export interface CellValidationRulesWizardProps
  extends AdaptableWizardStepProps<CellValidationRule> {}
export interface CellValidationSettingsWizardState {
  Id: string;
  Inputs: any[];
}

export class CellValidationRulesWizard
  extends React.Component<CellValidationRulesWizardProps, CellValidationSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: CellValidationRulesWizardProps) {
    super(props);
    this.state = {
      Id: this.props.data.Predicate.Id,
      Inputs: this.props.data.Predicate.Inputs,
    };
  }

  render(): any {
    // TODO replace this with the full scope object from prev step
    const columnScope: Scope = {
      ColumnIds: [this.props.data.ColumnId],
    };
    const predicatesOptions = this.props.api.cellValidationApi
      .getPredicateDefsForScope(columnScope)
      .map(predicateDef => {
        return {
          value: predicateDef.id,
          label: predicateDef.name,
        };
      });

    const currentPredicateDef = this.props.api.predicateApi.getPredicateDefById(this.state.Id);

    let columnFriendlyName: string = this.props.api.columnApi.getFriendlyNameFromColumnId(
      this.props.data.ColumnId
    );

    let helpText: string =
      'Choose whether to prevent all edits for this column, or whether to allow those which match a rule (to be set by you).';

    return (
      <WizardPanel>
        <Flex flexDirection="column" padding={2}>
          <Dropdown
            placeholder="Select a Predicate"
            value={this.state.Id}
            onChange={Id => this.onPredicateChange(Id)}
            options={predicatesOptions}
            style={{ maxWidth: 'inherit' }}
          />
          {currentPredicateDef?.inputs?.map((predicateDefInput, index) => (
            <Input
              key={index}
              type={predicateDefInput.type}
              autoFocus={index === 0}
              value={this.state.Inputs[index]}
              onChange={(e: any) => this.onPredicateInputChange(e, index)}
            />
          ))}
        </Flex>
      </WizardPanel>
    );
  }

  private onPredicateChange(Id: string) {
    const predicateDef = this.props.api.predicateApi.getPredicateDefById(Id);

    this.setState(
      {
        Id,
        Inputs: (predicateDef?.inputs ?? []).map(input => input.defaultValue ?? ''),
      },
      () => this.props.updateGoBackState()
    );
  }

  private onPredicateInputChange(e: React.FormEvent, index: number) {
    const { value } = e.target as HTMLInputElement;
    const { Inputs } = this.state;
    Inputs[index] = value;

    this.setState({ Inputs }, () => this.props.updateGoBackState());
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.state.Id)) {
      return false;
    }

    if (this.state.Inputs?.some(StringExtensions.IsNullOrEmpty)) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public next(): void {
    this.props.data.Predicate = {
      Id: this.state.Id,
      Inputs: this.state.Inputs,
    };
  }

  public back(): void {
    //todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
