import * as React from 'react';
import { PanelWithImage } from '../Panels/PanelWithImage';
import { AdaptableObjectRow } from '../AdaptableObjectRow';
import { IColItem } from '../../UIInterfaces';
import { Helper } from '../../../Utilities/Helpers/Helper';
import { AdaptableObjectCollection } from '../AdaptableObjectCollection';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { UIHelper } from '../../UIHelper';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { PanelWithButton } from '../Panels/PanelWithButton';
import { ButtonMaximise } from '../Buttons/ButtonMaximise';
import { ButtonMinimise } from '../Buttons/ButtonMinimise';
import { AdaptablePopover } from '../../AdaptablePopover';
// this will be correctly configured at build time to contain the correct version

import version from '../../../../version';
import Dialog from '../../../components/Dialog';
import { Flex } from 'rebass';
import SimpleButton from '../../../components/SimpleButton';
import Radio from '../../../components/Radio';
import { AdaptableOptions } from '../../../AdaptableOptions/AdaptableOptions';

interface AdaptableGridInfoProps extends React.ClassAttributes<AdaptableGridInfo> {
  Adaptable: IAdaptable;
  onClose?: () => void;
  showAbout: boolean;
}

export interface AdaptableGridInfoState {
  // General
  ShowGridProperties: boolean;
  //  Options Minimised
  IsBaseOptionsMinimised: boolean;
  IsContainerOptionsMinimised: boolean;
  IsAuditOptionsMinimised: boolean;
  IsConfigServerOptionsMinimised: boolean;
  IsQueryOptionsMinimised: boolean;
  IsLayoutOptionsMinimised: boolean;
  IsFilterOptionsMinimised: boolean;
  IsGeneralOptionsMinimised: boolean;
}

export class AdaptableGridInfo extends React.Component<
  AdaptableGridInfoProps,
  AdaptableGridInfoState
