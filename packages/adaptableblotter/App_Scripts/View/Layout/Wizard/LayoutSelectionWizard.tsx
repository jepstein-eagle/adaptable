import * as React from 'react';
import { Panel, Radio, Col, HelpBlock } from 'react-bootstrap';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { SelectionMode, LayoutSource, MessageType } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { AdaptablePopover } from '../../AdaptablePopover';
import { Layout, ColumnSort } from '../../../PredefinedConfig/IUserState/LayoutState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';

export interface LayoutSelectionWizardProps extends AdaptableWizardStepProps<Layout> {
  Layouts: Array<Layout>;
  ColumnSorts: ColumnSort[];
}

export interface LayoutSelectionWizardState {
  LayoutSource: LayoutSource;
}

export class LayoutSelectionWizard
  extends React.Component<LayoutSelectionWizardProps, LayoutSelectionWizardState>
  implements AdaptableWizardStep {
  constructor(props: LayoutSelectionWizardProps) {
    super(props);
    this.state = {
      LayoutSource: LayoutSource.Existing,
    };
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-selection';

    return (
      <div className={cssClassName}>
        <Panel header="Select Source for Layout" bsStyle="primary">
          <AdaptableBlotterForm inline>
            <Col xs={12}>
              <HelpBlock>
                Choose whether to create a new layout using the Grid's current columns and sort
                order.
              </HelpBlock>
            </Col>
            <Col xs={12}>
              <HelpBlock>Alternatively, choose to build a new layout from scratch.</HelpBlock>
            </Col>
            <Col xs={12} className="ab_large_margin">
              <Radio
                inline
                value="Existing"
                checked={this.state.LayoutSource == LayoutSource.Existing}
                onChange={e => this.onScopeSelectChanged(e)}
              >
                Copy current Grid setup
              </Radio>{' '}
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Layout:  Current Grid'}
                bodyText={[
                  'The new layout will contain the current column order and sort order in the grid.',
                ]}
              />
            </Col>
            <Col xs={12} className="ab_large_margin">
              <Radio
                inline
                value="New"
                checked={this.state.LayoutSource == LayoutSource.New}
                onChange={e => this.onScopeSelectChanged(e)}
              >
                Create a new Layout
              </Radio>{' '}
              <AdaptablePopover
                cssClassName={cssClassName}
                headerText={'Layout: New'}
                bodyText={[
                  'Build the layout yourself by selecting columns and sort order (in following steps).',
                ]}
              />
            </Col>
          </AdaptableBlotterForm>
        </Panel>
      </div>
    );
  }

  private onScopeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Existing') {
      this.setState({ LayoutSource: LayoutSource.Existing } as LayoutSelectionWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else {
      this.setState(
        { LayoutSource: LayoutSource.New, ColumnId: '' } as LayoutSelectionWizardState,
        () => this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return true;
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    if (this.state.LayoutSource == LayoutSource.Existing) {
      // need to popuplate the layout
      let visibleColumns = this.props.Columns.filter(c => c.Visible).map(c => c.ColumnId);
      this.props.Data.Columns = visibleColumns;
      this.props.Data.ColumnSorts = this.props.ColumnSorts;
    }
  }
  public Back(): void {
    // todo
  }
  public GetIndexStepIncrement() {
    return this.state.LayoutSource == LayoutSource.Existing ? 3 : 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
