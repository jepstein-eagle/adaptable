import * as React from 'react';
import { ControlLabel, FormGroup, FormControl, Col, Panel, HelpBlock } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { WizardSummaryPage } from '../../Components/WizardSummaryPage';
import * as StrategyConstants from '../../../Utilities/Constants/StrategyConstants';
import { IAdvancedSearch } from '../../../PredefinedConfig/IUserState Interfaces/AdvancedSearchState';
import { IKeyValuePair } from '../../../Utilities/Interface/IKeyValuePair';
import { IUserFilter } from '../../../PredefinedConfig/IUserState Interfaces/UserFilterState';

export interface AdvancedSearchSummaryWizardProps
  extends AdaptableWizardStepProps<IAdvancedSearch> {
  UserFilters: IUserFilter[];
}

export class AdvancedSearchSummaryWizard
  extends React.Component<AdvancedSearchSummaryWizardProps, {}>
  implements AdaptableWizardStep {
  constructor(props: AdvancedSearchSummaryWizardProps) {
    super(props);
  }
  render(): any {
    let cssClassName: string = this.props.cssClassName + '-summary';

    let keyValuePairs: IKeyValuePair[] = [
      { Key: 'Name', Value: this.props.Data.Name },
      {
        Key: 'Query',
        Value: ExpressionHelper.ConvertExpressionToString(
          this.props.Data.Expression,
          this.props.Columns
        ),
      },
    ];

    let summaryPage = (
      <WizardSummaryPage
        cssClassName={cssClassName}
        KeyValuePairs={keyValuePairs}
        header={StrategyConstants.AdvancedSearchStrategyName}
      />
    );
    return <div className={cssClassName}>{summaryPage}</div>;
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    // todo
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
