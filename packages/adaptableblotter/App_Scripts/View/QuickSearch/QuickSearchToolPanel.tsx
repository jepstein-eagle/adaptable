import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as QuickSearchRedux from '../../Redux/ActionsReducers/QuickSearchRedux';
import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';

interface QuickSearchToolPanelComponentProps
  extends ToolPanelStrategyViewPopupProps<QuickSearchToolPanelComponentProps> {
  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
  QuickSearchText: string;
}

interface QuickSearchToolPanelComponentState {
  EditedQuickSearchText: string;
  IsMinimised: boolean;
}

class QuickSearchToolPanelComponent extends React.Component<
  QuickSearchToolPanelComponentProps,
  QuickSearchToolPanelComponentState
> {
  constructor(props: QuickSearchToolPanelComponentProps) {
    super(props);
    this.state = { EditedQuickSearchText: this.props.QuickSearchText, IsMinimised: true };
  }

  UNSAFE_componentWillReceiveProps(
    nextProps: QuickSearchToolPanelComponentProps,
    nextContext: any
  ) {
    this.setState({
      EditedQuickSearchText: nextProps.QuickSearchText,
    });
  }

  debouncedRunQuickSearch = _.debounce(
    () => this.props.onRunQuickSearch(this.state.EditedQuickSearchText),
    350
  );

  render() {
    return (
      <PanelToolPanel
        className="ab-ToolPanel__QuickSearch"
        headerText={StrategyConstants.QuickSearchStrategyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose(StrategyConstants.QuickSearchStrategyId)}
      >
        {!this.state.IsMinimised && (
          <AdaptableBlotterFormControlTextClear
            type="text"
            placeholder="Search Text"
            className="ab-ToolPanel__QuickSearch__text"
            value={this.state.EditedQuickSearchText}
            OnTextChange={x => this.onUpdateQuickSearchText(x)}
            style={{ height: '100%' }}
            inputStyle={{ width: '7rem' }}
          />
        )}
      </PanelToolPanel>
    );
  }

  onUpdateQuickSearchText(searchText: string) {
    this.setState({ EditedQuickSearchText: searchText });
    this.debouncedRunQuickSearch();
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onRunQuickSearch: (newQuickSearchText: string) =>
      dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.QuickSearchStrategyId,
          ScreenPopups.QuickSearchPopup
        )
      ),
    onClose: (toolPanel: string) => dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
  };
}

export let QuickSearchToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickSearchToolPanelComponent);
