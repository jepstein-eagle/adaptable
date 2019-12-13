import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';

import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { LiveReport } from '../../Utilities/Interface/Reports/LiveReport';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/ExportState';
import ListGroupItem from '../../components/List/ListGroupItem';
import ListGroup from '../../components/List/ListGroup';
import ErrorBox from '../../components/ErrorBox';
import SimpleButton from '../../components/SimpleButton';
import { Icon } from '../../components/icons';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import FlexWithFooter from '../../components/FlexWithFooter';
import { IPushPullDomain } from '../../PredefinedConfig/PartnerState';

interface IPushPullDomainPageSelectorProps
  extends StrategyViewPopupProps<IPushPullDomainPageSelectorComponent> {
  IPushPullDomainsPages: IPushPullDomain[];
  onApplyExport: (value: Report, folder: string, page: string) => ExportRedux.ExportApplyAction;
  onCancel: () => void;
  ErrorMsg: string;
  Report: Report;
  LiveReports: LiveReport[];
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

    this.props.IPushPullDomainsPages.forEach(x => {
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
              disabled={this.props.LiveReports.findIndex(x => x.PageName == page) > -1}
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
      <PanelWithImage
        header="iPushPull Folder and Page Selector"
        glyphicon="export"
        variant="primary"
        style={{ height: '100%' }}
      >
        <FlexWithFooter
          as="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            // this.onSubmit();
          }}
          footerProps={{
            fontSize: 'var(--ab-font-size-4)',
          }}
          footer={
            <>
              <SimpleButton
                tone="neutral"
                variant="text"
                tooltip="Close"
                onClick={e => {
                  e.stopPropagation();
                  this.hidePopup();
                }}
              >
                CLOSE
              </SimpleButton>
              <div style={{ flex: 1 }} />

              <SimpleButton
                disabled={StringExtensions.IsNullOrEmpty(this.state.SelectedPage)}
                tone="accent"
                variant="raised"
                type="submit"
                style={{ marginTop: '10px' }}
                onClick={() => {
                  this.props.onApplyExport(
                    this.props.Report,
                    this.state.SelectedFolder || '',
                    this.state.SelectedPage || ''
                  );
                }}
              >
                Export to iPushPull
              </SimpleButton>
            </>
          }
        >
          {StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? (
            <ErrorBox>Error getting iPushPull Pages : {this.props.ErrorMsg}</ErrorBox>
          ) : (
            <ListGroup>{itemsElements}</ListGroup>
          )}
        </FlexWithFooter>
      </PanelWithImage>
    );
  }

  //const { hidePopup } = usePopupContext();

  hidePopup() {
    this.props.onClosePopup();
  }

  SelectFolder(folder: string) {
    this.setState({ SelectedFolder: folder, SelectedPage: '' });
  }
  SelectPage(page: string) {
    this.setState({ SelectedPage: page });
  }
  UnSelectFolder() {
    this.setState({ SelectedFolder: '', SelectedPage: '' });
  }
  onSubmit() {
    // not being called
    if (
      StringExtensions.IsNotNullOrEmpty(this.state.SelectedFolder) &&
      StringExtensions.IsNotNullOrEmpty(this.state.SelectedPage)
    ) {
      this.props.onApplyExport(
        this.props.Report,
        this.state.SelectedFolder,
        this.state.SelectedPage
      );
    }
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: IPushPullDomainPageSelectorProps) {
  return {
    IPushPullDomainsPages: state.System.IPushPullDomainsPages,
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
