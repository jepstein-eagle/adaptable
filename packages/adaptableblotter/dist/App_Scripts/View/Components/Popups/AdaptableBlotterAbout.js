"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PanelWithImage_1 = require("../Panels/PanelWithImage");
const AdaptableObjectRow_1 = require("../AdaptableObjectRow");
const Helper_1 = require("../../../Utilities/Helpers/Helper");
const AdaptableObjectCollection_1 = require("../AdaptableObjectCollection");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const ColumnFilterHelper_1 = require("../../../Utilities/Helpers/ColumnFilterHelper");
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const UIHelper_1 = require("../../UIHelper");
const PanelWithButton_1 = require("../Panels/PanelWithButton");
const ButtonMaximise_1 = require("../Buttons/ButtonMaximise");
const ButtonMinimise_1 = require("../Buttons/ButtonMinimise");
const AdaptablePopover_1 = require("../../AdaptablePopover");
class AdaptableBlotterAbout extends React.Component {
    constructor(props) {
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
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.AdaptableBlotter.blotterOptions, document);
        let gridPropertiesColItems = [
            { Content: "Property", Size: 5 },
            { Content: "Value", Size: 7 },
        ];
        let blotterOptionsColItems = [
            { Content: "Property", Size: 6 },
            { Content: "Value", Size: 4 },
            { Content: "", Size: 2 },
        ];
        let gridProperties = this.CreateGridInfo(gridPropertiesColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let baseBlotterOptions = this.CreateBaseOptionsInfo(blotterOptionsColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let containerBlotterOptions = this.CreateContainerOptionsInfo(blotterOptionsColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let auditBlotterOptions = this.CreateAuditOptionsInfo(blotterOptionsColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let configServerBlotterOptions = this.CreateConfigServerOptionsInfo(blotterOptionsColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let queryBlotterOptions = this.CreateQueryOptionsInfo(blotterOptionsColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let layoutBlotterOptions = this.CreateLayoutOptionsInfo(blotterOptionsColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let filterBlotterOptions = this.CreateFilterOptionsInfo(blotterOptionsColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let generalBlotterOptions = this.CreateGeneralOptionsInfo(blotterOptionsColItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.state.cssClassName, key: index, colItems: x });
        });
        let showBaseOptionsButton = this.state.IsBaseOptionsMinimised ?
            this.createMaximiseButton("Base", () => {
                this.setState({ IsBaseOptionsMinimised: false, IsContainerOptionsMinimised: true, IsAuditOptionsMinimised: true, IsConfigServerOptionsMinimised: true, IsQueryOptionsMinimised: true, IsLayoutOptionsMinimised: true, IsFilterOptionsMinimised: true, IsGeneralOptionsMinimised: true });
            })
            :
                this.createMinimiseButton("Base", () => {
                    this.setState({ IsBaseOptionsMinimised: true, });
                });
        let showContainerOptionsButton = this.state.IsContainerOptionsMinimised ?
            this.createMaximiseButton("Container", () => {
                this.setState({ IsBaseOptionsMinimised: true, IsContainerOptionsMinimised: false, IsAuditOptionsMinimised: true, IsConfigServerOptionsMinimised: true, IsQueryOptionsMinimised: true, IsLayoutOptionsMinimised: true, IsFilterOptionsMinimised: true, IsGeneralOptionsMinimised: true });
            })
            :
                this.createMinimiseButton("Container", () => {
                    this.setState({ IsContainerOptionsMinimised: true, });
                });
        let showAuditOptionsButton = this.state.IsAuditOptionsMinimised ?
            this.createMaximiseButton("Audit", () => {
                this.setState({ IsBaseOptionsMinimised: true, IsAuditOptionsMinimised: false, IsContainerOptionsMinimised: true, IsConfigServerOptionsMinimised: true, IsQueryOptionsMinimised: true, IsLayoutOptionsMinimised: true, IsFilterOptionsMinimised: true, IsGeneralOptionsMinimised: true });
            })
            :
                this.createMinimiseButton("Audit", () => {
                    this.setState({ IsAuditOptionsMinimised: true, });
                });
        let showConfigServerOptionsButton = this.state.IsConfigServerOptionsMinimised ?
            this.createMaximiseButton("Config Server", () => {
                this.setState({ IsBaseOptionsMinimised: true, IsAuditOptionsMinimised: true, IsContainerOptionsMinimised: true, IsConfigServerOptionsMinimised: false, IsQueryOptionsMinimised: true, IsLayoutOptionsMinimised: true, IsFilterOptionsMinimised: true, IsGeneralOptionsMinimised: true });
            })
            :
                this.createMinimiseButton("Config Server", () => {
                    this.setState({ IsConfigServerOptionsMinimised: true, });
                });
        let showQueryOptionsButton = this.state.IsQueryOptionsMinimised ?
            this.createMaximiseButton("Query", () => {
                this.setState({ IsBaseOptionsMinimised: true, IsAuditOptionsMinimised: true, IsContainerOptionsMinimised: true, IsConfigServerOptionsMinimised: true, IsQueryOptionsMinimised: false, IsLayoutOptionsMinimised: true, IsFilterOptionsMinimised: true, IsGeneralOptionsMinimised: true });
            })
            :
                this.createMinimiseButton("Query", () => {
                    this.setState({ IsQueryOptionsMinimised: true, });
                });
        let showLayoutOptionsButton = this.state.IsLayoutOptionsMinimised ?
            this.createMaximiseButton("Layout", () => {
                this.setState({ IsBaseOptionsMinimised: true, IsAuditOptionsMinimised: true, IsContainerOptionsMinimised: true, IsConfigServerOptionsMinimised: true, IsQueryOptionsMinimised: true, IsLayoutOptionsMinimised: false, IsFilterOptionsMinimised: true, IsGeneralOptionsMinimised: true });
            })
            :
                this.createMinimiseButton("Layout", () => {
                    this.setState({ IsLayoutOptionsMinimised: true });
                });
        let showFilterOptionsButton = this.state.IsFilterOptionsMinimised ?
            this.createMaximiseButton("Filter", () => {
                this.setState({ IsBaseOptionsMinimised: true, IsAuditOptionsMinimised: true, IsContainerOptionsMinimised: true, IsConfigServerOptionsMinimised: true, IsQueryOptionsMinimised: true, IsLayoutOptionsMinimised: true, IsFilterOptionsMinimised: false, IsGeneralOptionsMinimised: true });
            })
            :
                this.createMinimiseButton("Filter", () => {
                    this.setState({ IsFilterOptionsMinimised: true });
                });
        let showGeneralOptionsButton = this.state.IsGeneralOptionsMinimised ?
            this.createMaximiseButton("General", () => {
                this.setState({ IsBaseOptionsMinimised: true, IsAuditOptionsMinimised: true, IsContainerOptionsMinimised: true, IsConfigServerOptionsMinimised: true, IsQueryOptionsMinimised: true, IsLayoutOptionsMinimised: true, IsFilterOptionsMinimised: true, IsGeneralOptionsMinimised: false });
            })
            :
                this.createMinimiseButton("General", () => {
                    this.setState({ IsGeneralOptionsMinimised: true });
                });
        return React.createElement(react_bootstrap_1.Modal, { show: this.props.showAbout, onHide: this.props.onClose, className: this.state.cssClassName + StyleConstants.BASE, container: modalContainer },
            React.createElement("div", { className: this.state.cssClassName + StyleConstants.MODAL_BASE },
                React.createElement(react_bootstrap_1.Modal.Body, { className: this.state.cssClassName + StyleConstants.MODAL_BODY },
                    React.createElement("div", { className: this.state.cssClassName },
                        React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: this.state.cssClassName, header: "About", bsStyle: "primary", glyphicon: "info-sign" },
                            React.createElement(react_bootstrap_1.Row, { style: { marginBottom: '10px' } },
                                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                    React.createElement(react_bootstrap_1.Radio, { inline: true, value: "GridProperties", checked: this.state.ShowGridProperties == true, onChange: (e) => this.onShowGridPropertiesChanged(e) }, "Grid Properties"),
                                    React.createElement(react_bootstrap_1.Radio, { inline: true, value: "BlotterOptions", checked: this.state.ShowGridProperties == false, onChange: (e) => this.onShowGridPropertiesChanged(e) }, "Blotter Options"))),
                            this.state.ShowGridProperties ?
                                React.createElement("div", null,
                                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: gridPropertiesColItems, items: gridProperties }))
                                :
                                    React.createElement("div", null,
                                        React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", headerText: "Base Options", cssClassName: this.state.cssClassName, button: showBaseOptionsButton }, this.state.IsBaseOptionsMinimised == false &&
                                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: blotterOptionsColItems, items: baseBlotterOptions })),
                                        React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", headerText: "Container Options", cssClassName: this.state.cssClassName, button: showContainerOptionsButton }, this.state.IsContainerOptionsMinimised == false &&
                                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: blotterOptionsColItems, items: containerBlotterOptions })),
                                        React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", headerText: "Audit Options", cssClassName: this.state.cssClassName, button: showAuditOptionsButton }, this.state.IsAuditOptionsMinimised == false &&
                                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: blotterOptionsColItems, items: auditBlotterOptions })),
                                        React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", headerText: "Config Server Options", cssClassName: this.state.cssClassName, button: showConfigServerOptionsButton }, this.state.IsConfigServerOptionsMinimised == false &&
                                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: blotterOptionsColItems, items: configServerBlotterOptions })),
                                        React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", headerText: "Query Options", cssClassName: this.state.cssClassName, button: showQueryOptionsButton }, this.state.IsQueryOptionsMinimised == false &&
                                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: blotterOptionsColItems, items: queryBlotterOptions })),
                                        React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", headerText: "Layout Options", cssClassName: this.state.cssClassName, button: showLayoutOptionsButton }, this.state.IsLayoutOptionsMinimised == false &&
                                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: blotterOptionsColItems, items: layoutBlotterOptions })),
                                        React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", headerText: "Filter Options", cssClassName: this.state.cssClassName, button: showFilterOptionsButton }, this.state.IsFilterOptionsMinimised == false &&
                                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: blotterOptionsColItems, items: filterBlotterOptions })),
                                        React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", headerText: "General Options", cssClassName: this.state.cssClassName, button: showGeneralOptionsButton }, this.state.IsGeneralOptionsMinimised == false &&
                                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.state.cssClassName, colItems: blotterOptionsColItems, items: generalBlotterOptions })))))),
                React.createElement(react_bootstrap_1.Modal.Footer, { className: this.state.cssClassName + StyleConstants.MODAL_FOOTER },
                    React.createElement(react_bootstrap_1.Button, { className: this.state.cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON, onClick: () => this.props.onClose() }, "Close"))));
    }
    CreateGridInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let calcColumns = this.props.AdaptableBlotter.api.calculatedColumnApi.GetAll().map(c => c.ColumnId);
            let columns = this.props.AdaptableBlotter.api.gridApi.getColumns();
            let columnFilterDescription = ColumnFilterHelper_1.ColumnFilterHelper.getColumnFiltersDescription(this.props.AdaptableBlotter.api.columnFilterApi.GetAll(), columns, this.props.AdaptableBlotter);
            let sorts = this.props.AdaptableBlotter.api.gridApi.getGridSorts().map(gs => {
                return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + ": " + gs.SortOrder;
            });
            let licenceInDate = (this.props.AdaptableBlotter.LicenceService.LicenceInfo.IsLicenceInDate) ? "In Date" : "Expired";
            returnRows.push(this.createColItem(colItems, "Vendor Grid", this.props.AdaptableBlotter.vendorGridName));
            returnRows.push(this.createColItem(colItems, "Adaptable Blotter Version", "3.3"));
            returnRows.push(this.createColItem(colItems, "Licence Key", this.props.AdaptableBlotter.blotterOptions.licenceKey + " (" + licenceInDate + ")"));
            returnRows.push(this.createColItem(colItems, "Licence Type", this.props.AdaptableBlotter.LicenceService.LicenceInfo.LicenceScopeType + " (" + this.props.AdaptableBlotter.LicenceService.LicenceInfo.LicenceUserType + ")"));
            returnRows.push(this.createColItem(colItems, "Sorted Columns", ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join("; ") : "None"));
            returnRows.push(this.createColItem(colItems, "Column Filters", columnFilterDescription));
            returnRows.push(this.createColItem(colItems, "All Rows", this.props.AdaptableBlotter.getRowCount()));
            returnRows.push(this.createColItem(colItems, "Visible Rows", this.props.AdaptableBlotter.getVisibleRowCount()));
            returnRows.push(this.createColItem(colItems, "All Columns", this.props.AdaptableBlotter.getColumnCount()));
            returnRows.push(this.createColItem(colItems, "Visible Column", this.props.AdaptableBlotter.getVisibleColumnCount()));
            returnRows.push(this.createColItem(colItems, "Can Multi Select", this.props.AdaptableBlotter.isSelectable() ? "True" : "False"));
            returnRows.push(this.createColItem(colItems, "Calculated Columns", ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : "None"));
        }
        return returnRows;
    }
    CreateBaseOptionsInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let options = this.props.AdaptableBlotter.blotterOptions;
            // base options
            returnRows.push(this.createColItem(colItems, "blotterId", options.blotterId, "Identifier for this instance of the Adaptable Blotter"));
            returnRows.push(this.createColItem(colItems, "userName", options.userName, "Current user of the Adaptable Blotter"));
            returnRows.push(this.createColItem(colItems, "primaryKey", options.primaryKey, "Unique column in the grid (useful for cell identification purposes)"));
            //   returnRows.push(this.createColItem(colItems, "predefinedConfig", options.predefinedConfig, "Configuration properties and objects set at design-time"));
        }
        return returnRows;
    }
    CreateContainerOptionsInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let options = this.props.AdaptableBlotter.blotterOptions;
            returnRows.push(this.createColItem(colItems, "adaptableBlotterContainer", options.containerOptions.adaptableBlotterContainer, "Id of <div> element which contains the Blotter"));
            returnRows.push(this.createColItem(colItems, "vendorContainer", options.containerOptions.vendorContainer, "Id of <div> element which contains the underlying grid"));
            returnRows.push(this.createColItem(colItems, "modalContainer", (options.containerOptions.modalContainer) ? options.containerOptions.modalContainer : "None", "Id of <div> element where popups appear.  If set to 'None' then they appear in the middle of the screen."));
            returnRows.push(this.createColItem(colItems, "chartContainer", (options.containerOptions.chartContainer) ? options.containerOptions.chartContainer : "None", "Id of <div> element where charts appear.  If set to 'None' then they appear in the middle of the screen."));
        }
        return returnRows;
    }
    CreateAuditOptionsInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let options = this.props.AdaptableBlotter.blotterOptions;
            returnRows.push(this.createColItem(colItems, "auditCellEdits", (options.auditOptions.auditCellEdits == true) ? "Yes" : "No", " Whether to audit cell edits.  These include any edits made to the data in the grid but not outside (e.g. not a ticking stream)"));
            returnRows.push(this.createColItem(colItems, "auditFunctionEvents", (options.auditOptions.auditFunctionEvents == true) ? "Yes" : "No", " Whether to audit function events in the Blotter (e.g. 'Advanced Search Selected', 'Smart Edit Applied' etc.)"));
            returnRows.push(this.createColItem(colItems, "auditUserStateChanges", (options.auditOptions.auditUserStateChanges == true) ? "Yes" : "No", "Whether to audit all changes to the User State; includes any objects (e.g. Conditional Styles) created, edited or deleted"));
            returnRows.push(this.createColItem(colItems, "auditInternalStateChanges", (options.auditOptions.auditInternalStateChanges == true) ? "Yes" : "No", "Whether to audit changes to the Adaptable Blotter's state; includes things like which popups are active, what are the selected cells (can potentially be very verbos)e"));
            returnRows.push(this.createColItem(colItems, "pingInterval", options.auditOptions.pingInterval, "How often (in seconds) the Audit Log should ping to check that the listening service is up and running"));
            returnRows.push(this.createColItem(colItems, "auditLogsSendInterval", options.auditOptions.auditLogsSendInterval, "The 'batch' time (in seconds) for pushing Audit Log messages"));
        }
        return returnRows;
    }
    CreateConfigServerOptionsInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let options = this.props.AdaptableBlotter.blotterOptions;
            returnRows.push(this.createColItem(colItems, "enableConfigServer", (options.configServerOptions.enableConfigServer == true) ? "Yes" : "No", "If enabled Config Server store State in the remote location specified in the 'configServerUrl' property (rather than the default of using local storage)."));
            returnRows.push(this.createColItem(colItems, "configServerUrl", (options.configServerOptions.configServerUrl), "Location of Config Server that persists the user state and gives it back on demand (only used if enableConfigServer is true)."));
        }
        return returnRows;
    }
    CreateQueryOptionsInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let options = this.props.AdaptableBlotter.blotterOptions;
            returnRows.push(this.createColItem(colItems, "maxColumnValueItemsDisplayed", (options.queryOptions.maxColumnValueItemsDisplayed), "No. of items to display in column value listboxes when building queries - useful when datasource is very large"));
            returnRows.push(this.createColItem(colItems, "columnValuesOnlyInQueries", (options.queryOptions.columnValuesOnlyInQueries == true) ? "Yes" : "No", " Whether query builder includes just ColumnValues, or should also include Filters and Ranges."));
            returnRows.push(this.createColItem(colItems, "ignoreCaseInQueries", (options.queryOptions.ignoreCaseInQueries == true) ? "Yes" : "No", "Whether case is ignored when running queries (on text columns)"));
            returnRows.push(this.createColItem(colItems, "getColumnValues", (options.queryOptions.getColumnValues != null) ? "Function Exists" : "", "Function that is run when getting list of column values (run by user on their server)."));
        }
        return returnRows;
    }
    CreateLayoutOptionsInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let options = this.props.AdaptableBlotter.blotterOptions;
            returnRows.push(this.createColItem(colItems, "includeVendorStateInLayouts", (options.layoutOptions.includeVendorStateInLayouts == true) ? "Yes" : "No", "Whether layouts include vendor grid related state."));
            returnRows.push(this.createColItem(colItems, "autoSaveLayouts", (options.layoutOptions.autoSaveLayouts == true) ? "Yes" : "No", "Whether layouts save as soon as column order or sorts change."));
        }
        return returnRows;
    }
    CreateFilterOptionsInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let options = this.props.AdaptableBlotter.blotterOptions;
            returnRows.push(this.createColItem(colItems, "indicateFilteredColumns", (options.filterOptions.indicateFilteredColumns == true) ? "Yes" : "No", "Whether the font in the Column header for filtered columns is bold and italicised."));
            returnRows.push(this.createColItem(colItems, "useAdaptableBlotterFilterForm", (options.filterOptions.useAdaptableBlotterFilterForm == true) ? "Yes" : "No", "If using the Adaptable Blotter filter form in column menu (or that provided by the vendor grid)."));
            returnRows.push(this.createColItem(colItems, "useAdaptableBlotterFloatingFilter", (options.filterOptions.useAdaptableBlotterFloatingFilter == true) ? "Yes" : "No", "Use the Adaptable Blotter quick filter row (or that provided by the vendor grid)."));
        }
        return returnRows;
    }
    CreateGeneralOptionsInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            let options = this.props.AdaptableBlotter.blotterOptions;
            returnRows.push(this.createColItem(colItems, "serverSearchOption", (options.generalOptions.serverSearchOption), "Which searching and filtering options, if any, are taking place on the server."));
            returnRows.push(this.createColItem(colItems, "useDefaultVendorGridThemes", (options.generalOptions.useDefaultVendorGridThemes == true) ? "Yes" : "No", "Whether the default theme(s) for the vendor grid are being used)."));
            returnRows.push(this.createColItem(colItems, "showMissingPrimaryKeyWarning", (options.generalOptions.showMissingPrimaryKeyWarning == true) ? "Yes" : "No", "Whether a warning is shown if the primary key column does not actually exist."));
            returnRows.push(this.createColItem(colItems, "preventDuplicatePrimaryKeyValues", (options.generalOptions.preventDuplicatePrimaryKeyValues == true) ? "Yes" : "No", "Whether a duplicate value can be entered into the primary key column."));
        }
        return returnRows;
    }
    createMaximiseButton(optionType, onClickFunction) {
        return React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: this.state.cssClassName, onClick: () => onClickFunction(), bsStyle: StyleConstants.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show " + optionType + " Options" });
    }
    createMinimiseButton(optionType, onClickFunction) {
        return React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: this.state.cssClassName, onClick: () => onClickFunction(), bsStyle: StyleConstants.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide " + optionType + " Options" });
    }
    createColItem(colItems, item1, item2, item3) {
        let rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = item1;
        rowColItems[1].Content = item2;
        if (item3) {
            let infoButton = React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: this.state.cssClassName, headerText: null, bodyText: [item3] });
            rowColItems[2].Content = infoButton;
        }
        return rowColItems;
    }
    onShowGridPropertiesChanged(event) {
        let e = event.target;
        this.setState({ ShowGridProperties: (e.value == "GridProperties"), });
    }
}
exports.AdaptableBlotterAbout = AdaptableBlotterAbout;
