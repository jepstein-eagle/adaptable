import * as React from 'react';
import { PanelWithImage } from '../Panels/PanelWithImage';
import { AdaptableObjectRow } from '../AdaptableObjectRow';
import { IColItem } from '../../UIInterfaces';
import { Helper } from '../../../Utilities/Helpers/Helper';
import { AdaptableObjectCollection } from '../AdaptableObjectCollection';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { IAdaptableBlotterOptions } from '../../../Utilities/Interface/BlotterOptions/IAdaptableBlotterOptions';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { ColumnFilterHelper } from '../../../Utilities/Helpers/ColumnFilterHelper';
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { Modal, Button, Row, Col, Radio } from 'react-bootstrap';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { UIHelper } from '../../UIHelper';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { PanelWithButton } from '../Panels/PanelWithButton';
import { ButtonMaximise } from '../Buttons/ButtonMaximise';
import { ButtonMinimise } from '../Buttons/ButtonMinimise';
import { AdaptablePopover } from '../../AdaptablePopover';

interface AdaptableBlotterAboutProps extends React.ClassAttributes<AdaptableBlotterAbout> {
  AdaptableBlotter: IAdaptableBlotter;
  onClose?: Function;
  showAbout: boolean;
}

export interface AboutBlotterState {
  // General
  ShowGridProperties: boolean;

