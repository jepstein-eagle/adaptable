import * as React from "react";
import * as Redux from "redux";
import * as _ from 'lodash';
import * as QuickSearchRedux from '../../../Redux/ActionsReducers/QuickSearchRedux'
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import { StrategyViewPopupProps } from "../SharedProps/StrategyViewPopupProps";
import { IAdaptableBlotterToolPanelContext } from "../../../Utilities/Interface/IAdaptableBlotterToolPanelContext";
import { IToolPanelComp, IToolPanelParams } from "ag-grid-community";
import { render } from "react-dom";
import { AdaptableBlotterFormControlTextClear } from "../Forms/AdaptableBlotterFormControlTextClear";
import { ButtonMinimise } from "../Buttons/ButtonMinimise";
import { ButtonMaximise } from "../Buttons/ButtonMaximise";
import { Row, Table } from "react-bootstrap";

interface AdaptableBlotterToolPanelProps extends StrategyViewPopupProps<AdaptableBlotterToolPanelComponent> {
  QuickSearchText: string;

  onRunQuickSearch: (quickSearchText: string) => QuickSearchRedux.QuickSearchApplyAction;

}

export interface AdaptableBlotterToolPanelState {
  EditedQuickSearchText: string;
  QuickSearchShow: boolean;
}

class AdaptableBlotterToolPanelComponent extends React.Component<AdaptableBlotterToolPanelProps, AdaptableBlotterToolPanelState> {
  constructor(props: AdaptableBlotterToolPanelProps) {
    super(props);
    this.state = {
      EditedQuickSearchText: this.props.QuickSearchText,
      QuickSearchShow: false
    }
    // we got agGrid api from props
    // console.log(this.props.api);
    // console.log(this.props);
  }

  debouncedRunQuickSearch = _.debounce(() => this.props.onRunQuickSearch(this.state.EditedQuickSearchText), 0);

  render(): any {

    let minimiseButton = <ButtonMinimise
      cssClassName={''}
      size={"xs"}
      bsStyle={'default'}
      DisplayMode={"Glyph"}
      hideToolTip={true}
      style={{ float: "left", marginLeft: "0px", marginRight: "20px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }}
      onClick={() => this.onMinimiseQuickSearch()} />

    let maximiseButton = <ButtonMaximise
      cssClassName={''}
      size={"xs"}
      bsStyle={'default'}
      DisplayMode={"Glyph"}
      hideToolTip={true}
      useHoirzontalChevron={true}
      style={{ float: "left", marginLeft: "0px", marginRight: "20px", border: '0px', background: 'none', borderRadius: '0px', boxShadow: 'none' }}
      onClick={() => this.onMaximiseQuickSearch()} />

    return <div>

      <span> Coming in Version 3.4</span><br />
      <span> (April 2019)</span>


      <Table>
        <tbody>
          <tr>
            <td>
              {this.state.QuickSearchShow ?
                <span>{minimiseButton}</span>
                :
                <span>{maximiseButton}</span>
              }
            </td>
            <td>Quick Search</td>
          </tr>
          {this.state.QuickSearchShow &&
            <tr>
              <td colSpan={2}>
                <AdaptableBlotterFormControlTextClear
                  cssClassName={""}
                  style={{ width: "135px" }}
                  bsSize={'sm'}
                  type="text"
                  placeholder="Search Text"
                  value={this.props.QuickSearchText}
                  OnTextChange={(x) => this.onUpdateQuickSearchText(x)} />
              </td>
            </tr>
          }
        </tbody>
      </Table>
    </div>
  }

  onUpdateQuickSearchText(searchText: string) {
    this.setState({ EditedQuickSearchText: searchText })
    this.debouncedRunQuickSearch();
  }

  onMinimiseQuickSearch() {
    this.setState({ QuickSearchShow: false })
  }

  onMaximiseQuickSearch() {
    this.setState({ QuickSearchShow: true })
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    QuickSearchText: state.QuickSearch.QuickSearchText
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onRunQuickSearch: (newQuickSearchText: string) => dispatch(QuickSearchRedux.QuickSearchApply(newQuickSearchText)),
  };
}

export const ConnectedAdaptableBlotterToolPanel = connect(mapStateToProps, mapDispatchToProps)(AdaptableBlotterToolPanelComponent);

export const AdaptableBlotterToolPanelBuilder = (ctx: IAdaptableBlotterToolPanelContext) =>
  class AdaptableBlotterToolPanel implements IToolPanelComp {
    public gui: HTMLElement;
    public ctx: IAdaptableBlotterToolPanelContext;

    public constructor() {
      this.ctx = ctx;
    }

    public init(params?: IToolPanelParams): void {
      this.gui = document.createElement('div');
      render(
        (<Provider store={this.ctx.Blotter.AdaptableBlotterStore.TheStore}>
          <ConnectedAdaptableBlotterToolPanel Blotter={this.ctx.Blotter} TeamSharingActivated={false} />
        </Provider>),
        this.gui
      );

      if (params && params.api) {
        params.api.addEventListener('modelUpdated', (newModel: any) => {
          //    console.log('Model updated', newModel);
        });
      }
    }

    public getGui(): HTMLElement {
      if (!this.gui) { this.init(); }
      return this.gui;
    }

    public refresh(): void {
      // no refresh logic needed
    }
  }
