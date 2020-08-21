import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as AdvancedSearchRedux from '../../Redux/ActionsReducers/AdvancedSearchRedux';
import SimpleButton from '../../components/SimpleButton';
import ExpressionEditor from '../../components/ExpressionEditor';
import * as parser from '../../parser/src';

interface ExpandedQueryPopupComponentProps
  extends StrategyViewPopupProps<ExpandedQueryPopupComponent> {
  onChangeAdvancedSearch: (expression: string) => AdvancedSearchRedux.AdvancedSearchChangeAction;
}

export interface ExpandedQueryPopupState {
  expression: string;
}

class ExpandedQueryPopupComponent extends React.Component<
  ExpandedQueryPopupComponentProps,
  ExpandedQueryPopupState
> {
  constructor(props: ExpandedQueryPopupComponentProps) {
    super(props);
    this.state = {
      expression: this.props.PopupParams.value,
    };
  }

  render() {
    const isExpressionValid = parser.validateBoolean(this.state.expression);

    return (
      <PanelWithButton
        headerText="Current Query"
        bodyProps={{ padding: 0, style: { display: 'flex', flexDirection: 'column' } }}
        glyphicon={StrategyConstants.DashboardGlyph}
      >
        <ExpressionEditor
          value={this.state.expression}
          onChange={event =>
            this.setState({ expression: (event.target as HTMLInputElement).value })
          }
          initialData={this.props.Api.gridApi.getFirstRowNode().data}
          columns={this.props.Api.columnApi.getColumns()}
          functions={parser.defaultFunctions}
        />
        <SimpleButton
          padding={2}
          margin={2}
          onClick={() => {
            this.props.onClosePopup();
          }}
        >
          Close
        </SimpleButton>
        <SimpleButton
          variant="raised"
          tone="accent"
          padding={2}
          margin={2}
          onClick={() => {
            this.props.onChangeAdvancedSearch(this.state.expression);
            this.props.onClosePopup();
          }}
          disabled={!isExpressionValid}
        >
          Run Query
        </SimpleButton>
      </PanelWithButton>
    );
  }
}

function mapStateToProps(): Partial<ExpandedQueryPopupComponentProps> {
  return {
    // GridState: state.Grid,
  };
}

function mapDispatchToProps(
  dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>
): Partial<ExpandedQueryPopupComponentProps> {
  return {
    onChangeAdvancedSearch: (expression: string) =>
      dispatch(AdvancedSearchRedux.AdvancedSearchChange(expression)),
  };
}

export let ExpandedQueryPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpandedQueryPopupComponent);
