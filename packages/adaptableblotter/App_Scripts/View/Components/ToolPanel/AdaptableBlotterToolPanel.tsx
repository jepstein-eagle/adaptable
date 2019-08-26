import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import * as QuickSearchRedux from '../../../Redux/ActionsReducers/QuickSearchRedux';
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from '../SharedProps/StrategyViewPopupProps';
import { IAdaptableBlotterToolPanelContext } from '../../../Utilities/Interface/IAdaptableBlotterToolPanelContext';
import { IToolPanelComp, IToolPanelParams } from 'ag-grid-community';
import { render } from 'react-dom';

interface AdaptableBlotterToolPanelProps
  extends StrategyViewPopupProps<AdaptableBlotterToolPanelComponent> {
  QuickSearchText: string;

  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;
}

export interface AdaptableBlotterToolPanelState {
  EditedQuickSearchText: string;
  QuickSearchShowPanel: boolean;
  QuickSearchShowSettings: boolean;
}

class AdaptableBlotterToolPanelComponent extends React.Component<
  AdaptableBlotterToolPanelProps,
  AdaptableBlotterToolPanelState
> {
  constructor(props: AdaptableBlotterToolPanelProps) {
    super(props);
    this.state = {
      EditedQuickSearchText: this.props.QuickSearchText,
      QuickSearchShowPanel: false,
      QuickSearchShowSettings: false,
    };
    // we got agGrid api from props
    // console.log(this.props.api);
    // console.log(this.props);
  }

  debouncedRunQuickSearch = _.debounce(
    () => this.props.onRunQuickSearch(this.state.EditedQuickSearchText),
    0
  );

  render(): any {
    return null;
  }

  onUpdateQuickSearchText(searchText: string) {
    this.setState({ EditedQuickSearchText: searchText });
    this.debouncedRunQuickSearch();
  }

  onMinimiseQuickSearch() {
    this.setState({ QuickSearchShowPanel: false });
  }

  onMaximiseQuickSearch() {
    this.setState({ QuickSearchShowPanel: true });
  }

  onShowQuickSearchSettings() {
    this.setState({ QuickSearchShowSettings: true });
  }

  onHideQuickSearchSettings() {
    this.setState({ QuickSearchShowSettings: false });
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
  };
}

export const ConnectedAdaptableBlotterToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdaptableBlotterToolPanelComponent);

export const AdaptableBlotterToolPanelBuilder = (ctx: IAdaptableBlotterToolPanelContext) =>
  class AdaptableBlotterToolPanel implements IToolPanelComp {
    public gui: HTMLElement;
    public ctx: IAdaptableBlotterToolPanelContext;

    public constructor() {
      this.ctx = ctx;
    }

    public init(params?: IToolPanelParams): void {
      this.gui = document.createElement('div');
      this.gui.id = 'adaptable-blotter-tool-panel_' + this.ctx.Blotter.blotterOptions.blotterId;
      render(
        <Provider store={this.ctx.Blotter.adaptableBlotterStore.TheStore}>
          <ConnectedAdaptableBlotterToolPanel
            Blotter={this.ctx.Blotter}
            TeamSharingActivated={false}
          />
        </Provider>,
        this.gui
      );

      if (params && params.api) {
        params.api.addEventListener('modelUpdated', (newModel: any) => {
          //    console.log('Model updated', newModel);
        });
      }
    }

    public getGui(): HTMLElement {
      if (!this.gui) {
        this.init();
      }
      return this.gui;
    }

    public refresh(): void {
      // no refresh logic needed
    }
  };
