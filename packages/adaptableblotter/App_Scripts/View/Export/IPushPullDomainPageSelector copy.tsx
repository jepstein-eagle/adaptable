/*

import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';

import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import FormLayout, { FormRow } from '../../components/FormLayout';
import Input from '../../components/Input';
import SimpleButton from '../../components/SimpleButton';
import FlexWithFooter from '../../components/FlexWithFooter';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { usePopupContext } from '../Components/Popups/PopupContext';
import { Flex, Text } from 'rebass';
import { IPPDomain } from '../../Utilities/Interface/Reports/IPPDomain';
import { Report } from '../../PredefinedConfig/ExportState';
import { ILiveReport } from '../../Utilities/Interface/Reports/ILiveReport';
import { render } from 'react-dom';
import ListGroupItem from '../../components/List/ListGroupItem';
import { Icon } from '../../components/icons';
import ErrorBox from '../../components/ErrorBox';
import ListGroup from '../../components/List/ListGroup';
import folder from '../../components/icons/folder';
import { string } from 'prop-types';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';

interface IPushPullDomainPageSelectorProps {
  IPPDomainsPages: IPPDomain[];
  onApplyExport: (value: Report, folder: string, page: string) => ExportRedux.ExportApplyAction;
  // onCancel: () => void;
  ErrorMsg: string;
  CurrentReport: string;
  LiveReports: ILiveReport[];
  Reports: Report[];
  // onLogin: (login: string, password: string) => ExportRedux.IPPLoginAction;
  onCancel: () => any;
}

interface IPushPullDomainPageSelectorInternalState {
  SelectedFolder: string | undefined;
  SelectedPage: string | undefined;
}

const IPushPullDomainPageSelectorComponent = (props: IPushPullDomainPageSelectorProps) => {
  const [state, setState] = React.useState<IPushPullDomainPageSelectorInternalState>({
    SelectedFolder: undefined,
    SelectedPage: undefined,
  });

  const { hidePopup } = usePopupContext();

  const onSubmit = () => {
    let report: Report = props.Reports.find(r => r.Name == props.CurrentReport);
    props.onApplyExport(report, state.SelectedFolder, state.SelectedPage);
  };

  const SelectFolder = (folder: string) => {
    //  this.setState({ SelectedFolder: folder });
    setState({ ...state, SelectedFolder: folder });
  };
  const SelectPage = (page: string) => {
    //  this.setState({ SelectedFolder: folder });
    setState({ ...state, SelectedPage: page });
  };
  const UnSelectFolder = () => {
    //  this.setState({ SelectedFolder: folder });
    setState({ ...state, SelectedFolder: '', SelectedPage: '' });
  };

  const getItems = () => {
    let itemsElements: any[] = [];

    props.IPPDomainsPages.forEach(x => {
      // let itemsElements = this.props.IPPDomainsPages.map(x => {
      if (x.Name == state.SelectedFolder) {
        itemsElements.push(
          <ListGroupItem
            key={x.Name}
            style={{ marginTop: '10px' }}
            onClick={() => {
              UnSelectFolder();
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
              disabled={props.LiveReports.findIndex(x => x.WorkbookName == page) > -1}
              onClick={() => {
                SelectPage(page);
              }}
              active={state.SelectedPage == page}
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
              SelectFolder(x.Name);
            }}
            value={x.Name}
          >
            <Icon name="folder-shared" style={{ marginRight: '10px' }} />
            {x.Name}
          </ListGroupItem>
        );
      }
    });
    return itemsElements;
  };

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
          onSubmit();
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
                hidePopup();
              }}
            >
              CLOSE
            </SimpleButton>
            <div style={{ flex: 1 }} />

            <SimpleButton
              tone="accent"
              variant="raised"
              type="submit"
              disabled={StringExtensions.IsNullOrEmpty(state.SelectedPage)}
              icon={'check'}
              /*
              onClick={() => {
                this.props.onApplyExport(
                  this.props.Report,
                  this.state.SelectedFolder || '',
                  this.state.SelectedPage || ''
                );
              }}
              */

/*
            >
              Export
            </SimpleButton>
          </>
        }
      >
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          {StringExtensions.IsNotNullOrEmpty(props.ErrorMsg) ? (
            <ErrorBox>Error getting iPushPull Pages : {props.ErrorMsg}</ErrorBox>
          ) : (
            <ListGroup>{getItems()}</ListGroup>
          )}
        </Flex>
      </FlexWithFooter>
    </PanelWithImage>
  );
};

function mapStateToProps(state: AdaptableBlotterState, ownProps: IPushPullDomainPageSelectorProps) {
  return {
    IPPDomainsPages: state.System.IPPDomainsPages,
    ErrorMsg: state.System.ReportErrorMessage,
    LiveReports: state.System.CurrentLiveReports,
    Reports: state.Export.Reports,
    CurrentReport: state.Export.CurrentReport,
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

*/
