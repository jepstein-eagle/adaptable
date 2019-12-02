import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';

import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { IPPDomain } from '../../Utilities/Interface/Reports/IPPDomain';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/ExportState';
import ListGroupItem from '../../components/List/ListGroupItem';
import ListGroup from '../../components/List/ListGroup';
import ErrorBox from '../../components/ErrorBox';
import SimpleButton from '../../components/SimpleButton';
import { Icon } from '../../components/icons';

interface IPushPullDomainPageSelectorProps
  extends StrategyViewPopupProps<IPushPullDomainPageSelectorComponent> {
  IPPDomainsPages: IPPDomain[];
  onApplyExport: (value: Report, folder: string, page: string) => ExportRedux.ExportApplyAction;
  onCancel: () => void;
  ErrorMsg: string;
  Report: Report;
  LiveReports: ILiveReport[];
}

interface IPushPullDomainPageSelectorInternalState {
  SelectedFolder: string | undefined;
  SelectedPage: string | undefined;
}

class IPushPullDomainPageSelectorComponent extends React.Component<
  IPushPullDomainPageSelectorProps,
  IPushPullDomainPageSelectorInternalState
> {
  constructor(props: IPushPullDomainPageSelectorProps) {
    super(props);
    this.state = { SelectedFolder: undefined, SelectedPage: undefined };
  }
  render() {
    let itemsElements: any[] = [];

    this.props.IPPDomainsPages.forEach(x => {
      // let itemsElements = this.props.IPPDomainsPages.map(x => {
      if (x.Name == this.state.SelectedFolder) {
        itemsElements.push(
          <ListGroupItem
            key={x.Name}
            style={{ marginTop: '10px' }}
            onClick={() => {
              this.UnSelectFolder();
            }}
            value={x.Name}
          >
            <Icon name="folder-open" style={{ marginRight: '10px' }} /> {x.Name}
          </ListGroupItem>
        );
        x.Pages.forEach((page: string) => {
          itemsElements.push(
            <ListGroupItem
              key={page}
              disabled={this.props.LiveReports.findIndex(x => x.WorkbookName == page) > -1}
              onClick={() => {
                this.SelectPage(page);
              }}
              active={this.state.SelectedPage == page}
              value={page}
            >
              <Icon name="cloud-upload" style={{ marginRight: '10px', marginLeft: '10px' }} />{' '}
              {page}
            </ListGroupItem>
          );
        });
      } else {
        itemsElements.push(
          <ListGroupItem
            key={x.Name}
            style={{ marginTop: '10px' }}
            onClick={() => {
              this.SelectFolder(x.Name);
            }}
            value={x.Name}
          >
            <Icon name="folder-shared" style={{ marginRight: '10px' }} />
            {x.Name}
          </ListGroupItem>
        );
      }
    });
    return (
      <PanelWithButton headerText="iPushPull Folder and Page Selector" glyphicon="export">
        {StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? (
          <ErrorBox>Error getting iPushPull Pages : {this.props.ErrorMsg}</ErrorBox>
        ) : (
          <ListGroup>{itemsElements}</ListGroup>
        )}

        <SimpleButton
          disabled={StringExtensions.IsNullOrEmpty(this.state.SelectedPage)}
          tone="accent"
          variant="raised"
          style={{ marginTop: '10px' }}
          onClick={() => {
            this.props.onApplyExport(
              this.props.Report,
              this.state.SelectedFolder || '',
              this.state.SelectedPage || ''
            );
          }}
        >
          Start Export
        </SimpleButton>
      </PanelWithButton>
    );
  }

  SelectFolder(folder: string) {
    this.setState({ SelectedFolder: folder });
  }
  SelectPage(page: string) {
    this.setState({ SelectedPage: page });
  }
  UnSelectFolder() {
    this.setState({ SelectedFolder: '', SelectedPage: '' });
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: IPushPullDomainPageSelectorProps) {
  return {
    IPPDomainsPages: state.System.IPPDomainsPages,
    ErrorMsg: state.System.ReportErrorMessage,
    LiveReports: state.System.CurrentLiveReports,
    Report: ownProps.Blotter.api.exportApi.getCurrentReport(),
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onApplyExport: (value: Report, folder: string, page: string) =>
      dispatch(ExportRedux.ExportApply(value, ExportDestination.iPushPull, folder, page)),
    onCancel: () => {
      dispatch(PopupRedux.PopupHideScreen());
      dispatch(SystemRedux.ReportSetErrorMessage(''));
    },
  };
}

export let IPushPullDomainPageSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(IPushPullDomainPageSelectorComponent);