> {
  constructor(props: AdaptableGridInfoProps) {
    super(props);
    this.state = {
      ShowGridProperties: true,
      IsBaseOptionsMinimised: true,
      IsContainerOptionsMinimised: true,
      IsAuditOptionsMinimised: true,
      IsConfigServerOptionsMinimised: true,
      IsQueryOptionsMinimised: true,
      IsLayoutOptionsMinimised: true,
      IsFilterOptionsMinimised: true,
      IsGeneralOptionsMinimised: true,
    };
  }
  render() {
    let modalContainer: HTMLElement = UIHelper.getModalContainer(
      this.props.Adaptable.adaptableOptions,
      document
    );

    let gridPropertiesColItems: IColItem[] = [
      { Content: 'Property', Size: 5 },
      { Content: 'Value', Size: 7 },
    ];

    let adaptableOptionsColItems: IColItem[] = [
      { Content: 'Property', Size: 6 },
      { Content: 'Value', Size: 4 },
      { Content: '', Size: 2 },
    ];

    let gridProperties = this.CreateGridInfo(gridPropertiesColItems).map((x, index) => {
      return <AdaptableObjectRow key={index} colItems={x} />;
    });

    let baseadaptableOptions = this.CreateBaseOptionsInfo(adaptableOptionsColItems).map(
      (x, index) => {
        return <AdaptableObjectRow key={index} colItems={x} />;
      }
    );

    let containeradaptableOptions = this.CreateContainerOptionsInfo(adaptableOptionsColItems).map(
      (x, index) => {
        return <AdaptableObjectRow key={index} colItems={x} />;
      }
    );

    let auditadaptableOptions = this.CreateAuditOptionsInfo(adaptableOptionsColItems).map(
      (x, index) => {
        return <AdaptableObjectRow key={index} colItems={x} />;
      }
    );

    let configServeradaptableOptions = this.CreateConfigServerOptionsInfo(
      adaptableOptionsColItems
    ).map((x, index) => {
      return <AdaptableObjectRow key={index} colItems={x} />;
    });

    let queryadaptableOptions = this.CreateQueryOptionsInfo(adaptableOptionsColItems).map(
      (x, index) => {
        return <AdaptableObjectRow key={index} colItems={x} />;
      }
    );

    let layoutadaptableOptions = this.CreateLayoutOptionsInfo(adaptableOptionsColItems).map(
      (x, index) => {
        return <AdaptableObjectRow key={index} colItems={x} />;
      }
    );

    let filteradaptableOptions = this.CreateFilterOptionsInfo(adaptableOptionsColItems).map(
      (x, index) => {
        return <AdaptableObjectRow key={index} colItems={x} />;
      }
    );

    let generaladaptableOptions = this.CreateGeneralOptionsInfo(adaptableOptionsColItems).map(
      (x, index) => {
        return <AdaptableObjectRow key={index} colItems={x} />;
      }
    );

    let showBaseOptionsButton = this.state.IsBaseOptionsMinimised
      ? this.createMaximiseButton('Base', () => {
          this.setState({
            IsBaseOptionsMinimised: false,
            IsContainerOptionsMinimised: true,
            IsAuditOptionsMinimised: true,
            IsConfigServerOptionsMinimised: true,
            IsQueryOptionsMinimised: true,
            IsLayoutOptionsMinimised: true,
            IsFilterOptionsMinimised: true,
            IsGeneralOptionsMinimised: true,
          } as AdaptableGridInfoState);
        })
      : this.createMinimiseButton('Base', () => {
          this.setState({ IsBaseOptionsMinimised: true } as AdaptableGridInfoState);
        });

    let showContainerOptionsButton = this.state.IsContainerOptionsMinimised
      ? this.createMaximiseButton('Container', () => {
          this.setState({
            IsBaseOptionsMinimised: true,
            IsContainerOptionsMinimised: false,
            IsAuditOptionsMinimised: true,
            IsConfigServerOptionsMinimised: true,
            IsQueryOptionsMinimised: true,
            IsLayoutOptionsMinimised: true,
            IsFilterOptionsMinimised: true,
            IsGeneralOptionsMinimised: true,
          } as AdaptableGridInfoState);
        })
      : this.createMinimiseButton('Container', () => {
          this.setState({ IsContainerOptionsMinimised: true } as AdaptableGridInfoState);
        });

    let showAuditOptionsButton = this.state.IsAuditOptionsMinimised
      ? this.createMaximiseButton('Audit', () => {
          this.setState({
            IsBaseOptionsMinimised: true,
            IsAuditOptionsMinimised: false,
            IsContainerOptionsMinimised: true,
            IsConfigServerOptionsMinimised: true,
            IsQueryOptionsMinimised: true,
            IsLayoutOptionsMinimised: true,
            IsFilterOptionsMinimised: true,
            IsGeneralOptionsMinimised: true,
          } as AdaptableGridInfoState);
        })
      : this.createMinimiseButton('Audit', () => {
          this.setState({ IsAuditOptionsMinimised: true } as AdaptableGridInfoState);
        });

    let showConfigServerOptionsButton = this.state.IsConfigServerOptionsMinimised
      ? this.createMaximiseButton('Config Server', () => {
          this.setState({
            IsBaseOptionsMinimised: true,
            IsAuditOptionsMinimised: true,
            IsContainerOptionsMinimised: true,
            IsConfigServerOptionsMinimised: false,
            IsQueryOptionsMinimised: true,
            IsLayoutOptionsMinimised: true,
            IsFilterOptionsMinimised: true,
            IsGeneralOptionsMinimised: true,
          } as AdaptableGridInfoState);
        })
      : this.createMinimiseButton('Config Server', () => {
          this.setState({ IsConfigServerOptionsMinimised: true } as AdaptableGridInfoState);
        });

    let showQueryOptionsButton = this.state.IsQueryOptionsMinimised
      ? this.createMaximiseButton('Query', () => {
          this.setState({
            IsBaseOptionsMinimised: true,
            IsAuditOptionsMinimised: true,
            IsContainerOptionsMinimised: true,
            IsConfigServerOptionsMinimised: true,
            IsQueryOptionsMinimised: false,
            IsLayoutOptionsMinimised: true,
            IsFilterOptionsMinimised: true,
            IsGeneralOptionsMinimised: true,
          } as AdaptableGridInfoState);
        })
      : this.createMinimiseButton('Query', () => {
          this.setState({ IsQueryOptionsMinimised: true } as AdaptableGridInfoState);
        });

    let showLayoutOptionsButton = this.state.IsLayoutOptionsMinimised
      ? this.createMaximiseButton('Layout', () => {
          this.setState({
            IsBaseOptionsMinimised: true,
            IsAuditOptionsMinimised: true,
            IsContainerOptionsMinimised: true,
            IsConfigServerOptionsMinimised: true,
            IsQueryOptionsMinimised: true,
            IsLayoutOptionsMinimised: false,
            IsFilterOptionsMinimised: true,
            IsGeneralOptionsMinimised: true,
          } as AdaptableGridInfoState);
        })
      : this.createMinimiseButton('Layout', () => {
          this.setState({ IsLayoutOptionsMinimised: true } as AdaptableGridInfoState);
        });

    let showFilterOptionsButton = this.state.IsFilterOptionsMinimised
      ? this.createMaximiseButton('Filter', () => {
          this.setState({
            IsBaseOptionsMinimised: true,
            IsAuditOptionsMinimised: true,
            IsContainerOptionsMinimised: true,
            IsConfigServerOptionsMinimised: true,
            IsQueryOptionsMinimised: true,
            IsLayoutOptionsMinimised: true,
            IsFilterOptionsMinimised: false,
            IsGeneralOptionsMinimised: true,
          } as AdaptableGridInfoState);
        })
      : this.createMinimiseButton('Filter', () => {
          this.setState({ IsFilterOptionsMinimised: true } as AdaptableGridInfoState);
        });

    let showGeneralOptionsButton = this.state.IsGeneralOptionsMinimised
      ? this.createMaximiseButton('General', () => {
          this.setState({
            IsBaseOptionsMinimised: true,
            IsAuditOptionsMinimised: true,
            IsContainerOptionsMinimised: true,
            IsConfigServerOptionsMinimised: true,
            IsQueryOptionsMinimised: true,
            IsLayoutOptionsMinimised: true,
            IsFilterOptionsMinimised: true,
            IsGeneralOptionsMinimised: false,
          } as AdaptableGridInfoState);
        })
      : this.createMinimiseButton('General', () => {
          this.setState({ IsGeneralOptionsMinimised: true } as AdaptableGridInfoState);
        });

    return (
      <Dialog
        isOpen={this.props.showAbout}
        onDismiss={this.props.onClose}
        style={{ minWidth: '35vw' }}
        showCloseButton={false}
      >
        <Flex flexDirection="column" style={{ height: '100%' }}>
          <PanelWithImage
            header={'Grid Info'}
            variant="primary"
            glyphicon={'info-sign'}
            style={{ flex: 1 }}
          >
            <Flex marginBottom={2} padding={3}>
              <Radio
                marginRight={3}
                value="GridProperties"
                checked={this.state.ShowGridProperties == true}
                onChange={(_, e: any) => this.onShowGridPropertiesChanged(e)}
              >
                Grid Properties
              </Radio>
              <Radio
                value="adaptableOptions"
                checked={this.state.ShowGridProperties == false}
                onChange={(_, e: any) => this.onShowGridPropertiesChanged(e)}
              >
                Blotter Options
              </Radio>
            </Flex>

            {this.state.ShowGridProperties ? (
              <div>
                <AdaptableObjectCollection
                  colItems={gridPropertiesColItems}
                  items={gridProperties}
                />
              </div>
            ) : (
              <div>
                <PanelWithButton
                  variant="default"
                  headerText={'Base Options'}
                  button={showBaseOptionsButton}
                >
                  {this.state.IsBaseOptionsMinimised == false && (
                    <AdaptableObjectCollection
                      colItems={adaptableOptionsColItems}
                      items={baseadaptableOptions}
                    />
                  )}
                </PanelWithButton>

                <PanelWithButton
                  variant="default"
                  headerText={'Container Options'}
                  button={showContainerOptionsButton}
                >
                  {this.state.IsContainerOptionsMinimised == false && (
                    <AdaptableObjectCollection
                      colItems={adaptableOptionsColItems}
                      items={containeradaptableOptions}
                    />
                  )}
                </PanelWithButton>
                <PanelWithButton
                  variant="default"
                  headerText={'Audit Options'}
                  button={showAuditOptionsButton}
                >
                  {this.state.IsAuditOptionsMinimised == false && (
                    <AdaptableObjectCollection
                      colItems={adaptableOptionsColItems}
                      items={auditadaptableOptions}
                    />
                  )}
                </PanelWithButton>
                <PanelWithButton
                  variant="default"
                  headerText={'Config Server Options'}
                  button={showConfigServerOptionsButton}
                >
                  {this.state.IsConfigServerOptionsMinimised == false && (
                    <AdaptableObjectCollection
                      colItems={adaptableOptionsColItems}
                      items={configServeradaptableOptions}
                    />
                  )}
                </PanelWithButton>
                <PanelWithButton
                  variant="default"
                  headerText={'Query Options'}
                  button={showQueryOptionsButton}
                >
                  {this.state.IsQueryOptionsMinimised == false && (
                    <AdaptableObjectCollection
                      colItems={adaptableOptionsColItems}
                      items={queryadaptableOptions}
                    />
                  )}
                </PanelWithButton>
                <PanelWithButton
                  variant="default"
                  headerText={'Layout Options'}
                  button={showLayoutOptionsButton}
                >
                  {this.state.IsLayoutOptionsMinimised == false && (
                    <AdaptableObjectCollection
                      colItems={adaptableOptionsColItems}
                      items={layoutadaptableOptions}
                    />
                  )}
                </PanelWithButton>
                <PanelWithButton
                  variant="default"
                  headerText={'Filter Options'}
                  button={showFilterOptionsButton}
                >
                  {this.state.IsFilterOptionsMinimised == false && (
                    <AdaptableObjectCollection
                      colItems={adaptableOptionsColItems}
                      items={filteradaptableOptions}
                    />
                  )}
                </PanelWithButton>
                <PanelWithButton
                  variant="default"
                  headerText={'General Options'}
                  button={showGeneralOptionsButton}
                >
                  {this.state.IsGeneralOptionsMinimised == false && (
                    <AdaptableObjectCollection
                      colItems={adaptableOptionsColItems}
                      items={generaladaptableOptions}
                    />
                  )}
                </PanelWithButton>
              </div>
            )}
          </PanelWithImage>

          <Flex
            alignItems="center"
            flexDirection="row"
            padding={2}
            backgroundColor="defaultbackground"
          >
            <SimpleButton onClick={() => this.props.onClose()}>Close</SimpleButton>
          </Flex>
        </Flex>
      </Dialog>
    );
  }

  private CreateGridInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let calcColumns: string[] = this.props.Adaptable.api.calculatedColumnApi
        .getAllCalculatedColumn()
        .map(c => c.ColumnId);
      let columns: AdaptableColumn[] = this.props.Adaptable.api.gridApi.getColumns();
      let columnFilterDescription: string = this.props.Adaptable.FilterService.GetColumnFiltersDescription(
        this.props.Adaptable.api.columnFilterApi.getAllColumnFilter(),
        columns
      );
      let sorts: any = this.props.Adaptable.api.gridApi.getColumnSorts().map(gs => {
        return ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + ': ' + gs.SortOrder;
      });

      returnRows.push(
        this.createColItem(colItems, 'Vendor Grid', this.props.Adaptable.vendorGridName)
      );

      returnRows.push(this.createColItem(colItems, 'Adaptable Version', version));

      returnRows.push(
        this.createColItem(
          colItems,
          'Sorted Columns',
          ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join('; ') : 'None'
        )
      );
      returnRows.push(this.createColItem(colItems, 'Column Filters', columnFilterDescription));
      returnRows.push(this.createColItem(colItems, 'All Rows', this.props.Adaptable.getRowCount()));
      returnRows.push(
        this.createColItem(colItems, 'Visible Rows', this.props.Adaptable.getVisibleRowCount())
      );
      returnRows.push(
        this.createColItem(colItems, 'All Columns', this.props.Adaptable.getColumnCount())
      );
      returnRows.push(
        this.createColItem(colItems, 'Visible Column', this.props.Adaptable.getVisibleColumnCount())
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'Can Multi Select',
          this.props.Adaptable.isSelectable() ? 'True' : 'False'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'Calculated Columns',
          ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : 'None'
        )
      );
    }
    return returnRows;
  }

  private CreateBaseOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: AdaptableOptions = this.props.Adaptable.adaptableOptions;

      // base options
      returnRows.push(
        this.createColItem(
          colItems,
          'adaptableId',
          options.adaptableId,
          'Identifier for this instance of Adaptable'
        )
      );
      returnRows.push(
        this.createColItem(colItems, 'userName', options.userName, 'Current user of Adaptable')
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'primaryKey',
          options.primaryKey,
          'Unique column in the grid (useful for cell identification purposes)'
        )
      );
      //   returnRows.push(this.createColItem(colItems, "predefinedConfig", options.predefinedConfig, "Configuration properties and objects set at design-time"));
    }
    return returnRows;
  }

  private CreateContainerOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: AdaptableOptions = this.props.Adaptable.adaptableOptions;
      returnRows.push(
        this.createColItem(
          colItems,
          'adaptableContainer',
          options.containerOptions.adaptableContainer,
          'Id of <div> element which contains Adaptable'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'vendorContainer',
          options.containerOptions.vendorContainer,
          'Id of <div> element which contains the underlying grid'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'modalContainer',
          options.containerOptions.modalContainer
            ? options.containerOptions.modalContainer
            : 'None',
          "Id of <div> element where popups appear.  If set to 'None' then they appear in the middle of the screen."
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'chartContainer',
          options.containerOptions.chartContainer
            ? options.containerOptions.chartContainer
            : 'None',
          "Id of <div> element where charts appear.  If set to 'None' then they appear in the middle of the screen."
        )
      );
    }
    return returnRows;
  }

  private CreateAuditOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: AdaptableOptions = this.props.Adaptable.adaptableOptions;

      returnRows.push(
        this.createColItem(
          colItems,
          'auditCellEdits',
          options.auditOptions.auditCellEdits == true ? 'Yes' : 'No',
          ' Whether to audit cell edits.  These include any edits made to the data in the grid but not outside (e.g. not a ticking stream)'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'auditFunctionEvents',
          options.auditOptions.auditFunctionEvents == true ? 'Yes' : 'No',
          " Whether to audit function events in Adaptable (e.g. 'Advanced Search Selected', 'Smart Edit Applied' etc.)"
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'auditUserStateChanges',
          options.auditOptions.auditUserStateChanges == true ? 'Yes' : 'No',
          'Whether to audit all changes to the User State; includes any objects (e.g. Conditional Styles) created, edited or deleted'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'auditInternalStateChanges',
          options.auditOptions.auditInternalStateChanges == true ? 'Yes' : 'No',
          "Whether to audit changes to Adaptable's state; includes things like which popups are active, what are the selected cells (can potentially be very verbos)e"
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'pingInterval',
          options.auditOptions.pingInterval,
          'How often (in seconds) the Audit Log should ping to check that the listening service is up and running'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'auditLogsSendInterval',
          options.auditOptions.auditLogsSendInterval,
          "The 'batch' time (in seconds) for pushing Audit Log messages"
        )
      );
    }
    return returnRows;
  }

  private CreateConfigServerOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: AdaptableOptions = this.props.Adaptable.adaptableOptions;

      returnRows.push(
        this.createColItem(
          colItems,
          'enableConfigServer',
          options.configServerOptions.enableConfigServer == true ? 'Yes' : 'No',
          "If enabled Config Server store State in the remote location specified in the 'configServerUrl' property (rather than the default of using local storage)."
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'configServerUrl',
          options.configServerOptions.configServerUrl,
          'Location of Config Server that persists the user state and gives it back on demand (only used if enableConfigServer is true).'
        )
      );
    }
    return returnRows;
  }

  private CreateQueryOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: AdaptableOptions = this.props.Adaptable.adaptableOptions;

      returnRows.push(
        this.createColItem(
          colItems,
          'maxColumnValueItemsDisplayed',
          options.queryOptions.maxColumnValueItemsDisplayed,
          'No. of items to display in column value listboxes when building queries - useful when datasource is very large'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'columnValuesOnlyInQueries',
          options.queryOptions.columnValuesOnlyInQueries == true ? 'Yes' : 'No',
          ' Whether query builder includes just ColumnValues, or should also include Filters and Ranges.'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'ignoreCaseInQueries',
          options.queryOptions.ignoreCaseInQueries == true ? 'Yes' : 'No',
          'Whether case is ignored when running queries (on text columns)'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'getColumnValues',
          options.queryOptions.getColumnValues != null ? 'Function Exists' : '',
          'Function that is run when getting list of column values (run by user on their server).'
        )
      );
    }
    return returnRows;
  }

  private CreateLayoutOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: AdaptableOptions = this.props.Adaptable.adaptableOptions;

      returnRows.push(
        this.createColItem(
          colItems,
          'includeVendorStateInLayouts',
          options.layoutOptions.includeVendorStateInLayouts == true ? 'Yes' : 'No',
          'Whether layouts include vendor grid related state.'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'autoSaveLayouts',
          options.layoutOptions.autoSaveLayouts == true ? 'Yes' : 'No',
          'Whether layouts save as soon as column order or sorts change.'
        )
      );
    }
    return returnRows;
  }

  private CreateFilterOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: AdaptableOptions = this.props.Adaptable.adaptableOptions;

      returnRows.push(
        this.createColItem(
          colItems,
          'indicateFilteredColumns',
          options.filterOptions.indicateFilteredColumns == true ? 'Yes' : 'No',
          'Whether the font in the Column header for filtered columns is bold and italicised.'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'useAdaptableFilterForm',
          options.filterOptions.useAdaptableFilterForm == true ? 'Yes' : 'No',
          'If using Adaptable filter form in column menu (or that provided by the vendor grid).'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'useAdaptableQuickFilter',
          options.filterOptions.useAdaptableQuickFilter == true ? 'Yes' : 'No',
          'Use Adaptable quick filter row (or that provided by the vendor grid).'
        )
      );
    }
    return returnRows;
  }

  private CreateGeneralOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: AdaptableOptions = this.props.Adaptable.adaptableOptions;

      returnRows.push(
        this.createColItem(
          colItems,
          'serverSearchOption',
          options.generalOptions.serverSearchOption,
          'Which searching and filtering options, if any, are taking place on the server.'
        )
      );
      //   returnRows.push(
      //      this.createColItem(
      //        colItems,
      //        'useDefaultVendorGridThemes',
      //        options.generalOptions.useDefaultVendorGridThemes == true ? 'Yes' : 'No',
      //        'Whether the default theme(s) for the vendor grid are being used).'
      //      )
      //    );
      returnRows.push(
        this.createColItem(
          colItems,
          'showMissingPrimaryKeyWarning',
          options.generalOptions.showMissingPrimaryKeyWarning == true ? 'Yes' : 'No',
          'Whether a warning is shown if the primary key column does not actually exist.'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'preventDuplicatePrimaryKeyValues',
          options.generalOptions.preventDuplicatePrimaryKeyValues == true ? 'Yes' : 'No',
          'Whether a duplicate value can be entered into the primary key column.'
        )
      );
    }
    return returnRows;
  }

  createMaximiseButton(optionType: string, onClickFunction: any): any {
    return (
      <ButtonMaximise
        onClick={() => onClickFunction()}
        tooltip={'Show ' + optionType + ' Options'}
      />
    );
  }

  createMinimiseButton(optionType: string, onClickFunction: any): any {
    return (
      <ButtonMinimise
        onClick={() => onClickFunction()}
        tooltip={'Hide ' + optionType + ' Options'}
      />
    );
  }

  createColItem(colItems: IColItem[], item1: any, item2: any, item3?: any): IColItem[] {
    let rowColItems: IColItem[] = Helper.cloneObject(colItems);
    rowColItems[0].Content = item1;
    rowColItems[1].Content = item2;
    if (item3) {
      let infoButton = <AdaptablePopover headerText={null} bodyText={[item3]} />;
      rowColItems[2].Content = infoButton;
    }
    return rowColItems;
  }

  onShowGridPropertiesChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ ShowGridProperties: e.value == 'GridProperties' } as AdaptableGridInfoState);
  }
}