  cssClassName: string;

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

export class AdaptableBlotterAbout extends React.Component<
  AdaptableBlotterAboutProps,
  AboutBlotterState
> {
  constructor(props: AdaptableBlotterAboutProps) {
    super(props);
    this.state = {
      ShowGridProperties: true,
      cssClassName: StyleConstants.AB_STYLE,
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
      this.props.AdaptableBlotter.blotterOptions,
      document
    );

    let gridPropertiesColItems: IColItem[] = [
      { Content: 'Property', Size: 5 },
      { Content: 'Value', Size: 7 },
    ];

    let blotterOptionsColItems: IColItem[] = [
      { Content: 'Property', Size: 6 },
      { Content: 'Value', Size: 4 },
      { Content: '', Size: 2 },
    ];

    let gridProperties = this.CreateGridInfo(gridPropertiesColItems).map((x, index) => {
      return <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />;
    });

    let baseBlotterOptions = this.CreateBaseOptionsInfo(blotterOptionsColItems).map((x, index) => {
      return <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />;
    });

    let containerBlotterOptions = this.CreateContainerOptionsInfo(blotterOptionsColItems).map(
      (x, index) => {
        return (
          <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />
        );
      }
    );

    let auditBlotterOptions = this.CreateAuditOptionsInfo(blotterOptionsColItems).map(
      (x, index) => {
        return (
          <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />
        );
      }
    );

    let configServerBlotterOptions = this.CreateConfigServerOptionsInfo(blotterOptionsColItems).map(
      (x, index) => {
        return (
          <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />
        );
      }
    );

    let queryBlotterOptions = this.CreateQueryOptionsInfo(blotterOptionsColItems).map(
      (x, index) => {
        return (
          <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />
        );
      }
    );

    let layoutBlotterOptions = this.CreateLayoutOptionsInfo(blotterOptionsColItems).map(
      (x, index) => {
        return (
          <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />
        );
      }
    );

    let filterBlotterOptions = this.CreateFilterOptionsInfo(blotterOptionsColItems).map(
      (x, index) => {
        return (
          <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />
        );
      }
    );

    let generalBlotterOptions = this.CreateGeneralOptionsInfo(blotterOptionsColItems).map(
      (x, index) => {
        return (
          <AdaptableObjectRow cssClassName={this.state.cssClassName} key={index} colItems={x} />
        );
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
          } as AboutBlotterState);
        })
      : this.createMinimiseButton('Base', () => {
          this.setState({ IsBaseOptionsMinimised: true } as AboutBlotterState);
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
          } as AboutBlotterState);
        })
      : this.createMinimiseButton('Container', () => {
          this.setState({ IsContainerOptionsMinimised: true } as AboutBlotterState);
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
          } as AboutBlotterState);
        })
      : this.createMinimiseButton('Audit', () => {
          this.setState({ IsAuditOptionsMinimised: true } as AboutBlotterState);
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
          } as AboutBlotterState);
        })
      : this.createMinimiseButton('Config Server', () => {
          this.setState({ IsConfigServerOptionsMinimised: true } as AboutBlotterState);
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
          } as AboutBlotterState);
        })
      : this.createMinimiseButton('Query', () => {
          this.setState({ IsQueryOptionsMinimised: true } as AboutBlotterState);
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
          } as AboutBlotterState);
        })
      : this.createMinimiseButton('Layout', () => {
          this.setState({ IsLayoutOptionsMinimised: true } as AboutBlotterState);
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
          } as AboutBlotterState);
        })
      : this.createMinimiseButton('Filter', () => {
          this.setState({ IsFilterOptionsMinimised: true } as AboutBlotterState);
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
          } as AboutBlotterState);
        })
      : this.createMinimiseButton('General', () => {
          this.setState({ IsGeneralOptionsMinimised: true } as AboutBlotterState);
        });

    return (
      <Modal
        show={this.props.showAbout}
        onHide={this.props.onClose}
        className={this.state.cssClassName + StyleConstants.BASE}
        container={modalContainer}
      >
        <div className={this.state.cssClassName + StyleConstants.MODAL_BASE}>
          <Modal.Body className={this.state.cssClassName + StyleConstants.MODAL_BODY}>
            <div className={this.state.cssClassName}>
              <PanelWithImage
                cssClassName={this.state.cssClassName}
                header={'About'}
                bsStyle="primary"
                glyphicon={'info-sign'}
              >
                <Row style={{ marginBottom: '10px' }}>
                  <Col xs={12}>
                    <Radio
                      inline
                      value="GridProperties"
                      checked={this.state.ShowGridProperties == true}
                      onChange={e => this.onShowGridPropertiesChanged(e)}
                    >
                      Grid Properties
                    </Radio>
                    <Radio
                      inline
                      value="BlotterOptions"
                      checked={this.state.ShowGridProperties == false}
                      onChange={e => this.onShowGridPropertiesChanged(e)}
                    >
                      Blotter Options
                    </Radio>
                  </Col>
                </Row>

                {this.state.ShowGridProperties ? (
                  <div>
                    <AdaptableObjectCollection
                      cssClassName={this.state.cssClassName}
                      colItems={gridPropertiesColItems}
                      items={gridProperties}
                    />
                  </div>
                ) : (
                  <div>
                    <PanelWithButton
                      bsSize={'xs'}
                      headerText={'Base Options'}
                      cssClassName={this.state.cssClassName}
                      button={showBaseOptionsButton}
                    >
                      {this.state.IsBaseOptionsMinimised == false && (
                        <AdaptableObjectCollection
                          cssClassName={this.state.cssClassName}
                          colItems={blotterOptionsColItems}
                          items={baseBlotterOptions}
                        />
                      )}
                    </PanelWithButton>

                    <PanelWithButton
                      bsSize={'xs'}
                      headerText={'Container Options'}
                      cssClassName={this.state.cssClassName}
                      button={showContainerOptionsButton}
                    >
                      {this.state.IsContainerOptionsMinimised == false && (
                        <AdaptableObjectCollection
                          cssClassName={this.state.cssClassName}
                          colItems={blotterOptionsColItems}
                          items={containerBlotterOptions}
                        />
                      )}
                    </PanelWithButton>
                    <PanelWithButton
                      bsSize={'xs'}
                      headerText={'Audit Options'}
                      cssClassName={this.state.cssClassName}
                      button={showAuditOptionsButton}
                    >
                      {this.state.IsAuditOptionsMinimised == false && (
                        <AdaptableObjectCollection
                          cssClassName={this.state.cssClassName}
                          colItems={blotterOptionsColItems}
                          items={auditBlotterOptions}
                        />
                      )}
                    </PanelWithButton>
                    <PanelWithButton
                      bsSize={'xs'}
                      headerText={'Config Server Options'}
                      cssClassName={this.state.cssClassName}
                      button={showConfigServerOptionsButton}
                    >
                      {this.state.IsConfigServerOptionsMinimised == false && (
                        <AdaptableObjectCollection
                          cssClassName={this.state.cssClassName}
                          colItems={blotterOptionsColItems}
                          items={configServerBlotterOptions}
                        />
                      )}
                    </PanelWithButton>
                    <PanelWithButton
                      bsSize={'xs'}
                      headerText={'Query Options'}
                      cssClassName={this.state.cssClassName}
                      button={showQueryOptionsButton}
                    >
                      {this.state.IsQueryOptionsMinimised == false && (
                        <AdaptableObjectCollection
                          cssClassName={this.state.cssClassName}
                          colItems={blotterOptionsColItems}
                          items={queryBlotterOptions}
                        />
                      )}
                    </PanelWithButton>
                    <PanelWithButton
                      bsSize={'xs'}
                      headerText={'Layout Options'}
                      cssClassName={this.state.cssClassName}
                      button={showLayoutOptionsButton}
                    >
                      {this.state.IsLayoutOptionsMinimised == false && (
                        <AdaptableObjectCollection
                          cssClassName={this.state.cssClassName}
                          colItems={blotterOptionsColItems}
                          items={layoutBlotterOptions}
                        />
                      )}
                    </PanelWithButton>
                    <PanelWithButton
                      bsSize={'xs'}
                      headerText={'Filter Options'}
                      cssClassName={this.state.cssClassName}
                      button={showFilterOptionsButton}
                    >
                      {this.state.IsFilterOptionsMinimised == false && (
                        <AdaptableObjectCollection
                          cssClassName={this.state.cssClassName}
                          colItems={blotterOptionsColItems}
                          items={filterBlotterOptions}
                        />
                      )}
                    </PanelWithButton>
                    <PanelWithButton
                      bsSize={'xs'}
                      headerText={'General Options'}
                      cssClassName={this.state.cssClassName}
                      button={showGeneralOptionsButton}
                    >
                      {this.state.IsGeneralOptionsMinimised == false && (
                        <AdaptableObjectCollection
                          cssClassName={this.state.cssClassName}
                          colItems={blotterOptionsColItems}
                          items={generalBlotterOptions}
                        />
                      )}
                    </PanelWithButton>
                  </div>
                )}
              </PanelWithImage>
            </div>
          </Modal.Body>
          <Modal.Footer className={this.state.cssClassName + StyleConstants.MODAL_FOOTER}>
            <Button
              className={
                this.state.cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON
              }
              onClick={() => this.props.onClose()}
            >
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }

  private CreateGridInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let calcColumns: string[] = this.props.AdaptableBlotter.api.calculatedColumnApi
        .getAllCalculatedColumn()
        .map(c => c.ColumnId);
      let columns: IColumn[] = this.props.AdaptableBlotter.api.gridApi.getColumns();
      let columnFilterDescription: string = ColumnFilterHelper.getColumnFiltersDescription(
        this.props.AdaptableBlotter.api.columnFilterApi.getAllColumnFilter(),
        columns,
        this.props.AdaptableBlotter
      );
      let sorts: any = this.props.AdaptableBlotter.api.gridApi.getColumnSorts().map(gs => {
        return ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + ': ' + gs.SortOrder;
      });
      let licenceInDate: string = this.props.AdaptableBlotter.LicenceService.LicenceInfo
        .IsLicenceInDate
        ? 'In Date'
        : 'Expired';
      returnRows.push(
        this.createColItem(colItems, 'Vendor Grid', this.props.AdaptableBlotter.vendorGridName)
      );
      returnRows.push(this.createColItem(colItems, 'Adaptable Blotter Version', '3.3'));
      returnRows.push(
        this.createColItem(
          colItems,
          'Licence Key',
          this.props.AdaptableBlotter.blotterOptions.licenceKey + ' (' + licenceInDate + ')'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'Licence Type',
          this.props.AdaptableBlotter.LicenceService.LicenceInfo.LicenceScopeType +
            ' (' +
            this.props.AdaptableBlotter.LicenceService.LicenceInfo.LicenceUserType +
            ')'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'Sorted Columns',
          ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join('; ') : 'None'
        )
      );
      returnRows.push(this.createColItem(colItems, 'Column Filters', columnFilterDescription));
      returnRows.push(
        this.createColItem(colItems, 'All Rows', this.props.AdaptableBlotter.getRowCount())
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'Visible Rows',
          this.props.AdaptableBlotter.getVisibleRowCount()
        )
      );
      returnRows.push(
        this.createColItem(colItems, 'All Columns', this.props.AdaptableBlotter.getColumnCount())
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'Visible Column',
          this.props.AdaptableBlotter.getVisibleColumnCount()
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'Can Multi Select',
          this.props.AdaptableBlotter.isSelectable() ? 'True' : 'False'
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
      let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.blotterOptions;

      // base options
      returnRows.push(
        this.createColItem(
          colItems,
          'blotterId',
          options.blotterId,
          'Identifier for this instance of the Adaptable Blotter'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'userName',
          options.userName,
          'Current user of the Adaptable Blotter'
        )
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
      let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.blotterOptions;
      returnRows.push(
        this.createColItem(
          colItems,
          'adaptableBlotterContainer',
          options.containerOptions.adaptableBlotterContainer,
          'Id of <div> element which contains the Blotter'
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
      let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.blotterOptions;

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
          " Whether to audit function events in the Blotter (e.g. 'Advanced Search Selected', 'Smart Edit Applied' etc.)"
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
          "Whether to audit changes to the Adaptable Blotter's state; includes things like which popups are active, what are the selected cells (can potentially be very verbos)e"
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
      let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.blotterOptions;

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
      let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.blotterOptions;

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
      let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.blotterOptions;

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
      let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.blotterOptions;

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
          'useAdaptableBlotterFilterForm',
          options.filterOptions.useAdaptableBlotterFilterForm == true ? 'Yes' : 'No',
          'If using the Adaptable Blotter filter form in column menu (or that provided by the vendor grid).'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'useAdaptableBlotterFloatingFilter',
          options.filterOptions.useAdaptableBlotterFloatingFilter == true ? 'Yes' : 'No',
          'Use the Adaptable Blotter quick filter row (or that provided by the vendor grid).'
        )
      );
    }
    return returnRows;
  }

  private CreateGeneralOptionsInfo(colItems: IColItem[]): IColItem[][] {
    let returnRows: IColItem[][] = [];
    if (this.props.showAbout) {
      let options: IAdaptableBlotterOptions = this.props.AdaptableBlotter.blotterOptions;

      returnRows.push(
        this.createColItem(
          colItems,
          'serverSearchOption',
          options.generalOptions.serverSearchOption,
          'Which searching and filtering options, if any, are taking place on the server.'
        )
      );
      returnRows.push(
        this.createColItem(
          colItems,
          'useDefaultVendorGridThemes',
          options.generalOptions.useDefaultVendorGridThemes == true ? 'Yes' : 'No',
          'Whether the default theme(s) for the vendor grid are being used).'
        )
      );
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
        cssClassName={this.state.cssClassName}
        onClick={() => onClickFunction()}
        bsStyle={StyleConstants.DEFAULT_BSSTYLE}
        size={'xs'}
        DisplayMode="Glyph"
        hideToolTip={false}
        overrideTooltip={'Show ' + optionType + ' Options'}
      />
    );
  }

  createMinimiseButton(optionType: string, onClickFunction: any): any {
    return (
      <ButtonMinimise
        cssClassName={this.state.cssClassName}
        onClick={() => onClickFunction()}
        bsStyle={StyleConstants.DEFAULT_BSSTYLE}
        size={'xs'}
        DisplayMode="Glyph"
        hideToolTip={false}
        overrideTooltip={'Hide ' + optionType + ' Options'}
      />
    );
  }

  createColItem(colItems: IColItem[], item1: any, item2: any, item3?: any): IColItem[] {
    let rowColItems: IColItem[] = Helper.cloneObject(colItems);
    rowColItems[0].Content = item1;
    rowColItems[1].Content = item2;
    if (item3) {
      let infoButton = (
        <AdaptablePopover
          cssClassName={this.state.cssClassName}
          headerText={null}
          bodyText={[item3]}
        />
      );
      rowColItems[2].Content = infoButton;
    }
    return rowColItems;
  }

  onShowGridPropertiesChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ ShowGridProperties: e.value == 'GridProperties' } as AboutBlotterState);
  }
}
