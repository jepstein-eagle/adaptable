import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '@adaptabletools/adaptable/src/PredefinedConfig/AdaptableState';
import * as PopupRedux from '@adaptabletools/adaptable/src/Redux/ActionsReducers/PopupRedux';
import * as IPushPullRedux from '../Redux/ActionReducers/IPushPullRedux';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import FormLayout, { FormRow } from '@adaptabletools/adaptable/src/components/FormLayout';
import Input from '@adaptabletools/adaptable/src/components/Input';
import SimpleButton from '@adaptabletools/adaptable/src/components/SimpleButton';
import FlexWithFooter from '@adaptabletools/adaptable/src/components/FlexWithFooter';
import { PanelWithImage } from '@adaptabletools/adaptable/src/View/Components/Panels/PanelWithImage';
import { usePopupContext } from '@adaptabletools/adaptable/src/View/Components/Popups/PopupContext';
import ErrorBox from '@adaptabletools/adaptable/src/components/ErrorBox';
import HelpBlock from '@adaptabletools/adaptable/src/components/HelpBlock';
import { Flex } from 'rebass';
import { IPushPullDomain } from '@adaptabletools/adaptable/src/PredefinedConfig/IPushPullState';
import Dropdown from '@adaptabletools/adaptable/src/components/Dropdown';
import {
  EMPTY_STRING,
  EMPTY_ARRAY,
} from '@adaptabletools/adaptable/src/Utilities/Constants/GeneralConstants';
import ArrayExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';

interface IPushPullAddPagePopupProps {
  IPushPullDomainsPages: IPushPullDomain[] | undefined;

  onAddPage: (folder: string, page: string) => IPushPullRedux.IPushPullAddPageAction;
  onCancel: () => any;
}

interface IPushPullAddPagePopupState {
  Folder: string | undefined;
  Page: string | undefined;
  AvailablePages: string[];
  ErrorMessage: string | undefined;
}

const IPushPullAddPageComponent = (props: IPushPullAddPagePopupProps) => {
  const [state, setState] = React.useState<IPushPullAddPagePopupState>({
    Folder: '',
    Page: '',
    AvailablePages: EMPTY_ARRAY,
    ErrorMessage: '',
  });

  const { hidePopup } = usePopupContext();

  const onSubmit = () => {
    if (ArrayExtensions.ContainsItem(state.AvailablePages, state.Page)) {
      setState({ ...state, ErrorMessage: 'A page with that name already exists in the folder' });
    } else {
      props.onAddPage(state.Folder, state.Page);
    }
  };

  const onPageNameChange = (event: React.FormEvent<any>) => {
    const e = event.target as HTMLInputElement;
    setState({ ...state, Page: e.value });
  };

  const onFolderChanged = (folderName: string) => {
    if (StringExtensions.IsNotNullOrEmpty(folderName) && folderName !== 'Select Folder') {
      let avaialablePages = props.IPushPullDomainsPages.find(f => f.Name == folderName).Pages;

      setState({
        Folder: folderName,
        AvailablePages: avaialablePages,
        Page: EMPTY_STRING,
        ErrorMessage: EMPTY_STRING,
      });
    } else {
      setState({
        Folder: EMPTY_STRING,
        AvailablePages: [],
        Page: EMPTY_STRING,
        ErrorMessage: EMPTY_STRING,
      });
    }
  };

  const availableFolders: any[] = props.IPushPullDomainsPages.map(
    (iPushPullDomain: IPushPullDomain) => {
      return {
        label: iPushPullDomain.Name,
        value: iPushPullDomain.Name,
      };
    }
  );
  return (
    <PanelWithImage
      header="Add ipushpull Page"
      glyphicon="newpage"
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
              disabled={
                StringExtensions.IsNullOrEmpty(state.Folder) ||
                StringExtensions.IsNullOrEmpty(state.Page)
              }
              icon={'check'}
            >
              Add Page
            </SimpleButton>
          </>
        }
      >
        <Flex flexDirection="column" padding={2} margin={2}>
          <HelpBlock marginBottom={1}>
            Select a folder and then choose the name of the new ipushpull page it should contain.
          </HelpBlock>

          <FormLayout margin={3}>
            <FormRow label="Folder:">
              <Dropdown
                disabled={availableFolders.length == 0}
                style={{ minWidth: '50%' }}
                options={availableFolders}
                className="ab-Popup__IPushPull__select"
                onChange={(folder: string) => onFolderChanged(folder)}
                value={state.Folder ? state.Folder : null}
                placeholder="Select Folder"
                marginRight={2}
              />
            </FormRow>
            <FormRow label="Page">
              <Input
                width="50%"
                type="text"
                placeholder="Page Name"
                value={state.Page}
                onChange={onPageNameChange}
              />
            </FormRow>
            {state.ErrorMessage ? (
              <FormRow label="">
                <ErrorBox>{state.ErrorMessage}</ErrorBox>
              </FormRow>
            ) : null}
          </FormLayout>
        </Flex>
      </FlexWithFooter>
    </PanelWithImage>
  );
};

function mapStateToProps(state: AdaptableState) {
  return {
    IPushPullDomainsPages: state.System.IPushPullDomainsPages,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onAddPage: (folder: string, page: string) =>
      dispatch(IPushPullRedux.IPushPullAddPage(folder, page)),

    onCancel: () => {
      dispatch(PopupRedux.PopupHideScreen());
    },
  };
}

export let IPushPullAddPagePopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(IPushPullAddPageComponent);
