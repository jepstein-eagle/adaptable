import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Input from '../../../components/Input';
import { Flex, Text } from 'rebass';
import ErrorBox from '../../../components/ErrorBox';
import { IPushPullDomain, IPushPullReport } from '../../../PredefinedConfig/IPushPullState';
import HelpBlock from '../../../components/HelpBlock';
import ListGroup from '../../../components/List/ListGroup';
import ListGroupItem from '../../../components/List/ListGroupItem';
import { Icon } from '../../../components/icons';
import SimpleButton from '../../../components/SimpleButton';
import ArrayExtensions from '../../../Utilities/Extensions/ArrayExtensions';

export interface IPushPullReportDomainPageSelectorWizardProps
  extends AdaptableWizardStepProps<IPushPullReport> {
  IPushPullDomainsPages: IPushPullDomain[];
}
export interface IPushPullReportDomainPageSelectorWizardState {
  SelectedFolder: string | undefined;
  SelectedPage: string | undefined;
}

export class IPushPullReportDomainPageSelectorWizard
  extends React.Component<
    IPushPullReportDomainPageSelectorWizardProps,
    IPushPullReportDomainPageSelectorWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: IPushPullReportDomainPageSelectorWizardProps) {
    super(props);
    this.state = {
      SelectedFolder: this.props.Data.Folder,
      SelectedPage: this.props.Data.Page,
    };
  }
  render(): any {
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
              <Icon key={'icon_' + x.Name} name="folder-open" style={{ marginRight: '10px' }} />{' '}
              {x.Name}
            </ListGroupItem>
            <SimpleButton
              tone="none"
              key={'newpage_' + x.Name}
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
      <WizardPanel>
        <HelpBlock marginBottom={1} marginTop={2}>
          Select the iPushPull Folder and Page where the data will be exported.
        </HelpBlock>
        <ListGroup>{itemsElements}</ListGroup>
      </WizardPanel>
    );
  }

  SelectFolder(folder: string) {
    this.setState(
      {
        SelectedFolder: folder,
        SelectedPage: '',
      } as IPushPullReportDomainPageSelectorWizardState,
      () => this.props.UpdateGoBackState()
    );
  }
  SelectPage(page: string) {
    this.setState(
      {
        SelectedPage: page,
      } as IPushPullReportDomainPageSelectorWizardState,
      () => this.props.UpdateGoBackState()
    );
  }
  UnSelectFolder() {
    this.setState(
      {
        SelectedFolder: '',
        SelectedPage: '',
      } as IPushPullReportDomainPageSelectorWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  createNewIPushPullPage(x: IPushPullDomain): void {
    // this should be an AdaptablePrompt...
    // need some kind of confirmation
    let page = prompt('Choose a Page Name');
    if (page) {
      // check if exists
      if (ArrayExtensions.ContainsItem(x.Pages, page)) {
        // this should be a proper Alert - need to do properly
        alert('A page with that name already exists in the folder');
      } else {
        this.props.Adaptable.PushPullService.addNewPage(x.FolderId, page);
      }
    }
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.SelectedFolder) &&
      StringExtensions.IsNotNullOrEmpty(this.state.SelectedPage)
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Folder = this.state.SelectedFolder;
    this.props.Data.Page = this.state.SelectedPage;
  }
  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
