import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
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
import { LiveReport } from '../../Api/Events/LiveReportUpdated';
import { Flex } from 'rebass';
import Radio from '../../components/Radio';
import HelpBlock from '../../components/HelpBlock';
import { minWidth } from 'styled-system';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';

interface IPushPullDomainPageSelectorProps
  extends StrategyViewPopupProps<IPushPullDomainPageSelectorComponent> {
  IPushPullDomainsPages: IPushPullDomain[];
  onApplyExport: (
    report: Report,
    isLiveReport: boolean,
    folder: string,
    page: string
  ) => ExportRedux.ExportApplyAction;
  onCancel: () => void;
  ErrorMsg: string;
  Report: Report;
  LiveReports: LiveReport[];
}

interface IPushPullDomainPageSelectorInternalState {
  SelectedFolder: string | undefined;
  SelectedPage: string | undefined;
  IsLiveReport: boolean; // later we should get this from the page...
}

class IPushPullDomainPageSelectorComponent extends React.Component<
  IPushPullDomainPageSelectorProps,
  IPushPullDomainPageSelectorInternalState
> {
  constructor(props: IPushPullDomainPageSelectorProps) {
    super(props);
    this.state = { SelectedFolder: undefined, SelectedPage: undefined, IsLiveReport: true };
  }
  render() {
    let itemsElements: any[] = [];

    this.props.IPushPullDomainsPages.forEach(x => {
      if (x.Name == this.state.SelectedFolder) {
        itemsElements.push(
          <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Export__wrap">
            <ListGroupItem
              key={x.Name}
              style={{ marginTop: '10px', width: '40rem' }}
              onClick={() => {
                this.UnSelectFolder();
              }}
              value={x.Name}
            >
              <Icon name="folder-open" style={{ marginRight: '10px' }} /> {x.Name}
            </ListGroupItem>
            <SimpleButton
              tone="none"
              key={'closedbutton_' + x.Name}
              variant="text"
              style={{ marginLeft: '10px', padding: '1px', alignItems: 'bottom' }}
              onClick={() => {
                this.createNewIPushPullPage(x);
              }}
            >
              New Page
            </SimpleButton>
          </Flex>
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
          <Flex flexDirection="row" alignItems="stretch" className="ab-ToolPanel__Export__wrap">
            <ListGroupItem
              key={x.Name}
              style={{ marginTop: '10px', width: '40rem' }}
              onClick={() => {
                this.SelectFolder(x.Name);
              }}
              value={x.Name}
            >
              <Icon name="folder-shared" style={{ marginRight: '10px' }} />
              {x.Name}
            </ListGroupItem>
            <SimpleButton
              tone="neutral"
              key={'openbutton_' + x.Name}
              variant="text"
              style={{ marginLeft: '10px', padding: '1px', alignItems: 'bottom' }}
              onClick={() => {
                this.createNewIPushPullPage(x);
              }}
            >
              New Page
            </SimpleButton>
          </Flex>
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
                    this.state.IsLiveReport,
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
            <Flex flexDirection="column" padding={2} margin={2}>
              <HelpBlock marginBottom={1}>
                Choose whether to send a 'Live Report' (which updates as the Grid data changes) or a
                one-off 'Snapshot Report'.
              </HelpBlock>{' '}
              <Flex>
                <Radio
                  marginRight={3}
                  value="livereport"
                  checked={this.state.IsLiveReport == true}
                  onChange={(x: any, e: React.SyntheticEvent) => this.SelectLiveReport(e)}
                >
                  Live Report
                </Radio>
                <Radio
                  value="snapshot"
                  checked={this.state.IsLiveReport == false}
                  onChange={(x: any, e: React.SyntheticEvent) => this.SelectLiveReport(e)}
                >
                  Snapshot
                </Radio>
              </Flex>
              <HelpBlock marginBottom={1} marginTop={2}>
                Select the iPushPull Folder and Page where the data will be exported.
              </HelpBlock>
              <ListGroup>{itemsElements}</ListGroup>
            </Flex>
          )}
        </FlexWithFooter>
      </PanelWithImage>
    );
  }

  createNewIPushPullPage(x: IPushPullDomain): void {
    // this should be an AdaptablePrompt...
    let page = prompt('Choose a Page Name');
    if (page) {
      // check if exists
      if (ArrayExtensions.ContainsItem(x.Pages, page)) {
        // this should be a proper Alert - need to do properly
        alert('A page with that name already exists in the folder');
      } else {
        this.props.Blotter.PushPullService.AddNewPage(x.FolderId, page);
      }
    }
  }

  hidePopup() {
    this.props.onClosePopup();
  }

  SelectLiveReport(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'livereport') {
      this.setState({ IsLiveReport: true });
    } else if (e.value == 'snapshot') {
      this.setState({ IsLiveReport: false });
    }
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
        this.state.IsLiveReport,
        this.state.SelectedFolder,
        this.state.SelectedPage
      );
    }
  }
}

function mapStateToProps(state: AdaptableState, ownProps: IPushPullDomainPageSelectorProps) {
  return {
    IPushPullDomainsPages: state.System.IPushPullDomainsPages,
    ErrorMsg: state.System.ReportErrorMessage,
    LiveReports: state.System.CurrentLiveReports,
    Report: ownProps.Blotter.api.exportApi.getCurrentReport(),
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onApplyExport: (value: Report, isLiveReport: boolean, folder: string, page: string) =>
      dispatch(
        ExportRedux.ExportApply(value, ExportDestination.iPushPull, isLiveReport, folder, page)
      ),
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
