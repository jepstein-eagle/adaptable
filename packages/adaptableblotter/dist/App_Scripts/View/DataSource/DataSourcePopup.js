"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const DataSourceRedux = require("../../Redux/ActionsReducers/DataSourceRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const DataSourceEntityRow_1 = require("./DataSourceEntityRow");
const DataSourceWizard_1 = require("./Wizard/DataSourceWizard");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const Helper_1 = require("../../Utilities/Helpers/Helper");
class DataSourcePopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__DataSource";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__DataSource";
        let infoBody = ["Use DataSources to select from existing server queries what data to show in the Blotter."];
        let colItems = [
            { Content: "Name", Size: 5 },
            { Content: "Description", Size: 5 },
            { Content: "", Size: 2 },
        ];
        let dataSources = this.props.DataSources.map((dataSource, index) => {
            return React.createElement(DataSourceEntityRow_1.DataSourceEntityRow, { cssClassName: cssClassName, AdaptableBlotterObject: dataSource, key: "ns" + index, Index: index, onEdit: (index, dataSource) => this.onEdit(index, dataSource), colItems: colItems, onShare: () => this.props.onShare(dataSource), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: DataSourceRedux.DataSourceDelete(dataSource), onChangeName: (dataSource, newKey) => this.props.onChangeName(dataSource, newKey), onChangeDescription: (dataSource, newOperation) => this.props.onChangeDescription(dataSource, newOperation) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.CreateDataSource(), overrideTooltip: "Create New DataSource", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        let DataSource = this.state.EditedAdaptableBlotterObject;
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.DataSourceStrategyName, className: "ab_main_popup", button: newButton, bsStyle: "primary", glyphicon: StrategyConstants.DataSourceGlyph, infoBody: infoBody },
                dataSources.length > 0 ?
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: dataSources })
                    :
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to add a new DataSource."),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(DataSourceWizard_1.DataSourceWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: DataSource, ConfigEntities: this.props.DataSources, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    onEdit(index, dataSource) {
        let clonedObject = Helper_1.Helper.cloneObject(dataSource);
        this.setState({ EditedAdaptableBlotterObject: clonedObject, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let searchIndex = this.state.EditedAdaptableBlotterObjectIndex;
        let currentSearchIndex = this.props.DataSources.findIndex(as => as.Name == this.props.CurrentDataSource);
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onAddUpdateDataSource(this.state.EditedAdaptableBlotterObjectIndex, clonedObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
        if (searchIndex == -1 || searchIndex == currentSearchIndex) { // its new so make it the new search or we are editing the current search (but might have changed the name)
            this.props.onSelectDataSource(clonedObject.Name);
        }
    }
    canFinishWizard() {
        let DataSource = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(DataSource.Name) && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(DataSource.Description);
    }
    CreateDataSource() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyDataSource(), WizardStartIndex: 0 });
    }
}
function mapStateToProps(state, ownProps) {
    return {
        DataSources: state.DataSource.DataSources,
        CurrentDataSource: state.DataSource.CurrentDataSource
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateDataSource: (Index, DataSource) => dispatch(DataSourceRedux.DataSourceAddUpdate(Index, DataSource)),
        onChangeName: (DataSource, Name) => dispatch(DataSourceRedux.DataSourceChangeName(DataSource, Name)),
        onChangeDescription: (DataSource, Description) => dispatch(DataSourceRedux.DataSourceChangeDescription(DataSource, Description)),
        onSelectDataSource: (SelectedDataSource) => dispatch(DataSourceRedux.DataSourceSelect(SelectedDataSource)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.DataSourceStrategyId))
    };
}
exports.DataSourcePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataSourcePopupComponent);
